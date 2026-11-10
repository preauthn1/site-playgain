<template>
	<view class="relative">
		<image src="../../../static/image/login/login-bg.png" class="login-bg" mode="widthFix"></image>
		<u-navbar bg-color="transparent" :fixed="false"  placeholder left-icon-color="#fff" autoBack>
			<template #center>
				<u-search shape="square" v-model="searchValue" :showAction="false" placeholder="搜索城市"
					searchIconColor="#E8FAFE" placeholderColor="#E8FAFE" bgColor=" #00b3d2" @search="handleSearch"
					@custom="handleSearch" height="75rpx" margin='0 25rpx 0 76rpx'>
				</u-search>
			</template>
		</u-navbar>
		<up-index-list :indexList="indexList" v-if="itemArr.length">
			<template #header>
				<view class="plr-20 pt-20">
					<view class="flex justify-between">
						<view>
							<view class="flex justify-between items-center">
								<view class="text-white font-regular font-24 mr-16">
									当前城市
								</view>
								<view class="text-F3C720 font-medium font-30">
									{{store.selectCity?.city}}
								</view>
							</view>
						</view>
						<view>
							<view class="flex justify-between items-center">
								<view class="text-white font-regular font-24 mr-16">
									定位城市
								</view>
								<view class="text-F3C720 font-medium font-30">
									{{store.longLat?.city}}
								</view>
							</view>
					
						</view>
					</view>
					<view class="">
						<view class="font-24 font-regular text-white">
							热门城市
						</view>
						<view class="flex flex-wrap gap27 mb-24">
							<view class="height-61 border-radius-12 border mr-24 mt-24" v-for="(item,index) in city_list" :key="index" @click="onselect(item.city)">
								<view class="ptb-16 plr-28 text-center line-top text-white font-26 font-regular" >
									{{item.city}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<template :key="index" v-for="(item, index) in itemArr">
				<!-- #ifdef APP-NVUE -->
				<up-index-anchor :text="indexList[index]"></up-index-anchor>
				<!-- #endif -->
				<up-index-item>
					<!-- #ifndef APP-NVUE -->
					<up-index-anchor :text="indexList[index]"></up-index-anchor>
					<!-- #endif -->
					<view class="list" v-for="(item1, index1) in item" :key="index1">
						<view class="list__item" @click="onselect(item1)">
							<!-- <image class="list__item__avatar" :src="item1.url"></image> -->
							<text class="list__item__user-name">{{item1}}</text>
						</view>
						<up-line></up-line>
					</view>
				</up-index-item>
			</template>
			<template #footer>
				<view class="u-safe-area-inset--bottom">
					<!-- <text class="list__footer">共305位好友</text> -->
				</view>
			</template>
		</up-index-list>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import { hot_city,city_region } from '@/api/home';
	import {city_location} from '@/api/tourism.js'
	import { useUserStore } from '@/store';
	const store = useUserStore()
	// 
	const handleback = () => {
		uni.navigateBack()
	}
	const city_list = ref([])
	hot_city().then(res => {
		city_list.value = res
	})
	// 创建响应式数据  
	const indexList = ref([]);
	const itemArr = ref([]);
	city_region().then(res => {
		indexList.value = res.initial
		itemArr.value = res.city
	})
	const onselect = (val) => {
		uni.$u.throttle(getIp(val), 500)
	}
	const getIp =(city)=>{
		city_location({city}).then(res=>{
			console.log(res)
			store.setSelectCity({
				lng:res.lng,
				lat:res.lat,
				city:city
			})
			uni.navigateBack({
				delta:1
			})
		})
	}
</script>

<style lang="scss">
	.list {
		
		&__item {
			display: flex;
			box-sizing: border-box;
			width: 100%;
			padding: 24rpx;
			overflow: hidden;
			color: #000000;
			border-bottom: 1px solid #f0f0f0;
			font-size: 26rpx;
			line-height: 64rpx;
			font-weight: 400;
			
			&__user-name {
				font-size: 16px;
				margin-left: 10px;
				color: $u-main-color;
			}
		}
		
		&__footer {
			color: $u-tips-color;
			font-size: 14px;
			text-align: center;
			margin: 15px 0;
		}
	}
	.login-bg {
		width: 100%;
		position: absolute;
		top: 0;
	}
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 24rpx;
		overflow: hidden;
		color: #000000;
		border-bottom: 1px solid #f0f0f0;
		font-size: 26rpx;
		line-height: 64rpx;
		font-weight: 400;
	}
	.border {
		border: 1px solid #D8D6D6
	}
	::v-deep .u-index-anchor {
		// position: static;
		// background: none !important;
	}
</style>
