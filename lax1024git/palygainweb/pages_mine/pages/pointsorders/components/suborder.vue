<template>
	<view class="bottom-btn justify-end">
		<view class="bottom-btn-right text-white bg-EDC74B">
			提交订单
		</view>
		
	</view>

</template>

<script setup>

</script>

<style lang="scss" scoped>
	.bottom-btn {
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 9rpx 0rpx rgba(15, 9, 13, 0.09);
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		display: flex;
		padding: 24rpx;
		box-sizing: border-box;
		z-index: 9;
		align-items: center;
	
		&-right {
			// border: 1px solid #727374;
			border-radius: 15rpx;
			font-weight: 500;
			font-size: 30rpx;
			width: 294rpx;
			height: 93rpx;
			line-height: 93rpx;
			text-align: center;
			// background: blue;
		}
	}
</style>