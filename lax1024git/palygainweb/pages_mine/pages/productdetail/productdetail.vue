<template>
	<view class="productdetail">
		<u-navbar title="商品详情" @rightClick="share_fn" :placeholder='true' autoBack>
			<template #right>
				<image src="../../static/img/marketplaceCredits/share.png" class="width-30" mode="widthFix"></image>
			</template>
		</u-navbar>
		<u-swiper :list="swiperList" height="485rpx" indicator indicatorMode='dot' indicatorActiveColor='#FFE401'>
		</u-swiper>
		<view class="bg-white mt-50 plr-22 box-shadow-1">
			<view class="font-500 font-28 text-0B0B0B">
				桑墨餐具系列 陶瓷餐具描金边沿古朴色系有下彩工艺餐品 质感
			</view>
			<view class="ptb-28 flex justify-between items-center" v-if="false">
				<view class="text-E6722D font-30 font-bold">
					1999积分
				</view>
				<view class="text-767676 font-20 font-regular">
					库存200件
				</view>
			</view>
			<view class="ptb-28 flex justify-between items-center" v-else="false">
				<view class="flex items-center">
					<view class="text-E6722D font-30 font-bold">
						¥199.00
					</view>
					<view class="font-regular font-20 text-767676 pl-10">
						起
					</view>
				</view>
				
				<view class="text-767676 font-20 font-regular">
					销量：120
				</view>
			</view>
			<view>
				<view class="flex justify-between items-center pt-12" @click="handleShowpopup(1)">
					<view class="font-22 font-regular">
						请选择商品规格
					</view>
					<u-icon name="arrow-right" color="#767676"></u-icon>
				</view>
				<view class="dividing-line mtb-24">
				</view>
				<view class="flex justify-between items-center pt-12" @click="handleShowpopup(2)">
					<view class="font-22 font-regular">
						到店 商品购买后到店领取
					</view>
					<u-icon name="arrow-right" color="#767676"></u-icon>
				</view>
				<view class="dividing-line mtb-24"> </view>
				<view class="flex justify-between items-center pt-12" @click="handleShowpopup(3)">
					<view class="font-22 font-regular">
						邮寄 包邮
					</view>
					<u-icon name="arrow-right" color="#767676"></u-icon>
				</view>
				<view class="dividing-line mtb-24"> </view>
				<view class="flex justify-between items-center pt-12" @click="handleShowpopup(4)">
					<view class="font-22 font-regular flex justify-between w100">
						<view>
							服务
						</view>
						<view>
							7天无理由退货
						</view>
						<view>
							假一赔四
						</view>
						<view>
							48小时发货
						</view>
					</view>
					<u-icon name="arrow-right" color="#767676"></u-icon>
				</view>
				<view class="dividing-line mtb-24"> </view>
			</view>
		</view>
		<view class="bg-white plr-22 ptb-14 mt-30 box-shadow-1">
			<navigator url="/pages_home/pages/evaluate/evaluate">
				<view class="flex justify-between items-center">
					<view class="font-28 text-0B0B0B font-medium">评价（900）</view>
					<view class="flex items-center text-767676 font-24">
						查看更多
						<u-icon name="arrow-right" color="#767676"></u-icon>
					</view>
				</view>
			</navigator>
			<view class="evaluate-item mt-24">
				<view class="flex items-center">
					<image src="../../static/img/marketplaceCredits/user1.png" class="evaluate-item-avatar"></image>
					<view class="ml-20">
						<view>用户名x x x</view>
						<u-rate count='5' v-model="rate" active-color="#FFE401" inactive-color="#C4C4C4"
							readonly></u-rate>
					</view>
				</view>
				<view class="font-24 text-767676 line-height-60">2024/07/31发表</view>
				<view class="font-26 text-0B0B0B">
					在此之前这是一段评价在此之前这是一段评价在此之前这是一
					段评价在此之前这是一段评价在此之前这是一段评价在此之前
					这是一段评价
				</view>
				<view class="evaluate-img">
					<view v-for="(item,index) in urls2" :key="index" class="evaluate-img-item">
						<image :src="item"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="p-24 text-0B0B0B font-28 font-medium">
			商品介绍
		</view>
		<view>
			<image src="../../static/img/marketplaceCredits/1278.png" class="w100" mode="widthFix"></image>
		</view>
		<view class="bottom-btn">
			<view class="flex items-center font-24 text-767676">
				<view class="flex items-center flex-col justify-around">
					<image src="../../static/img/marketplaceCredits/kf.png" style="width: 40rpx;" mode="widthFix">
					</image>
					<view>客服</view>
				</view>
				<view class="flex-center flex-col justify-around" style="margin-left: 90rpx;">
					<image src="../../static/img/marketplaceCredits/sc.png" style="width: 33rpx;" mode="widthFix">
					</image>
					<view>收藏</view>
				</view>
			</view>
			<view class="bottom-btn-right" @click="pointsOrders">
				立即兑换
			</view>
		</view>
		<SharePopup ref="share"></SharePopup>
		<Selectproduct ref="Selpro"></Selectproduct>
		<Freeshipping ref="Fshipping"></Freeshipping>
		<ServerVue ref="ServeVue"></ServerVue>
		<TostoreVue ref="tostore"></TostoreVue>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import Selectproduct from './components/Selectproduct/Selectproduct.vue'
	import Freeshipping from './components/freeshipping/freeshipping.vue';
	import ServerVue from './components/Server/Server.vue';
	import TostoreVue from './components/Tostore/Tostore.vue';
	const share = ref(null)
	const rate = ref(5)
	const swiperList = ref([
		'https://cdn.uviewui.com/uview/swiper/swiper1.png',
		'https://cdn.uviewui.com/uview/swiper/swiper2.png',
		'https://cdn.uviewui.com/uview/swiper/swiper3.png',
	])
	const share_fn = () => {
		console.log(2)
		share.value.showShare = true
	}
	let urls2 = ref([
		'https://cdn.uviewui.com/uview/album/1.jpg',
		'https://cdn.uviewui.com/uview/album/2.jpg',
		'https://cdn.uviewui.com/uview/album/3.jpg',
	])
	const Selpro = ref(null)
	const Fshipping = ref(null)
	const ServeVue = ref(null)
	const tostore = ref(null)
	const handleShowpopup = (num) => {
		switch (num) {
			case 1: {
				Selpro.value.showSelectproduct = true
				break
			}
			case 2:{
				tostore.value.showTostore = true
				break
			}
			case 3: {
				Fshipping.value.showfreeshipping = true
				break
			}
			case 4: {
				ServeVue.value.showServer = true
				break
			}
			default: {
				break
			}
		}
	}
	// 跳转积分订单
	const pointsOrders = () => {
		uni.navigateTo({
			url:"../pointsorders/pointsorders"
		})
	}
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.productdetail {
		padding-bottom: 200rpx;
	}

	.dividing-line {
		height: 1rpx;
		background: #000000;
		opacity: 0.08;
	}

	.evaluate-item {

		&-avatar {
			width: 84rpx;
			height: 84rpx;
		}
	}

	.evaluate-tab {
		color: #D8D6D6;

		.active {
			background-color: #EDC74B;
			border-radius: 10rpx;
			color: #fff;
		}
	}

	.evaluate-item-avatar {
		width: 84rpx;
		height: 84rpx;
		border-radius: 50%;
	}

	.evaluate-img {
		margin-top: 20rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		/* 创建三列，每列宽度相等 */
		gap: 15rpx;

		/* 设置网格项之间的间隙 */
		&-item {
			height: 0;
			padding-bottom: 100%;
			/*高度设置为0，使用内间距100%，将匡高设置为一致*/
			position: relative;

			image {
				width: 100%;
				height: 100%;
				position: absolute;
				object-fit: cover;
				border-radius: 10rpx;
				/*预览图片的缩略图最好基于正中心显示*/
			}
		}
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
		justify-content: space-between;
		z-index: 9;
		align-items: center;

		&-right {
			background: linear-gradient(0deg, #F3CD4D, #E54925);
			border-radius: 15rpx;
			font-weight: 500;
			font-size: 30rpx;
			color: #FFFFFF;
			padding: 30rpx 115rpx;
		}
	}
</style>