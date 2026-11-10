<template>
	<view>
		<view class="bg-white box-shadow-1 plr-24 mt-30 pt-20">
			<view class="font-30 font-medium text-center">选择客服联系方式</view>
			<view>1 电话联系：</view>
			<view>
				<view v-for="(item,index) in phoneList" :key="index" class="flex items-center ">
					<view>{{item.title}}</view>
					<view class="ml-30 ptb-28 border flex-1 text-blue flex justify-between" >
						{{item.content}}
						<u-icon name="phone-fill" size="24" @click="call(item.content)"></u-icon>
					</view>
					
				</view>
			</view>
		</view>
		<view class="plr-24 mt-40">
			<view>2 企业微信：</view>
			<view class="mt-40" v-for="(item,index) in wxList">
				<u-button :customStyle="btnStyle" color="#EDC74B" @click="openWx(item)" :loading="btnLoading">点击联系{{item.title}}</u-button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive, ref
	} from 'vue';
	import {customer_service} from '@/api/common.js'
	let btnStyle = {
		'font-weight': '500',
		'font-size': '30rpx',
		'color': '#FFFFFF',
		'border-radius': '20rpx',
		height: '90rpx'
	};
	let phoneList = ref([])
	let wxList = ref([])
	customer_service().then(res=>{
		console.log(res)
		if(res.length){
			res.forEach(e=>{
				if(e.type==1){
					phoneList.value.push(e)
				}else{
					wxList.value.push(e)
				}
			})
		}
	})
	let btnLoading = ref(false)
	const openWx = (item) => {
		btnLoading.value = true;
		plus.share.getServices(res => {	
			var wechat = res.find(i => i.id === 'weixin')
			if (wechat) {
				wechat.openCustomerServiceChat({
					corpid: 'wwe52931bf7e4d3b70', //第三步获取 wwe52931bf7e4d3b70
					url: item.content
				}, src => {
					console.log("success:")
				}, err => {
					console.log("error:")
				})
				btnLoading.value = false;
			} else {
				uni.showToast({
					title: '当前环境不支持',
					icon: "error"
				});
				btnLoading.value = false;
			}
		});

	}
	
	const call = (num)=>{
		uni.makePhoneCall({
			phoneNumber:num
		})
	}
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.border {
		border-bottom: rgba(0, 0, 0, 0.08) solid 2rpx;
	}
</style>