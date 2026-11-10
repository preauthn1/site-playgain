	<template>
	<view class="tour-detail">
		<u-navbar title="套餐详情" @rightClick="share_fn" :placeholder='true' autoBack>
			<template #right>
				<image src="../../static/img/tour/share.png" class="width-30" mode="widthFix"></image>
			</template>
		</u-navbar>
		<u-skeleton rows="6" :rowsHeight="['240px','28px', '28px', '28px', '28px','28px']" :title="false"
			:loading='skeletonLoading'></u-skeleton>
		<view v-if="!skeletonLoading">
			<!-- <u-swiper :list="produceInfo.photo" height="485rpx" indicator indicatorMode='dot'
				indicatorActiveColor='#FFE401' :autoplay="false"></u-swiper> -->
			<view class="swiperImg">
				<swiper class="screen-swiper" indicator-dots="true" circular="true" :autoplay="!autoplay"
					style="height: 485rpx;" interval="3500" duration="500">
					<swiper-item @tap="item.type == 'video' ? BoFang() : onClickCommentImg(dataDetails, index)"
						v-for="(item,index) in produceInfo.photo" :key="index" class="flex-1">
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
								<video class="videoItem" style="width: 100%;height: 485rpx;" id="myVideo"
									:src="item.url" autoplay show-play-btn objectFit="cover" @ended="autoplay = false"
									@pause="autoplay = false" v-else></video>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- <video src="http://wzqqfile.oss-cn-chengdu.aliyuncs.com/product_photo/2024-08-26/abf91e831d99e21a1efb0de07a05a7a548a03727.mp4"></video> -->
			<view class="plr-18 ptb-24 bg-white">
				<view class="flex items-center text-767676">
					<view class="font-20"><text
							class="text-F66A01 font-30 font-semi-bold">￥{{produceInfo.min_price}}</text>起/成人</view>
					<view class="font-20 ml-30 mr-20" v-if="produceInfo.min_kid_price>0"><text
							class="text-F66A01 font-30 font-semi-bold">￥{{produceInfo.min_kid_price}}</text>起/儿童
					</view>
					<image src="../../static/img/tour/notice.png" class="width-22 height-22" @click="showPrice=true">
					</image>
				</view>
				<view class="text-0B0B0B font-28 font-medium ptb-20">{{produceInfo.title}}</view>
				<view class="flex flex-wrap items-center">
					<view v-for="(item,index) in produceInfo.tag" :key="index"
						class="bg-0790FD mr-10 ptb-10 plr-10 font-20 text-white border-radius-10">
						{{item}}
					</view>
				</view>
				<view>
					<view class="text-0B0B0B font-28 font-medium ptb-20">旅游路线</view>
					<view class="flex flex-wrap items-center">
						<view v-for="(item,index) in produceInfo.path" :key="index"
							class="font-22 text-0B0B0B flex items-center">
							<image src="../../static/img/tour/arrow-right.png" class="arrow-right mlr-10"
								v-if="index!=0">
							</image>
							<view>{{item}}</view>
						</view>
					</view>
				</view>
			</view>

			<view class="service" @click="showService=true">
				<image src="../../static/img/tour/service-bg.png" class="service-bg"></image>
				<view class="flex items-center service-content">
					<view>服务</view>
					<view class="flex-1 flex">
						<view v-for="(item,index) in list4" :key="index" class="flex-center flex-1 ">
							<image :src="item.img" style="width: 36rpx;height: 36rpx;"></image>
							<view class="ml-10 font-26 text-0B0B0B">{{item.name}}</view>
						</view>
					</view>
					<u-icon name="arrow-right" color="#010101"></u-icon>
				</view>
			</view>

			<view class="bg-white pb-24">
				<view class="plr-20 mb-18 pt-30">选择日期</view>
				<view class="pl-20">
					<scroll-view scroll-x class="scroll-date">
						<view v-for="(item,index) in produceInfo.tourism_spec" :key="index"
							class="scroll-date-item mr-20" @click="selectDate(item)">
							<image src="../../static/img/tour/date-bg1.png" class="scroll-date-item-bg"
								v-if="(item.buy_people<=item.people)&&selectDataInfo.id != item.id"></image>
							<image src="../../static/img/tour/date-bg2.png" class="scroll-date-item-bg"
								v-if="selectDataInfo.id == item.id"></image>
							<view class="scroll-date-item-content">
								<view class="flex justify-between items-center">
									<view class="text-F66A01 font-semi-bold font-32">￥{{item.price}}</view>
									<view class="plr-14 border-radius-10 text-white ptb-10 font-22 "
										:class="item.buy_people<=item.people?'bg-FFE401':'bg-C4C4C4'">
										{{item.buy_people>=item.people?'名额已满':item.buy_people+'/'+item.people}}
									</view>
								</view>
								<view class="font-24 text-0B0B0B text-center mtb-18">
									{{item.start_day}}({{item.start_week}}）- {{item.end_day}}
								</view>
								<view class="flex justify-center">
									<view class="text-white font-24 plr-20 line-height-40 "
										:class="item.buy_people<=item.people?'bg-0790FD':'bg-C4C4C4'">{{item.days_str}}
										I
										{{item.city}}
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="plr-20" v-if="produceInfo?.buy_log.total>0">
					<view class="apply-notice">
						<view class="flex-1">
							<u-notice-bar :text="noticeList" direction="column" icon='' bgColor='transparent'
								color="#0B0B0B"></u-notice-bar>
						</view>
						<view class="flex-center pr-10 font-24">
							<image :src="produceInfo?.buy_log.dataList[0].user_head"
								style="width: 50rpx;height: 50rpx;border-radius: 50%;"></image>
							{{produceInfo?.buy_log.total}}人已报名
						</view>
					</view>
				</view>
			</view>

			<view class="bg-white plr-22 ptb-14 u-margin-top-34">
				<navigator :url="'/pages_home/pages/evaluate/evaluate?id='+produceInfo.id">
					<view class="flex justify-between items-center">
						<view class="font-28 text-0B0B0B font-medium">评价（{{produceInfo.comment_log.total || 0}}）</view>
						<view class="flex items-center text-767676 font-24">
							查看更多
							<u-icon name="arrow-right" color="#767676"></u-icon>
						</view>
					</view>
				</navigator>
				<view class="evaluate-item mt-24" v-if="produceInfo.comment_log.total>0">
					<view class="flex items-center">
						<image :src="produceInfo.comment_log.dataList[0].user_head" class="evaluate-item-avatar">
						</image>
						<view class="ml-20">
							<view>{{produceInfo.comment_log.dataList[0].user_name}}</view>
							<u-rate count='5' v-model="produceInfo.comment_log.dataList[0].all_score"
								active-color="#FFE401" inactive-color="#C4C4C4" readonly></u-rate>
						</view>
					</view>
					<view class="font-24 text-767676 line-height-60">{{produceInfo.comment_log.dataList[0].time}}发表
					</view>
					<view class="font-26 text-0B0B0B">
						{{produceInfo.comment_log.dataList[0].content}}
					</view>
					<view class="evaluate-img">
						<view v-for="(item,index) in produceInfo.comment_log.dataList[0].images.splice(0,3)"
							:key="index" class="evaluate-img-item">
							<image :src="item"></image>
						</view>
					</view>
				</view>
				<view v-else>
					<u-empty mode="comment" icon="/static/image/comment.png" icon-size="60"></u-empty>
				</view>
			</view>

			<view class="bg-white mt-30">
				<view class="font-28 text-0B0B0B plr-20 pt-20">行程概括</view>
				<u-sticky :customNavHeight='height'>
					<view class="flex justify-between plr-20 ptb-26 bg-white">
						<view v-for="(item,index) in tripSummary" :key="index"
							:class="choose_tripSummary==index?'trip-active':''" class="relative text-767676"
							@click="choose_tripSummary=index">
							<view class="relative zIndex1">{{item.name}}</view>
						</view>
					</view>
				</u-sticky>
				<bright-spot v-show="choose_tripSummary==0" :imgList='produceInfo.details'></bright-spot>
				<journey v-show="choose_tripSummary==1" :journeyData='selectDataInfo.journey'></journey>
				<cost v-show="choose_tripSummary==2" :fees='produceInfo.fees'></cost>
				<set-meal-notice v-show="choose_tripSummary==3" :noticeHtml='produceInfo.notice_html'></set-meal-notice>
			</view>

			<view class="bottom-btn">
				<view class="flex items-center font-24 text-767676 pl-20">
					<navigator url="/pages_mine/pages/customerService/customerService">
						<view class="flex items-center flex-col justify-around">
							<u-icon name="kefu-ermai" size="50rpx" color="#767676"></u-icon>
							<!-- <image src="../../static/img/tour/kf.png" style="width: 40rpx;" mode="widthFix"></image> -->
							<view>客服</view>
						</view>
					</navigator>
					<view class="flex-center flex-col justify-around" style="margin-left: 50rpx;">
						<u-icon :name="produceInfo.is_collect==1?'heart-fill':'heart'" size="50rpx"
							:color="produceInfo.is_collect==1?'red':'#767676'" @click="iscollect"></u-icon>
						<!-- <image src="../../static/img/tour/sc.png" style="width: 33rpx;" mode="widthFix"></image> -->
						<view>收藏</view>
					</view>
				</view>
				<view class="bottom-btn-right" @click="subOrder">
					立即报名
				</view>
			</view>
			<!-- 服务弹框 -->
			<u-popup v-model:show="showService" :round="20" bgColor='#F5FBFC'>
				<service-popup @close='showService=false' :policyHtml='produceInfo.policy_html'
					:integralHtml='produceInfo.integral_html' :merchantInfo='produceInfo.merchant_info'></service-popup>
			</u-popup>

			<!-- 价格弹框 -->
			<u-popup v-model:show="showPrice" :round="20" bgColor='#F5FBFC'>
				<view>
					<PopupTitle title='价格说明'></PopupTitle>
					<view class="plr-26 font-24 text-0B0B0B mb-60">
						<view>1.本起价是可选活动日期中，按单人出行核算的最低单人价格。</view>
						<view>2.儿童报价说明，儿童均为不占床、不含门票、不含早餐的价格（如在套餐费用说明有特别说明除外）</view>
						<view>3.产品价格会根据您所选活动日期、出行人数、游客类型以及所选附加项目的不同而有所差别。</view>
					</view>

					<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB)" @click="showPrice=false"
						:custom-style="{height:'100rpx'}">我知道了</u-button>
				</view>
			</u-popup>

			<SharePopup ref="share"></SharePopup>
		</view>
	</view>
</template>

<script setup>
	import brightSpot from './components/brightSpot.vue';
	import journey from './components/journey.vue';
	import cost from './components/cost.vue';
	import ServicePopup from './components/ServicePopup.vue';
	import SetMealNotice from './components/SetMealNotice.vue';
	import service1 from '../../static/img/tour/service-1.png';
	import service2 from '../../static/img/tour/service-2.png';
	import service3 from '../../static/img/tour/service-3.png';
	import {
		ref,
		computed
	} from 'vue';
	import {sys} from '@/utils/util.js'
	let height = sys().statusBarHeight+44;
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		product_details
	} from '@/api/tourism.js';
	import { collectproduct } from '@/api/mine';
	let share = ref(null)
	let rate = ref(4);
	let autoplay = ref(false);
	let swiperList = ref([
		'https://cdn.uviewui.com/uview/swiper/swiper1.png',
		'https://cdn.uviewui.com/uview/swiper/swiper2.png',
		'https://cdn.uviewui.com/uview/swiper/swiper3.png',
	])
	let list4 = ref([{
			img: service1,
			name: '支持退款'
		},
		{
			img: service2,
			name: '赠送积分'
		},
		{
			img: service3,
			name: '服务商家'
		}
	])

	let noticeList = computed(() => {
		return produceInfo.value.buy_log.dataList.map(_ => _.user_name)
	})

	let tripSummary = ref([{
			name: '亮点'
		},
		{
			name: '行程'
		},
		{
			name: '费用'
		},
		{
			name: '须知'
		}
	])
	let produceInfo = ref({})
	let choose_tripSummary = ref(0);
	let showService = ref(false);
	let showPrice = ref(false);
	let selectDataInfo = ref({
		id: ''
	});
	let skeletonLoading = ref(true)
	onLoad((e) => {
		product_details({
			id: e.id
		}).then(res => {
			produceInfo.value = res;
			for (let item of produceInfo.value.tourism_spec) {
				if (item.buy_people <= item.people) {
					
					selectDataInfo.value = item;
					return;
				}
			}
		}).finally(_ => {
			skeletonLoading.value = false
		})
	})


	const subOrder = () => {
		if(selectDataInfo.value.id){
			uni.navigateTo({
				url: `/pages_home/pages/fillOrder/fillOrder?spec_id=${selectDataInfo.value.id}`
			})
		}else{
			uni.showToast({
				icon:"none",
				title:"暂无套餐规格可选择"
			})
		}
		
	}
	const selectDate = (item) => {
		
		if (item.buy_people >= item.people) return;
		selectDataInfo.value = item;
		
	}
	
	const share_fn = () => {
		console.log(2)
		share.value.showShare = true
	}
	const BoFang = () => {
		if (!autoplay.value) autoplay.value = true;
	}
	const iscollect = () => {
		collectproduct({'id':produceInfo.value.id,'type':1}).then(res => {
			produceInfo.value.is_collect = res.is_collect
		})
	}
</script>

<style lang="scss">
	page {
		background: #F7FDFE;
	}
</style>
<style lang="scss" scoped>
	.tour-detail {
		padding-bottom: 200rpx;
	}

	.arrow-right {
		width: 36rpx;
		height: 25rpx;
	}

	.service {
		width: 100%;
		height: 80rpx;
		margin-top: 43rpx;
		margin-bottom: 33rpx;
		position: relative;

		.service-bg {
			width: 100%;
			height: 100%;
		}

		.service-content {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			padding: 0 24rpx;
			box-sizing: border-box;
		}
	}

	.scroll-date {
		white-space: nowrap;
		width: 100%;

		.scroll-date-item {
			display: inline-block;
			width: 302rpx;
			height: 187rpx;
			background: #f0f0f0;
			border-radius: 10rpx;
			box-sizing: border-box;
			position: relative;

			// text-align: center;
			// font-size: 36rpx;
			&-bg {
				width: 100%;
				height: 100%;
			}

			&-content {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				padding: 10rpx;
				box-sizing: border-box;
			}
		}
	}

	.apply-notice {
		background: rgba(7, 145, 253, .13);
		// width: 94%;
		// margin-left: 3%;
		border-radius: 10rpx;
		display: flex;
		height: 64rpx;
		margin-top: 24rpx;
	}

	.evaluate-item {

		&-avatar {
			width: 84rpx;
			height: 84rpx;
			border-radius: 50%;
		}
	}

	.trip-active {
		font-weight: 500;
		font-size: 28rpx;
		color: #0B0B0B;
	}

	.trip-active::before {
		position: absolute;
		content: '';
		width: calc(100% + 32rpx);
		height: 15rpx;
		background: linear-gradient(180deg, #FFE401, #2EDEFF);
		border-radius: 8rpx;
		bottom: 0;
		left: -16rpx;
		z-index: 0;
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
		z-index: 9999;
		align-items: center;

		&-right {
			background: linear-gradient(180deg, #F3CD4D, #E54925);
			border-radius: 15rpx;
			font-weight: 500;
			font-size: 30rpx;
			color: #FFFFFF;
			padding: 16rpx 60rpx;
		}
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
</style>