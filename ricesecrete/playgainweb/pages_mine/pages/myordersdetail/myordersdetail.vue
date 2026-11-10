<template>
	<view class="myordersdetail pt-40">
		<TobeverifiedVue v-if="paramsInfo.type != 1" :params="paramsInfo"></TobeverifiedVue>
		<tourismVue v-else :params="paramsInfo"></tourismVue>
	</view>
</template>

<script setup>
	import { reactive } from 'vue';
import TobeverifiedVue from './components/Tobeverified.vue';
	import tourismVue from './components/tourism.vue';
	import {onLoad} from '@dcloudio/uni-app'
	const paramsInfo = reactive({
		id:'',
		type:'',
		isShowPop:''
	}) 
	onLoad((query)=>{
		paramsInfo.id = query.id;
		paramsInfo.type = query.type;
		console.log(query,'12311313')
		paramsInfo.isShowPop = query.pop
	})
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	
</style>
