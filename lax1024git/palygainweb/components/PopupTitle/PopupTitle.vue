<template>
	<view class="flex-center">
		<view class="title">
			{{title}}
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['title'])
</script>

<style lang="scss" scoped>
.title{
	position: relative;
	padding: 36rpx 0;
}
.title::before{
	content: '';
	position: absolute;
	width: 48rpx;
	height: 3rpx;
	background: #F7D94C;
	top: 50%;
	left: -60rpx;
}
.title::after{
	content: '';
	position: absolute;
	width: 48rpx;
	height: 3rpx;
	background: #F7D94C;
	top: 50%;
	right: -60rpx;
}
</style>