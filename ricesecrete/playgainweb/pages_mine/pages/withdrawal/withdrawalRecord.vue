<template>
	<view>
		<u-navbar title="提现记录" placeholder @rightClick="showPopup=!showPopup" autoBack>
			<template #right>
				<image src="../../static/img/sx.png" style="width: 40rpx;" mode="widthFix"></image>
			</template>
		</u-navbar>
		<view class="plr-26" v-if="list.length">
			<view v-for="(item,index) in 10" :key="index" class="withdrawal-record-item flex items-center">
				<image src="../../static/img/wx.png" class="width-80" mode="widthFix"></image>
				<view class="flex-1 flex justify-between text-0B0B0B pl-18">
					<view>
						<view class="font-24 font-medium">微信-提现</view>
						<view class="font-22 mt-24">2024-07-18 17:20:30</view>
					</view>
					<view>
						<view class="font-26">¥2200.00</view>
						<view class="font-22 mt-24 text-right" :style="typeColor('待审核')">待审核</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadmoreStatus" />
		</view>
        <u-empty v-else marginTop="200px" text="暂无提现记录"></u-empty>
		<u-popup mode="top" :show="showPopup" z-index="10" safeAreaInsetTop round="15rpx">
			<view style="padding-top: 46px;" class="plr-20 pb-30">
				<view class="font-28  mb-20">提现方式：</view>
				<uni-data-select v-model="queryParams.channel_indent" :localdata="range" @change="change"></uni-data-select>
				<view class="font-28 mt-30">提现时间：</view>
				<view class="flex items-center mt-16">
					<uni-datetime-picker type="date" :clear-icon="true" v-model="queryParams.start_time" @maskClick="maskClick"
						placeholder="开始时间" />
					<view class="mlr-10"> ——— </view>
					<uni-datetime-picker type="date" :clear-icon="true" v-model="queryParams.end_time" @maskClick="maskClick"
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
		reactive,
		ref
	} from 'vue'
	import {onReachBottom,onLoad} from '@dcloudio/uni-app'
	import {getWithdrawalLog} from '@/api/money.js'
	let showPopup = ref(false);
	let loadmoreStatus = ref('loadmore')
	let range = ref([{
			value: 'weixin',
			text: "微信"
		},
		{value: 'alipay',text: "支付宝"},
		{value: 'bank',text: "银行卡"},
	])
	let queryParams = reactive({
		channel_indent:'',
		start_time:'',
		end_time:''
	})
	let pageInfo = reactive({
		limit:10,
		page:1
	})
	let list = ref([])
	const typeColor = (type)=>{
		switch (type){
			case '待审核':
				return {color:'#EDC74B'}
				break;
			default:
				break;
		}
	}
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
		getWithdrawalLog({...queryParams,...pageInfo}).then(res=>{
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
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.withdrawal-record-item{
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 11rpx 2rpx rgba(61,62,63,0.04);
		border-radius: 15rpx;
		margin-top: 24rpx;
		padding: 22rpx 12rpx 32rpx;
	}
</style>