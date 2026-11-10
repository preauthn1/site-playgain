<template>
	<view class="provider">
		<view class="bg-white mt-30 pb-40 box-shadow-1 plr-24">
			<view class="font-30 font-medium text-0B0B0B ptb-20 text-center">
				服务商信息
			</view>
			<view class="flex">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					服务商家
				</view>
				<view class="font-regular font-24 pl-30">
					XXX旅行服务有限公司 
				</view>
			</view>
			<view class="flex ptb-30">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					联系方式
				</view>
				<view class="font-regular font-24 pl-30">
					0851-123456789
				</view>
			</view>
			<view class="flex justify-between pb-40">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					退订政策
				</view>
				<view class="text-767676 font-24 font-regular flex items-center">
					查看详情
					<u-icon name="arrow-right" color="#767676"></u-icon>
				</view>
			</view>
			<view class="flex justify-center items-center">
				<image src="../../../../../static/image/mine/Customer.png" class="width-48" mode="widthFix"></image>
				<view class="text-0B0B0B font-medium font-26 pl-10">
					联系客服
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	.width-48{
		width: 48rpx;
	}
</style>