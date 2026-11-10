<template>
	<view>
		<PopupTitle title='服务'></PopupTitle>
		<view class="plr-20 flex items-center justify-between text-767676 font-26 ">
			<view v-for="(item,index) in serviceList" :key="index" :class="chooseService==index?'text-F7D94C':''" @click="itemClick(item,index)">
				{{item.name}}
			</view>
		</view>
		<view class="service-content">
			<view v-if="chooseService==0" >
				<u-parse :content="policyHtml"></u-parse>
			</view>
			<view v-if="chooseService==1">
				<u-parse :content="integralHtml"></u-parse>
			</view>
			<view v-if="chooseService==2">
				<view class="font-24 text-0B0B0B mt-40">平台展示的旅游套餐产品均由正规旅行社、旅游公司等服务商家提供，客户可放心购买，如在旅游过程中出现逼迫、欺诈消费者的行为，可拨打消费者投诉热线 12135 进行举报</view>
				<view class="plr-20 bg-white mtb-20 pb-20">
					<view class="text-3162FF font-26 pt-30">本次旅行套餐由以下服务商提供</view>
					<view class="flex justify-between font-24 text-0B0B0B mt-22"><text>服务商</text><text> {{merchantInfo.name}}</text></view>
					<view class="flex justify-between font-24 text-0B0B0B mt-22"><text>联系方式</text><text>{{merchantInfo.mobile}}</text></view>
					<view class="flex justify-between font-24 text-0B0B0B mt-22">营业执照</view>
					<view class="flex-center font-24 text-0B0B0B mt-22">
						<image :src="merchantInfo.license" style="width: 356rpx;" mode="widthFix"></image>
					</view>
					<view class="flex justify-between font-24 text-0B0B0B mt-22">经营场所证明</view>
					<view class="flex-center font-24 text-0B0B0B mt-22">
						<image :src="merchantInfo.place" style="width: 356rpx;" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="popup-btn" @click="knownBtn">
			我知道了
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const props = defineProps(['policyHtml','integralHtml','merchantInfo'])
	let serviceList = ref([{
			name: '退订政策'
		},
		{
			name: '赠送积分'
		},
		{
			name: '服务商'
		}
	])
	let emits = defineEmits(['close']);
	let chooseService = ref(2);
	
	const itemClick = (item,index)=>{
		chooseService.value = index;
	}
	const knownBtn = ()=>{
		emits('close')
	}
</script>

<style lang="scss" scoped>
	.popup-btn {
		background: linear-gradient(0deg, #3B8EF5, #6BDBFB);
		border-radius: 10rpx;
		font-weight: 500;
		font-size: 30rpx;
		color: #FFFFFF;
		line-height: 95rpx;
		text-align: center;
		z-index: 122;
	}
	.service-content{
		padding: 0 24rpx;
		height: 50vh;
		overflow-y: auto;
		margin-top: 20rpx;
	}
</style>