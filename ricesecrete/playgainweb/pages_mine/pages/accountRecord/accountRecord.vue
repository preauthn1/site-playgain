<template>
	<view>
		<view class="plr-24 flex justify-between items-center font-28 font-medium text-767676 relative team-tab">
			<view v-for="(item,index) in tabList" :key="index" class="relative"
				:class="chooseTab==index?'tab_active':''" @click="chooseTab=index;search()">
				<view class="flex items-center plr-10 relative" style="z-index: 20;">
					<view class="mr-16">{{item.name}}</view>
					<u-icon :name="(showPopup&&chooseTab==index)?'arrow-up':'arrow-down'"
						:color="chooseTab==index?'text-0B0B0B':'text-767676'" size="28rpx"
						@click="showPopup=!showPopup"></u-icon>
				</view>
			</view>
			<view class="diy-popup">
				<u-transition :show="showPopup" mode="slide-down">
					<view class="plr-20 ptb-30 diy-popup-content">
						<template v-if="chooseTab==0">
							<view class="font-28 mb-20">来源：</view>
							<uni-data-select v-model="queryParams.from" :localdata="range"
								@change="change"></uni-data-select>
						</template>
						<template v-if="chooseTab==1">
							<view class="font-28">旅游订单编号：</view>
							<view class="mt-16">
								<u-input placeholder="请输入旅游编号" v-model="queryParams.order_no"></u-input>
							</view>
						</template>
						<view class="font-28 mt-30">到账时间：</view>
						<view class="flex items-center mt-16">
							<uni-datetime-picker type="date" :clear-icon="true" v-model="queryParams.start_time"
								@maskClick="maskClick" placeholder="开始时间" />
							<view class="mlr-10"> ——— </view>
							<uni-datetime-picker type="date" :clear-icon="true" v-model="queryParams.end_time"
								@maskClick="maskClick" placeholder="结束时间" />
							<!-- <uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" /> -->
						</view>
						<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB"
							:custom-style="{height:'100rpx',fontSize:'30rpx',marginTop:'80rpx'}"
							@click="search">搜索</u-button>
					</view>
				</u-transition>
			</view>
		</view>

		<view class="plr-24" v-if="list.length">
			<view v-for="(item,index) in list" :key="index"
				class="flex items-center justify-between team-item plr-14 ptb-24">
				<view class="font-24 text-0B0B0B">
					<view class="mb-20" v-if="chooseTab==1">旅游订单编号：{{item.order_no}}</view>
					<view>来源：{{getFrom(item.from)}}</view>
					<view class="mt-20">到账时间：{{item.create_time}}</view>
				</view>
				<view class="font-24 font-medium">
					<view class="flex justify-between">到账{{chooseTab==0?'金额':'积分'}}：+{{item.amount}}</view>
				</view>
			</view>
			<u-loadmore :status="loadmoreStatus" />
		</view>
		<u-empty text="暂无记录" margin-top="100px" v-else></u-empty>
		<u-overlay :show="showPopup" zIndex="9"></u-overlay>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		onLoad,
		onReachBottom
	} from '@dcloudio/uni-app'
	import {
		income_integral,
		income_commission
	} from '@/api/money.js'
	let tabList = ref([{
			name: '佣金到账记录'
		},
		{
			name: '积分到账记录'
		}
	])
	let list = ref([])
	let queryParams = reactive({
		start_time: '',
		end_time: '',
		from: '',
		order_no: ''
	})
	let pageInfo = reactive({
		page: 1,
		limit: 15
	})
	let chooseTab = ref(0);
	let showPopup = ref(false)
	let loadmoreStatus = ref('loadmore')
	let range = ref([{
			value: 1,
			text: "团队返佣"
		},
		{
			value: 6,
			text: "会员奖励"
		},
		{
			value: 7,
			text: "活动奖励"
		}
	])
	onLoad((query) => {
		console.log(query)
		getList()
	})
	const search = () => {
		pageInfo.page = 1;
		getList()
	}
	const getFrom = (val) => {
		switch (val) {
			case 1:
				return '团队返佣';
				break;
			case 6:
				return '会员奖励';
				break;
			case 7:
				return '活动奖励';
				break;
			case 2:
				return '旅游订单';
				break;
			default:
				break;
		}
	}

	const getList = async () => {
		loadmoreStatus.value = 'loading'
		let data = undefined;
		if (chooseTab.value == 0) {
			data = await income_commission({
				...queryParams,
				...pageInfo
			})
		} else {
			data = await income_integral({
				...queryParams,
				...pageInfo
			})
		}
		if (pageInfo.page == 1) {
			list.value = data.dataList
		} else {
			list.value.push(...data.dataList)
		}
		if (list.value.length == data.total) {
			loadmoreStatus.value = 'nomore';
		} else {
			loadmoreStatus.value = 'loadmore';
		}
	}
	onReachBottom(() => {
		if (loadmoreStatus.value == 'nomore') return;
		pageInfo.page++;
		getList()
	})
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>

<style lang="scss" scoped>
	.diy-popup {
		position: absolute;
		width: 100%;
		top: 120rpx;
		left: 0;
		border-radius: 0rpx 0rpx 15rpx 15rpx;
		z-index: 10;
		overflow: hidden;
	}

	.diy-popup-content {
		background-color: #fff;
		box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(15, 9, 13, 0.06);
	}

	.team-tab {
		height: 120rpx;
		background: var(--primary-bg);
		z-index: 10000;
	}

	.avatar {
		width: 84rpx;
		height: 84rpx;
		border-radius: 50%;
	}

	.team-item {
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 11rpx 2rpx rgba(61, 62, 63, 0.04);
		border-radius: 15rpx;
		margin-bottom: 24rpx;
	}

	.proxy-btn {
		background: #F74E27;
		border-radius: 10rpx;
		display: inline-block;
		font-weight: 500;
		font-size: 24rpx;
		color: #FFFFFF;
		padding: 16rpx 34rpx;
	}

	.col-F7AB27 {
		color: #F7AB27;
	}
</style>