<template>
	<view class="plr-24 pb200">
		<view class="flex justify-between items-center font-28 text-767676 font-medium ptb-30">
			<view v-for="(item,index) in tabList" :key="index" class="plr-12 relative"
				:class="index +1 == collecttypenum?'tab_active':''" @click="collecttype(index+1)">
				<view class="relative zIndex1">{{item.name}}</view>
			</view>
		</view>
		<view class="flex justify-between items-center text-0B0B0B">
			<text class="font-24">共{{collectdata.length}}件收藏</text>
			<view class="font-26 font-medium" @click="showManage=!showManage">{{showManage?'完成':'管理'}}</view>
		</view>

		<view v-if="collecttypenum == 1">
			<view v-for="(item,index) in collectdata" :key="index" class="collection-item flex">
				<view class="flex items-center mr-10" v-if='showManage'>
					<image :src="cancelCollect.includes(item.id)?'/pages_mine/static/img/address/active.png':'/pages_mine/static/img/select-off-2.png'" class="width-30" mode="widthFix" @click="cancel(item.id)"></image>
				</view>
				<image :src="item.img" class="collection-item-img"></image>
				<view class="flex-1 pl-20 flex flex-col justify-between">
					<view class="font-26 text-2line" @click="jumpproductdetail(item)">{{item.title}}</view>
					<view class="flex">
						<view v-for="(item,index) in item.tag_arr.slice(0,2)" :key="index"
							class="bg-3D91F5 text-white font-20 mr-14 ptb-10 plr-10 border-radius-10">
							{{item}}
						</view>
					</view>
					<view class="flex font-20 items-end text-767676">
						<view class=""><text class="font-30 text-E6722D font-semi-bold">¥{{item.min_price}}</text>起
						</view>
						<view class="ml-14">{{item.buy}}人已报名</view>
					</view>
					<view class="text-right font-24 font-medium text-3D91F5">{{item.spec_name}} {{item.city}}</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view v-for="(item,index) in collectdata" :key="index" class="collection-item flex" @click="shopjumpprodctdetail(item.id)">
				<view class="flex items-center mr-10" v-if='showManage'>
					<image :src="cancelCollect.includes(item.id)?'/pages_mine/static/img/address/active.png':'/pages_mine/static/img/select-off-2.png'" class="width-30" mode="widthFix" @click="cancel(item.id)"></image>
				</view>
				<image :src="item.img" class="collection-item-img"></image>
				<view class="flex-1 pl-20 flex justify-around flex-col">
					<view class="text-2line font-26 font-medium text-0B0B0B">{{item.title}}</view>
					<view class="font-20 text-767676 text-right" v-if="collecttypenum == 2"><text
							class="text-E6722D font-30 font-semi-bold">¥{{item.min_price}}</text>起</view>
					<view class="font-20 text-767676 text-right" v-else><text
							class="text-E6722D font-30 font-semi-bold">{{item.min_price}}积分</text></view>
				</view>
			</view>
		</view>
		<view class="collection-del-btn" v-if="showManage" @click="deleteCollect">删除</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		collectlist,collectproduct
	} from '@/api/mine';
	import {onReachBottom} from '@dcloudio/uni-app'
	let tabList = reactive([{
			name: '旅游套餐',
			val: ''
		},
		{
			name: '商品',
			val: ''
		},
		{
			name: '积分商品',
			val: ''
		},
	])
	let pageInfo = reactive({
		page: 1,
		limit: 10
	})
	let noMoreData = ref(false)
	let showManage = ref(false);
	let collecttypenum = ref(1)
	let collectdata = ref([])
	let cancelCollect = ref([])
	let collectType = ref([])
	const getCollectlist = () => {
		collectlist({
			'type': collecttypenum.value,
			...pageInfo
		}).then(res => {
			if (pageInfo.page > 1) {
				collectdata.value.push(...res.items);
			} else {
				collectdata.value = res.items;
			}
			if (collectdata.value.length >= res.total) {
				noMoreData.value = true
			} else {
				noMoreData.value = false;
			}
		})
	}
	getCollectlist()
	const collecttype = (num) => {
		cancelCollect.value = []
		collecttypenum.value = num
		pageInfo.page = 1
		getCollectlist()
	}
	
	const jumpproductdetail = (item) => {
		uni.navigateTo({
			url: "/pages_home/pages/tourDetails/tourDetails?id=" + item.id
		})
	}
	//跳转商品详情页
	const shopjumpprodctdetail = (id) => {
		uni.navigateTo({
			url:`/pages_shop/pages/shopdetail/shopdetail?id=${id}`
		})
	}
	const cancel = (id) => {
		if(cancelCollect.value.includes(id)){
			cancelCollect.value = cancelCollect.value.filter(item => item != id)
		}else{
			collectType.value.push(collecttypenum.value)
			cancelCollect.value.push(id)
		}
		
	}
	const deleteCollect = () =>{
		collectproduct({'type':collectType.value.join(','),'id':cancelCollect.value.join(',')}).then(res => {
			cancelCollect.value = []
			collectType.value = []
			getCollectlist()
		})
	}
	onReachBottom(() => {
		console.log('触底后去新数据')
		if (noMoreData.value) return;
		pageInfo.page++;
		getCollectlist()
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

	.collection-del-btn {
		background: #D5D5D5;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		text-align: center;
		padding: 35rpx 0;
		font-weight: 500;
		font-size: 30rpx;
		color: #000000;

	}
</style>