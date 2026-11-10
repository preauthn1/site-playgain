<template>
	<view>
		<u-back-top :scroll-top="scrollTop" :duration="300" mode="square" :customStyle="customStyle" :icon="'/static/image/home/top.png'" :iconStyle="iconStyle"></u-back-top>
	</view>
</template>

<script setup>
	import { ref,reactive } from 'vue';  
	import { onPageScroll } from '@dcloudio/uni-app';
	const scrollTop = ref(0);  
	const iconStyle = reactive({  
	  width: '87rpx',  
	  height: '87rpx'  
	});
	let customStyle = reactive({
		width: '87rpx',
		height: '87rpx'  
	})
	onPageScroll((e) => {
		scrollTop.value = e.scrollTop;
	});
</script>

<style lang="scss" scoped>

</style>