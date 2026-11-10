<template>
	<view class="tourism" v-if="is_show">
		<headerVue :status="orderStatus"></headerVue>
		<orderprocessVue v-if="orderDetail.status != 1" :process="orderDetail.status_step"></orderprocessVue>
		<tourismcontentVue :content="orderDetail" :orderId="props.params.id"></tourismcontentVue>
		<contactInformationVue :contact="orderDetail.contacts"></contactInformationVue>
		<ordersdetailVue :detail="orderDetail" :orderId="props.params.id" @cancelsuccess="getOrderDetail" v-if="orderDetail.status !=1"></ordersdetailVue>
		<view class="bg-white mt-30 pb-40 box-shadow-1 plr-24">
			<view class="font-30 font-medium text-0B0B0B ptb-20 text-center">
				服务商信息
			</view>
			<view class="flex">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					服务商家
				</view>
				<view class="font-regular font-24 pl-30">
					{{orderDetail.merchant_info.name}}
				</view>
			</view>
			<view class="flex ptb-30">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					联系方式
				</view>
				<view class="font-regular font-24 pl-30">
					{{orderDetail.merchant_info.mobile}}
				</view>
			</view>
			<view class="flex justify-between pb-40">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					退订政策
				</view>
				<view class="text-767676 font-24 font-regular flex items-center" @click="jumpOpt">
					查看详情
					<u-icon name="arrow-right" color="#767676"></u-icon>
				</view>
			</view>
			<view class="flex justify-center items-center">
				<image src="/static/image/mine/Customer.png" class="width-48" mode="widthFix"></image>
				<view class="text-0B0B0B font-medium font-26 pl-10">
					联系客服
				</view>
			</view>
		</view>
		<view class="bottom-btn justify-between" v-if="orderDetail.status == 2">
			<view class="bottom-btn-right text-black" style="border: 1px solid #727374;" @click="tourismcancelOrder">
				取消订单
			</view>
			<view class="bottom-btn-right text-white text-black" style="background: linear-gradient(180deg, #F3CD4D, #E54925)" @click="show=true">
				立即支付
			</view>
		</view>
		<view class="bottom-btn justify-end" v-else-if="orderDetail.status == 0 || orderDetail.status == 6 || orderDetail.status == 7">
			<view class="bottom-btn-right text-black" style="border: 1px solid #727374;" @click="deleteOrder">
				删除订单
			</view>
		</view>
		<view class="bottom-btn justify-end" v-else-if="orderDetail.status == 4">
			<view class="bottom-btn-right text-white bg-EDC74B" @click="subOrder">
				填写评价
			</view>
		</view>
		<view class="bottom-btn justify-end" v-else-if="orderDetail.status == 5">
			<view class="bottom-btn-right text-white bg-EDC74B" @click="cancelRefund">
				撤销取消订单申请
			</view>
		</view>
		<!-- <view class="bottom-btn justify-end" v-else-if="orderDetail.status == 5">
			<view class="bottom-btn-right text-white bg-EDC74B" @click="subOrder">
				撤销取消订单申请
			</view>
		</view> -->
		<up-popup :show="show" @close="show=false" mode="bottom" round="15">
		       <view class="text-center w100 relative font-30 font-medium ptb-20 order-pay">
					订单支付
		       </view>
			   <view class="p-24">
				   <view class="ptb-50 font-32 font-medium text-center">
						￥{{orderDetail.amount}}
				   </view>
					<view class="flex justify-between items-center" @click="choosepay('wxpay')">
						<view>
							<image src="../../../static/img/wx.png" class="width-80" mode="widthFix"></image>
						</view>
						<view class="flex pl-28 w100 justify-between relative payfor-line">
							<view class="font-regular font-24 text-black">
								微信支付
							</view>
							<image :src="paymethed == 'wxpay' ? '/pages_mine/static/img/myorders/checked.png' : '/pages_mine/static/img/myorders/unchecked.png'" class="width-30" mode="widthFix"></image>
						</view>
									
					</view>
					<view class="flex justify-between items-center pt-30" @click="choosepay('alipay')">
						<view>
							<image src="../../../static/img/zfb.png" class="width-80" mode="widthFix"></image>
						</view>
						<view class="flex pl-28 w100 justify-between relative">
							<view class="font-regular font-24 text-black">
								支付宝
							</view>
							<image :src="paymethed == 'alipay' ?'/pages_mine/static/img/myorders/checked.png' : '/pages_mine/static/img/myorders/unchecked.png'" class="width-30" mode="widthFix"></image>
						</view>
					</view>
			   </view>
			   <view class="ptb-20 flex justify-center items-center">
					<view class="payofbtn text-white">
						确认支付
					</view>
			   </view>
		</up-popup>
	</view>
</template>

<script setup>
	import headerVue from './header.vue';
	import orderprocessVue from './orderprocess.vue';
	import tourismcontentVue from './tourism/tourismcontent.vue';
	import contactInformationVue from './tourism/contactInformation.vue';
	import ordersdetailVue from './ordersdetail.vue';
	import { tourism_order_details } from '@/api/tourism';
	import { cancelOrder,delete_order,cancel_refund_order,
	} from '@/api/order';
	import { reactive, ref} from 'vue';
	import {onLoad} from '@dcloudio/uni-app'
	const props = defineProps(['params'])
	const orderStatus = reactive({
		status:'',
		type:props.params.type,
		pay_cancel_time:'',
	})
	console.log(props.params,'11111111111')
	const show = ref(props.params.isShowPop)
	const orderDetail = ref()
	const paymethed = ref('wxpay')
	let is_show = ref(false)
	const getOrderDetail = async () => {
		orderDetail.value = await tourism_order_details({"order_id":props.params.id})
		console.log(orderDetail.value.status,'这是旅游订单！！！')
		orderStatus.status = orderDetail.value.status 
		orderStatus.pay_cancel_time = orderDetail.value.affirm_time
		is_show.value = true
	}
	
	onLoad(()=>{
		getOrderDetail()
	})
	
	const choosepay = (methed) => {
		paymethed.value = methed
		console.log(orderDetail.value.status_step,'流程')
	}
	// 退订政策
	const jumpOpt = () => {
		uni.navigateTo({
			url:'/pages_mine/pages/OptOut/OptOut?data=' + orderDetail.value.policy.html
		})
	}
	// 取消订单
	const tourismcancelOrder =() => {
		console.log(props.params.id)
		cancelOrder({'order_id':props.params.id}).then(res => {
			getOrderDetail()
		})
	}
	//撤销取消订单申请
	const cancelRefund = () => {
		cancel_refund_order({'order_id':props.params.id}).then(res => {
			getOrderDetail()
		})
	}

	// 删除订单
	const deleteOrder = () => {
		delete_order({'order_id':props.params.id}).then(res => {
			uni.showToast({
				icon:'success',
				title:'删除成功'
			})
			uni.navigateBack({ //返回
				success: function() {
					uni.$emit("deleteOrder", {
						id: props.params.id
					});
				}
			});
			
		})
	}
</script>

<style lang="scss" scoped>
	.tourism{
		padding-bottom: 200rpx;
	}
	.width-48{
		width: 48rpx;
	}
	.bottom-btn {
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 9rpx 0rpx rgba(15, 9, 13, 0.09);
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		display: flex;
		padding: 24rpx;
		box-sizing: border-box;
		z-index: 9;
		align-items: center;
	
		&-right {
			
			border-radius: 15rpx;
			font-weight: 500;
			font-size: 30rpx;
			width: 294rpx;
			height: 93rpx;
			line-height: 93rpx;
			text-align: center;
			// background: blue;
		}
	}
	.order-pay:after{
		content: '';
		position: absolute;
		width: 100%;
		height: 1rpx;
		background: #767676;
		bottom: 0;
		left: 0;
	}
	.payofbtn{
		width: 70%;
		padding: 20rpx;
		border-radius: 20rpx;
		background: #EDC74B;
		text-align: center;
	}
</style>