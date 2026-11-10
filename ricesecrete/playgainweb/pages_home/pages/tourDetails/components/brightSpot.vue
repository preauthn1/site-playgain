<template>
	<view>
		<template v-for="(item,index) in imgList" :key="index">
			<image :src="item" mode="widthFix"></image>
		</template>
	</view>
</template>

<script setup>
	const props = defineProps(['imgList'])
</script>

<style scoped>
	image{
		width: 100%;
		/* height: 100%; */
	}
</style>