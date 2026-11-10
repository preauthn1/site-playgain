<template>
	<view>
		<up-popup :show="showfreeshipping" @close="showfreeshipping = false" :round="15" bgColor='#F5FBFC' @open="open">
			<PopupTitle title='运费'></PopupTitle>
			<view class="font-medium font-26 text-0B0B0B p-24">
				<view class="" v-html="props.freeshipp[1].content"></view>
			</view>
			<u-button color="#F0F0F0" :custom-style="{color:'#000000',margin:'50rpx 0',height:'90rpx',width:'100%'}" @click="showfreeshipping=false">取消</u-button>
		</up-popup>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	const showfreeshipping = ref(false)
	const props = defineProps(["freeshipp"])
	defineExpose({
		showfreeshipping,
	})
</script>

<style lang="scss" scoped>

</style>
