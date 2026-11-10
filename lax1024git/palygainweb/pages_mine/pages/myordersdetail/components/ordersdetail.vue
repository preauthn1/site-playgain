<template>
	<view class="ordersdetail">
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
					    <image src="../../../static/img/myorders/copy.png"  class="width-24" mode="widthFix"></image>
					</up-copy>
				</view>
			</view>
			<view class="flex pt-40">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					报名时间
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
			<view class="flex justify-end pt-20" v-if="orderDetail.status ==3">
				<view class="cancel-btn text-center font-24 font-medium" @click="show=true">
					取消订单
				</view>
			</view>
		</view>
		<up-popup :show="show" @close="show=false" mode="bottom" round="15">
			<view class="pb-30">
				<view class="text-center w100 relative font-30 font-medium ptb-20 order-pay">
									订单取消原因
				</view>
				<view class="flex justify-between p-30 relative order-pay" v-for="(item,index) in refund_remark">
					<view class="font-26 font-regular text-0B0B0B">
						{{item}}
					</view>
					<image :src="index == chooseremark ? '/pages_mine/static/img/myorders/checked.png' : '/pages_mine/static/img/myorders/unchecked.png'" 
					class="width-30" mode="widthFix" @click="chooseRefundRemark(index)"></image>
				</view>
			
				<view class="p-30 text-767676 font-24 font-regular">
					提示：由于当前旅行计划正在生成中，如您需要取消，待工作人员与联系人打电话核实确认后即可帮您完成取消。取消订单后平台将会按照退订政策进行退款，请您悉知。
				</view>
				<view class="flex justify-center">
					<view class="no-cancel-btn" @click="show=false">
						暂不取消
					</view>
					<view class="confirm-cancel-btn" @click="handleCancel">
						确定取消
					</view>
				</view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import {apply_refund_order} from '@/api/order'
	const props = defineProps(['detail','orderId'])
	const emit = defineEmits(['cancelsuccess'])
	const orderDetail = props.detail
	const chooseremark = ref(0)
	const refund_remark = ref(['计划有变或改变出现意愿','个人其他突发情况'])
	const chooseRefundRemark = (num) => {
		chooseremark.value = num
	}
	const show = ref(false)
	// 确定取消
	const handleCancel = () => {
		apply_refund_order({'order_id':props.orderId,'refund_remark':refund_remark.value[chooseremark.value]}).then( res => {
			uni.showToast({
				icon:'success',
				title:'提交成功'
			})
			setTimeout(()=>{
				show.value = false
				emit('cancelsuccess','')
			},300)
		})
	}
</script>

<style lang="scss" scoped>
	.cancel-btn{
		width: 204rpx;
		height: 74rpx;
		border-radius: 10rpx;
		border: 1px solid #727374;
		line-height: 74rpx;
		cursor: pointer;
	}
	.width-48{
		width: 48rpx;
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