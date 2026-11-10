<template>
	<view>
		<up-popup :show="showTostore" @close="close" :round="15" bgColor='#F5FBFC' @open="open">
			<PopupTitle title='到店地址'></PopupTitle>
			<view class="p-24">
				<view class="text-0B0B0B font-26 font-medium">
					该商品需到店领取
				</view>
				<view class="pt-40">
					<view class="text-0B0B0B font-26 font-medium">
						到店地址
					</view>
					<view class="pt-12 text-0B0B0B font-26 font-medium">
						贵州省贵阳市南明区花果园国际商务中心1号楼
					</view>
				</view>
			</view>
			<view class="mt-50">
				<map style="width: 750rpx;height:370rpx;" :latitude="latitude" :longitude="longitude" :markers="covers" :scale='18' @markertap='markertap'>
				</map>
			</view>
			<u-button color="#F0F0F0" :custom-style="{color:'#000000',margin:'50rpx 0',height:'90rpx',width:'100%'}" @click="showTostore=false">取消</u-button>
		</up-popup>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const showTostore = ref(false)
	defineExpose({
		showTostore
	})
	const latitude = ref('26.6161')
	const longitude = ref('106.6505')
	let covers = ref([
		{
			id:0,
			latitude:'26.6161',
			longitude:'106.6505',
			iconPath:'/static/image/mine/location.png'
		}
	])
	
	const markertap = (e)=>{
		console.log(e)
		uni.openLocation({
			latitude:26.6161,
			longitude:106.6505,
			name:'俊发中心'
		})
	}
</script>

<style lang="scss" scoped>
	.page-section {
		width: 750rpx;
		height: 370rpx;
	}
</style>