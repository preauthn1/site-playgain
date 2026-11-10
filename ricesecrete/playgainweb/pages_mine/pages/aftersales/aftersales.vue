<template>
	<view class="aftersales mt-40">
		<view class="bg-white box-shadow-1 plr-26 pb-40">
			<view class="pt-20 font-medium font-30 text-0B0B0B text-center">
				选择服务类型
			</view>
			<view class="pt-40 flex justify-between">
				<view class="font-medium font-24 text-black">
					我要退货退款
				</view>
				<image src="../../static/img/address/active.png" class="width-30" mode="widthFix"></image>
			</view>
		</view>
		<view class="mt-40 bg-white box-shadow-1 plr-26">
			<view class="ptb-20 flex items-center relative aftersales-line">
				<view>
					<image :src="orderDetail.spec_json.img" class="aftersales-image" mode=""></image>
				</view>
				<view class="pl-40">
					<view class="text-2line font-medium font-26 text-0B0B0B">
						{{orderDetail.product_name}}
					</view>
					<view class="ptb-18 font-regular font-20 text-767676">
						卡其色：{{orderDetail.spec_json.spec}}
					</view>
					<view class="font-regular font-20 text-767676">
						数量：{{orderDetail.spec_json.number}}
					</view>
					<view class="pt-40 flex justify-end">
						<view class="font-bold font-30 text-E6722D">
							¥{{orderDetail.amount}}
						</view>
					</view>
				</view>
				
			</view>
			<view class="ptb-30 flex justify-between">
				<view class="font-medium font-26 text-0B0B0B">
					选择退款原因
				</view>
				<view class="text-767676 font-24 font-regular flex items-center" @click="choosereason">
					{{paramsInfo.refund_remark ?paramsInfo.refund_remark: '点击选择退货原因'}}
					<u-icon name="arrow-right" color="#767676"></u-icon>
				</view>
			</view>
		</view>
		<view class="mt-35 bg-white box-shadow-1 plr-26">
			<view class="pt-60 flex justify-between">
				<view class="flex">
					<view class="text-0B0B0B font-medium font-26">
						退款金额
					</view>
					<view class="font-regular font-24 text-black">
						（按照用户实付金额计算）
					</view>
				</view>
				<view class="font-bold font-30 text-E6722D">
					¥{{orderDetail.amount}}
				</view>
			</view>
			<view class="mt-50 pb-30">
				<view class="text-0B0B0B font-medium font-26">
					退款说明
				</view>
				<view class="pt-12 pl-60">
					<up-textarea v-model="return_explain.text" border="none" placeholder="选填，30字以内～" autoHeight height="30" count maxlength="30"></up-textarea>
				</view>
				<view class="ptb-30">
					<view class="flex flex-col justify-center items-center">
						<view class="flex">
							<image :src="item" class="upload-img mr-10" v-for="item in return_explain.Image"></image>							
							<image src="../../static/img/withdrawal/upload.png" class="upload-img" 
								@click="chooseimage"></image>
						</view>
						
						<view class="font-22 font-regular text-black pt-18">
							上传凭证，最多3张
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-btn justify-end">
			<view class="bottom-btn-right bg-EDC74B text-white" @click="subOrder">
				提交申请
			</view>
		</view>
		<reasonVue ref="reason" @success="success"></reasonVue>
	</view>
</template>

<script setup>
	// 申请售后
	import reasonVue from './conponents/reason.vue';
	import { reactive, ref } from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	import { goods_order_details,apply_refund_goods_order } from '@/api/order';
	const reason = ref(null)
	const choosereason = () => {
		reason.value.showreason = true
	}
	const return_explain = reactive({
		text:'',
		Image:[]
	})
	const orderDetail = ref()
	const success = (type) => {
		paramsInfo.refund_remark = type
	}
	// 订单申请退货退款
	let paramsInfo = reactive({
		order_id:'',
		refund_remark:''
	})
	onLoad(async(query)=>{
		paramsInfo.order_id = query.id
		orderDetail.value = await goods_order_details({"order_id":query.id})
	})
	const chooseimage = () => {
		if(return_explain.Image.length >= 3){
			uni.showToast({
				icon:'none',
				title:'最多上传3张'
			})
		}else{
			uni.chooseImage({
					count: 1, // 可以选择的图片数量
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
					sourceType: ['camera'], // 可以指定来源是相册还是相机
					success: (res) => {
						const tempFilePaths = res.tempFilePaths[0];
						console.log(tempFilePaths,res)
						uploadImage(tempFilePaths)
					}
				});
			}
		}
		
	const uploadImage = (image) => {
		uni.uploadFile({
			url: 'http://api.wzqqly.com/app_index/common/upload', // 开发者服务器 URL
			filePath: image, // 要上传文件资源的路径
			name: 'files', // 文件对应的 key
			formData: {
			  'folder': 'test'
			},
			success: (res) => {
				const data = JSON.parse(res.data)
				return_explain.Image.push(data.data[0].url)
			},
			fail: (err) => {
				console.log('uploadImage fail', err);
				uni.showModal({
					content: err.errMsg,
					showCancel: false
				});
			}
		});
	}
	const subOrder = () => {
		if(!paramsInfo.refund_remark){
			uni.showToast({
				icon:"error",
				title:"请选择退款原因"
			})
		}else{
			apply_refund_goods_order({...paramsInfo,'return_explain':return_explain}).then(res => {
				uni.navigateTo({
					url:`/pages_mine/pages/myordersdetail/myordersdetail?id=${paramsInfo.order_id}&type=2`
				})
			})
		}
		
	}
</script>
<style>
	page{
		background-color: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.aftersales{
		padding-bottom: 160rpx;
	}
	.aftersales-image{
		width: 235rpx;
		height: 223rpx;
		border-radius: 10rpx;
	}
	.aftersales-line::after{
		content: "";
		width: 100%;
		height: 1rpx;
		position: absolute;
		background: #000000;
		opacity: 0.07;
		bottom: 5rpx;
	}
	.mt-35{
		margin-top: 35rpx;
	}
	.upload{
		width: 141rpx;
	}
	.upload-img {
		width: 140rpx;
		height: 140rpx;
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
			// border: 1px solid #727374;
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
</style>
