<template>
	<view class="">
		<view :class="[`bottom-btn`,true ? `justify-between` : `justify-end`]">
			<view :class="[`bottom-btn-right`,false ? `text-black`:`bg-blue text-white`]" style="border: 1px solid #727374;" @click="subOrder">
				{{false? '删除订单' : '确认收货'}}
			</view>
			<view :class="[`bottom-btn-right`,true ? `text-white`:`text-black`]" :style="[true ? `background: linear-gradient(180deg, #F3CD4D, #E54925);`:'']" v-if="true" @click="subOrder">
				立即支付
			</view>
		</view>
		
	</view>
</template>

<script setup>
	const props = defineProps(['status'])
	const subOrder = () => {
		console.log('hello')
	}
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