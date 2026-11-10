<template>
	<view class="result">
		<up-navbar :title="data.title" titleStyle="{'font-size':'500';'font-size':'32rpx'}"  @rightClick="rightClick" :autoBack="true" placeholder>
		</up-navbar>
		<view class="flex flex-col justify-center items-center">
			<image src="../../static/img/marketplaceCredits/result.png" class="result-img" mode="widthFix"></image>
			<view class="pt-28 font-medium font-30">
				{{data.name}}
			</view>
			<view class="pt-24 pb-30 font-24 font-regular text-0B0B0B">
				您可前往我的页面查看订单详情
			</view>
			<view class="see-result mt-30 text-center" @click="jumporder">
				查看订单
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {ref} from 'vue'
	const data = ref()
	onLoad((query) => {
		data.value =  JSON.parse(decodeURIComponent(query.data))
		console.log(data.value)
		// title.value = query.title
		// result.value = query.name
		// url.value = query.url
	})
	const jumporder = () => {
		uni.navigateTo({
			url:data.value.url
		})
	}
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.result {
		margin-top: 165rpx;
		color: #51A838;
	}

	.result-img {
		width: 120rpx;
	}

	.see-result {
		width: 306rpx;
		height: 88rpx;
		border-radius: 15rpx;
		border: 2px solid #51A838;
		line-height: 88rpx;
	}
</style>