<template>
	<view class="">
		<up-popup :show="showServer" @close="close" :round="15" bgColor='#F5FBFC' @open="open">
			<PopupTitle title="服务"></PopupTitle>
			<view class="p-24">
				<view class="font-medium font-26 text-0B0B0B ptb-30">
					七天无理由退货
					<view class="font-regular font-22">
						满足相应条件时，消费者可申请“七天无理由退货”
					</view>
				</view>
				<view class="font-medium font-26 text-0B0B0B ptb-30">
					假一赔四
					<view class="font-regular font-22">
						正品保障，假一赔四
					</view>
				</view>
				<view class="font-medium font-26 text-0B0B0B ptb-30">
					48小时内发货
					<view class="font-regular font-22">
						承诺拍下后48小时内发货，周末及节假日顺延
					</view>
				</view>
			</view>
			<u-button color="#F0F0F0" :custom-style="{color:'#000000',margin:'50rpx 0',height:'90rpx',width:'100%'}" @click="showServer=false">取消</u-button>
		</up-popup>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const showServer = ref(false)
	defineExpose({
		showServer
	})
</script>

<style lang="scss" scoped>
</style>