<template>
	<view class="sidebarlist">
		<up-navbar :autoBack="true" placeholder titleStyle="font-weight:500;font-size:32rpx;">
			<template #center>
				<view>
					<u-search shape="square" v-model="queryparams.keyword" :showAction="false" placeholder="搜索商品"
						actionText="搜索" @custom="get_product_list" @search="get_product_list"
						:actionStyle="actionStyle" height="60rpx"
						margin='0 -50rpx 0 0'>
					</u-search>
				</view>
			</template>
		</up-navbar>
		<view class="flex justify-between items-center font-regular font-28 text-D8D6D6 pt-30 plr-28">
			<view :class="[queryparams.tab === 'all' ? `text-EDC74B` : ``]" @click="handlesort('all')">
				综合
			</view>
			<view :class="[queryparams.tab === 'buy' ? `text-EDC74B` : ``]" @click="handlesort('buy')">
				销量
			</view>
			<view class="flex items-center" @click="handlesort('price')">
				<view :class="[queryparams.tab === 'price' ? `text-EDC74B` : ``]">
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
		<up-empty
		marginTop="50"
		mode="data"
		        text="暂无数据"
		        textSize="30rpx"
		 v-if="productList.length <= 0">
		</up-empty>
		<view class="mt-10 flex justify-between flex-wrap plr-26" v-else>
			
			<view class="commodity-list box-shadow-1 mt-28 relative" v-for="item in productList" :key="item.id">
				<image :src="item.img" class="product-images" @click="jumpprodctdetail(item.id,item.express_type)"></image>
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
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import { good_product_list } from '@/api/shop';
	import {onLoad,onReachBottom} from '@dcloudio/uni-app'
	// 按类型进行排序
	let pageInfo = reactive({
		page:1,
		limit:10
	})
	let queryparams = reactive({
		type_id:'',
		tab:'all',
		classify:2,
		rank:'',
		keyword:''
	})
	let productList = ref([])
	let noMoreData = ref(false);
	// 价格
	const sortprice = ref(true)
	const is_price = ref(true)
	const jumpprodctdetail = (id,type) => {
		uni.navigateTo({
			url:`/pages_shop/pages/shopdetail/shopdetail?id=${id}`
		})
	}
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
	const get_product_list = () =>{
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
	onReachBottom(() => {
		if (noMoreData.value) return;
		pageInfo.page++;
		get_product_list()
	})
	onLoad((query)=>{
		queryparams.keyword = query.keyword
		get_product_list()
	})
	
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss">
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
	::v-deep .u-search__content{
		width: 580rpx;
	}
	.message-icon {
		position: absolute;
		top: -8px;
		right: 0px;
		border-radius: 50%;
		line-height: 30rpx;
	}
</style>