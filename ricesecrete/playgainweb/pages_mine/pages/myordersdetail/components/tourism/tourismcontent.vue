<template>
	<view class="tourismcontent">
		<view class="bg-white box-shadow-1 mt-30">
			<view class="pt-16 pb-26 pl-26 flex items-center">
				<view class="flex-shrink">
					<image :src="orderDetail.product_img" class="detail-image" />
				</view>
				
				<view class="pl-26">
					<view class="text-0B0B0B font-26 font-medium 2text-line">
						{{orderDetail.product_name}}
					</view>
					<view class="flex flex-wrap">
						<view class="label text-white font-22 font-regular text-center mr-16 mt-22" v-for="item in orderDetail.product_tag.slice(0,4)">
							{{item}}
						</view>
					</view>
				</view>
			</view>
			<view class="pt-26 pl-26 pr-24">
				<view class="font-24 font-medium text-0B0B0B">
					出发时间
				</view>
				<view class="flex pt-20 pb-50 items-center">
					<view class="font-regular font-22 text-898989">
						{{orderDetail.start_day}} {{orderDetail.start_week}}
					</view>
					<view class="mlr-12 text-898989">
						——
					</view>
					<view class="total-time text-3D91F5 plr-22 font-24 font-medium">
						{{orderDetail.days_str}}
					</view>
					<view class="mlr-12 text-898989">
						——
					</view>
					<view class="font-regular font-22 text-898989">
						{{orderDetail.end_day}} {{orderDetail.end_week}}
					</view>
				</view>
				<view class="pt-40">
					<view class="font-medium relative font-26 text-0B0B0B myorders-line">
						{{orderDetail.number}}成人 {{orderDetail.kid_number}}儿童
					</view>
					<view class="ptb-30 flex justify-between">
						<view class="font-26 font-medium text-0B0B0B">
							总金额
						</view>
						<view class="font-bold font-30 text-E6722D">
							¥{{orderDetail.amount}}
						</view>
					</view>
					<view class="pb-30">
						<view class="flex justify-between relative " :class="[orderDetail.status == 3 || orderDetail.status == 4 ? `myorders-line` : ``]">
							<view class="font-26 font-medium text-0B0B0B">
								完成订单后可获得积分
							</view>
							<view class="font-bold font-30">
								{{orderDetail.integral}}
							</view>
						</view>
					</view>
					<view class="pb-30" v-if="orderDetail.status == 3 ||orderDetail.status == 4 ">
						<view class="font-26 font-medium text-0B0B0B">
							核验二维码
						</view>
						<view class="pt-30">
							<!-- qrcode  -->
							<view class="flex justify-center">
								<canvas id="qrcode" canvas-id="qrcode" style="width: 200rpx;height: 200rpx;" v-if="is_finish"></canvas>
								<view class="" v-else>
									<image src="/pages_mine/static/img/myorders/finish.png" class="width-75" mode="widthFix"></image>
									<view class="font-medium font-28 text-0B0B0B">
										已核验
									</view>
								</view>
							</view>
							<view class="text-center pt-22 text-898989 font-22 font-regular" v-if="orderDetail.status == 3">
								核验过期时间：{{orderDetail.ver_expires_time}}
							</view>
							<view class="text-center pt-22 text-898989 font-22 font-regular" v-else>
								核验时间：{{orderDetail.ver_time}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref,onMounted } from 'vue';
	import UQRCode from 'uqrcodejs';
	const props = defineProps(['content','orderId'])
	const orderDetail = props.content
	//二维码是否核验
	const is_finish = ref(true)
	onMounted(()=>{
		// 获取uQRCode实例
		if(orderDetail.status == 3){
			const qr = new UQRCode();
			//设置二维码内容
			qr.data = [orderDetail.ver_code,props.orderId];
			// 设置二维码大小，必须与canvas设置的宽高一致
			qr.size = 100;
			// 调用制作二维码方法
			qr.make();
			// 获取canvas上下文
			const canvasContext = uni.createCanvasContext('qrcode'); // 如果是组件，this必须传入
			
			// 设置uQRCode实例的canvas上下文
			qr.canvasContext = canvasContext;
			// 调用绘制方法将二维码图案绘制到canvas上
			qr.drawCanvas();
		}else{
			is_finish.value = false
		}
		
	}) 
</script>

<style lang="scss" scoped>
	.detail-image {
		width: 235rpx;
		height: 221rpx;
		border-radius: 10rpx;
	}

	.label {
		height: 43rpx;
		background: #3D91F5;
		border-radius: 10rpx;
		line-height: 43rpx;
		padding: 2rpx 15rpx;
	}

	.total-time {
		height: 47rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		border: 1px solid #767676;
		line-height: 47rpx;
	}

	.myorders-line::after {
		content: "";
		position: absolute;
		top: 50rpx;
		left: 0;
		width: 100%;
		height: 1rpx;
		background: #000000;
		opacity: 0.08;
	}

	// .qrcode {
	// 	width: 100%;

	// 	&-img {
	// 		width: 200rpx;
	// 		height: 200rpx;
	// 	}
		
	// }
	.width-75{
		width: 75rpx;
	}
	.flex-shrink{
		flex: 0;
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
</style>