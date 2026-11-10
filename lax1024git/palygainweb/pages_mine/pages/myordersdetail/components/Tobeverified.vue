<template>
	<view class="detail" v-if="is_show">
		<headerVue :status="orderStatus" :createTime="orderDetail.create_time"></headerVue>
		<orderprocessVue v-if="orderDetail.status != 1" :process="orderDetail.status_step"></orderprocessVue>
		<shippinginformationVue v-if="orderDetail.status == 3 && orderDetail.express_type == 1 || orderDetail.status == 4 && orderDetail.express_type == 1"></shippinginformationVue>
		<addressVue :address="orderDetail.contacts" v-if="orderDetail.express_type == 1"></addressVue>
		<!-- 到店领取 -->
		<tostoreVue v-else :addressinfo="orderDetail.express_address" :time="orderDetail.take_day"></tostoreVue>
		
		<!-- 退货地址 -->
		<returnaddressVue  v-if="orderDetail.status == 11 || orderDetail.status == 12" :Business="orderDetail.merchant_address" :refund_logistics="orderDetail.refund_logistics" @returnaddressfinsh="handleretuenaddress"></returnaddressVue>
		<commoditycontentVue :content="orderDetail" :time="orderDetail.take_day"></commoditycontentVue>
		<view class="mt-30 bg-white box-shadow-1 plr-24 pb-30">
			<view class="font-30 font-medium text-0B0B0B ptb-20 text-center">
				订单详情
			</view>
			<view class="flex items-center">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					订单编号
				</view>
				<view class="font-regular font-24 pl-30">
					{{orderDetail.order_no}}
				</view>
				<view class="pl-16">
					<up-copy :content="orderDetail.order_no" notice="复制成功">
					    <image src="../../../static/img/myorders/copy.png" class="width-24" mode="widthFix"></image>
					</up-copy>
				</view>
			</view>
			<view class="flex pt-40">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					下单时间
				</view>
				<view class="font-regular font-24 pl-30">
					{{orderDetail.create_time}} 
				</view>
			</view>
			<view class="flex pt-40">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					备注
				</view>
				<view class="font-regular font-24 pl-30">
					{{orderDetail.remarks}}
				</view>
			</view>
			<view class="flex  justify-end" v-if="orderDetail.status == 3 && props.params.type==2" @click="jumphandle">
				<view class="cancel-btn text-center font-24 font-medium">
					申请售后
				</view>
			</view>
			<view class="flex pt-20 justify-center items-center">
				<image src="/static/image/mine/Customer.png" class="width-48" mode="widthFix"></image>
				<view class="text-0B0B0B font-medium font-26 pl-10">
					联系客服
				</view>
			</view>
		</view>
		<view class="bottom-btn justify-between" v-if="orderDetail.status == 1">
			<view class="bottom-btn-right text-black" style="border: 1px solid #727374;" @click="shopcancelOrder">
				取消订单
			</view>
			<view class="bottom-btn-right text-white text-black" style="background: linear-gradient(180deg, #F3CD4D, #E54925)">
				立即支付
			</view>
		</view>
		<view class="bottom-btn justify-end" v-if="orderDetail.status == 2">
			<view class="bottom-btn-right text-black" style="border: 1px solid #727374;" @click="show=true">
				取消订单
			</view>
		</view>
		<view class="bottom-btn justify-end" v-if="orderDetail.status == 0 || orderDetail.status == 7">
			<view class="bottom-btn-right text-black" style="border: 1px solid #727374;" @click="deleteOrder">
				删除订单
			</view>
		</view>
		<view class="bottom-btn justify-end" v-else-if="orderDetail.status == 4">
			<view class="bottom-btn-right text-white bg-EDC74B" @click="jumpCommentpage">
				填写评价
			</view>
		</view>
		<view class="bottom-btn justify-end" v-else-if="orderDetail.status == 3 && orderDetail.express_type == 1">
			<view class="bottom-btn-right text-white bg-EDC74B" @click="subOrder">
				确认收货
			</view>
		</view>
		<view class="bottom-btn justify-end" v-else-if="orderDetail.status == 11">
			<view class="bottom-btn-right text-white bg-EDC74B" @click="sbtaddress">
				提交
			</view>
		</view>
		<view class="bottom-btn justify-end" v-else-if="orderDetail.status == 5">
			<view class="bottom-btn-right text-white bg-EDC74B" @click="cancelRefund">
				撤销取消订单申请
			</view>
		</view>
		<paymentmethodVue :type="orderDetail.express_type" v-if="orderDetail.status == 1"></paymentmethodVue>
		<up-popup :show="show" @close="show=false" mode="bottom" round="15">
			<view class="pb-30">
				<view class="text-center w100 relative font-30 font-medium ptb-20 order-pay">
					订单取消原因
				</view>
				<view class="flex justify-between p-30 relative" v-for="(item,index) in refund_remark">
					<view class="font-26 font-regular text-0B0B0B order-pay" >
						{{item}}
					</view>
					<image :src="index == cause ? '/pages_mine/static/img/myorders/checked.png' : '/pages_mine/static/img/myorders/unchecked.png'" 
					class="width-30" mode="widthFix" @click='chooseCancelCause(index)'></image>
				</view>
				<view class="flex justify-center pt-30">
					<view class="no-cancel-btn" @click="show=false">
						暂不取消
					</view>
					<view class="confirm-cancel-btn"@click="cancelpayordel">
						确定取消
					</view>
				</view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
	import headerVue from './header.vue';
	import orderprocessVue from './orderprocess.vue';
	import footVue from './foot.vue';
	import commoditycontentVue from './commodity/commoditycontent.vue';
	import shippinginformationVue from './commodity/shippinginformation.vue';
	import addressVue from './commodity/address.vue';
	import paymentmethodVue from './paymentmethod.vue';
	import returnaddressVue from './returnaddress.vue';
	import contactInformationVue from './tourism/contactInformation.vue';
	import tostoreVue from './commodity/tostore.vue';
	import { goods_order_details,cancelOrder,apply_refund_order,
	delete_order,cancel_refund_order,set_refund_logistics_order } from '@/api/order';
	import { reactive, ref} from 'vue';
	import {onLoad} from '@dcloudio/uni-app'
	const props = defineProps(['params'])
	const orderStatus = reactive({
		status:'',
		type:props.params.type,
		pay_cancel_time:'',
	})
	const orderDetail = ref()
	let is_show = ref(false)
	const show = ref(false)
	const is_checked = ref(0)
	const cause = ref(0)
	const refund_remark = ref(['规格/款式/数量拍错','收货地址拍错',
	'暂时不需要了','价格太贵了','其他'])
	const chooseCancelCause = (num) => {
		cause.value = num
	}
	// 申请售后
	const jumphandle = () => {
		uni.navigateTo({
			url:'/pages_mine/pages/aftersales/aftersales?id=' + props.params.id
		})
	}
	const getOrderDetail = async() => {
		orderDetail.value = await goods_order_details({"order_id":props.params.id})
		orderStatus.status = orderDetail.value.status 
		orderStatus.pay_cancel_time = orderDetail.value.create_time
		is_show.value = true
	}
	onLoad(()=>{
		getOrderDetail()
	})
	// 订单申请退款
	const cancelpayordel = () => {
		console.log('hello')
		apply_refund_order({'order_id':props.params.id,'refund_remark':refund_remark.value[cause.value]}).then(res => {
			show.value = false
			setTimeout(()=>{
				uni.showToast({
					icon:"success",
					title:"取消成功"
				})
			},300)
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
	// 未支付取消订单
	const shopcancelOrder =() => {
		
		cancelOrder({'order_id':props.params.id}).then(res => {
			getOrderDetail()
		})
	}
	// 评价
	const jumpCommentpage = (item) => {
		uni.navigateTo({
			url:`/pages_mine/pages/orderreviews/orderreviews?id=${props.params.id}&type=${props.params.type}` 
		})
	}
	// 接收返回地址参数、物流和编号
	const parameter = reactive({
		order_id:props.params.id,
		logistics_id:'',
		number:''
	})
	const handleretuenaddress = (value,value1) => {
		parameter.logistics_id = value
		parameter.number = value1
	}
	// 提交退货地址
	const sbtaddress = () => {
		if(parameter.logistics_id && parameter.number){
			set_refund_logistics_order({...parameter}).then(res =>{
				setTimeout(()=>{
					uni.showToast({
						icon:"success",
						title:"提交成功"
					})
				},300)
				getOrderDetail()
			})
		}else{
			uni.showToast({
				icon:"none",
				title:'请填写物流公司和寄件单号'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.detail{
		padding-bottom: 200rpx;
	}
	.width-120{
		width: 120rpx;
	}
	.cancel-btn{
		width: 204rpx;
		height: 74rpx;
		border-radius: 10rpx;
		border: 1px solid #727374;
		line-height: 74rpx;
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
	.no-cancel-btn{
		width: 250rpx;
		padding: 15rpx;
		background: #767676;
		border-radius: 20rpx 0rpx 0rpx 20rpx;
		color: #fff;
		text-align: center;
	}
	.confirm-cancel-btn{
		width: 250rpx;
		padding: 15rpx;
		background: #EDC74B;
		border-radius: 0rpx 20rpx 20rpx 0rpx;
		color: #fff;
		text-align: center;
	}
</style>