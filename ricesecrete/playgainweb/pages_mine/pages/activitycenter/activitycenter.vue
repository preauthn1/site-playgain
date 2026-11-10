<template>
	<view>
		<view class="announcement bg-white box-shadow-1" v-for="item in activityData" @click="jumpdetail(item.id)" :key="item.id">
			<view class="p-24">
				<view class="text-black font-28 font-medium">
					{{item.title}}
				</view>
				<view class="mtb-22">
					<image :src="item.head_img" class="announcement-img" mode="widthFix"></image>
				</view>
				<view class="text-AEAEAE font-26 font-regular text-2line">
					{{item.summary}}
				</view>
			</view>
		</view>
		<backTop></backTop>
	</view>
</template>

<script setup>
	import { activity_page } from '@/api/mine';
	import {ref} from 'vue'
	const activityData = ref([])
	activity_page({'type':1}).then(res=>{
		activityData.value = res.dataList
	})
	const jumpdetail = (id) => {
		uni.navigateTo({
			url:"/pages_mine/pages/eventdetails/eventdetails?id="+id
		})
	}
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.announcement{
		width: 696rpx;
		border-radius: 15rpx;
		margin: 26rpx auto;
	}
	.announcement-img{
		width: 650rpx;
		
	}
</style>
