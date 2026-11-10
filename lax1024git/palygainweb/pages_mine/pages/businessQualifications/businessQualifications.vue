<template>
	<view class="plr-30"> 
		<view class="mt-40" v-for="(item,index) in 4">
			<view class="font-26 text-0B0B0B font-medium">营业执照</view>
			<view class="business-img">
				<image src="../../../static/image/vip/level-4.png" ></image>
			</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.business-img{
		padding: 16rpx 60rpx 0;
		image{
			width: 100%;
			height: 255rpx;
		}
	}
</style>