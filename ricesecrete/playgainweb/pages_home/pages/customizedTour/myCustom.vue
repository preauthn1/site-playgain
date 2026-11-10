<template>
	<view class="plr-24 pb-40">
		<view v-for="(item,index) in customList" :key="index" class="plr-20 ptb-22 custom-item" @click="goDetail(item)">
			<view class="font-24 text-right font-medium text-3D91F5">{{item.status == 1 ?'申请中':item.status == 2 ?'接待中' : 
			item.status == 3 ? '接待成功' : item.status == 4 ?'拒绝接待' : item.status == 0 ? '订单取消':''}}</view>
			<view class="text-0B0B0B font-26 mt-30">
				<view class="font-medium">{{item.name}} {{item.phone}}</view>
				<view class="mt-22">预计出游时间：{{item.start_day}}</view>
			</view>
			<view class="text-767676 text-right mt-28">
				<view class="flex font-24 justify-end">
					<text>查看详情</text>
					<u-icon name="arrow-right" color="#767676"></u-icon>
				</view>
				<view class="font-20 mt-20">{{item.create_time}}</view>
			</view>
			
			<view class="custom-item-title" :style="[item.type == 1 ? 'background: #A593F7;':'background: #81DDE0;']">
				{{item.type == 1 ? '企业定制' : '私人定制'}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import {custom_list} from '@/api/tourism.js'
	import {onShow} from '@dcloudio/uni-app'
	const customList = ref([])
	custom_list().then(res => {
		customList.value = res.dataList
	})
	onShow(()=>{
		uni.$on("IdBack", res => {
			customList.value = customList.value.filter(item => item.id != res.id)
		})
	})
	const goDetail = (item)=>{
		uni.navigateTo({
			url:'/pages_home/pages/customizedTour/orderDetail?id=' + item.id
		})
	}
</script>

<style>
page{
	background: #F8FDFE;
}
</style>
<style lang="scss" scoped>
	.custom-item{
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 11rpx 2rpx rgba(61,62,63,0.04);
		border-radius: 20rpx;
		margin-top: 24rpx;
		position: relative;
		overflow: hidden;
		&-title{
			width: 172rpx;
			height: 50rpx;
			
			border-radius: 0 0 20rpx 20rpx;
			text-align: center;
			line-height: 50rpx;
			position: absolute;
			top: 0rpx;
			left: calc(50% - 86rpx);
			font-weight: 500;
			font-size: 24rpx;
			color: #FFFFFF;
		}
	}
</style>
