<template>
	<view>
		<u-navbar :title="activityDetail.title" bgColor="#ffffffFF" :titleStyle="titleStyle" leftIconColor="#000" autoBack placeholder></u-navbar>
		<view class="content">
			<view class="p-28">
				<image :src="activityDetail.head_img" class="content-image" mode="widthFix"></image>
				<u-parse :content="activityDetail.summary"></u-parse>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		reactive
	} from 'vue';
	import { activity_detail } from '@/api/mine';
	const activityDetail = ref()
	onLoad((query) => {
		console.log(query.id, '数据')
		activity_detail({'id':query.id}).then(res => {
			activityDetail.value = res
		})
		title.value = query.data
	})
	let titleStyle = reactive({
		'font-weight': '500',
		'font-size': '32rpx',
		'color': '#000000',
	})
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.content-image{
		width: 689rpx;
	}
</style>