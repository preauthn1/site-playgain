<template>
	<view class="plr-20 ptb-20">
		<u-navbar :title="title" placeholder auto-back v-if="showTitle"></u-navbar>
		<u-parse :content="text"></u-parse>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getAgreement
	} from '@/api/common.js'
	import {
		ref
	} from 'vue';
	let text = ref('')
	let title = ref('协议')
	let showTitle = ref(true)
	onLoad((e) => {
		if(e.hideTitle==1){  //webview调用此页面，传参隐藏title
			// uni.hideTitle()
			showTitle.value = false;
		}
		getAgreement({
			type: e.type
		}).then(res => {
			text.value = res[0].content
			title.value = res[0].title
		})
	})
</script>


<style>
	page {
		background: var(--primary-bg);
	}
</style>