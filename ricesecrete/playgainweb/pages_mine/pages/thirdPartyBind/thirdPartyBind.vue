<template>
	<view>
		<u-navbar :title="typeName+'绑定'" @leftClick="$router.go(-1)" placeholder @rightClick="showPopup=true">
			<template #right>
				<u-icon name="more-dot-fill" size="28" color="#000"></u-icon>
			</template>
		</u-navbar>
		<view class="text-center mt-40 text-0B0B0B">
			<image src="../../static/img/wx.png" class="third-logo"></image>
			<view class="font-26 font-medium  mt-10">{{typeName}}</view>
			<view class="font-24 mt-30"> 已成功绑定,您可通过{{typeName}}账号登录玩赚全球App</view>
		</view>
		<u-popup :show='showPopup' round="15">
			<view class="plr-24">
				<PopupTitle title='解除绑定'></PopupTitle>
				
				<view class="mtb-40">
					<u-row >
						<u-col :span='5'>
							<u-button @click="showPopup=false">取消</u-button>
						</u-col>
						<u-col :span='2'></u-col>
						<u-col :span='5'>
							<u-button color="#3D91F5">解除</u-button>
						</u-col>
					</u-row>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref
	} from 'vue';
	let typeName = ref('');
	let showPopup = ref(false)
	onLoad((e) => {
		typeName.value = e.typeName;
	})
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.third-logo{
		width: 120rpx;
		height: 120rpx;
		
	}
</style>