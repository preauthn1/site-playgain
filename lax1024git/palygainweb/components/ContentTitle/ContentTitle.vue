<template>
	<view>
		<view class="flex justify-between items-center">
			<view class="flex">
				<view class="strip">
				</view>
				<view class="font-30 font-medium text-0B0B0B ml-10">
					{{props.title}}
				</view>
			</view>
			<navigator v-if="props.righttitle" :url="props.jumpurl">
				<view class="text-767676 font-24 font-regular flex items-center">
					{{props.righttitle}}
					<u-icon name="arrow-right" color="#767676"></u-icon>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const props = defineProps(['title','righttitle','jumpurl'])
</script>

<style lang="scss" scoped>
	.strip {
		width: 8rpx;
		height: 38rpx;
		background: linear-gradient(0deg, #068EFD, #2EDEFF);
		border-radius: 4rpx;
	}
</style>