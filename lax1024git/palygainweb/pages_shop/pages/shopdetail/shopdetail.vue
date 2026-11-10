<template>
	<view>
		<ProductDetail :id="id"></ProductDetail>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import { ref } from 'vue';
	const id = ref()
	onLoad((query)=>{
		id.value = query.id
	})
</script>