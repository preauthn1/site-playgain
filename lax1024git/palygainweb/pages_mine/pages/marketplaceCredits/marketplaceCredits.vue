<template>
	<view class="marketplaceCredits">
		<up-navbar title="积分商城" @rightClick="rightClick" :titleStyle="{'font-size':'32rpx','font-weight':'500'}"
			:autoBack="true" placeholder>
			<template #right>
				<view class="flex">
					<image src="/pages_mine/static/img/marketplaceCredits/redemptionhistory.png" class="width-34"
						mode="widthFix"></image>
					<view class="ml-14 font-medium font-24 text-EDC74B">
						兑换记录
					</view>
				</view>
			</template>
		</up-navbar>
		<view class="pt-40 plr-26 relative zIndex1">
			<view class="flex justify-between pl-10">
				<view class="relative" :class="[`font-28 font-regular text-767676`,queryparams.order == item.name ?'tab_active':'']"
					v-for="item in shopType" :key="item.name" @click="handlechoosetype(item.name)">
					<view class="relative zindex20">
						{{item.title}}
					</view>
				</view>
			</view>
			<view class="flex justify-between items-center font-regular font-28 text-D8D6D6 pt-30">
				<view :class="[queryparams.tab == 'all' ? `text-EDC74B` : ``]" @click="handlesort('all')">
					综合
				</view>
				<view :class="[queryparams.tab == 'buy' ? `text-EDC74B` : ``]" @click="handlesort('buy')">
					销量
				</view>
				<view class="flex items-center" @click="handlesort('price')">
					<view :class="[queryparams.tab == 'price' ? `text-EDC74B` : ``]">
						价格
					</view>
					<view class="pl-8">
						<view v-if="sortprice">
							<up-icon color="#D8D6D6" name="arrow-up" size="20rpx"></up-icon>
							<up-icon color="#D8D6D6" name="arrow-down" size="20rpx"></up-icon>
						</view>
		
						<view v-else>
							<up-icon name="arrow-down" size="20rpx" color="#D8D6D6" v-if="!is_price"></up-icon>
							<up-icon name="arrow-up" size="20rpx" color="#D8D6D6" v-else></up-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="mt-10 flex justify-between flex-wrap">
				<view class="commodity-list box-shadow-1 mt-28 relative" v-for="item in productList" @click="jumpprodctdetail(item.id)">
					<image :src="item.img" class="product-images"></image>
					<view class="mt-12 plr-14 font-26 font-medium text-0B0B0B text-2line">
						{{item.title}}
					</view>
					<view class="pt-20 flex justify-between plr-14 items-center">
						<view class="font-30 font-bold text-E6722D">
							{{item.min_integral}}积分
						</view>
						<view class="font-regular font-20 text-767676">
							库存{{item.store}}件
						</view>
					</view>
					<view
						:class="[`product-type text-white font-22 font-regular`,item.express_type == 1 ? `bg-A593F7` : 'bg-EDC74B']">
						{{item.express_type == 1 ? '邮寄' : '到店'}}
					</view>
				</view>
			</view>
		</view>
		<backTop></backTop>
	</view>
	
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {onReachBottom,onPageScroll} from '@dcloudio/uni-app'
	import { goodstype,good_product_list } from '@/api/shop'; 
	const shopType = reactive([{title:'热门兑换',name:'hot'}, {title:'全部商品',name:'all'}, {title:'上新商品',name:'new'}])
	const handlechoosetype = (num) => {
		if(queryparams.order == num)return
		pageInfo.page = 1
		queryparams.order = num
		get_product_list()
	}
	let productList = ref([])
	let noMoreData = ref(false);
	let pageInfo = reactive({
		page:1,
		limit:10
	})
	// onPageScroll 方法来更新 scrollTop 的值  
	onPageScroll((e) => {
	});
	let queryparams = reactive({
		classify:3,
		tab:'all',
		order:'hot',
		rank:''
	})
	// 价格
	const sortprice = ref(true)
	const is_price = ref(true)
	const handlesort = (num) => {
		if (num === 'price') {
			queryparams.tab = num
			if(is_price.value){
				queryparams.rank = 'desc'
			}else{
				queryparams.rank = 'asc'
			}
			get_product_list()
			sortprice.value = false
			is_price.value = !is_price.value
	
		} else {
			if(queryparams.tab == num)return
			queryparams.tab = num
			get_product_list()
			sortprice.value = true
		}
	}
	const handlejumplist = (item) => {
		uni.navigateTo({
			url: `/pages_shop/pages/sidebarlist/sidebarlist?id=${item.id}&title=${item.name}`
		})
	}
	const get_product_list = (params) =>{
		good_product_list({...queryparams,...pageInfo}).then(res =>{
			if (pageInfo.page > 1) {
				productList.value.push(...res.dataList);
			} else {
				productList.value = res.dataList;
			}
			if (productList.value.length >= res.total) {
				noMoreData.value = true
			} else {
				noMoreData.value = false;
			}
		})
	}
	get_product_list()
	//跳转商品搜索页面
	const toSearch = () => {
		uni.navigateTo({
			url: "/pages_shop/pages/shopsearch/shopsearch"
		})
	}
	const rightClick = () => {
		uni.navigateTo({
			url:"/pages_mine/pages/exchangerecords/exchangerecords"
		})
	}
	onReachBottom(() => {
		if (noMoreData.value) return;
		pageInfo.page++;
		get_product_list()
	})
	//跳转商品详情页
	const jumpprodctdetail = (id) => {
		uni.navigateTo({
			url:`/pages_shop/pages/shopdetail/shopdetail?id=${id}`
		})
	}
	
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.marketplaceCredits{
		padding-bottom: 80rpx;
	}
	.width-34 {
		width: 34rpx;
	}

	.active {
		position: relative;
		font-weight: 500;
		font-size: 28rpx;
		color: #0B0B0B;
		z-index: 1;
	}
	.zindex20 {
		z-index: 20;
	}
	.active:after {
		content: "";
		position: absolute;
		width: 100%;
		height: 0.46875rem;
		background: linear-gradient(0deg, #FBE44D, #6BDBFB);
		border-radius: 0.25rem;
		left: 0;
		bottom: 0;
		z-index: -1;
	}
	.commodity-list{
		width: 339rpx;
		height: 508rpx;
		border-radius: 15rpx;
	}
	.product-images{
		width: 339rpx;
		height:346rpx;
		border-radius: 15rpx 15rpx 0 0;
	}
	::v-deep .u-back-top{
		background: none !important;
	}
	.product-type{
		position: absolute;
		top: 0;
		right: 0;
		width: 125rpx;
		height: 41rpx;
		border-radius:0 15rpx 0 15rpx;
		padding: 3rpx 0;
		text-align: center;
		line-height: 41rpx;
	}
</style>