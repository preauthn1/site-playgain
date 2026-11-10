<template>
	<view>
		<view class="bg-white box-shadow-1 mb-20 pb-20" v-for="item in specdata" :key="item.id">
			<view class="text-0B0B0B font-30 font-medium text-center pt-18 pb-40">
				到店领取
			</view>
			<view class="text-0B0B0B font-30 font-medium plr-24 flex items-center pb-24">
				<view class="width-80 flex-shrink">
					地址
				</view>
				<view class="pl-20">
					贵州省贵阳市观山湖区世纪城
				</view>
			</view>
			<view class="p-24 flex justify-between items-center">
				<view class="text-0B0B0B font-26 font-medium width-110">
					领取日期
				</view>
				<up-datetime-picker hasInput :show="item.showtime" :minDate="item.timevalue" control v-model="item.timevalue" placeholder="请选择领取日期" mode="date"
					title="领取日期">
				</up-datetime-picker>
			</view>
			<view class="pt-14 plr-28 flex items-center">
				<view>
					<image :src="item.img" class="orders-img"></image>
				</view>
				<view class="pl-24 w100">
					<view class="text-2line font-medium font-26 text-0B0B0B">
						男士女士帆布腰带自动扣皮带简约韩 版个性潮人青年学生加长11111111111111111
					</view>
					<view class="font-20 font-regular text-767676 pt-14">
						{{item.name}}
					</view>
					<view class="font-20 font-regular text-767676 pt-24">
						数量：{{item.number}}
					</view>
					<view class="flex justify-end font-30 font-bold text-E6722D pb-20">
						¥{{item.amount}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		watch
	} from 'vue';
	const props = defineProps(["specList"])
	
	const specdata = ref([])
	watch(()=>props.specList,()=>{
		console.log(props.specList[0])
		specdata.value = props.specList.map(e=>{
			return {...e,timevalue:Date.now(),showtime:false}
		})
	},{immediate:true})
	
</script>

<style lang="scss" scoped>
	.width-80 {
		width: 80rpx;
	}

	.width-110 {
		width: 200rpx;
	}

	.page-section {
		width: 100%;
		height: 370rpx;
	}

	.flex-shrink {
		flex-shrink: 0;
	}

	.orders-img {
		width: 235rpx;
		height: 223rpx;
		border-radius: 10rpx;
	}

	.orders-line-2 {
		width: 702rpx;
		height: 1rpx;
		background: #000000;
		opacity: 0.11;
	}
</style>