	<template>
		<view>
			<view class="message">
				<image src="/static/image/login/login-bg.png" class="login-bg" mode="widthFix"></image>
				<u-navbar bgColor="transparent" leftIconColor="#fff" autoBack :fixed="false" placeholder>
					<template #center>
						<view>
							<view class="font-32 text-white font-medium ">
								消息 <text v-if="unread !== 0">({{unread}})</text>
							</view>
						</view>
					</template>
					<template #right>
						<view>
							<image src="/static/image/home/message/clear.png" class="clear-icon" @click="clear"></image>
						</view>
					</template>
				</u-navbar>

				<!-- 消息下拉框 -->

				<view class="relative">
					<view class="plr-24 flex justify-between font-regular font-26 text-D8D6D6 items-center">
						<view :class="[messageType == 0 ? `messaggetype-active` : ``]" @click="chooseMessageType(0)">
							全部通知
						</view>
						<view :class="[messageType == 2 ? `messaggetype-active` : ``]" @click="chooseMessageType(2)">
							系统通知
						</view>
						<view :class="[messageType == 1 ? `messaggetype-active` : ``]" @click="chooseMessageType(1)">
							个人通知
						</view>
					</view>
					<view class="announcement relative" v-for="(item,index) in allmessagedata" :key="item.id"
						@click="messageDetail(item.id,item.read)" v-if="messageType === 0">
						<view class="p-24">
							<view class="text-black font-28 font-medium">
								{{item.title}}
							</view>
							<view class="mtb-22" v-if="item.img">
								<image :src="item.img" class="announcement-img"></image>
							</view>
							<u-parse class="text-2line mtb-10 fuwb" :content="item.content"></u-parse>
							<view class="flex justify-between">
								<view class="font-regular font-26 text-A4A4A4">
									2024年5月15日
								</view>
								<view class="font-medium font-26 text-F3C720 flex">
									查看更多
									<up-icon color="#F3C720" size="20rpx" name="arrow-right"></up-icon>
								</view>
							</view>
							<view :class="[`announcement-icon text-center`,item.type == 2 ? `bg-0892FD`:'bg-F3C720']">
								<view v-if="item.type == 2">
									系统通知
								</view>
								<view v-else>
									个人通知
								</view>
							</view>
							<view :class="item.read == 2 ? 'mark' : ''">
							</view>
						</view>
					</view>
					<view class="announcement relative" v-for="(item,index) in differentmessagedata" :key="item.id"
						@click="messageDetail(item.id)" v-else>
						<view class="p-24">
							<view class="text-black font-28 font-medium">
								{{item.title}}
							</view>
							<view class="mtb-22" v-if="item.img">
								<image :src="item.img" class="announcement-img"></image>
							</view>

							<u-parse class="text-2line mtb-10" :content="content"></u-parse>
							<view class="flex justify-between">
								<view class="font-regular font-26 text-A4A4A4">
									2024年5月15日
								</view>
								<view class="font-medium font-26 text-F3C720 flex">
									查看更多
									<up-icon color="#F3C720" size="20rpx" name="arrow-right"></up-icon>
								</view>
							</view>
							<view :class="[`announcement-icon text-center`,item.type == 2 ? `bg-0892FD`:'bg-F3C720']">
								<view v-if="item.type == 2">
									系统通知
								</view>
								<view v-else>
									个人通知
								</view>
							</view>
							<view :class="item.read == 2 ? 'mark' : ''">
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</template>

	<script setup>
		import {
			reactive,
			ref
		} from 'vue'
		import {
			notice,
			notification_allread,
			unread_count
		} from '@/api/message.js'
		import {
			onShow
		} from '@dcloudio/uni-app';

		// 定义通知类型状态 ,0为全部通知，2为系统通知。1为个人通知
		const messageType = ref(0)
		let allmessagedata = ref([])
		let differentmessagedata = ref([])
		let unread = ref(0)
		const getMessage = () => {
			notice().then(res => {
				allmessagedata.value = res.dataList
			})
			unread_count().then(res => {
				unread.value = res.count
			})
		}
		onShow(() => {
			getMessage()
		})
		const chooseMessageType = (mtype) => {
			messageType.value = mtype
			notice({
				'type': mtype
			}).then(res => {
				differentmessagedata.value = res.dataList
			})

		}
		//跳转消息详情
		const messageDetail = (id, read) => {
			uni.navigateTo({
				url: `/pages_home/pages/messageDetail/messageDetail?id=${id}&read=${read}`,
			})
		}
		//清除
		const clear = () => {
			if (unread.value !== 0) {
				notification_allread().then(res => {
					uni.showToast({
						icon: 'success',
						title: '操作成功'
					})
					getMessage()
				})
			}

		}
	</script>
	<style>
		page {
			background: var(--primary-bg);
		}
	</style>
	<style lang="scss" scoped>
		.message {
			padding-bottom: 50rpx;
		}

		.login-bg {
			width: 100%;
			position: absolute;
			top: 0;
		}

		.clear-icon {
			width: 36rpx;
			height: 34rpx;
		}

		.gap27 {
			gap: 27rpx;
		}

		.announcement {
			width: 696rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(16, 8, 13, 0.06);
			border-radius: 15rpx;
			margin: 26rpx auto;
		}

		.announcement-img {
			width: 650rpx;
			height: 173rpx;
		}

		.announcement-icon {
			position: absolute;
			width: 129rpx;
			height: 43rpx;
			border-radius: 0 15rpx 0 15rpx;
			top: 0;
			right: 0;
			font-weight: 400;
			font-size: 26rpx;
			color: #FFFFFF;
			line-height: 43rpx;
		}

		.wrap {
			padding: 24rpx;
		}

		.item {
			padding: 24rpx 0;
			color: $u-content-color;
			font-size: 28rpx;
		}

		.messaggetype-active {
			padding: 10rpx;
			background: #EDC74B;
			color: #ffffff;
			border-radius: 15rpx;
		}

		.mark {
			position: absolute;
			width: 21rpx;
			height: 21rpx;
			top: -10rpx;
			right: 5rpx;
			background: #FD0808;
			border-radius: 50%;
		}

		// ::v-deep(._block){
		// 	display: none !important; 
		// }
	</style>