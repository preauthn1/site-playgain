<template>
	<view>
		<u-navbar title="积分转换" placeholder autoBack>
			<template #right>
				<navigator url="/pages_mine/pages/pointsConversion/record">
					<view class="flex items-center">
						<image src="../../static/img/point-log.png" class="width-30 mr-12" mode="widthFix"></image>
						<text class="text-EDC74B font-24">积分转换记录</text>
					</view>
				</navigator>
			</template>
		</u-navbar>
		<view class="box-shadow-1 bg-white text-0B0B0B pb-30 font-26 font-medium mt-30">
			<view class="ptb-18 text-center  font-30 relative">积分转换</view>
			<view class="flex items-center plr-26 bg-EDC74B ptb-24">
				<view class="pr-60">当前积分余额 </view>
				<view class="pl-60 ml-60">{{info.integral}}</view>
			</view>
			<view class="flex items-center plr-26 mt-20">
				<view class="pr-60">今日可转换积分</view>
				<view class="pl-60 ml-40">{{info.integral*info.rate || 0}}</view>
				<!-- <view class="flex-1">
					<u-input placeholder="请输入本次需要转换的积分" border="bottom"></u-input>
				</view> -->
			</view>
		</view>
		<view class="plr-40 mt-60">
			<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB)" :customStyle="btnStyle" :disabled="!info.can_exchange" @click="submit">点击转换成佣金</u-button>
		</view>
		<view class="plr-26 font-24 mt-40">
			积分转换说明：
			<view>1.每个账号每天只能积分转换1次；</view>
			<view>2.每日转换积分由系统按照当前积分余额的千分之五的比例计算得出</view>
			<view>3.发起积分转换申请后24小时内完成转换；</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive, ref
	} from 'vue';
	import {getIntegral,integral_exchange} from '@/api/money.js'
	let btnStyle = reactive({
		height: '90rpx',
		fontSize: '30rpx',
		'border-radius': '20rpx'
	})
	let info = ref({})
	
	const getInfo = ()=>{
		getIntegral().then(res=>{
			console.log(res)
			info.value = res;
		})
	}
	getInfo()
	const submit = ()=>{
		integral_exchange().then(res =>{
			uni.showToast({
				title:'兑换成功！'
			})
			setTimeout(function(){
				getInfo()
			},200)
		})
	}
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.bg-EDC74B {
		background-color: rgba(237, 199, 75, 0.08);
	}
</style>