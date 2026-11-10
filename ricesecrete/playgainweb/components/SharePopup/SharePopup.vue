<template>
	<view>
		<u-popup v-model:show="showShare" :round="20" bgColor='#F5FBFC'>
			<view >
				<PopupTitle title='分享到'></PopupTitle>

				<view class="share-content" scroll-x="true">
					<template v-for="(item,index) in shareList">
						<view class="share-content-item" @click="share(item)">
							<image :src="item.icon"></image>
							<view>{{item.title}}</view>
						</view>
					</template>
					<view class="share-content-item" @click="copy">
						<image src="/static/image/share/lj.png"></image>
						<view>复制链接</view>
					</view>
					<view class="share-content-item">
						<image src="/static/image/share/hb.png"></image>
						<view>生成海报</view>
					</view>
					<!--<view class="share-content-item">
						<image src="/static/image/share/kj.png"></image>
						<view>QQ空间</view>
					</view> -->
				</view>

				<u-button color="#f6f6f6" :custom-style="{color:'#000000',margin:'50rpx 5%',height:'90rpx',width:'90%'}"
					@click="showShare=false">取消</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script setup>
	const props = defineProps({
		shareInfo: {
			default: {
				href: "http://uniapp.dcloud.io/",
				title: "uni-app分享",
				summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				imageUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png"
			}
		}
	})
	import {
		reactive,
		ref
	} from 'vue';
	let showShare = ref(false)
	let shareList = reactive([{
			title: '微信好友',
			icon: '/static/image/share/wx.png',
			provider: 'weixin',
			scene: 'WXSceneSession'
		},
		{
			title: '微信朋友圈',
			icon: '/static/image/share/pyq.png',
			provider: 'weixin',
			scene: 'WXSceneTimeline'
		},
		{
			title: 'QQ好友',
			icon: '/static/image/share/qq.png',
			provider: 'qq',
			// scene: ''
		},
		{
			title: 'QQ空间',
			icon: '/static/image/share/kj.png',
			provider: 'qq',
			// scene: ''
		}
	])
	const share = (val) => {
		uni.share({
			provider: val.provider,
			scene: val.scene || '',
			type: 0,
			href: props.shareInfo.href,
			title: props.shareInfo.title,
			summary: props.shareInfo.summary,
			imageUrl: props.shareInfo.imageUrl,
			success: function(res) {
				console.log("success:" + JSON.stringify(res));
			},
			fail: function(err) {
				console.log("fail:" + JSON.stringify(err));
			}
		});
	}
	const copy = () =>{
		uni.setClipboardData({
		  data: '要复制的文本内容', // 必填
		  success: () => {
		    uni.showToast({ title: '复制成功', icon: 'none' });
		  },
		  fail: (err) => {
		    uni.showToast({ title: '复制失败', icon: 'none' });
		  }
		});
	}
	defineExpose({
		showShare
	})
</script>

<style lang="scss">
	.share-content {
		display: grid;
		// padding: 20rpx;
		// flex-wrap: wrap;
		grid-template-columns: repeat(5,1fr);
		gap: 20rpx;
		image {
			width: 96rpx;
			height: 96rpx;
		}

		&-item {
			display: inline-block;
			text-align: center;
			font-size: 24rpx;
			// margin-right: 30rpx;

		}
	}
</style>