<template>
	<view>
		<web-view :src="url" :webview-styles="webviewStyles" :update-title='false'></web-view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		reactive,
		ref
	} from 'vue';
	let url = ref('');
	let webviewStyles = reactive({
		progress: {
			color: '#3D91F5'
		}
	})
	onLoad((e) => {
		uni.setNavigationBarTitle({
			title: e.title
		})
		url.value = decodeURIComponent(e.url);
	})
</script>

<style>

</style>