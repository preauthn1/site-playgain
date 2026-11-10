<template>
	<view class="mine">
		<image src="/static/image/mine/minebg.png" class="w100 mine-bg" mode="widthFix"></image>
		<u-navbar title="我的" leftIcon='' placeholder bgColor='transparent' :fixed="false"
			:titleStyle='{fongSize:"32rpx",color:"#fff",fontWeight: "500"}'>
			<template #right>
				<MessageIcon @click="jumpmessage"></MessageIcon>
				<image src="/static/image/mine/setting.png" class="width-41 ml-30" mode="widthFix"
					@click="handlejump('/pages_mine/pages/setting/setting')"></image>
			</template>
		</u-navbar>
		<view class="relative zIndex1">
			<view class="mine-content relative p-28 mtb-30">
				<view class="flex justify-between items-center" @click="jumpedit">
					<view class="flex items-center">
						<view class="avatar-bg flex justify-center items-center">
							<image :src="store.userInfo.head_img" class="avatar"></image>
						</view>
						<view class="font-32 text-black mlr-20">
							<view>{{store.userInfo.nick_name}}</view>
							<!-- <view class="font-26">ID:{{store.userInfo.id}}</view> -->
						</view>
						<view class="level">
							普通会员
						</view>
					</view>
					<image src="/static/image/mine/return.png" class="width-18" mode="widthFix"></image>
				</view>
			</view>
			<view class="mt-40 pb-28 plr-26">
				<view class="flex pt-12 justify-between">
					<view class="font-medium font-30 text-0B0B0B">
						我的订单
					</view>
					<view class="text-767676 font-24 font-regular flex items-center" @click="jumpmyorders(0)">
						全部
						<u-icon name="arrow-right" color="#767676"></u-icon>
					</view>
				</view>
				<view class="flex justify-between items-center mt-28">
					<view class="flex flex-col items-center relative" v-for="(item,index) in myorder_static" @click="jumpmyorders(index+1)">
						<image :src="item.image_url" :style="[`width:${item.width}`]" mode="widthFix"></image>
						<view class="mt-12 text-black font-24 font-regular">
							{{item.name}}
						</view>
						<view
							class="bg-F66A01 message-icon width-30 height-30 font-regular font-18 text-white text-center"
							v-if="orderTotal[index] > 0">
							{{orderTotal[index]}}
						</view>
					</view>
				</view>
			</view>
			<!-- 我的账户 -->
			<view class="mt-28 relative mlr-24 box-shadow-1 border-radius-16 overflow-hidden">
				<image src="/static/image/mine/account-bg.png" class="w100 absolute" mode="widthFix"></image>
				<view class="relative p-20">
					<view class="flex justify-between">
						<view class="font-medium font-30 text-0B0B0B">
							我的账户
						</view>
						<navigator url="/pages_mine/pages/accountRecord/accountRecord">
							<view class="text-767676 font-24 font-regular flex items-center">
								查看到账记录
								<u-icon name="arrow-right" color="#767676"></u-icon>
							</view>
						</navigator>
					</view>
					<view class="mt-12">
						<view class="flex justify-between">
							<view class="flex flex-col items-center ">
								<view class="flex items-center">
									<image src="/static/image/mine/commission.png" class="width-60" mode="widthFix" />
									<view class="ml-18 font-regular font-26">
										佣金
									</view>
								</view>
								<view class="mtb-10 font-medium font-26">
									余额：{{store.userInfo.commission}}
								</view>
								<navigator url="/pages_mine/pages/withdrawal/withdrawal">
									<view
										class="commission-btn text-white font-30 font-medium flex justify-center items-center w100">
										提现
									</view>
								</navigator>
							</view>
							<view class="bars" />
							<view class="flex flex-col items-center mt-22">
								<view class="flex items-center">
									<image src="/static/image/mine/Integral.png" class="width-60" mode="widthFix" />
									<view class="ml-18 font-regular font-26">
										积分
									</view>
								</view>
								<view class="mtb-10 font-medium font-26">
									余额：{{store.userInfo.integral}}
								</view>
								<navigator url="/pages_mine/pages/pointsConversion/pointsConversion">
									<view
										class="points-btn text-white font-30 font-medium flex justify-center items-center w100">
										积分转换
									</view>
								</navigator>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 我的服务 -->
			<view class="mtb-36 bg-white mlr-24 box-shadow-1 border-radius-16">
				<view class="p-26">
					<view class="pt-12 font-30 font-medium text-0B0B0B">
						我的服务
					</view>
					<view class="flex flex-wrap items-center">
						<view class="item text-center mt-10" v-for="(item, index) in myserver" :key="index"
							@click="handlejump(item.url)">
							<image :src="item.image_url" :style="[`width:${item.width}; margin:auto`]" mode="widthFix">
							</image>
							<view class="font-regular font-24">{{ item.name}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 精选推荐 -->
			<view>
				<view class="text-center font-30 font-medium text-0B0B0B">
					精选推荐
				</view>
				<!-- 旅游套餐数据 -->
				<CardList class="mlr-30" v-model="productList" ref='CL'></CardList>
			</view>
		</view>
		<backTop></backTop>
		<MidTabbar></MidTabbar>
	</view>
</template>
<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		useUserStore
	} from '@/store';
	import {
		user_recommend,
	} from '@/api/mine';
	import {
		ordertotal
	} from '@/api/order';
	import {
		onReachBottom,
		onShow
	} from '@dcloudio/uni-app'
	const store = useUserStore()
	//我的订单状态
	const myorder_static = reactive([{
		image_url: '/static/image/mine/Tobeconfirmed.png',
		name: '待确认',
		width: "37rpx"
	}, {
		image_url: '/static/image/mine/Pendingpayment.png',
		name: '待付款',
		width: "33rpx"
	}, {
		image_url: '/static/image/mine/Paid.png',
		name: '已付款',
		width: "40rpx"
	}, {
		image_url: '/static/image/mine/Tobeevaluated.png',
		name: '待评价',
		width: "34rpx"
	}, {
		image_url: '/static/image/mine/service.png',
		name: '退款/售后',
		width: "43rpx"
	}])
	// 订单状态

	// 我的服务
	const myserver = reactive([{
			image_url: "/static/image/mine/deliveryaddress.png",
			name: "收货地址",
			width: "64rpx",
			url: "/pages_mine/pages/address/address"
		}, {
			image_url: "/static/image/mine/shoppingcentre.png",
			name: "积分商城",
			width: "58rpx",
			url: "/pages_mine/pages/marketplaceCredits/marketplaceCredits"
		},
		{
			image_url: "/static/image/mine/collection.png",
			name: "我的收藏",
			width: "58rpx",
			url: '/pages_mine/pages/myCollection/myCollection'
		},
		{
			image_url: "/static/image/mine/Customer.png",
			name: "联系客服",
			width: "58rpx",
			url: '/pages_mine/pages/customerService/customerService'
		},
		{
			image_url: "/static/image/mine/Browse.png",
			name: "浏览记录",
			width: "58rpx",
			url: '/pages_mine/pages/browsingHistory/browsingHistory'
		},
		{
			image_url: "/static/image/mine/activity.png",
			name: "活动中心",
			width: "50rpx",
			url: '/pages_mine/pages/activitycenter/activitycenter'
		},
		{
			image_url: "/static/image/mine/Orderverification.png",
			name: "订单核验",
			width: "58rpx",
			url: '/pages_mine/pages/orderVerification/orderVerification'
		},
	])
	//跳转编辑页面
	const jumpedit = () => {
		uni.navigateTo({
			url: "/pages_mine/pages/edit/edit"
		})
	}
	onShow(() => {
		getordertotal()
	})
	let CL = ref(null)
	let pageInfo = reactive({
		page: 1,
		limit: 10
	})
	const orderTotal = ref([])
	const getordertotal = async () => {
		orderTotal.value = []
		for (let i = 1; i < 6; i++) {
			let res = await ordertotal({
				...pageInfo,
				'tab': i
			})
			orderTotal.value.push(res.total)
		}
	}
	let packages_data = ref(null);
	let noMoreData = ref(false);
	const productList = ref([])
	const get_product_list = (params) => {
		user_recommend(params).then(res => {
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
	get_product_list({
		...pageInfo
	})
	const handlejump = (url) => {
		console.log(url)
		uni.navigateTo({
			url: url
		})
	}
	const jumpmessage = () => {
		uni.navigateTo({
			url: "/pages_home/pages/message/message"
		})
	}
	// 全部订单
	const jumpmyorders = (num) => {
		console.log(num)
		uni.navigateTo({
			url: `/pages_mine/pages/myorders/myorders?page=${num}`
		})
	}

	onReachBottom(() => {
		console.log('触底后去新数据')
		if (noMoreData.value) return;
		pageInfo.page++;
		get_product_list({
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
	.mine {
		padding-bottom: 160rpx;
	}

	.mine-bg {
		position: absolute;
		top: 0;
	}

	.width-41 {
		width: 41rpx;
	}

	.avatar-bg {
		width: 125rpx;
		height: 125rpx;
		border-radius: 50%;
		background-color: #FFFFFF;
	}

	.avatar {
		width: 113rpx;
		height: 113rpx;
		border-radius: 50%;
		overflow: hidden;


	}

	.level {
		// background: #EDC74B;
		// border-radius: 16rpx;
		// font-size: 22rpx;
		// color: #000000;
		// padding: 4rpx 20rpx;
		// display: inline-block;
		font-weight: normal;
		font-size: 29rpx;
		color: #1C2532;
		line-height: 25rpx;
		text-shadow: -5rpx 3rpx 13rpx rgba(250, 188, 167, 0.27);
		background: linear-gradient(-1deg, #FFE8CE 0%, #FBB8A0 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.bars {
		width: 1rpx;
		height: 143rpx;
		background: #000000;
		opacity: 0.08;
	}

	.commission-btn {
		width: 268rpx;
		height: 78rpx;
		background: #3B8EF5;
		border-radius: 15rpx;
	}

	.points-btn {
		width: 268rpx;
		height: 78rpx;
		background: #EDC74B;
		border-radius: 15rpx;
	}

	.width-60 {
		width: 60rpx;
	}

	.mtb-36 {
		margin-top: 36rpx;
		margin-bottom: 36rpx;
	}

	.item {
		width: 24%;
	}

	.message-icon {
		position: absolute;
		top: -10rpx;
		right: 0rpx;
		border-radius: 50%;
		line-height: 30rpx;
		z-index: 20;
	}
</style>