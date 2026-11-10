<template>
	<view class="mid-tabbar">
		<view v-for="(item,index) in tabbarList" :key="index" class="mid-tabbar-item"
			:class="item.midButton?'mid-button-item':''" @click="toPage(item)">
			<image :src="pageUrl==item.pagePath ? item.selectedIconPath:item.iconPath" class="mid-tabbar-item-icon">
			</image>
			<view class="mid-tabbar-item-icon" v-if="item.midButton"></view>
			<view class="mid-tabbar-item-text" :class="pageUrl==item.pagePath?'tabbar-active':''">{{item.text}}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	uni.hideTabBar();
	import {
		reactive
	} from 'vue';
	import { useUserStore } from '@/store';
	import {login} from '@/utils/login.js'
	const store = useUserStore();
	let pageUrl = ref('')
	let tabbarList = reactive([{
			"text": "首页",
			"pagePath": "pages/home/home",
			"iconPath": "/static/image/tabbar/home-off.png",
			"selectedIconPath": "/static/image/tabbar/home-on.png"
		},
		{
			"text": "商城",
			"pagePath": "pages/shop/shop",
			"iconPath": "/static/image/tabbar/shop-off.png",
			"selectedIconPath": "/static/image/tabbar/shop-on.png"
		},
		{
			"text": "会员",
			"pagePath": "pages/vip/vip",
			"iconPath": "/static/image/tabbar/vip.png",
			"selectedIconPath": "/static/image/tabbar/vip.png",
			"midButton": true,
			isLogin: true
		},
		{
			"text": "团队",
			"pagePath": "pages/team/team",
			"iconPath": "/static/image/tabbar/team-off.png",
			"selectedIconPath": "/static/image/tabbar/team-on.png",
			isLogin: true
		},
		{
			"text": "我的",
			"pagePath": "pages/mine/mine",
			"iconPath": "/static/image/tabbar/mine-off.png",
			"selectedIconPath": "/static/image/tabbar/mine-on.png",
			isLogin: true
		}
	])
	let pages = getCurrentPages();
	pageUrl.value = pages[pages.length - 1].route;

	console.log(store)
	const toPage = (item) => {
		if (item.isLogin) {
			if(!store.tokenInfo?.token){
				uni.setStorageSync('redirectUrl',{page:'/'+item.pagePath,type:'tabbar'})
				// #ifdef APP
				login()
				// #endif
				// #ifndef APP
				uni.navigateTo({
					url:`/pages_others/pages/login/login`
				})
				// #endif
			}else{
				uni.switchTab({
					url: '/' + item.pagePath
				})
			}
		}else{
			uni.switchTab({
				url: '/' + item.pagePath
			})
		}
		
	}
</script>

<style lang="scss" scoped>
	.mid-tabbar {
		height: 60px;
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: space-around;
		box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(15, 9, 13, 0.06);

		&-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			color: #767676;

			&-icon {
				width: 24px;
				height: 24px;
			}

			&-text {
				font-size: 13px;
			}

			.tabbar-active {
				color: #3D91F5;
			}
		}

		.mid-button-item {
			position: relative;

			image {
				width: 47px;
				height: 47px;
				position: absolute;
				top: -30px;
			}
		}
	}
</style>