<template>
	<view class="myorders pt-34">
		<up-navbar :autoBack="true" placeholder>
			<template #center>
				<view class="flex items-center" @click="handledropdown">
					<view class="font-32 text-black font-medium">
						我的订单
					</view>
					<view class="pl-18" v-if="!is_opendrowdown">
						<up-icon size="26rpx" color="#000000" name="arrow-down"></up-icon>
					</view>
					<view class="pl-18" v-else>
						<up-icon size="26rpx" color="#000000" name="arrow-up"></up-icon>
					</view>
				</view>
			</template>
		</up-navbar>
		<view class="diy-popup">
			<u-transition :show="is_opendrowdown" mode="slide-down">
				<view class="ptb-50 plr-26 bg-white box-shadow-1">
					<up-search :show-action="true" actionText="搜索" shape=square :animation="true" :clearabled="false"
						v-model="paramsInfo.keyword" placeholder="搜索关键字/目的地" @search="handleSearch"
						@custom="handleSearch" height="76rpx" :action-style="actionStyle"></up-search>
					<view class="pt-26">
						<view class="flex flex-wrap gap-26 items-center">
							<view v-for="(item,index) in searchlist">
								<view
									:class="[`text-6E7171 font-22 search-label bg-white `,index==paramsInfo.type ? `bg-F3C720` : ``]"
									@click="handleorderType(index)">
									{{item}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-transition>
		</view>
		<view class="pl-36 flex justify-between pr-10">
			<view class="relative" :class="[`font-regular font-26 text-767676`,choosetype == index ?'tab_active':'']"
				v-for="(item,index) in menulist" :key="item" @click="handlechoosetype(index)">
				<view class="relative zindex20">
					{{item}}
				</view>
			</view>
		</view>
		<view class="bg-white box-shadow-1 m-24 pr-16 border-radius-20" v-for="item in orderListData"
			:key="item.product_id">
			<navigator :url="`/pages_mine/pages/myordersdetail/myordersdetail?id=${item.id}&type=${item.type}`">
				<view class="pl-22 ptb-22 flex justify-between items-center">
					<view class="flex items-center">
						<image src="../../static/img/myorders/order.png" class="width-28" mode="widthFix"></image>
						<view class="font-medium font-24 text-0B0B0B pl-10">
							{{item.type == 1 ? '旅游' : item.type == 2 ? '商品' : item.type == 3 ? '积分商品' : ''}}
							{{item.order_no}}
						</view>
					</view>
					<view
						:class="[`font-24 font-regular`, item.status == 0 ? 'text-767676' : item.status == 7 || item.status == 6 ? 'text-02FE2B': 'text-FB0606']"
						v-if="item.type == 1">
						{{item.status == 0 ? '订单关闭' : item.status == 1 && item.type == 1 ? '待确认' : item.status == 2 ? 
						'待付款' : item.status == 3 ? '待核验' :item.status == 4?'待评价':item.status == 5?'退款中':
						 item.status == 6?'退款成功':item.status == 7?'订单完成':item.status == 8?'删除订单':''}}
					</view>
					<view
						:class="[`font-24 font-regular`, item.status == 0 ? 'text-767676' : item.status == 7 || item.status == 6 ? 'text-02FE2B': 'text-FB0606']"
						v-else>
						{{item.status == 0 ? '订单关闭' : item.status == 1 ? '待付款' : item.status == 2 ? 
						'待发货' : item.status == 3 ? '待签收' :item.status == 4?'待评价':item.status == 5 ?'待审核':
						 item.status == 6?'退款成功':item.status == 7?'订单完成':item.status == 8?'删除订单':item.status == 9 ? '拒绝退货' :item.status == 10 ? '申请退货退款':item.status == 11?
				 '同意退款退货':item.status=12 ? '退货物流中':item.status = 13 ?'退货退款完成':
				 item.status = 14 ? '拒绝退货退款':''}}
					</view>
				</view>
				<view class="pt-10 pl-22 flex justify-between">
					<view>
						<image :src="item.product_img" class="myorders-img" mode=""></image>
					</view>
					<view class="pl-12" v-if="item.type == 1">
						<view class="2text-line font-26 ptb-20 font-medium text-0B0B0B">
							{{item.product_name}}
						</view>
						<view class="font-regular font-20 text-767676">
							{{item.spec_json.start_day}}({{item.spec_json.start_day_week}}) -
							{{item.spec_json.end_day}}({{item.spec_json.start_day_week}})
						</view>
						<view class="font-regular font-20 ptb-20 text-767676">
							{{item.spec_json.number}}成人/{{item.spec_json.kid_number}}儿童
						</view>
						<view class="flex justify-end font-bold pb-20 font-26 text-E6722D">
							¥{{item.amount}}
						</view>
					</view>
					<view class="pl-12" v-else>
						<view class="2text-line font-26 ptb-20 font-medium text-0B0B0B">
							{{item.product_name}}
						</view>
						<view class="font-regular font-20 text-767676">
							{{item.spec_json.spec}}
						</view>
						<view class="font-regular font-20 ptb-20 text-767676">
							数量：{{item.spec_json.number}}
						</view>
						<view class="flex justify-end font-bold pb-20 font-26 text-E6722D" v-if="item.type == 2">
							¥{{item.spec_json.price}}
						</view>
						<view class="flex justify-end font-bold pb-20 font-26 text-E6722D" v-else>
							<view class="text-black font-regular font-26">积分消耗</view>
							<view class="pl-20">{{item.spec_json.price}}</view>
						</view>
					</view>
				</view>
			</navigator>
			<view class="pb-20" v-if="item.status == 0">
				<button type="default"
					style="width:176rpx;border:none;margin-right:0; height: 58rpx;line-height: 58rpx; color:#ffffff;background: linear-gradient(180deg, #F3CD4D, #E54925);border-radius: 11rpx; 
					font-size:24rpx; font-weight: 500;" @click="jumpproductDetail(item)">重新预定</button>
			</view>
			<view class="pb-20" v-else-if="item.status == 1 || item.status == 2">
				<view v-if="item.type != 1 && item.status == 1">
					<button type="default"
						style="width:176rpx;border:none;margin-right:0; height: 58rpx;line-height: 58rpx; color:#ffffff;background: linear-gradient(180deg, #F3CD4D, #E54925);border-radius: 11rpx; font-size:24rpx; font-weight: 500;">立即付款</button>
				</view>
				<view v-else-if="item.type == 1 && item.status == 2">
					<button type="default"
						style="width:176rpx;border:none;margin-right:0; height: 58rpx;line-height: 58rpx; color:#ffffff;background: linear-gradient(180deg, #F3CD4D, #E54925);border-radius: 11rpx; font-size:24rpx; font-weight: 500;" @click="jumptourism(item.id,item.type)">立即付款</button>
				</view>
				
			</view>
			<view class="pb-20" v-else-if="item.status === 3">
				<view v-if="item.type == 1">
					<button type="default"
						style="width:176rpx;border:none;margin-right:0; height: 58rpx;line-height: 58rpx; color:#ffffff;background:#3D91F5;border-radius: 11rpx; font-size:24rpx; font-weight: 500;">出示核验码</button>
				</view>
				<view v-else>
					<view v-if="item.express_type == 2">
						<button type="default"
							style="width:176rpx;border:none;margin-right:0; height: 58rpx;line-height: 58rpx; color:#ffffff;background:#3D91F5;border-radius: 11rpx; font-size:24rpx; font-weight: 500;">出示核验码</button>
					</view>
					<view v-else>
						<button type="default"
							style="width:176rpx;border:none;margin-right:0; height: 58rpx;line-height: 58rpx; color:#ffffff;background:#EDC74B;border-radius: 11rpx; font-size:24rpx; font-weight: 500;" @click="signOrder(item.id)">确认收货</button>
					</view>
				</view>
			</view>
			<view class="pb-20" v-else-if="item.status === 4">
				<button type="default"
					style="width:176rpx;border:none;margin-right:0; height: 58rpx;line-height: 58rpx; color:#ffffff;background:#EDC74B;border-radius: 11rpx; font-size:24rpx; font-weight: 500;" @click="jumpCommentpage(item)">待评价</button>
			</view>
		</view>
		<backTop></backTop>
		<u-overlay :show="is_opendrowdown" zIndex="9" @click="is_opendrowdown=!is_opendrowdown"></u-overlay>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		orderList,order_sign_order
	} from '@/api/order';
	import {
		onLoad,
		onReachBottom,onShow
	} from '@dcloudio/uni-app'
	const menulist = ref(['全部', '待确认', '待付款', '已付款', '待评价', '退款/售后'])
	// 默认全部
	const choosetype = ref(0)
	let orderListData = ref([])
	let paramsInfo = reactive({
		page: 1,
		limit: 10,
		tab: '',
		type: 0,
		keyword: ''
	})
	let noMoreData = ref(false)
	const getOrderList = () => {
		orderList({
			...paramsInfo
		}).then(res => {
			if (paramsInfo.page > 1) {
				orderListData.value.push(...res.dataList);
			} else {
				orderListData.value = res.dataList
			}
			if (orderListData.value.length >= res.total) {
				noMoreData.value = true
			} else {
				noMoreData.value = false;
			}
		})
	}

	const handlechoosetype = (num) => {
		paramsInfo.page = 1
		orderListData.value = []
		choosetype.value = num
		paramsInfo.tab = num
		getOrderList()
	}
	onLoad((query) => {
		choosetype.value = query.page
		paramsInfo.tab = choosetype.value
		getOrderList()
	})
	onShow(()=>{
		uni.$on("deleteOrder", res => {
			console.log(res.id)
			orderListData.value = orderListData.value.filter(item=>item.id != res.id)
		})
	})
	// 我的订单下拉框
	const actionStyle = reactive({
		'width': '62px',
		'height': '60rpx',
		'display': 'flex',
		'align-items': 'center',
		'background': '#F3C720',
		'justify-content': 'center',
		'border-radius': '10rpx',
		'color': '#FFFFFF',
		"position": "absolute",
		'right': '40rpx',
	})
	const is_opendrowdown = ref(false)
	const handledropdown = () => {
		is_opendrowdown.value = !is_opendrowdown.value
	}
	// 搜索的标签数据
	const searchlist = reactive(['全部订单', '旅游订单', '商品订单', '积分商品订单'])
	// 点击搜索时
	const handleSearch = () => {
		if (!paramsInfo.keyword) return;
		getOrderList()
		is_opendrowdown.value = false
	}
	// 选择订单类型

	const handleorderType = (num) => {
		paramsInfo.page = 1
		paramsInfo.type = num
		getOrderList()
		is_opendrowdown.value = false

	}
	const jumptourism = (id,type) =>{
		console.log(id,type)
		uni.navigateTo({
			url:`/pages_mine/pages/myordersdetail/myordersdetail?id=${id}&type=${type}&pop=true`
		})
	}
	// 待评价
	const jumpCommentpage = (item) => {
		uni.navigateTo({
			url:`/pages_mine/pages/orderreviews/orderreviews?id=${item.id}&type=${item.type}` 
		})
	}
	const signOrder = (order_id) => {
		order_sign_order({'order_id':order_id}).then(
			orderListData.value = orderListData.value.filter(item => item.id != order_id)
		)
		// getOrderList()
		console.log('确认收货',order_id)
	}
	// 重新预定，跳转产品详情
	const jumpproductDetail = (item) => {
		if(item.type == 1){
			uni.navigateTo({
				url:"/pages_home/pages/tourDetails/tourDetails?id=" + item.product_id
			})
		}else{
			uni.navigateTo({
				url:"/pages_shop/pages/shopdetail/shopdetail?id="  + item.product_id
			})
		}
	}
	onReachBottom(() => {
		if (noMoreData.value) return;
		paramsInfo.page++;
		getOrderList()
	})
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.diy-popup {
		position: fixed;
		width: 100%;
		top: 80rpx;
		left: 0;
		border-radius: 0rpx 0rpx 15rpx 15rpx;
		z-index: 30;
		overflow: hidden;

	}

	.diy-popup-content {
		background-color: #fff;
		box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(15, 9, 13, 0.06);
	}

	.pt-34 {
		padding-top: 34rpx;
	}

	.pl-36 {
		padding-left: 36rpx;
	}

	.zindex20 {
		z-index: 20;
	}

	.myorders-img {
		width: 235rpx;
		height: 223rpx;
		border-radius: 10rpx;
	}

	.font-32 {
		font-size: 32rpx;
	}

	.search-label {
		height: 59rpx;
		border-radius: 10rpx;
		border: 1px solid #767676;
		line-height: 59rpx;
		padding-left: 34rpx;
		padding-right: 34rpx;
	}

	.gap-26 {
		gap: 26rpx;
	}
	::v-deep .uni-button:after{
		border: none !important;
	}
	
</style>