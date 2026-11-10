<template>
	<view class="orderreviews">
		<!-- 旅游 -->
		<view class="pt-30 box-shadow-1 bg-white" v-if="productType == 1">
			<view class="ptb-16 plr-26 flex">
				<view>
					<image :src="detailInfo.product_img" class="orderreviews-img"></image>
				</view>
				<view>
					<view class="text-0B0B0B font-medium font-26 pl-18 text-2line">
						{{detailInfo.product_name}}
					</view>

					<view class="flex flex-wrap pl-18">
						<view class="label text-white font-22 font-regular text-center mr-16 mt-22" v-for="item in detailInfo.product_tag.slice(0,2)">
							{{item}}
						</view>
					</view>
					<view class="pl-18 pt-20 font-medium font-26">
						{{detailInfo.number}}成人 {{detailInfo.kid_number}}儿童
					</view>
					<view class="flex justify-between pl-18 pt-20">
						<view class="font-regular font-22 text-898989">
							出发时间：{{detailInfo.start_day}}
						</view>
						<view class="font-medium font-24 text-3D91F5">
							{{detailInfo.days_str}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--积分商品 / 商品 -->
		<view class="pt-30 box-shadow-1 bg-white" v-else>
			<view class="ptb-16 plr-26 flex">
				<view>
					<image :src="detailInfo.product_img" class="orderreviews-img"></image>
				</view>
				<view class="pl-18">
					<view class="text-0B0B0B font-medium font-26 text-2line">
						{{detailInfo.product_name}}
					</view>
					<view class="ptb-22 font-regular font-20 text-767676">
						卡其色：{{detailInfo.spec_json.spec}}
					</view>
					<view class="font-regular font-20 text-767676">
						数量：{{detailInfo.number}}
					</view>
					<view class="flex items-end justify-center flex-col">
						<view class="flex items-center" v-if="productType==3">
							<view class="font-medium font-26 text-0B0B0B">
								扣除积分
							</view>
							<view class="text-E6722D font-30 font-bold pl-14">
								{{detailInfo.amount}}
							</view>
						</view>
						<view class="flex items-center" v-else>
							<view class="font-medium font-26 text-0B0B0B">
								实付款
							</view>
							<view class="text-E6722D font-30 font-bold pl-14">
								￥{{detailInfo.amount}}
							</view>
						</view>
						<view class="font-regular font-22 text-898989 pt-20">
							下单时间：{{detailInfo.create_time}}
						</view>

					</view>
				</view>
			</view>
		</view>
		
		<view class="mt-30 bg-white box-shadow-1">
			<view class="p-26">
				<up-textarea v-model="content" :placeholder="placeholder" border="none" placeholder-style="color:black;font-size:22rpx;font-weight: 400;" autoHeight></up-textarea>
				<view class="ptb-30">
					<view class="flex flex-col justify-center items-center">
						<view class="flex">
							<image :src="item" class="upload-img mr-20" v-for="item in imagelist"></image>							
							<image src="../../static/img/withdrawal/upload.png" class="upload-img" 
								@click="chooseImages"></image>
						</view>
						
						<view class="font-22 font-regular text-black pt-18">
							上传凭证，最多3张
						</view>
					</view>
				</view>
				<view class="flex items-center">
					<image
						:src="is_checked == 2?`/pages_mine/static/img/address/active.png`:`/pages_mine/static/img/hobbies/unchecked.png`"
						class="width-28" mode="widthFix" @click="chooseIschacked(is_checked)"></image>

					<view class="pl-10 font-regular font-22 text-black">
						匿名评价
					</view>
				</view>
			</view>
		</view>
		<view class="mt-30 bg-white box-shadow-1 plr-26" v-if="productType == 1">
			<view class="flex items-center" v-for="(item,index) in tourisevaluate">
				<view class="pr-16 font-22 font-regular text-black">
					{{item.name}}
				</view>
				<up-rate active-color="#FBE44D" v-model="item.rating" inactive-color="#b2b2b2" size="30"
					minCount="0" count="5" v-if="index != 0" @change=""></up-rate>
				<up-rate active-color="#FBE44D" v-model="item.overallRating" inactive-color="#b2b2b2" size="30"
					minCount="0" count="5" v-else @change="updateIndividualRatings"></up-rate>
			</view>
		</view>
		<view class="mt-30 bg-white box-shadow-1 plr-26" v-else>
			<view class="flex items-center" v-for="(item,index) in goodsevaluate">
				<view class="pr-16 font-22 font-regular text-black">
					{{item.name}}
				</view>
				<up-rate active-color="#FBE44D" v-model="item.rating" inactive-color="#b2b2b2" size="30"
					minCount="0" count="5" v-if="index != 0" @change=""></up-rate>
				<up-rate active-color="#FBE44D" v-model="item.overallRating" inactive-color="#b2b2b2" size="30"
					minCount="0" count="5" v-else @change="updateIndividualRatings"></up-rate>
			</view>
		</view>
		<view class="confirm flex justify-center items-center text-white" @click="subBtn">
			提交
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,watch
	} from 'vue';
	import {onLoad} from '@dcloudio/uni-app'
	import { tourism_order_details } from '@/api/tourism';
	import { goods_order_details,submit_comment} from '@/api/order';
	const content = ref('')
	//是否选中
	const is_checked = ref(2)
	//图片
	const imagelist = ref([])
	const placeholder = ref('分享一下你的旅游感受吧！')
	// 旅游评价
	const tourisevaluate = reactive([
		{overallRating:0,name:'体验指数'},
		{rating:0,name:'导游水平'},
		{rating:0,name:'服务态度'},
		{rating:0,name:'游玩体验'},
	]);
	//商品或积分商品
	const goodsevaluate = reactive([
		{overallRating:0,name:'整体评价'},
		{rating:0,name:'描述相符'},
		{rating:0,name:'外观包装'},
		{rating:0,name:'使用感受'},
	]);
	const updateIndividualRatings = (value) =>{
		if(productType.value != 1){
			goodsevaluate[1].rating = value
			goodsevaluate[2].rating = value
			goodsevaluate[3].rating = value
		}else{
			console.log('路由')
			tourisevaluate[1].rating = value
			tourisevaluate[2].rating = value
			tourisevaluate[3].rating = value
		}
	}
	const updateOverallRating = () => {
		if(productType.value != 1){
			goodsevaluate[0].overallRating = Math.round((goodsevaluate[1].rating + goodsevaluate[2].rating + goodsevaluate[3].rating) / 3);
		}else{
			tourisevaluate[0].overallRating = Math.round((tourisevaluate[1].rating + tourisevaluate[2].rating + tourisevaluate[3].rating) / 3);
		}
		
	}
	// 上传凭证
	const chooseImages = () => {
		if(imagelist.value.length >=3)return;
		uni.chooseImage({
			count: 1, // 可以选择的图片数量
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
			sourceType: [], // 可以指定来源是相册还是相机
			crop: {
				width: 150, // 裁剪宽度，单位为px
				height: 150, // 裁剪高度，单位为px
				quality: 80, // 图片质量，取值范围为1-100
				resize: true // 是否将width和height作为裁剪保存图片真实的像素值
			  },
			success: (res) => {
				const tempFilePaths = res.tempFilePaths[0];
				console.log(tempFilePaths,res)
				uploadImage(tempFilePaths)
			}
		});
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
				imagelist.value.push(data.data[0].url)
				// uni.showToast({
				// 	title: '上传成功',
				// 	icon: 'success',
				// 	duration: 1000
				// });
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
	const detailInfo = ref()
	const productType = ref()
	const orderId = ref()
	onLoad(async(query)=>{
		console.log(query.type,'!!!!!!!!!!!!!')
		productType.value = query.type
		orderId.value = query.id
		if(query.type == 1){
			detailInfo.value = await tourism_order_details({'order_id':query.id})
			
		}else{
			detailInfo.value = await goods_order_details({'order_id':query.id})
			placeholder.value = '分享一下你的商品使用感受吧！'
		}
		
	})
	const chooseIschacked = (num) => {
		if(num == 1){
			is_checked.value = 2
		}else{
			is_checked.value = 1
		}
	}
	const subBtn = () => {
		const images = JSON.stringify(imagelist.value)
		console.log(images)
		if(productType.value != 1){
			console.log('1111111')
			submit_comment({'order_id':orderId.value,'content':content.value,
			'anonymous':is_checked.value,'all_score':goodsevaluate[0].overallRating,'tour_guide_score':goodsevaluate[1].rating,
			'service_score':goodsevaluate[2].rating,'experience_score':goodsevaluate[3].rating,'images':images
			}).then(res => {
				uni.navigateTo({
					url:`/pages_mine/pages/myordersdetail/myordersdetail?id=${orderId.value}&type=2`
				})
			}).catch(err => {
				console.log(err,'错误信息')
			})
		}else{
			submit_comment({'order_id':orderId.value,'content':content.value,
			'anonymous':is_checked.value,'all_score':tourisevaluate[0].overallRating,'tour_guide_score':tourisevaluate[1].rating,
			'service_score':tourisevaluate[2].rating,'experience_score':tourisevaluate[3].rating,'images':images
			}).then(res => {
				uni.navigateTo({
					url:`/pages_mine/pages/myordersdetail/myordersdetail?id=${orderId.value}&type=1`
				})
			})
		}

	}
</script>

<style lang="scss" scoped>
	.orderreviews{
		padding-bottom: 100rpx;
	}
	.orderreviews-img {
		width: 235rpx;
		height: 223rpx;
		border-radius: 10rpx;
	}

	.label {
		width: 145rpx;
		height: 43rpx;
		background: #3D91F5;
		border-radius: 10rpx;
		line-height: 43rpx;
	}

	.upload-img {
		width: 140rpx;
		height: 140rpx;
	}

	.confirm {
		width: 635rpx;
		height: 93rpx;
		background: linear-gradient(180deg, #3B8EF5, #6BDBFB);
		border-radius: 20rpx;
		margin: 121rpx auto 0 auto;
	}
</style>