<template>
	<view class="pb200">
		<u-navbar title="我的浏览记录" auto-back @rightClick="del" placeholder>
			<template #right>
				<u-icon name='trash' size="30"></u-icon>
			</template>
		</u-navbar>
		<view v-for="(item,index) in browsinghistorydata" :key="index" class="collection-item flex" v-if="browsinghistorydata.length">
			<view class="flex items-center mr-10" v-if='showManage'>
				<image src="../../static/img/select-off-2.png" class="width-30" mode="widthFix"></image>
			</view>
			<image :src="item.img" class="collection-item-img"></image>
			<view class="flex-1 pl-20 flex flex-col justify-between">
				<view class="font-26 text-2line">{{item.title}}</view>
				<view class="flex">
					<view v-for="(item,index) in item.tag_arr.slice(0,2)" :key="index"
						class="bg-3D91F5 text-white font-20 mr-14 ptb-10 plr-10 border-radius-10">
						{{item}}
					</view>
				</view>
				<view class="flex font-20 items-end text-767676">
					<view class=""><text class="font-30 text-E6722D font-semi-bold">¥{{item.min_price}}</text>起</view>
					<view class="ml-14">100人已报名</view>
				</view>
				<view class="text-right font-24 font-medium text-3D91F5">{{item.spec_name}} {{item.city}}</view>
			</view>
		</view>
		<view v-else>
			<up-empty
			        text="暂无浏览记录"
			        textSize="30rpx"
			>
			</up-empty>
		</view>
	</view>
</template>

<script setup>
	import { reactive, ref } from 'vue';
	import {onLoad,onReachBottom} from '@dcloudio/uni-app'
	import { viewlist,del_view } from '@/api/mine';
	const del = () => {
		if(browsinghistorydata.value.length <= 0)return;
		uni.showModal({
			content: '确认清空所有浏览记录？',
			confirmText: '确认',
			success() {
				let ids = [] 
				console.log('11111111111111111')
				browsinghistorydata.value.map(item =>{
					ids.push(item.id)
				})
				del_view({'id':ids.join(',')}).then(res => {
					console.log(res)
					getData()
				})
			}
		})
	}
	const pageInfo = reactive({
		page:1,
		limit:10,
		type:1
	})
	let noMoreData = ref(false);
	const browsinghistorydata = ref([])
	const getData = () => {
		viewlist({...pageInfo}).then(res => {
			if (pageInfo.page > 1) {
				browsinghistorydata.value.push(...res.items);
			} else {
				browsinghistorydata.value = res.items;
			}
			if (browsinghistorydata.value.length >= res.total) {
				noMoreData.value = true
			} else {
				noMoreData.value = false;
			}
		})
	}
	getData()
	onReachBottom(() => {
		console.log('触底后去新数据')
		if (noMoreData.value) return;
		pageInfo.page++;
		getData()
	})
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>

<style lang="scss" scoped>
	.collection-item {
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 11rpx 2rpx rgba(61, 62, 63, 0.04);
		border-radius: 20rpx;
		padding: 14rpx;
		margin-top: 24rpx;

		&-img {
			width: 235rpx;
			height: 223rpx;
			border-radius: 10rpx;
		}
	}
</style>