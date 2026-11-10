<template>
	<view class="bg-white box-shadow-1 mtb-20 pb-20">
		<view class="text-0B0B0B font-30 font-medium text-center pt-18 pb-40">
			到店领取
		</view>
		<view class="text-0B0B0B font-30 font-medium plr-24 flex items-center pb-24">
			<view class="width-120 flex-shrink">
				地址
			</view>
			<view class="pl-20">
				{{addressDetail.province}}{{addressDetail.city}}{{addressDetail.county}}{{addressDetail.address}}
			</view>
		</view>
		<view class="mt-50">
			<map style="width: 750rpx;height:370rpx;" :latitude="latitude" :longitude="longitude" :markers="covers" :scale='18' @markertap='markertap'>
			</map>
		</view>
		<view class="pt-40 pb-20 plr-24 flex items-center">
			<view class="text-0B0B0B font-26 font-medium width-120 pr-20" style="white-space: nowrap;">
				领取日期
			</view>
			<view class="text-0B0B0B font-26 font-medium">
				{{take_time}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const props = defineProps(['addressinfo','time'])
	console.log(props.addressinfo,props.time,'这是到店的地址！！！！')
	const take_time = props.time
	const addressDetail = props.addressinfo
	const timevalue = ref()
	const latitude = addressDetail.lat
	const longitude = addressDetail.lng
	const address_name = addressDetail.address
	let covers = ref([
		{
			id:0,
			latitude:latitude,
			longitude:longitude,
			iconPath:'/static/image/mine/location.png'
		}
	])
	const markertap = (e) =>{
		uni.openLocation({
			latitude:latitude,
			longitude:longitude,
			name:address_name,
		})
	}
</script>

<style lang="scss" scoped>
</style>