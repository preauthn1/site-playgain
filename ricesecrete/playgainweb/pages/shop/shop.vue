<template>
	<view class="shop">
		<image src="/static/image/login/login-bg.png" class="login-bg" mode="widthFix"></image>
		<u-navbar bgColor="transparent" @leftClick="opensidebar" :fixed="false" placeholder @rightClick="jumpmessage">
			<template #left>
				<up-icon name="list" color="#fff" size="42rpx"></up-icon>
			</template>
			<template #center>
				<view>
					<u-search shape="square" :showAction="false" placeholder="搜索商品名称" searchIconColor="#E8FAFE"
						placeholderColor="#E8FAFE" bgColor=" #00b3d2" height="60rpx" @click="toSearch" disabled
						:input-style="{'pointer-events': 'none'}">
					</u-search>
				</view>
			</template>
			<template #right>
				<MessageIcon></MessageIcon>
			</template>
		</u-navbar>
		<view class="pt-40 plr-26 relative zIndex1">
			<view class="flex justify-between pl-10">
				<view class="relative" :class="[`font-28 font-regular text-white`,queryparams.order == item.name ?'tab_active':'']"
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
						<view class="flex items-center">
							<view class="font-30 font-bold text-E6722D">
								¥{{item.min_price}}
							</view>
							<view class="pl-10 text-767676 font-20 font-regular">
								起
							</view>
						</view>

						<view class="font-regular font-20 text-767676">
							已售{{item.buy}}件
						</view>
					</view>
					<view
						:class="[`product-type text-white font-22 font-regular`,item.express_type == 1 ? `bg-A593F7` : 'bg-EDC74B']">
						{{item.express_type == 1 ? '邮寄' : '到店'}}
					</view>
				</view>
			</view>
		</view>
		<view class="fixed-btn">
			<view class="flexd-btn-size flex justify-center items-center" @click="scrollToTop">
				<image src="/static/image/home/top.png" class="width-87" mode="widthFix"></image>
			</view>
			<navigator url="/pages_shop/pages/shoppingcart/shoppingcart" class="flexd-btn-size mt-20 flex justify-center items-center">
				<image src="/static/image/home/cart.png" class="width-87" mode="widthFix"></image>
			</navigator>
		</view>
		<!-- 侧边导航 -->
		<up-popup :show="showsidebar" mode="left" @close="showsidebar = false">		
			<view class="mt-84 sidebar-title">
				<view class="mb-71 font-26 font-medium text-center " :class="is_active == index ? `text-0790FD` :``" v-for="(item,index) in sidebarList" @click="handletitle(index)">
					{{item.name}}
				</view>
			</view>
			<view class="sidebar-content mt-84">
				<view class="mb-100">
					<!-- <view class="pb-40">
						<image src="../../static/image/home/1.png" class="shop-img"></image>
					</view> -->
					<view class="pb-40" v-for="item in secondaryList">
						<view class="relative pb-20 font-medium font-26 text-black headings">
							{{item.name}}
						</view>
						<view class="flex flex-wrap gap18 pt-20" v-if="item.children">
							<view class="flex flex-col items-center" v-for="item2 in item.children">
								<image :src="item2.img" class="sidebarlist-icon"  @click="handlejumplist(item2)"></image>
								<view class="text-767676 font-24 pt-14">
									{{item2.name}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</up-popup>
		<MidTabbar></MidTabbar>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {onReachBottom} from '@dcloudio/uni-app'
	import { goodstype,good_product_list } from '@/api/shop'; 
	import {
		useUserStore
	} from '@/store';
	const store = useUserStore()
	const shopType = reactive([{title:'热门商品',name:'hot'}, {title:'全部商品',name:'all'}, {title:'上新商品',name:'new'}])
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
	let queryparams = reactive({
		classify:2,
		tab:'all',
		order:'hot',
		rank:''
	})
	const showsidebar = ref(false)
	let sidebarList = ref([])
	let secondaryList = ref([])
	const opensidebar = ()=> {
		showsidebar.value = true
	}
	// 点击侧边导航标题
	const is_active = ref(0)
	const handletitle = (num) =>{
		is_active.value = num
		secondaryList.value = sidebarList.value[num].children
	}
	goodstype().then(res => {
		sidebarList.value = res
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
	//跳转消息页面
	
	const jumpmessage = () => {
		console.log(store.tokenInfo)
		if (!store.tokenInfo.token) {
			uni.navigateTo({
				url: "/pages_others/pages/login/login"
			})
		} else {
			uni.navigateTo({
				url: "/pages_home/pages/message/message"
			})
		}
	
	}
	get_product_list()
	//跳转商品搜索页面
	const toSearch = () => {
		uni.navigateTo({
			url: "/pages_shop/pages/shopsearch/shopsearch"
		})
	}
	// 回到顶部
	const scrollToTop = () => {
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 300,
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

<style lang="scss">
	.shop {
		padding-bottom: 160rpx;
	}

	.mt-84 {
		margin-top: 100rpx;
	}
	
	.login-bg {
		width: 100%;
		position: absolute;
		top: 0;
	}

	::v-deep .u-search {
		width: 577rpx;
	}

	.mb-71 {
		padding-bottom: 71rpx;
	}
	.mb-100{
		margin-bottom: 140rpx;
	}
	.zindex20 {
		z-index: 20;
	}

	.commodity-list {
		width: 339rpx;
		height: 508rpx;
		border-radius: 15rpx;
	}

	.product-images {
		width: 339rpx;
		height: 346rpx;
		border-radius: 15rpx 15rpx 0 0;
	}
	.width-87{
		width: 87rpx;
	}
	.product-type {
		position: absolute;
		top: 0;
		right: 0;
		width: 125rpx;
		height: 41rpx;
		border-radius: 0 15rpx 0 15rpx;
		padding: 3rpx 0;
		text-align: center;
		line-height: 41rpx;
	}
	.sidebar-content{
		display: inline-block;
		overflow: hidden;
		overflow-y: scroll;
		width:410rpx;
		padding-right: 16rpx;
		height: 100vh;
		
		
	}
	.sidebar-title {
		display: inline-block;
		overflow: hidden;
		overflow-y: scroll;
		height: 100vh;
		width: 120rpx;
		
	}
	// .flexd-btn-size {
	// 	width: 58rpx;
	// 	height: 56rpx;
	// 	background: #0793FF;
	// 	border-radius: 10rpx
	// }

	.fixed-btn {
		position: fixed;
		right: 26rpx;
		bottom: 300rpx;
		z-index: 20;
	}
	.shop-img {
		width: 404rpx;
		height: 150rpx;
		border-radius: 10rpx;
	}

	.headings::after {
		content: "";
		width: 100%;
		height: 1rpx;
		background: #000000;
		position: absolute;
		bottom: 0;
		left: 0;
		opacity: 0.09;
	}

	.sidebarlist-icon {
		width: 123rpx;
		height: 123rpx;
		background: #000000;
		border-radius: 10rpx;
	}
	.gap18 {
		gap: 18rpx;
	}
	
</style>