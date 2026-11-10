<template>
	<view>
		<view v-for="(item,index) in preList" :key="index"
			class="per-item flex justify-between items-center ptb-26 plr-24 mt-40" @click="perClick(item)">
			<view>
				<view class="font-26 text-0B0B0B">{{item.name}}</view>
				<view class="font-24 text-B4">{{item.tip}}</view>
			</view>
			<view class="flex items-center">
				<text class="text-3D91F5 font-26 font-medium">去设置</text>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import permision from "@/utils/permission.js"
	import {
		onLoad
	} from '@dcloudio/uni-app'
	let isIos = ref(true)
	const preList = reactive([{
			name: '位置信息权限',
			tip: '推荐附近优质的旅游套餐',
			ios: 'location',
			android: 'android.permission.ACCESS_FINE_LOCATION'
		},
		{
			name: '拍照或录制视频权限',
			tip: '拍摄头像或在线咨询拍摄视频等',
			ios: 'camera',
			android: 'android.permission.CAMERA'
		},
		{
			name: '外部存储(含相册)读取权限',
			tip: '用于上传图片等信息',
			ios: 'photoLibrary',
			android: 'android.permission.READ_EXTERNAL_STORAGE'
		},
	])
	onLoad(() => {
		// #ifdef APP-PLUS
		isIos.value = (plus.os.name == "iOS")
		if(isIos.value){
			preList.push({name: '推送权限',tip: '用于推送订单和商品活动',ios: 'push'})
		}else{
			preList.push(...[
				{name: '外部存储(含相册)写入权限',tip: '用于保存图片和海报',android: 'android.permission.WRITE_EXTERNAL_STORAGE'},
				{name: '拨打电话权限',tip: '用于联系商家和客服',android: 'android.permission.CALL_PHONE'},
			])
		}
		// #endif
	})
	const perClick = (item) => {
		if(isIos.value){
			judgeIosPermission(item.ios)
		}else{
			requestAndroidPermission(item.android)
		}
	}

	const judgeIosPermission = (permisionID) => {
		let result = permision.judgeIosPermission(permisionID)
		console.log(result);
		let strStatus = (result) ? "已" : "未"
		uni.showModal({
			content: permisionID + '权限' + strStatus + "获得授权",
			showCancel: false
		});
	}

	const requestAndroidPermission = async (permisionID) => {
		let result = await permision.requestAndroidPermission(permisionID)
		let strStatus
		if (result == 1) {
			strStatus = "已获得授权"
		} else if (result == 0) {
			strStatus = "未获得授权"
		} else {
			strStatus = "被永久拒绝权限"
		}
		uni.showModal({
			content: permisionID + strStatus,
			showCancel: false
		});
	}
</script>

<style>
	page {
		background: let(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.per-item {
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(15, 9, 13, 0.06);
	}

	.text-B4 {
		color: #b4b4b4;
	}
</style>