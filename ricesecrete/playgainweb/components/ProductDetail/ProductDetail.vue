<template>
	<view class="productdetail">
		<u-navbar title="商品详情" @rightClick="share_fn" :placeholder='true' autoBack>
			<template #right>
				<image src="/pages_home/static/img/tour/share.png" class="width-30" mode="widthFix"></image>
			</template>
		</u-navbar>
		<u-skeleton rows="6" :rowsHeight="['240px','28px', '28px', '28px', '28px','28px']" :title="false"
			:loading='skeletonLoading'></u-skeleton>
		<view v-if="!skeletonLoading">
			<swiper class="screen-swiper" indicator-dots="true" circular="true" :autoplay="!autoplay"
				style="height: 485rpx;" interval="3500" duration="500">
				<swiper-item @tap="item.type == 'video' ? BoFang() : ''" v-for="(item,index) in product_detail.photo"
					:key="index" class="flex-1">
					<view class="flex">
						<image v-if="item.type == 'image'" :src="item.url" style="height: 485rpx;" mode="aspectFill"
							class="flex-1"></image>
						<view class="videoWrap flex-1 flex" v-else>
							<view v-if="!autoplay" class="flex flex-1 relative">
								<image :src="item.img" style="height: 485rpx;" mode="aspectFill" class="flex-1">
								</image>
								<u-icon name="play-circle"
									style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);"
									size="80" color="#fff"></u-icon>
							</view>
							<video class="videoItem" style="width: 100%;height: 485rpx;" id="myVideo" :src="item.url"
								autoplay show-play-btn objectFit="cover" @ended="autoplay = false"
								@pause="autoplay = false" v-else></video>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- <u-swiper :list="product_detail.photo" height="485rpx" indicator indicatorMode='dot'
				indicatorActiveColor='#FFE401'>
			</u-swiper> -->
			<view class="bg-white mt-50 ptb-12 plr-22 box-shadow-1">
				<view class="font-500 font-28 text-0B0B0B">
					{{product_detail.title}}
				</view>
				<view class="ptb-20 flex justify-between plr-14 items-center">
					<view class="flex items-center">
						<view class="font-30 font-bold text-E6722D">
							{{product_detail.classify == 2 ? '¥'+product_detail.min_price : product_detail.min_integral}}{{product_detail.classify == 3 ? '积分' : ''}}
						</view>
						<view class="pl-10 text-767676 font-20 font-regular" v-if="product_detail.classify == 2">
							起
						</view>
					</view>
					<view class="font-regular font-20 text-767676">
						已售{{product_detail.buy}}件
					</view>
				</view>
				<view>
					<view class="flex justify-between items-center relative dividing-line ptb-24"
						@click="handleShowpopup(1)">
						<view class="font-22 font-regular">
							{{choosespec.spec ? choosespec.spec : '请选择商品规格'}}
						</view>
						<u-icon name="arrow-right" color="#767676"></u-icon>
					</view>
					<view class="flex justify-between relative dividing-line items-center ptb-24"
						@click="handleShowpopup(2)" v-if="product_detail.express_type == 2">
						<view class="font-22 font-regular">
							到店 商品购买后到店领取
						</view>
						<u-icon name="arrow-right" color="#767676"></u-icon>
					</view>
					<view class="flex justify-between items-center relative ptb-24 dividing-line" v-else
						@click="handleShowpopup(3)">
						<view class="font-22 font-regular">
							邮寄 包邮
						</view>
						<u-icon name="arrow-right" color="#767676"></u-icon>
					</view>
					<view class="flex justify-between relative dividing-line items-center ptb-24"
						@click="handleShowpopup(4)">
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
				</view>
			</view>
			<view class="bg-white plr-22 ptb-14 mt-30 box-shadow-1">
				<navigator :url="`/pages_home/pages/evaluate/evaluate?id=${props.id}`">
					<view class="flex justify-between items-center">
						<view class="font-28 text-0B0B0B font-medium">评价（{{product_detail.comment_log.total || 0}}）
						</view>
						<view class="flex items-center text-767676 font-24">
							查看更多
							<u-icon name="arrow-right" color="#767676"></u-icon>
						</view>
					</view>
				</navigator>
				<view class="evaluate-item mt-24" v-if="product_detail.comment_log.total > 0">
					<view class="flex items-center">
						<image :src="product_detail.comment_log.dataList[0].user_head" class="evaluate-item-avatar">
						</image>
						<view class="ml-20">
							<view>{{product_detail.comment_log.dataList[0].user_name}}</view>
							<u-rate :count='product_detail.comment_log.dataList[0].all_score' v-model="rate"
								active-color="#FFE401" inactive-color="#C4C4C4" readonly></u-rate>
						</view>
					</view>
					<view class="font-24 text-767676 line-height-60">{{product_detail.comment_log.dataList[0].time}}发表
					</view>
					<view class="font-26 text-0B0B0B">
						{{product_detail.comment_log.dataList[0].content}}
					</view>
					<view class="evaluate-img">
						<view v-for="(item,index) in product_detail.comment_log.dataList[0].images" :key="index"
							class="evaluate-img-item">
							<image :src="item"></image>
						</view>
					</view>
				</view>
				<view v-else>
					<u-empty mode="comment" icon="/static/image/comment.png" icon-size="60"></u-empty>
				</view>
			</view>
			<view class="p-24 text-0B0B0B font-28 font-medium">
				商品介绍
			</view>
			<view v-for="item in product_detail.details">
				<image :src="item" class="w100" mode="widthFix"></image>
			</view>


		</view>
		<view class="" v-if="!skeletonLoading">
			<view class="bottom-btn" v-if="product_type != 2">
				<view class="flex items-center font-24 text-767676">
					<view class="flex items-center flex-col justify-around">
						<image src="/pages_mine/static/img/marketplaceCredits/kf.png" style="width: 40rpx;" mode="widthFix">
						</image>
						<view>客服</view>
					</view>
					<view class="flex-center flex-col justify-around items-center" style="margin-left: 40rpx;">
						<u-icon :name="product_detail.is_collect==1?'heart-fill':'heart'" size="40rpx"
							:color="product_detail.is_collect==1?'red':'#767676'" @click="iscollect"></u-icon>
						<view>收藏</view>
					</view>
				</view>
				<view class="bottom-btn-right" @click="pointsOrders">
					立即兑换
				</view>
			</view>
			<view class="bottom-btn" v-else>
				<view class="flex items-center font-24 text-767676">
					<view class="flex items-center flex-col justify-around">
						<navigator url="/pages_mine/pages/customerService/customerService">
							<image src="/pages_mine/static/img/marketplaceCredits/kf.png" style="width: 40rpx;"
								mode="widthFix">
							</image>
							<view>客服</view>
						</navigator>
					</view>
					<view class="flex-center flex-col justify-around items-center" style="margin-left: 40rpx;">
						<u-icon :name="product_detail.is_collect==1?'heart-fill':'heart'" size="40rpx"
							:color="product_detail.is_collect==1?'red':'#767676'" @click="iscollect"></u-icon>
						<view>收藏</view>
					</view>
					<view class="flex-center flex-col justify-around items-center relative" style="margin-left: 40rpx;">
						<image src="/pages_shop/static/img/cart.png" style="width: 38rpx;" mode="widthFix"
							@click="jumpcart">
						</image>
						<view>购物车</view>
						<view class="bg-F66A01 message-icon width-30 height-30 font-regular font-18 text-white text-center"
							v-if="store.total_shop > 0">
							{{store.total_shop}}
						</view>
					</view>
				</view>
				<view class="flex">
					<view class="bottom-btn-shop-left" @click="addcart">
						加入购物车
					</view>
					<view class="bottom-btn-shop-right" @click="pointsOrders">
						立即购买
					</view>
				</view>
			</view>
		</view>
		
		<SharePopup ref="share"></SharePopup>
		<Selectproduct ref="Selpro" :spec="product_detail" @success='getProduct'></Selectproduct>
		<Freeshipping ref="Fshipping" :freeshipp="product_detail?.explain_html" ></Freeshipping>
		<TostoreVue ref="tostore" :address="product_detail"></TostoreVue>
		<ServerVue ref="ServeVue" :serve="product_detail.explain_html"></ServerVue>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import Selectproduct from './components/Selectproduct/Selectproduct.vue'
	import Freeshipping from './components/freeshipping/freeshipping.vue';
	import ServerVue from './components/Server/Server.vue';
	import TostoreVue from './components/Tostore/Tostore.vue';
	import {
		good_product_detail,
		goods_add_cart
	} from '@/api/shop';
	import {
		collectproduct
	} from '@/api/mine';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useCartStore
	} from '@/store/modules/shopcart';
	const props = defineProps(['id'])
	const store = useCartStore()
	const product_type = ref()
	const share = ref(null)
	const rate = ref(5)
	const showpage = ref(false)
	const share_fn = () => {
		share.value.showShare = true
	}
	const skeletonLoading = ref(true)
	const Selpro = ref(null)
	const Fshipping = ref(null)
	const ServeVue = ref(null)
	const tostore = ref(null)
	let product_detail = ref([])
	onLoad(() => {
		good_product_detail({
			'id': props.id
		}).then(res => {
			product_detail.value = res
			product_type.value = res.classify
			showpage.value = true
		}).finally(_ => {
			skeletonLoading.value = false
		})
	})

	const handleShowpopup = (num) => {
		switch (num) {
			case 1: {
				Selpro.value.showSelectproduct = true
				break
			}
			case 2: {
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
	let autoplay = ref(false);
	const BoFang = () => {
		if (!autoplay.value) autoplay.value = true;
	}
	// 跳转确认订单
	const pointsOrders = () => {
		if (choosespec.value.id) {
			uni.navigateTo({
				url: `/pages_mine/pages/pointsorders/pointsorders?type=${product_type.value}&products=` + JSON
					.stringify(products)
			})
		} else {
			choosestatus.value = 2
			handleShowpopup(1)
		}

	}

	const choosespec = ref({})
	let products = reactive([{
		spec_id: '',
		product_id: '',
		number: 0,
	}])
	const getProduct = (val, num) => {
		choosespec.value = val
		products[0].spec_id = val.id
		products[0].product_id = val.product_id
		products[0].number = num

		if (choosestatus.value == 1) {
			addcart()
		} else if (choosestatus.value = 2) {
			pointsOrders()
		}
	}
	// 控制状态
	const choosestatus = ref()
	// 加入购物车
	const addcart = () => {
		if (choosespec.value.id) {
			goods_add_cart({
				...products[0],
				'change': 'add'
			}).then(res => {
				console.log(res)
				store.get_cart_data()
			})
		} else {
			choosestatus.value = 1
			handleShowpopup(1)
		}

	}
	const iscollect = () => {
		console.log(product_type.value)
		collectproduct({
			'id': product_detail.value.id,
			'type': product_type.value
		}).then(res => {
			product_detail.value.is_collect = res.is_collect
		})


	}
	// 跳转购物车
	const jumpcart = () => {
		uni.navigateTo({
			url: "/pages_shop/pages/shoppingcart/shoppingcart"
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

	.dividing-line::after {
		content: "";
		width: 100%;
		height: 0.03125rem;
		background: #000000;
		position: absolute;
		bottom: 0;
		left: 0;
		opacity: 0.09;
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

	.bottom-btn-shop {
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

		&-left {
			background: linear-gradient(0deg, #F3CD4D, #E54925);
			background: #E6E6E6;
			border-radius: 15rpx 0rpx 0rpx 15rpx;
			font-weight: 500;
			font-size: 30rpx;
			color: #000000;
			padding: 30rpx;
		}

		&-right {
			background: linear-gradient(0deg, #F3CD4D, #E54925);
			border-radius: 0 15rpx 15rpx 0rpx;
			font-weight: 500;
			font-size: 30rpx;
			color: #FFFFFF;
			padding: 30rpx;
		}
	}

	.message-icon {
		position: absolute;
		top: -8px;
		right: 0px;
		border-radius: 50%;
		line-height: 30rpx;
	}
</style>