<template>
	<view class="payfor p-24">
			<view class="flex justify-between items-center" @click="choosepay('weixin')">
				<view>
					<image src="../../../static/img/wx.png" class="width-80" mode="widthFix"></image>
				</view>
				<view class="flex pl-28 w100 justify-between relative payfor-line">
					<view class="font-regular font-24 text-black">
						微信支付
					</view>
					<image :src="paymethed == 'weixin' ? '/pages_mine/static/img/myorders/checked.png' : '/pages_mine/static/img/hobbies/unchecked.png'" class="width-30" mode="widthFix"></image>
				</view>

			</view>
			<view class="flex justify-between items-center pt-30" @click="choosepay('alipay')">
				<view>
					<image src="../../../static/img/zfb.png" class="width-80" mode="widthFix"></image>
				</view>
				<view class="flex pl-28 w100 justify-between relative">
					<view class="font-regular font-24 text-black">
						支付宝
					</view>
					<image :src="paymethed == 'alipay' ? '/pages_mine/static/img/myorders/checked.png' : '/pages_mine/static/img/hobbies/unchecked.png'" class="width-30" mode="widthFix"></image>
				</view>
			</view>
	</view>
</template>

<script setup>
	// 支付方式 
	// 默认微信
	import { ref,reactive } from 'vue';
	let paymethed = ref('weixin')
	const choosepay = (methed) => {
		paymethed.value = methed
		console.log('111111',paymethed.value)
	}
</script>

<style lang="scss" scoped>
	.payfor-line::after {
		content: "";
		width: 100%;
		height: 1rpx;
		background: #000000;
		opacity: 0.08;
		position: absolute;
		top: 66rpx;
		left: 0;
	}
</style>