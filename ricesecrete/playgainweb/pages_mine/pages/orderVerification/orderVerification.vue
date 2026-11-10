<template>
	<view class="plr-24 pb200">
		<u-navbar title="订单核验" autoBack placeholder @rightClick="scan">
			<template #right>
				<u-icon name="scan" size="30"></u-icon>
			</template>
		</u-navbar>
		<view class="flex justify-between items-center font-28 text-767676 font-medium ptb-30">
			<view v-for="(item,index) in tabList" :key="index" class="plr-12 relative" :class="chooseIndex==index?'tab_active':''" @click="chooseIndex=index">
				<view class="relative zIndex1">{{item.name}}</view>
			</view>
		</view>
		
		<view v-if="chooseIndex==0">
			<view v-for="(item,index) in 10" :key="index" class="collection-item ">
				<view class="flex p-14">
					<image src="../../../static/image/home/1.png" class="collection-item-img"></image>
					<view class="flex-1 pl-20 flex flex-col justify-between">
						<view class="font-26 text-2line">清凉贵州奇山秀水苗家风情6日行</view>
						<view class="flex">
							<view v-for="(item,index) in 2" :key="index" class="bg-3D91F5 text-white font-22 mr-14 ptb-10 plr-20 border-radius-10">
								少数民族
							</view>
						</view>
						<view class="font-24">
							出发日期：7月23日（周二）
						</view>
						<view class="text-right font-24 font-medium text-3D91F5">6天5晚 贵阳出发</view>
					</view>
				</view>
				<navigator url="./detail">
					<view class="bg-EDC74B font-30 font-medium text-white text-center ptb-24">
						核验订单
					</view>
				</navigator>
				
			</view>
		</view>
		<view v-else>
			<view v-for="(item,index) in 3" :key="index" class="collection-item p-20">
				<view class="font-24 font-medium text-0B0B0B">订单编号 20240718123123</view>
				<view class="flex mt-30">
					<image src="../../../static/image/home/1.png" class="collection-item-img"></image>
					<view class="flex-1 pl-20 flex justify-around flex-col">
						<view class="text-2line font-26 font-medium text-0B0B0B">男士女士帆布腰带自动扣皮带简约韩 版个性潮人青年学生加长…</view>
						<view class="font-24 text-767676">卡其色；120cm</view>
						<view class="font-24 text-767676">数量：1</view>
						<view class="text-right text-E6722D font-30 font-semi-bold">{{chooseIndex==1?'¥199.00':'100积分'}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive,ref } from 'vue';

	let tabList = reactive([
		{name:'旅游套餐',val:''},
		{name:'商品',val:''},
		{name:'积分商品',val:''},
	])
	let chooseIndex = ref(0)
	let showManage = ref(false);
	
	const scan = ()=>{
		uni.scanCode({
			success(e) {
				console.log(e)
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
	.collection-item{
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 11rpx 2rpx rgba(61,62,63,0.04);
		border-radius: 20rpx;
		margin-top: 24rpx;
		overflow: hidden;
		&-img{
			width: 235rpx;
			height: 223rpx;
			border-radius: 10rpx;
		}
	}
	.collection-del-btn{
		background: #D5D5D5;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		text-align: center;
		padding: 35rpx 0;
		font-weight: 500;
		font-size: 30rpx;
		color: #000000;

	}
</style>