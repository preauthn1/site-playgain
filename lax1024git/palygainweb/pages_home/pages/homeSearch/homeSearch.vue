<template>
	<view class="search">
		<image src="../../../static/image/login/login-bg.png" class="login-bg" mode="widthFix"></image>
		<u-navbar bgColor="transparent" leftIconColor="#fff" :autoBack="true" :fixed="false" placeholder>
			<template #center>
				<u-search shape="square" :actionStyle="actionStyle" v-model="queryParams.keyword" placeholder="搜索关键词/目的地" searchIconColor="#E8FAFE"
					placeholderColor="#E8FAFE" bgColor=" #00b3d2" @search="handleSearch" @custom="handleSearch"
					height="60rpx" margin="0 25rpx 0 76rpx" :clearabled="false">
				</u-search>
			</template>
		</u-navbar>
		<!-- 搜索页面 -->
		<view v-if="is_histrySearch">
			<view class="pl-24 pr-26 relative zIndex1" v-if="keyword.length">
				<view class="flex justify-between items-center">
					<view class="font-30 font-medium text-0B0B0B line-center">
						历史搜索
					</view>
					<view v-if="finish" @click="handleIscancel" class="pr-20">
						<image src="../../../static/image/home/delete.png" class="width-26 height-26"></image>
					</view>
					<view v-else class="font-30 font-medium text-0B0B0B line-center pr-20" @click="handleIscancel">
						完成
					</view>
				</view>
			</view>
			<view class="p-24">
				<view class="flex flex-wrap gap32">
					<view class="" v-for="(item,index) in  keyword" :key="index">
						<view class="history-btn relative">
							<view class="text-style" @click="handleSearch(item)">
								{{item}}
							</view>
							<view class="cancel" v-if="cancel">
								<image src="../../static/img/homeSearch/cancel.png" class="width-30 height-30"
									@click="deletekeywords(item)">
								</image>
							</view>
						</view>
					</view>
				</view>
				<view class="mt-40 relative zIndex1">
					<ContentTitle title="搜索推荐"></ContentTitle>
					<CardList v-model="productList" ref='CL'></CardList>
				</view>
			</view>
			<view class="mt-22 p-24">
				<ContentTitle title="新品推荐"></ContentTitle>
				<CardList v-model="newproductList" ref='CL_new'></CardList>
			</view>
		</view>
		<!-- 点击搜索时的页面 -->
		<view v-else class="relative zIndex1 pt-30">
			<view class="pl-24 text-D8D6D6 font-26 font-regular">
				<view class="flex items-center">
					<view class="text-white font-medium flex-shrink">
						出游时间：
					</view>
					<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" >
						<view :class="[`scroll-view-item_H`,queryParams.day == 0 ? `active bg-F3C720 text-white` :``]"
							@click="choosedays(0)">
							不限
						</view>
						<view :class="[`scroll-view-item_H`,queryParams.day == item ? `active bg-F3C720 text-white` :``]" v-for="item in 8" @click="choosedays(item)">
							{{item}}{{item === 7 ?'天以上' :'天'}}
						</view>
					</scroll-view>
					
				</view>
				<view class="flex mt-20 items-center mr-20">
					<view class="mr-10 text-white font-medium">
						出发日期:
					</view>
					<uni-datetime-picker type="date" :clear-icon="false" v-model="queryParams.start_day" @maskClick="maskClick"
						placeholder="开始时间" @change="get_product_list" />
					<view class="mlr-10"> ——— </view>
					<uni-datetime-picker type="date" :clear-icon="false" v-model="queryParams.end_day" @maskClick="maskClick"
						placeholder="返程时间" @change="get_product_list" />
					<view class="pl-30">
						<image src="../../static/img/homeSearch/cancel.png" class="width-30" mode="widthFix" @click="cleartime"></image>
					</view>
					
				</view>
			</view>
			<!-- 搜索结果 -->
			<view class="pl-24">
				<up-empty mode="search" text="暂无搜索结果" iconColor="#000000" textColor="#000000" iconSize="90rpx" v-if="!searchproductList.length" marginTop="50%"></up-empty>
				<CardList ref='CL_search'></CardList>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { search_recommendations,search_new ,deletekeyword} from '@/api/home';
	import {
		ref,
		reactive
	} from 'vue';
	import { tourism_product_list } from '@/api/tourism';
	import {
		onReachBottom,onLoad
	} from '@dcloudio/uni-app';
	import { useUserStore } from '@/store';
	const store = useUserStore()
	const is_histrySearch = ref(true)
	let productList = ref([])
	let newproductList = ref([])
	let searchproductList = ref([])
	const keyword = ref([])
	let newtotal = ref()
	let newpageInfo = reactive({
		page: 1,
		limit: 10
	})
	let pageInfo = reactive({
		page: 1,
		limit: 10
	})
	let longLat = reactive({})
	search_recommendations({'limit':4}).then(res => {
		keyword.value = res.keyword
		productList.value = res.rec
		CL.value.setData(productList.value);
	})
	search_new({...newpageInfo}).then(res => {
		newtotal.value = res.total
		newproductList.value = res.dataList
		CL_new.value.setData(newproductList.value)
	})
	onLoad((query)=>{
		// 获取搜索旅游套餐服务的id
		if (query.type_id == 1) {
			longLat = store.longLat
		}
		queryParams.type_id = query.type_id
	})
	let queryParams = reactive({
		type_id:'',
		day:0,
		start_day:'',
		end_day:'',
		keyword:''
	})
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
		'right': '20rpx',
	})
	let CL = ref(null)
	let CL_new = ref(null)
	let CL_search = ref(null)
	let noMoreData = ref(false);
	//点击搜索时
	const handleSearch = (code) => {
		queryParams.keyword = code
		if(queryParams.keyword){
			is_histrySearch.value = false
			get_product_list()
		}
	}
	// 是否显示取消图标
	const finish = ref(true)
	const cancel = ref(false)
	const handleIscancel = () => {
		finish.value = !finish.value
		cancel.value = !cancel.value
	}
	const deletekeywords = (code) => {
		keyword.value = keyword.value.filter(item => item != code)
		deletekeyword({'keyword':code,'type':1}).then(res =>{
		})
	}
	const choosedays = (day) =>{
		queryParams.day = day
		get_product_list()
	}
	const cleartime = () =>{
		queryParams.start_day = '';
		queryParams.end_day = '';
		get_product_list()
	}
	const get_product_list = (params) => {
		tourism_product_list({...queryParams,...longLat,...pageInfo}).then(res => {
			console.log(res)
			if (pageInfo.page > 1) {
				searchproductList.value.push(...res.dataList);
			} else {
				console.log('hello')
				searchproductList.value = res.dataList;
				console.log(searchproductList.value[0])
			}
			if (searchproductList.value.length >= res.total) {
				noMoreData.value = true;
			} else {
				noMoreData.value = false;
			}
			CL_search.value.setData(searchproductList.value);
		})
	}
	onReachBottom(() => {
		if(is_histrySearch.value){
			if(newtotal.value > newproductList.value.length){
				newpageInfo.page++
				search_new({...newpageInfo}).then(res => {
					newproductList.value.push(...res.dataList) 
					CL_new.value.setData(newproductList.value)
				})
			}
		}else{
			if (noMoreData.value) return;
			pageInfo.page++;
			get_product_list()
		}
	})
</script>

<style lang="scss" scoped>
	.search {
		padding-bottom: 60rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100rpx;
		text-align: center;
		margin-right: 20rpx;
	}

	.login-bg {
		width: 100%;
		position: absolute;
		top: 0;
	}
	.flex-shrink{
		flex-shrink: 0;
	}
	::v-deep .uni-input-input {
		color: #FFFFFF;
	}

	::v-deep .u-search {
		width: 649rpx;
		flex: none;
	}

	.history-btn {
		height: 61rpx;
		border-radius: 12rpx;
		border: 1px solid #D8D6D6;
	}

	.text-style {
		font-weight: 400;
		font-size: 26rpx;
		color: #D8D6D6;
		padding: 24rpx;
		line-height: 15rpx;
	}

	.gap32 {
		gap: 32rpx;
	}


	.cancel {
		position: absolute;
		top: -20rpx;
		right: -12rpx;
	}

	.active {
		width: 108rpx;
		height: 55rpx;
		border-radius: 10rpx;
		text-align: center;
		line-height: 55rpx;
	}

	::v-deep .uniui-calendar:before {
		content: "";
	}

	::v-deep .uni-date-x {
		background: none !important;
		color: #FFFFFF;
		margin-left: -6rpx;
		
	}

	::v-deep .uni-date__x-input {
		padding-left: 0rpx;
		text-align: center;
		height: 56rpx;
		font-size: 20rpx !important;
		line-height: 56rpx;
	}
	::v-deep .uni-date{
		width: 180rpx !important;
		flex: none;
	}
</style>