<template>
	<view class="">
		<up-popup :show="showServer" @close="showServer=false" :round="15" bgColor='#F5FBFC' @open="open">
			<PopupTitle title="服务"></PopupTitle>
			<view class="p-24">
				<view class="font-medium font-26 text-0B0B0B ptb-30">
					{{props.serve['2'].title}}
					<view class="font-regular font-22">
						<up-parse :content="props.serve['2'].content"></up-parse>
					</view>
				</view>
				<view class="font-medium font-26 text-0B0B0B ptb-30">
					{{props.serve['3'].title}}
					<view class="font-regular font-22">
						<up-parse :content="props.serve['3'].content"></up-parse>
					</view>
				</view>
				<view class="font-medium font-26 text-0B0B0B ptb-30">
					{{props.serve['4'].title}}
					<up-parse :content="props.serve['4'].content"></up-parse>
					
				</view>
			</view>
			<u-button color="#F0F0F0" :custom-style="{color:'#000000',margin:'50rpx 0',height:'90rpx',width:'100%'}" @click="showServer=false">取消</u-button>
		</up-popup>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const props = defineProps(["serve"])
	console.log()
	const showServer = ref(false)
	defineExpose({
		showServer
	})
</script>

<style lang="scss" scoped>
</style>