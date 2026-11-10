<template>
	<view>
		<image src="/static/image/login/login-bg.png" class="login-bg" @click="handle"></image>
		<u-navbar :title="title" bgColor="transparent" :titleStyle="titleStyle" leftIconColor="#fff" :fixed="false"
			autoBack>
		</u-navbar>

		<view class="relative zIndex1 p-24">
			<!-- 搜索框 -->
			<view>
				<u-search shape="square" @click="toSearch" height="76rpx" :showAction="false" placeholder="搜索关键词/目的地"
					searchIconColor="#E8FAFE" placeholderColor="#E8FAFE" bgColor=" #00b3d2" disabled
					:input-style="{'pointer-events': 'none'}">
				</u-search>
			</view>
			<!-- 轮播图 -->
			<view class="mt-24">
				<view class="swiper-style">
					<u-swiper :list="swiper_list1.map(_=>_.src)" indicator indicatorActiveColor="#FFE401"
						indicatorMode="dot" @click="swiperTwoClick"></u-swiper>
				</view>
			</view>
			<view class="mt-40">
				<ContentTitle title="人气榜单" righttitle="更多" :pagetitle="title"
					:jumpurl="`/pages_home/pages/hotList/hotList?title=${title}&id=${queryParams.type_id}`"></ContentTitle>
			</view>
			<view class="popularity-list">
				<view class="uni-margin-wrap">
					<u-scroll-list :indicator="false">
						<view class="popularity-list-content" v-for="(item,index) in popularity">
							<view class="ranking">
								<image :src="rankingIcon[index]" class="ranking-icon"></image>
							</view>
							<view>
								<image :src="item.img" class="popular-img" mode=""></image>
							</view>
							<view class="bg-white">
								<view class="font-26 font-regular text-0B0B0B text-2line">
									{{item.title}}
								</view>
								<view class="mt-20 w100">
									<view class="flex items-center">
										<view class="font-30 font-bold text-E6722D">
											¥{{item.min_price}}
										</view>
										<view class="font-regular font-20 text-767676 ml-10 line-height-50">
											起
										</view>
										<view class="font-regular font-20 text-767676 line-height-50 ml-30">
											{{item.spec_name}}
										</view>
									</view>
								</view>
								<view class="mt-10 font-24 font-medium text-3D91F5">
									{{item.city}} l {{item.buy}}人已报名
								</view>
							</view>
						</view>
					</u-scroll-list>
				</view>
			</view>
		</view>
		<view class="mt-10">
			<view class="plr-24">
				<u-scroll-list :indicator="false">
					<view class="scroll-style" @click="handlepackage(item.id)" v-for="(item, index) in packages_data"
						:key="item.id">
						<view class="relative"
							:class="[`font-28 text-767676 font-medium line66`, queryParams.index_id == item.id ? `text-0B0B0B scroll-active`:``]">
							{{item.name}}
						</view>
					</view>
				</u-scroll-list>
			</view>
			<view class="pl-24 text-D8D6D6 font-26 font-regular mt-20">
				<view class="flex items-center">
					<view class="text-black font-medium flex-shrink">
						出游时间：
					</view>
					<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
						<view :class="[`scroll-view-item_H`,queryParams.day == 0 ? `active bg-F3C720 text-white` :``]"
							@click="handletravelTime(0)">
							不限
						</view>
						<view :class="[`scroll-view-item_H`,queryParams.day == item ? `active bg-F3C720 text-white` :``]"
							v-for="item in 8" @click="handletravelTime(item)">
							{{item}}{{item === 7 ?'天以上' :'天'}}
						</view>
					</scroll-view>

				</view>
				<view class="flex mt-20 items-center mr-20">
					<view class="mr-10 text-0B0B0B font-medium">
						出发日期:
					</view>
					<uni-datetime-picker type="date" :clear-icon="false" v-model="queryParams.start_day" @maskClick="maskClick"
						placeholder="开始时间" @change="get_product_list" />
					<view class="mlr-10"> ——— </view>
					<uni-datetime-picker type="date" :clear-icon="false" v-model="queryParams.end_day" @maskClick="maskClick"
						placeholder="返程时间" @change="get_product_list" />
					<view class="pl-30" v-if='queryParams.start_day || queryParams.end_day'>
						<image src="../../static/img/homeSearch/cancel.png" class="width-30" mode="widthFix"
							@click="cancelchoose"></image>
					</view>
				</view>
			</view>
			<CardList v-model="productList" ref='CL' class="plr-24"></CardList>
			<backTop></backTop>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onReachBottom
	} from '@dcloudio/uni-app'
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import { useUserStore } from '@/store';
	const store = useUserStore()
	import {
		type_banner,
		tourism_product_list,
		tourism_type,
		hot_rank,
		city_location
	} from '@/api/tourism';
	import {
		product_list
	} from '@/api/home';
	//标题
	const title = ref('')
	let titleStyle = reactive({
		'font-weight': '500',
		'font-size': '32rpx',
		'color': ' #FFFFFF',
	})
	// 使用 reactive 创建响应式数组
	const swiper_list1 = ref([])
	//人气榜图标
	const rankingIcon = reactive([
		'/static/image/home/tourism/1.png',
		'/static/image/home/tourism/2.png',
		'/static/image/home/tourism/3.png',
		'/static/image/home/tourism/4.png',
		'/static/image/home/tourism/5.png',
		'/static/image/home/tourism/6.png',
		'/static/image/home/tourism/7.png',
		'/static/image/home/tourism/8.png',
		'/static/image/home/tourism/9.png',
		'/static/image/home/tourism/10.png',
	])
	let productList = ref([])
	const packages_data = ref([])
	let noMoreData = ref(false);
	const is_active = ref(0)
	const type_id = ref()
	// 是否周边游
	const is_gettingaround = ref(false)
	let CL = ref(null)
	let pageInfo = reactive({
		page: 1,
		limit: 10
	})
	// 当前城市
	const citydata = ref({})
	let city = ref('贵阳市')
	let longLat = reactive({})
	let queryParams = reactive({
		type_id:'',
		index_id:'',
		day:0,
		start_day:'',
		end_day:''
	})
	city_location({
		'city': city.value
	}).then(res => {
		citydata.value = res
	})
	// 根据首页的路由携带参数，判断旅游类型，并获取相应的数据
	onLoad((query) => {
		title.value = query.name
		type_id.value = query.id
		queryParams.type_id = query.id;
		if (query.name == '周边游') {
			longLat = store.longLat
		}
		is_gettingaround.value = true
		type_banner({
			'type_id': query.id,
			'limit': 5,
			...longLat
		}).then(res => {
			swiper_list1.value = res
		})
		tourism_type({
			'type_id': type_id.value
		}).then(res => {
			packages_data.value = res
			get_product_list()
		})


	})

	const handlepackage = (ids) => {
		pageInfo.page = 1
		queryParams.index_id = ids;
		get_product_list()
	}
	// 人气榜单数据
	const popularity = ref([])
	hot_rank({
		'type_id': type_id,
		'limit': 5
	}).then(res => {
		popularity.value = res.dataList
	})
	
	const handletravelTime = (days) => {
		queryParams.day = days;
		get_product_list()
	}
	const cancelchoose = () => {
		queryParams.start_day = null;
		queryParams.end_day = null;
		get_product_list()
	}
	//点击搜索框，跳转搜索页面
	const toSearch = () => {
		uni.navigateTo({
			url: `/pages_home/pages/homeSearch/homeSearch?type_id=${type_id.value}`
		})
	}
	const get_product_list = (params) => {
		tourism_product_list({...queryParams,...longLat,...pageInfo}).then(res => {
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
	onReachBottom(() => {
		if (noMoreData.value) return;
		pageInfo.page++;
		get_product_list()
	})
	const swiperTwoClick = (e)=>{
		let item = swiper_list1.value[e]
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
		}else{
			uni.navigateTo({
				url: '/pages_home/pages/tourDetails/tourDetails?id=' + item.tourism_id
			})
		}
	}

	//hotlist
</script>

<style lang="scss" scoped>
	page {
		position: relative;
	}

	.login-bg {
		width: 100%;
		height: 808rpx;
		position: absolute;
		top: 0;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100rpx;
		text-align: center;
		margin-right: 20rpx;
	}

	.swiper-style {
		width: 702rpx;
		height: 291rpx;
		margin: 0 auto;
	}

	.popularity-list-content {
		position: relative;
		width: 350rpx;
		margin-top: 50rpx;
		margin-right: 21rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(15, 9, 13, 0.06);
		border-radius: 15rpx;
	}

	.popular-img {
		width: 320rpx;
		height: 280rpx;
		border-radius: 15rpx 15rpx 0 0;
	}

	.ranking {
		position: absolute;
		top: -30rpx;
		right: -20rpx;
		z-index: 2;
	}

	.flex-shrink {
		flex-shrink: 0;
	}

	.ranking-icon {
		width: 64rpx;
		height: 57rpx;
	}

	.scroll-style {
		white-space: nowrap;
		margin-right: 66rpx;
		text-align: center;
	}

	::v-deep .u-scroll-list {
		padding-bottom: 0;
	}

	.scroll-active::after {
		content: '';
		width: 100%;
		height: 10rpx;
		background: linear-gradient(180deg, #FFE401, #2EDEFF);
		border-radius: 8rpx;
		position: absolute;
		top: 26rpx;
		left: 0;
		z-index: -1;
	}

	.active {
		width: 108rpx;
		height: 55rpx;
		border-radius: 10rpx;
		text-align: center;
		line-height: 55rpx;
	}

	::v-deep .uniui-calendar:before {
		content: "";
	}

	::v-deep .uni-date-x {
		background: none !important;
		color: #000000;
		margin-left: -6rpx;

	}

	::v-deep .uni-date__x-input {
		padding-left: 0rpx;
		text-align: center;
		height: 56rpx;
		font-size: 20rpx !important;
		line-height: 56rpx;
	}

	::v-deep .uni-date {
		width: 180rpx !important;
		flex: none;
	}
</style>