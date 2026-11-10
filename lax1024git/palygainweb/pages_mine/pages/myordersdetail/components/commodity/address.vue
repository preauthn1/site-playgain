<template>
	<view class="address">
		<view class="mt-30 bg-white box-shadow-1 plr-24 pb-30">
			<view class="font-30 font-medium text-0B0B0B ptb-20 text-center">
				我的地址
			</view>
			<view class="flex pb-30 items-center">
				<view class="font-medium width-120 font-26 text-0B0B0B width-120">
					姓名
				</view>
				<view class="font-regular font-24 pl-30">
					{{address.name}}
				</view>
			</view>
			<view class="flex items-center">
				<view class="font-medium flex-shrink width-120 font-26 text-0B0B0B width-120">
					地址
				</view>
				<view class="font-regular font-24 pl-30">
					{{address.address}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['address'])
	const address = props.address
</script>

<style lang="scss" scoped>
	.width-120{
		width: 120rpx;
	}
</style>