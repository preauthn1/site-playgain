<template>
	<view class="payfor">
		<view class="mt-30 bg-white box-shadow-1 plr-24 pb-30">
			<view v-if="props.type != 1">
				<view class="text-0B0B0B font-30 font-medium text-center pt-18 pb-40">
					支付方式
				</view>
				<view class="p-24">
					<view class="flex items-center relative">
						<image src="/pages_mine/static/img/marketplaceCredits/exchange.png" class="width-80" mode="widthFix" />
						<view class="pl-28 w100">
							<view class="flex justify-between items-center">
								<view class="font-regular font-24">
									积分抵扣
								</view>
								<image src="/pages_mine/static/img/marketplaceCredits/Selected.png" class="width-30"
									mode="widthFix" />
							</view>
						</view>
					</view>
					<view class="orders-line mt-20">
					</view>
					<view class="text-right font-regular font-24 pt-14">
						当前可用积分：199
					</view>
				</view>
			</view>
			<view v-else>
				<view class="font-30 font-medium text-0B0B0B ptb-20 text-center">
						支付方式
					</view>
					<view class="flex justify-between items-center" @click="choosepay('wxpay')">
						<view>
							<image src="../../../static/img/wx.png" class="width-80" mode="widthFix"></image>
						</view>
						<view class="flex pl-28 w100 justify-between relative payfor-line">
							<view class="font-regular font-24 text-black">
								微信支付
							</view>
							<image :src="paymethed == 'wxpay' ? '/pages_mine/static/img/myorders/checked.png' : '/pages_mine/static/img/myorders/unchecked.png'" class="width-30" mode="widthFix"></image>
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
							<image :src="paymethed == 'alipay' ?'/pages_mine/static/img/myorders/checked.png' : '/pages_mine/static/img/myorders/unchecked.png'" class="width-30" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			
	</view>
</template>

<script setup>
	// 默认微信
	import { ref,reactive } from 'vue';
	const props = defineProps(['type'])
	const paymethed = ref('wxpay')
	const choosepay = (methed) => {
		
		paymethed.value = methed
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