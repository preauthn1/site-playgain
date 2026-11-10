<template>
	<view class="pt-40 plr-28">
		<up-search placeholder="搜索商品名称" height="76rpx" v-model="keyword" :showAction="false" shape="square" @search="jumpsearchdetail"></up-search>
		<view class="flex justify-between pt-28">
			<view class="font-medium font-28 text-black">
				历史搜索
			</view>
			<image src="../../static/img/delete1.png" class="width-30" mode="widthFix" v-if="!is_detele" @click="handlehistory"></image>
			<view class="font-medium font-28 text-black" v-else @click="handlehistory">
				完成
			</view>
		</view>
		<view class="flex flex-wrap">
			<view class="historical-search  mt-30 mr-22 relative" v-for="item in historykeyword" :key="item"> 
				<view class="font-24 font-regular text-black" style="white-space: nowrap;overflow: hidden; text-overflow: ellipsis;" @click="jumpsearchdetail(item)">
					{{item}}
				</view>
				<image src="../../static/img/cancel.png" class="width-30 cancel-btn" mode="widthFix" v-if="is_detele" @click="deletekeywords(item)"></image>
			</view>
			
		</view>
		<view class="font-medium font-28 text-black pt-30">
			热门搜索
		</view>
		<view class="flex flex-wrap">
			<view class="historical-search mt-30 mr-22 font-24 font-regular text-black" v-for="item in hotkeyword" :key="item" @click="jumpsearchdetail(item)">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref , reactive } from 'vue';
	import { search_recommend } from '@/api/shop';
	import { deletekeyword } from '@/api/home';
	const is_detele = ref(false)
	const keyword = ref('')
	const handlehistory = () => {
		is_detele.value = !is_detele.value
	}
	const historykeyword = ref([])
	const hotkeyword = ref([])
	search_recommend().then(res => {
		historykeyword.value = res.keyword
		hotkeyword.value = res.keyword_sys
	})
	const deletekeywords = (value) => {
		deletekeyword({"keyword":value,'type':2}).then(res => {
			historykeyword.value = historykeyword.value.filter(item => item != value)
		})
	}
	const jumpsearchdetail = (value) => {
		if(value){
			keyword.value = value
		}
		uni.navigateTo({
			url:"/pages_shop/pages/searchdetail/searchdetail?keyword=" + keyword.value
		})
	}
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.historical-search{
		height: 63rpx;
		border-radius: 10rpx;
		background: #E6E6E6;
		line-height: 63rpx;
		max-width: 375rpx;
		padding: 0 50rpx;
	}
	.cancel-btn{
		position: absolute;
		top: -20rpx;
		right: -5rpx;
	}
</style>