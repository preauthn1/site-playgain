<template>
	<view>
		<swiper class="swiper" :indicator-dots="swiperData.indicatorDots" :circular="false" @change="swiperChange">
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/image/guide/logo1.png" class="guide-logo1"></image>
					<view class="guide-text font-semi-bold">
						<view class="text-F4C020 font-32">多样有趣</view>
						<view class="text-949494 font-24 mt-18">好玩的主题旅游平台</view>
					</view>
					<image src="../../static/image/guide/bg1.png" class="guide-bg"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/image/guide/logo2.png" class="guide-logo2"></image>
					<view class="guide-text font-semi-bold">
						<view class="text-white font-32">旅游奖励</view>
						<view class="text-949494 font-24 mt-18">旅游不单只是旅游</view>
					</view>
					<image src="../../static/image/guide/bg2.png" class="guide-bg"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/image/guide/logo3.png" class="guide-logo3"></image>
					<view class="guide-text font-semi-bold">
						<view class="text-A26AFF font-32">旅游保障</view>
						<view class="text-949494 font-24 mt-18">安心出发诗与远方</view>
					</view>
					<image src="../../static/image/guide/bg3.png" class="guide-bg"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/image/guide/logo4.png" class="guide-logo4"></image>
					<view class="guide-text">
						<view class="text-white font-32 font-semi-bold">
							开启您的探索之旅
						</view>
						<view class="btn" @click="goHome">
							立即体验
						</view>
					</view>
					<image src="../../static/image/guide/bg4.png" class="guide-bg"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		reactive
	} from 'vue';
	let swiperData = reactive({
		indicatorDots: true,
		autoplay: false,
		interval: 2000,
		duration: 500
	})

	onShow(() => {
		uni.setStorageSync('launchFlag', true)
	})

	const goHome = () => {
		uni.switchTab({
			url: '/pages/home/home'
		})
	}
	const swiperChange = (e)=>{
		e.detail.current == 3?swiperData.indicatorDots=false:swiperData.indicatorDots=true
	}
</script>

<style scoped lang="scss">
	.swiper {
		height: 100vh;
	}

	.swiper-item {
		display: block;
		height: 100%;
		/* line-height: 1; */
		text-align: center;
		position: relative;
	}

	.guide-bg {
		width: 100%;
		height: 100%;
	}

	.guide-logo1 {
		width: 624rpx;
		height: 678rpx;
		position: absolute;
		top: 153rpx;
		left: 100rpx;
		z-index: 1;
	}

	.guide-logo2 {
		width: 717rpx;
		height: 619rpx;
		position: absolute;
		top: 199rpx;
		left: 23rpx;
		z-index: 1;
	}

	.guide-logo3 {
		width: 626rpx;
		height: 610rpx;
		position: absolute;
		top: 153rpx;
		left: 31rpx;
		z-index: 1;
	}

	.guide-logo4 {
		width: 635rpx;
		height: 588rpx;
		position: absolute;
		top: 319rpx;
		left: 71rpx;
		z-index: 1;
	}

	.guide-text {
		position: absolute;
		bottom: 240rpx;
		z-index: 1;
		width: 100%;
	}

	.btn {
		width: 400rpx;
		height: 93rpx;
		background: linear-gradient(0deg, #068EFD, #2EDEFF);
		border-radius: 20rpx;
		line-height: 93rpx;
		text-align: center;
		font-weight: 500;
		font-size: 30rpx;
		color: #FFFFFF;
		margin-top: 48rpx;
		margin-left: calc((100% - 400rpx) / 2);
	}
</style>