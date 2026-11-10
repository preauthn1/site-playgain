<template>
	<view class="">
		<view class="pt-28 plr-22">
			<view class="font-28 pb-20 font-medium text-0B0B0B">
				订单流程
			</view>
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" :scroll-into-view="lastElementId">
				<view :id="[`item${index}`]" class="item" v-for="(item,index) in process">
					<view class="flex items-center">
						<view :class="[`order-process1 flex flex-col justify-center`,index+1 === process.length ? `bg-EDC74B` : `bg-F0F0F0FF`]">
							<view class="font-medium font-24 text-0B0B0B pl-22 pr-12">
								{{item.label}}
							</view>
							<view class="font-regular font-22 pl-22 pr-12 text-767676">
								{{item.time}}
							</view>
						</view>
						<view class="plr-16 " v-if="index +1 < process.length">
							<image src="../../../static/img/myorders/ordersarrow.png" class="width-41" mode="widthFix">
							</image>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,onMounted,reactive
	} from 'vue';
	const props = defineProps(['process'])
	const process = props.process
	let lastElementId = ref('')
	onMounted(()=>{
		lastElementId.value = `item${process.length-1}`
	})
	
</script>

<style lang="scss" scoped>
	// background: #F0F0F0FF;
	.item{
		display: inline-block;
	}
	.order-process1 {
		height: 86rpx;
		border-radius: 10rpx;
	}

	.width-41 {
		width: 41rpx
	}
	.scroll-view_H {
		white-space: nowrap;
		// width: 75%;
	}
</style>