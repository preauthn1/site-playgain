<template>
	<view class="relative">
		<image src="../../static/image/home/message.png" class="message-img" mode="widthFix"></image>
		<view class="bg-F66A01 message-icon width-30 height-30 font-regular font-18 text-white text-center"
			v-if="unread !== 0">
			{{unread}}
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		unread_count
	} from '@/api/message';
	import {
		useUserStore
	} from '@/store';
	import {onShow} from '@dcloudio/uni-app'
	const store = useUserStore()
	const unread = ref(0)
	const getunreadmessage = () => {
		if (store.tokenInfo) {
			unread_count().then(res => {
				unread.value = res.count
			})
		}
	}
	onShow(()=>{
		getunreadmessage()
	})
</script>

<style lang="scss" scoped>
	.message-img {
		width: 42rpx;
	}

	.message-icon {
		position: absolute;
		top: -4px;
		right: -4px;
		border-radius: 50%;
		line-height: 30rpx;
	}
</style>