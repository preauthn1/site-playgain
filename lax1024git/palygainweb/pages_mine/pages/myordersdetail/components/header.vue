<template>
	<view class="header">
		<view class="flex justify-center items-center">
			<image :src="props.status.status == 0 ? '/pages_mine/static/img/myorders/cancel.png':
			props.status.status == 6 || props.status.status == 7 ? '/pages_mine/static/img/myorders/finish.png' :
			'/pages_mine/static/img/myorders/treat.png'
			" class="header-img" mode="widthFix"></image>
			<view class="font-medium font-28 text-0B0B0B pl-12" v-if="props.status.type==1">
				{{props.status.status == 0 ? '订单关闭' : props.status.status == 1 ? '待审核' : props.status.status == 2 ?
				'待付款' : props.status.status == 3 ? '待核验' :props.status.status == 4?'待评价':props.status.status == 5?'待审核':
				 props.status.status == 6?'退款成功':props.status.status == 7?'订单完成':props.status.status == 8?'删除订单':''}}
			</view>
			<view class="font-medium font-28 text-0B0B0B pl-12" v-else>
				{{props.status.status == 0 ? '订单关闭' : props.status.status == 1 ? '待付款' : props.status.status == 2 ?
				'待发货' : props.status.status == 3 ? '待签收' :props.status.status == 4?'待评价':props.status.status == 5?'待审核':
				 props.status.status == 6?'退款成功':props.status.status == 7?'订单完成':props.status.status == 8?'删除订单':props.status.status == 9 ? '拒绝退款' :props.status.status == 10 ? '申请退货退款':props.status.status == 11?
				 '同意退款退货':props.status.status=12 ? '退货物流中':props.status.status = 13 ?'退货退款完成':
				 props.status.status = 14 ? '拒绝退货退款':''}}
			</view>
		</view>
		<!-- 订单将在01小时00分后自动关闭 -->
		<view class="text-center ptb-22 font-medium font-24 text-0B0B0B" v-if="props.status.type=='1'&&props.status.status == 1">
			审核完成将会发送短信给联系人
			<view class="font-regular font-22 text-898989">
				（如未收到短信可联系客服）
			</view>
		</view>
		<view class="text-center ptb-22 font-medium font-24 text-0B0B0B" v-if="showDowntime">
			订单将在
			<text class="text-red">{{countdown}}</text>
			{{relust ? '已' : '后'}}自动关闭
		</view>
	</view>
</template>

<script setup>
	
	import { reactive, ref,onMounted,onUnmounted } from 'vue';
	// 是否完成，更换图标
	const props = defineProps(['status'])
	const countdown = ref('')
	const is_finish = ref(false)
	console.log(props.status,'111111111111头部')
	let timerId;
	const relust = ref(false)
	const showDowntime = ref(false)
	const timer = () =>{
		const orderTime = new Date(props.status.pay_cancel_time.replace(/-/g, '/')).getTime();
		const endTime = orderTime + 3600000
		timerId = setInterval(()=>{
			const now = new Date().getTime();
			const distance = endTime - now;
			if (distance < 0) {
			  countdown.value = '倒计时结束';
			  relust.value = true
			  clearInterval(timerId);
			  return;
			}
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			countdown.value = `${minutes}分${seconds}秒`
		},1000)
	}
	
	onMounted(()=>{
		if(props.status.type==1&&props.status.status == 2 || props.status.type != 1 && props.status.status == 1){
			showDowntime.value = true
			timer()
		}
		
	})
	onUnmounted(()=>{
		clearInterval(timerId);
	})
</script>
	
<style lang="scss" scoped>
	.header-img{
		width: 75rpx;
		}
</style>