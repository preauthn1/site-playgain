<template>
	<view class="bg-white box-shadow-1 mt-40 plr-28 pb-20">
		<view class="pt-30">
			<view class="pt-40 pb-20 flex relative content-line">
				<view>
					<image :src="orderDetail.product_img" class="content-image"></image>
				</view>
				<view class="pl-40">
					<view class="text-2line font-26 font-medium ">
						{{orderDetail.product_name}}
					</view>
					<view class="text-767676 font-regular font-20 ptb-20">
						卡其色：{{orderDetail.spec_json.spec}}
					</view>
					<view class="text-767676 font-regular font-20 pb-20">
						数量：{{orderDetail.number}}
					</view>
					<view class="flex justify-end font-30 font-bold text-E6722D pb-20">
						{{orderDetail.type == 2 ? '¥' + orderDetail.price : orderDetail.price}}
					</view>
				</view>
			</view>
			<view class="pt-20 flex justify-between">
				<view class="font-medium font-26 text-0B0B0B">
					运费
				</view>
				<view class="font-30 font-bold text-E6722D">
					¥0
				</view>
			</view>
			<view class="pt-20 flex justify-between">
				<view class="font-medium font-26 text-0B0B0B">
					商品总计
				</view>
				<view class="font-30 font-bold text-E6722D">
					{{orderDetail.type == 2 ? '¥' + orderDetail.amount : '¥'+0}}
				</view>
			</view>
			<view class="pt-20 flex justify-between"  v-if="orderDetail.type == 2">
				<view class="font-medium font-26 text-0B0B0B">
					实付款
				</view>
				<view class="font-30 font-bold text-E6722D">
					¥{{orderDetail.amount}}
				</view>
			</view>
			<view class="pt-20 flex justify-between" v-else>
				<view class="font-medium font-26 text-0B0B0B">
					扣除积分
				</view>
				<view class="font-30 font-bold text-E6722D">
					{{orderDetail.amount}}
				</view>
			</view>
			<view v-if="orderDetail.status == 2 && orderDetail.express_type == 2 || orderDetail.status == 3 && orderDetail.express_type == 2|| orderDetail.status == 4 && orderDetail.express_type == 2">
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
					<!-- <view class="text-center pt-22 text-898989 font-22 font-regular">
						核验过期时间：{{props.time}}
					</view> -->
					<view class="text-center pt-22 text-898989 font-22 font-regular" v-if="orderDetail.status == 4">
						核验时间：{{orderDetail.ver_time}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref,onMounted } from 'vue';
	import UQRCode from 'uqrcodejs';
	const props = defineProps(['content','time'])
	const orderDetail = props.content
	console.log(orderDetail)
	const is_finish = ref(true)
	onMounted(()=>{
		if(orderDetail.status == 2 && orderDetail.express_type == 2 || orderDetail.status == 3 && orderDetail.express_type == 2){
			// 获取uQRCode实例
				const qr = new UQRCode();
				//设置二维码内容
				qr.data = orderDetail.ver_code;
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
	.content-image{
		width: 235rpx;
		height: 223rpx;
		border-radius: 10rpx;
	}
	.content-line::after{
		content: "";
		width: 100%;
		height: 1rpx;
		background: #000000;
		opacity: 0.14;
		position: absolute;
		bottom:20rpx;
	}
	.width-75{
		width: 75rpx;
	}
</style>