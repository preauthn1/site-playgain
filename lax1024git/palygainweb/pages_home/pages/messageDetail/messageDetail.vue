<template>
	<view>
		<u-navbar :title="detail.title" bgColor="#ffffffFF" :titleStyle="titleStyle" leftIconColor="#000" autoBack placeholder></u-navbar>
		<view class="content">
			<view class="p-28">
				<image :src="detail.img" class="content-image" mode="widthFix" v-if="detail.img"></image>
				<u-parse :content="detail.content"></u-parse>
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
	import { msgdetail,notification_read } from '@/api/message';
	//标题
	const detail = ref({})
	onLoad((query) => {
		msgdetail({'id':query.id}).then(res=>{
			detail.value = res
		})
		if(query.read == 2){
			notification_read({'id':query.id}).then(res => {
				console.log(res)
			})
		}
		
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