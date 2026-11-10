<template>
	<view class="p-30">
		<up-parse :content="content"></up-parse>
	</view>
</template>
<script setup>
	import {onLoad} from '@dcloudio/uni-app'
import { reactive, ref } from 'vue';
	const content = ref()
	onLoad((query)=>{
		content.value = query.data
	})
</script>
<style lang="scss" scoped>
</style>