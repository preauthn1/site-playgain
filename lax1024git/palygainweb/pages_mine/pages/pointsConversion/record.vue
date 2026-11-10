<template>
	<view>
		<u-navbar title="积分转换记录" placeholder @rightClick="showPopup=!showPopup" autoBack>
			<template #right>
				<image src="../../static/img/sx.png" style="width: 40rpx;" mode="widthFix"></image>
			</template>
		</u-navbar>
		<view class="plr-26" v-if="list.length">
			<view v-for="(item,index) in list" :key="index"
				class="withdrawal-record-item flex items-center justify-between">
				<view>
					<view class="font-24 font-medium">转换积分：{{item.amount}}</view>
					<view class="font-22 mt-24">{{item.create_time}}</view>
				</view>
				<view class="font-22 mt-24 text-right" :style="typeColor('成功')">成功</view>
			</view>
			<u-loadmore :status="loadmoreStatus" />
		</view>
		<u-empty v-else marginTop="200px" text="暂无转换记录"></u-empty>
		<u-popup mode="top" :show="showPopup" z-index="10" safeAreaInsetTop round="15rpx">
			<view style="padding-top: 46px;" class="plr-20 pb-30">
				<!-- <view class="font-28  mb-20">提现结果：</view>
				<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select> -->
				<view class="font-28 mt-30">兑换时间：</view>
				<view class="flex items-center mt-16">
					<uni-datetime-picker type="date" :clear-icon="false" v-model="queryParams.start_time" @maskClick="maskClick"
						placeholder="开始时间" />
					<view class="mlr-10"> ——— </view>
					<uni-datetime-picker type="date" :clear-icon="false" v-model="queryParams.end_time" @maskClick="maskClick"
						placeholder="结束时间" />
					<!-- <uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" /> -->
				</view>

				<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB"
					:custom-style="{height:'100rpx',fontSize:'30rpx',marginTop:'80rpx'}" @click="search">搜索</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script setup>
	import {
		ref,reactive
	} from 'vue'
	import {onReachBottom,onLoad} from '@dcloudio/uni-app'
	import {getIntegralExchangeLog} from '@/api/money.js'
	let showPopup = ref(false);
	let loadmoreStatus = ref('loadmore');
	let range = ref([{
			value: 0,
			text: "成功"
		},
		{
			value: 1,
			text: "失败"
		}
	])
	let queryParams = reactive({
		start_time:'',
		end_time:''
	})
	let pageInfo = reactive({
		limit:10,
		page:1
	})
	let list = ref([])
	onLoad(()=>{
		getList();
	})
	onReachBottom(()=>{
		if(loadmoreStatus.value == 'nomore') return;
		pageInfo.page++;
		getList()
	})
	const search = ()=>{
		pageInfo.page = 1;
		getList()
	}
	const getList = ()=>{
		getIntegralExchangeLog({...pageInfo,...queryParams}).then(res=>{
			if(pageInfo.page==1){
				list.value = res.dataList
			}else{
				list.value.push(...res.dataList)
			}
			if(list.value.length == res.total){
				loadmoreStatus.value = 'nomore';
			}
		})
	}
	const typeColor = (type) => {
		switch (type) {
			case '待审核':
				return {
					color: '#EDC74B'
				}
				break;
			case '成功':
				return {
					color: '#51A838'
				}
				break;
			default:
				break;
		}
	}
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.withdrawal-record-item {
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 11rpx 2rpx rgba(61, 62, 63, 0.04);
		border-radius: 15rpx;
		margin-top: 24rpx;
		padding: 22rpx 12rpx 32rpx;
	}
</style>