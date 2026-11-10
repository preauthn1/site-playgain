<template>
	<view class="">
		<view class="mt-30 bg-white box-shadow-1 plr-24 pb-30">
			<view class="font-30 font-medium text-0B0B0B ptb-20 text-center">
				发货信息
			</view>
			<view class="flex pb-30 items-center">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					物流公司
				</view>
				<view class="font-regular font-24 pl-30">
					中通快递
				</view>
			</view>
			<view class="flex items-center">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					订单编号
				</view>
				<view class="font-regular font-24 pl-30">
					20240718123123
				</view>
				<view class="pl-16">
					<up-copy content="20240718123123" notice="复制成功">
					    <image src="../../../../static/img/myorders/copy.png" class="width-24" mode="widthFix"></image>
					</up-copy>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	// 发货信息
</script>

<style lang="scss" scoped>
</style>