<template>
	<view class="home">
		<image src="/static/image/login/login-bg.png" class="login-bg" mode="widthFix"></image>
		<u-navbar bgColor="transparent" :fixed="false" placeholder @rightClick="jumpmessage">
			<template #left>
				<view @click="handleLocation" style="width: 100rpx;" class="text-line">
					<text class="font-28 text-white font-regular line-center text-line">{{store.selectCity?.city || store.longLat?.city}}</text>
					<!-- <image src="../../static/image/home/Locate.png" class="position-img"></image> -->
				</view>
			</template>
			<template #center>
				<view>
					<u-search shape="square" :showAction="false" placeholder="搜索城市/目的地" searchIconColor="#E8FAFE"
						placeholderColor="#E8FAFE" bgColor=" #00b3d2" height="60rpx" @click="toSearch"
						margin='0 25rpx 0 76rpx' disabled :input-style="{'pointer-events': 'none'}">
					</u-search>
				</view>
			</template>
			<template #right>
				<MessageIcon></MessageIcon>
			</template>
		</u-navbar>
		<!-- 内容 -->
		<view class="relative zIndex1 pt-30">
			<!-- 首页轮播图 -->
			<view class="swiper-style">
				<up-swiper :list="swiper_list1.map(_=>_.src)" indicator height="292rpx" indicatorActiveColor="#FFE401"
					indicatorMode="dot" @click="swiperClick" circular>
				</up-swiper>
			</view>
			<!-- 旅游服务 -->
			<view class="mt-20 p-24">
				<ContentTitle title="旅游服务"></ContentTitle>
				<view>
					<u-grid :border="false" col="2">
						<u-grid-item v-for="(item) in list2" :key="item.id" @click="tourismitem(item)">
							<image :src="item.img" class="customized-bg"></image>
							<view class="grid-style mt-24">
								<view class="flex items-center h100 justify-center">
									<view
										:class="[`pl-30 font-28 font-medium text-0B0B0B zIndex1`,item.id == 4 ? `customized-color`:'']">
										{{item.name}}
									</view>
								</view>
							</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
			<!-- 轮播图 -->
			<view class="p-24 swiper2">
				<u-swiper :list="swiper_list2.map(_=>_.src)" height="200rpx" @click="swiperTwoClick"
					indicatorActiveColor="#FFE401" indicatorMode="dot" indicator>
				</u-swiper>
			</view>
			<!-- 旅游套餐 -->
			<view class="p-24">
				<ContentTitle title="旅游套餐"></ContentTitle>
				<!-- 横向滚动列表 -->
				<view class="ml-10">
					<u-scroll-list :indicator="false">
						<view class="scroll-style" @click="handlepackage(index)" v-for="(item, index) in packages_data"
							:key="index">
							<view class="relative"
								:class="[`font-28 text-767676 font-medium line66`, is_active == index ? `text-0B0B0B active`:``]">
								{{item.name}}
							</view>
						</view>
					</u-scroll-list>
				</view>
				<!-- 旅游套餐数据 -->
				<CardList v-model="productList" ref='CL'></CardList>
			</view>
		</view>
		<MidTabbar></MidTabbar>
		<!-- <up-back-top :scrollTop="scrollTop" mode="square" icon="/static/image/home/top.png" :iconStyle="iconStyle"></up-back-top> -->
		<backTop></backTop>
		<!-- 升级弹框 -->
		<view>
			<u-popup :show="false" mode="center" @close="close" bgColor="transparent">
				<view class="register">
					<image src="../../static/image/home/popBackground.png" class="width-661" mode="widthFix">
					</image>
				</view>
				<view class="popTop-img">
					<image src="../../static/image/home/popTop.png" mode=""></image>
				</view>
				<view class="characteristic">
					<view class="text-black font-28 font-bold">
						新版本特性:
					</view>
					<view class="text-black font-26  mt-10">
						<view v-for="(item,index) in characteristic_data" :key="index">
							<view class="mt-10">
								{{item}}
							</view>
						</view>
					</view>
				</view>
				<view class="upgrade-now">
					<view class="upgrade-btn" @click="upgradeNow">
						立即升级
					</view>
				</view>
			</u-popup>
		</view>
		
	</view>
</template>

<script setup>
	// #ifdef H5
	import AMapLoader from '@amap/amap-jsapi-loader';
	// #endif
	import {
		reactive,
		ref
	} from 'vue';
	// #ifdef APP-PLUS
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
	// #endif
	import {
		onReachBottom,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useUserStore
	} from '@/store';
	const store = useUserStore()
	import {
		tourism_type
	} from '@/api/tourism.js'

	import {
		index_type,
		product_list,
		home_banner,
		tourism_banner,
		tourism_serve,getLocationByIp
	} from '@/api/home.js' 
	// 使用 reactive 创建响应式数组  
	let productList = ref([])
	let CL = ref(null)
	let pageInfo = reactive({
		page: 1,
		limit: 10
	})
	const swiper_list1 = ref([]);
	// 旅游服务
	const list2 = ref([])
	tourism_serve().then(res => {
		list2.value = res
	})
	//跳转旅游服务
	const tourismitem = (item) => {
		if (!item.url) {
			uni.navigateTo({
				url: `/pages_home/pages/tourism/tourism?name=${item.name}&id=${item.id}`
			})
		} else {
			uni.navigateTo({
				url: '/pages_home/pages/customizedTour/customizedTour'
			})
		}

	}
	// 第二个轮播图
	const swiper_list2 = ref([]);
	//旅游套餐数据
	let packages_data = ref(null);
	let noMoreData = ref(false);
	//激活状态，默认0
	const is_active = ref(0)
	//点击套餐事件
	const handlepackage = (data) => {
		pageInfo.page = 1;
		is_active.value = data;
		get_product_list({
			index_id: packages_data.value[is_active.value].id,
			...pageInfo
		})
	}
	//点击搜索框，跳转搜索页面
	const toSearch = () => {
		uni.navigateTo({
			url: '/pages_home/pages/homeSearch/homeSearch'
		})
	}
	//跳转定位
	const handleLocation = () => {
		uni.navigateTo({
			url: '/pages_home/pages/location/location'
		})
	}
	//跳转消息页面

	const jumpmessage = () => {
		if (!store.tokenInfo) {
			uni.navigateTo({
				url: "/pages_others/pages/login/login"
			})
		} else {
			uni.navigateTo({
				url: "/pages_home/pages/message/message"
			})
		}

	}
	// 新特性数据
	const characteristic_data = reactive([
		'1.购票即有机会以优惠价格购买电影周边产品',
		'2.全新电影评论评分后分享卡片',
		'3.电影详情页新改版 ',
		'4.电影票兑换码显示优化 ',
		'5.选座页设计优化及其他体验优化'
	])
	//立即升级
	const upgradeNow = () => {
		console.log('立即升级')
	}
	// tourism_type().then(res => {

	// })

	index_type().then(res => {
		packages_data.value = res;
		get_product_list({
			index_id: packages_data.value[is_active.value].id,
			...pageInfo
		})
	})
	home_banner({
		limit: 5
	}).then(res => {
		swiper_list1.value = res;
	})
	tourism_banner({
		limit: 5
	}).then(res => {
		swiper_list2.value = res;
	})
	const get_product_list = (params) => {
		product_list(params).then(res => {
			console.log(res)
			if (pageInfo.page > 1) {
				productList.value.push(...res.dataList);
			} else {
				productList.value = res.dataList;
			}
			if (productList.value.length >= res.total) {
				noMoreData.value = true
			} else {
				noMoreData.value = false;
			}
			CL.value.setData(productList.value);
		})
	}
	const swiperClick = (e) => {
		console.log(e)
		let item = swiper_list1.value[e]
		console.log(item)
		if (item.jump_link) {
			if (item.jump_link.indexOf('http') != -1) {
				uni.navigateTo({
					url: '/pages/webview/webview?url=' + encodeURIComponent(item.jump_link)
				})
			} else {
				uni.navigateTo({
					url: item.jump_link
				})
			}
		} else {
			if (item.jump_type == 1) {
				switch (item.goods_type) {
					case 0:
						uni.navigateTo({
							url: '/pages_mine/pages/productdetail/productdetail?id=' + item.goods_id
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/pages_home/pages/tourDetails/tourDetails?id=' + item.goods_id
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages_mine/pages/productdetail/productdetail?id=' + item.goods_id
						})
						break;
					default:
						break;
				}
			}
		}
	};
	const swiperTwoClick = (e) => {
		let item = swiper_list2.value[e]
		if (item.jump_link) {
			if (item.jump_link.indexOf('http') != -1) {
				uni.navigateTo({
					url: '/pages/webview/webview?url=' + encodeURIComponent(item.jump_link)
				})
			} else {
				uni.navigateTo({
					url: item.jump_link
				})
			}
		} else {
			uni.navigateTo({
				url: '/pages_home/pages/tourDetails/tourDetails?id=' + item.tourism_id
			})
		}
	}
	onLoad(() => {
		uni.getLocation({
			type: 'gcj02',
			geocode: true,
			success(res) {
				console.log(res, '获取当前定位')
				// #ifdef APP
				store.setLongLat({
					lng: res.longitude,
					lat: res.latitude,
					city: res.address.city
				})
				store.setSelectCity({
					lng: res.longitude,
					lat: res.latitude,
					city: res.address.city
				})
				// #endif
				// #ifdef H5
				getAddress([res.longitude,res.latitude])
				// #endif
			},
			fail(){
				getLocationByIp().then(result=>{
					store.setLongLat({
						lng: result.longitude,
						lat: result.latitude,
						city: result.city
					})
					store.setSelectCity({
						lng: result.longitude,
						lat: result.latitude,
						city: result.city
					})
				})
			}
			
		})
		// #ifdef APP-PLUS
		if (!store.tokenInfo?.token) {
			uni.preLogin({
				provider: 'univerify',
				success() { //预登录成功
					// 显示一键登录选项
				},
				fail(res) { // 预登录失败
					//跳登录页面
					console.error('预登录失败', res)
				}
			})
		}
		checkUpdate()
		// #endif

	})
	const getAddress = (lnglat) => {
		window._AMapSecurityConfig = {
			securityJsCode: "57e4fb217b6ff190c8a78a434d252e3d",
		};
		AMapLoader.reset()
		AMapLoader.load({
			key: "2b700e578a3112c07ede7e83cbeed66d", // 申请好的Web端开发者Key，首次调用 load 时必填
			version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
			plugins: ["AMap.Geocoder"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
		}).then((AMap) => {
			var geocoder = new AMap.Geocoder();
			// var lnglat = [116.396574, 39.992706];
			geocoder.getAddress(lnglat, function(status, result) {
				if (status === "complete" && result.info === "OK") {
					// result为对应的地理位置详细信息
					console.log(result);
					store.setLongLat({
						lng: lnglat[0],
						lat: lnglat[1],
						city: result.regeocode.addressComponent.province || result.regeocode.addressComponent.city
					})
					store.setSelectCity({
						lng: lnglat[0],
						lat: lnglat[1],
						city: result.regeocode.addressComponent.province || result.regeocode.addressComponent.city
					})
				}
			});
		}).catch((e) => {
			console.log(e);
		});
	}
	// 触底后去新数据
	onReachBottom(() => {
		console.log('触底后去新数据')
		if (noMoreData.value) return;
		pageInfo.page++;
		get_product_list({
			index_id: packages_data.value[is_active.value].id,
			...pageInfo
		})
	})
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.home {
		padding-bottom: 160rpx;
	}

	.login-bg {
		width: 100%;
		position: absolute;
		top: 0;
	}

	.position-img {
		width: 20rpx;
		height: 26rpx;
		margin: auto;
		margin-left: 5rpx;
	}


	.message-icon {
		position: absolute;
		top: 5px;
		right: 9px;
		border-radius: 50%;
		line-height: 30rpx;
	}

	::v-deep .u-search {
		width: 530rpx;
	}

	.message-img {
		width: 42rpx;
		height: 37rpx;
	}

	.swiper-style {
		width: 702rpx;
		height: 291rpx;
		margin: 0 auto;
	}

	.grid-style {
		width: 339rpx;
		height: 139rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(16, 8, 13, 0.06);
		border-radius: 15rpx;
	}

	.periphery-icon {
		width: 94rpx;
		height: 99rpx;
	}

	.domestic-icon {
		width: 108rpx;
		height: 83rpx;
	}

	.exit-icon {
		width: 94rpx;
		height: 85rpx;
	}

	.width-661 {
		width: 661rpx;
	}

	.customized-icon {
		width: 104rpx;
		height: 116rpx;
	}

	.customized-bg {
		position: absolute;
		width: 339rpx;
		height: 139rpx;
		top: 24rpx;
	}

	.customized-color {
		color: #0791FD;
	}

	.swiper2 ::v-deep .u-swiper {
		border-radius: 50px !important;
	}

	.scroll-style {
		white-space: nowrap;
		margin-right: 66rpx;
		text-align: center;
	}

	::v-deep .u-scroll-list {
		padding-bottom: 0;
	}

	.active::after {
		content: "";
		width: 100%;
		height: 10rpx;
		background: linear-gradient(180deg, #FFE401, #2EDEFF);
		border-radius: 8rpx;
		position: absolute;
		top: 40rpx;
		left: 0;
		z-index: -1;
	}

	.line66 {
		line-height: 66rpx;
	}

	.popTop-img {
		position: absolute;
		top: -20rpx;
		left: 6.3125rem;

		image {
			width: 294rpx;
			height: 276rpx
		}
	}

	.characteristic {
		position: absolute;
		top: 210rpx;
		padding: 70rpx;
	}

	.upgrade-now {
		position: absolute;
		bottom: 1rpx;
		padding: 60rpx;
		left: 120rpx
	}

	.upgrade-btn {
		width: 306rpx;
		height: 90rpx;
		background: linear-gradient(0deg, #068EFD, #2EDEFF);
		border-radius: 15rpx;
		text-align: center;
		line-height: 90rpx;
		font-weight: 500;
		font-size: 30rpx;
		color: #FFFFFF;
	}
</style>