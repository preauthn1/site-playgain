<template>
	<view>
		<up-popup :show="showTostore" @close="showTostore=false" :round="15" bgColor='#F5FBFC' @open="open">
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
						{{props.address.province + props.address.city + props.address.county + props.address.address}}
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
	import { computed, ref, watch } from 'vue';
	const showTostore = ref(false)
	const props = defineProps(["address"])
	defineExpose({
		showTostore
	})
	const latitude = ref('26.616196')
	const longitude = ref('106.65054')
	let covers = ref([
		{
			id:0,
			latitude:latitude.value,
			longitude:longitude.value,
			iconPath:'/static/image/mine/location.png'
		}
	])
	
	const markertap = (e)=>{
		uni.openLocation({
			latitude:latitude.value,
			longitude:longitude.value,
			name:props.address.address
		})
	}
</script>

<style lang="scss" scoped>
	.page-section {
		width: 750rpx;
		height: 370rpx;
	}
</style>