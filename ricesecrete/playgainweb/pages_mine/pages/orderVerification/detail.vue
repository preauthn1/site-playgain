<template>
	<view>
		<u-navbar title="订单核验" autoBack placeholder @rightClick="scan">
			<template #right>
				<u-icon name="scan" size="30"></u-icon>
			</template>
		</u-navbar>
		<view class="plr-24">
			<view class="collection-item ">
				<view class="flex p-20">
					<image src="../../../static/image/home/1.png" class="collection-item-img"></image>
					<view class="flex-1 pl-20 flex flex-col justify-between">
						<view class="font-26 text-2line">清凉贵州奇山秀水苗家风情6日行</view>
						<view class="flex">
							<view v-for="(item,index) in 2" :key="index"
								class="bg-3D91F5 text-white font-20 mr-14 ptb-10 plr-10 border-radius-10">
								少数民族
							</view>
						</view>
						<view class="flex font-24 items-end">
							<view class="">出发日期：7月23日（周二）</view>
						</view>
						<view class="text-right font-24 font-medium text-3D91F5">6天5晚 贵阳出发</view>
					</view>
				</view>
			</view>
			<view class="font-28 font-medium mtb-28">订单列表</view>
			<view class="flex justify-between plr-20">
				<view v-for="(item,index) in tabList" :key="index" class="relative plr-10"
					:class="chooseIndex==index?'tab_active':''" @click="chooseIndex=index">
					<view class="relative zIndex1">{{item.name}}</view>
				</view>
			</view>
			<view v-for="(item,index) in 2" :key="index" class="collection-item p-20">
				<view class="flex ">
					<image src="../../../static/image/home/1.png" class="collection-item-img"></image>
					<view class="flex-1 pl-20 flex flex-col justify-between">
						<view class="font-26 text-2line">清凉贵州奇山秀水苗家风情6日行</view>
						<view class="flex">
							<view v-for="(item,index) in 2" :key="index"
								class="bg-3D91F5 text-white font-20 mr-14 ptb-10 plr-10 border-radius-10">
								少数民族
							</view>
						</view>
						<view class="flex font-20 items-end text-767676">
							人员：1成人 1儿童
						</view>
						<view class="font-24 font-medium text-3D91F5">6天5晚 贵阳出发</view>
						<view class="text-right text-E6722D font-30 font-semi-bold">¥199.00</view>
					</view>
				</view>
				<u-line margin="20rpx 0"></u-line>
				<view class="flex justify-between items-center">
					<view class="font-24">
						<view>联系人：小猫</view>
						<view class="mt-20">电话： 12345678901</view>
					</view>
					<view class=" text-white ptb-18 plr-40 border-radius-14 "
						:class="chooseIndex==0?'bg-EDC74B':'bg-898989'">
						{{chooseIndex==0?'待核验':'已核验'}}
					</view>
				</view>


			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	let tabList = ref([{
			name: '待核验(1)'
		},
		{
			name: '已核验(1)'
		}
	])
	let chooseIndex = ref(0)
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.collection-item {
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 11rpx 2rpx rgba(61, 62, 63, 0.04);
		border-radius: 20rpx;
		margin-top: 24rpx;
		overflow: hidden;

		&-img {
			width: 235rpx;
			height: 223rpx;
			border-radius: 10rpx;
		}
	}
</style>