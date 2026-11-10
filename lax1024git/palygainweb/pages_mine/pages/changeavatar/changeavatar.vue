<template>
	<view class="changeavater">
		<view class="bg-white mtb-40 box-shadow-1">
			<view class="flex flex-col items-center justify-center ptb-20 relative" >
				<image :src="heading" class="avatar" />
				<image src="../../static/img/changeavater/camera.png" 
				class="width-46 photograph" mode="widthFix" @click="openPop"/>
				<view class="mt-22 font-24 font-regular text-0B0B0B">
					点击自定义头像
				</view>
			</view>
		</view>
		<view class="bg-white box-shadow-1">
			<view class="p-24">
				<view class="font-regular font-26 text-0B0B0B">
					头像专区
				</view>
				<u-grid :border="false" col="4">
					<u-grid-item v-for="(item,index) in avatar" :key="item.name">
						<view class="pt-24">
							<image :src="item" class="avatar" @click="changeavater(index)"></image>
						</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<view class="confirm flex justify-center items-center text-white" @click="confirm">
			确认
		</view>
		<u-popup :show="show" @close="show = false" :round="20" bgColor='#f5fbfcFF'>
			<view>
				<PopupTitle title='图片来源'></PopupTitle>
				<view class="text-center">
					<view :class="[`p-24 font-28 font-medium`, chooseImageMethed == 'album' ? `text-EDC74B` : ``]"
						@click="chooseimage('album')">
						相册
					</view>
					<view :class="[`p-24 font-28 font-medium`, chooseImageMethed == 'camera'? `text-EDC74B` : ``]"
						@click="chooseimage('camera')">
						相机
					</view>
				</view>
			</view>
			<u-button color="#f6f6f6" :custom-style="{color:'#000000',margin:'50rpx 5%',height:'90rpx',width:'90%'}"
				@click="show=false">取消</u-button>
		</u-popup>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		update_user_info
	} from '@/api/login';
	import {
		common_upload
	} from '@/api/mine';
	import {
		useUserStore
	} from '@/store';
import { sassFalse } from 'sass';
	const store = useUserStore()
	let heading = ref()
	heading.value =  store.userInfo.head_img
	const the_first = ref(0)
	//头像专区本地数据
	const avatar = reactive([
		"/pages_mine/static/img/changeavater/1.png",
		"/pages_mine/static/img/changeavater/Ů1.png",
		"/pages_mine/static/img/changeavater/Ů3.png",
		"/pages_mine/static/img/changeavater/Ů4.png",
		"/pages_mine/static/img/changeavater/2.png",
		"/pages_mine/static/img/changeavater/3.png",
		"/pages_mine/static/img/changeavater/4.png",
		"/pages_mine/static/img/changeavater/57.png"
	])
	//更换头像
	const changeavater = (num) => {
		the_first.value = num
		heading.value = avatar[num]
		console.log(heading.value)
		// uploadImage(avatar[the_first.value])
	}
	//是否显示
	const show = ref(false)
	const openPop = () => {
		show.value = true
	}
	// 
	const chooseImageMethed = ref()
	const chooseimage = (num) => {
		chooseImageMethed.value = num
		uni.chooseImage({
			count: 1, // 可以选择的图片数量
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
			sourceType: [`${chooseImageMethed.value}`], // 可以指定来源是相册还是相机
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
				heading.value = data.data[0].url
				uni.showToast({
					title: '上传成功',
					icon: 'success',
					duration: 1000
				});
				show.value = false
				chooseImageMethed.value = ''
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
	const confirm = async () => {
		const res = await update_user_info({
			'head_img': heading.value
		})
		uni.showToast({
			icon:"success",
			title:"头像更改成功"
		})
		store.getuserinfo()
		setTimeout(()=>{
			console.log("没有走这里吗？？")
			uni.navigateBack({delta:1})
		},300)
	}
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.avatar {
		width: 126rpx;
		height: 126rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.width-46 {
		width: 46rpx;
	}

	.photograph {
		position: absolute;
		top: 115rpx;
	}

	.confirm {
		width: 635rpx;
		height: 93rpx;
		background: linear-gradient(180deg, #3B8EF5, #6BDBFB);
		border-radius: 20rpx;
		margin: 121rpx auto 0 auto;
	}
</style>