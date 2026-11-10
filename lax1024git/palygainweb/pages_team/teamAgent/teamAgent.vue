<template>
	<view>
		<u-navbar :title="title[titlenum]" placeholder @rightClick="showPopup=!showPopup" autoBack>
			<template #right>
				<image src="../static/img/sx.png" style="width: 40rpx;" mode="widthFix"></image>
			</template>
		</u-navbar>
		<view class="plr-24">
			<view v-for="(item,index) in content_List" :key="index" class="plr-16 ptb-24 team-agent-item mt-24" v-if="content_List.length > 0">
				<view class="flex justify-between items-center font-medium">
					<view class="font-26">上级代理：{{top_user_nick_name}}</view>
					<view class="font-24">本单佣金：<text class="font-26 text-darkRed">+{{item.amount}}</text></view>
				</view>
				<u-line color="rgba(11,11,11,.13)" margin="26rpx 0"></u-line>
				<view class="flex justify-between items-center">
					<view class="flex items-center">
						<image :src="item.head_img" class="avatar mr-18"></image>
						<view class="font-26 font-medium text-0B0B0B">
							<view>{{item.nick_name}}</view>
							<view>{{item.phone}}</view>
						</view>
					</view>
					<view class="font-26">
						<view class="flex">
							<text>消费金额：</text>
							<text class="col-F7AB27">￥{{item.consumption_amount}}</text>
						</view>
						<view class="text-0B0B0B">消费时间：{{item.create_date}}</view>
					</view>
				</view>
			</view>
			<view v-else>
				<up-empty
				marginTop="50"
				mode="data"
				        text="暂无数据"
				        textSize="30rpx"
				>
				</up-empty>
			</view>
		</view>
		<u-popup mode="top" :show="showPopup" @close="showPopup=false" z-index="10" safeAreaInsetTop round="15rpx">
			<view style="padding-top: 46px;" class="plr-20 pb-30">
				<view class="font-28 font-medium">用户昵称：</view>
				<view class="mtb-16">
					<u--input placeholder="请输入用户昵称" border="surround" v-model="paramsInfo.nick_name" @change="change"></u--input>
				</view>
				<view class="font-28">消费时间：</view>
				<view class="flex items-center mt-16">
					<uni-datetime-picker type="date" :clear-icon="false" v-model="paramsInfo.start_time" @maskClick="maskClick"
						placeholder="开始时间" />
					<view class="mlr-10"> ——— </view>
					<uni-datetime-picker type="date" :clear-icon="false" v-model="paramsInfo.end_time" @maskClick="maskClick"
						placeholder="结束时间" />
					<!-- <uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" /> -->
				</view>
				<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB"
					:custom-style="{height:'100rpx',fontSize:'30rpx',marginTop:'80rpx'}" @click="searchBtn">搜索</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script setup>
	import {
		ref,reactive
	} from 'vue';
	import {onLoad,onReachBottom} from '@dcloudio/uni-app'
	import {team_withdrawal} from '@/api/team.js'
	let showPopup = ref(false)
	const title = reactive(["一级代理","二级代理"])
	const titlenum = ref(0)
	const content_List = ref([])
	const paramsInfo = reactive({
		level:'',
		page:1,
		limit:10,
		nick_name:'',
		start_time:'',
		end_time:''
	})
	const noMoreData = ref(false)
	onLoad((query)=>{
		titlenum.value = query.num
		paramsInfo.level = Number(query.num) + 1
		getteamnumbers()
	})
	const getteamnumbers = () => {
		team_withdrawal({...paramsInfo}).then(res=>{
			if (paramsInfo.page > 1) {
				content_List.value.push(...res.dataList);
			} else {
				content_List.value = res.dataList;
			}
			if (content_List.value.length >= res.total) {
				noMoreData.value = true
			} else {
				noMoreData.value = false;
			}
			
		})
	}
	const searchBtn = () => {
		getteamnumbers()
		showPopup.value = false
	}
	onReachBottom(() => {
		if (noMoreData.value) return;
		pageInfo.page++;
		getteamnumbers()
	})
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.team-agent-item {
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 11rpx 2rpx rgba(61, 62, 63, 0.04);
		border-radius: 15rpx;
	}

	.avatar {
		width: 84rpx;
		height: 84rpx;
		border-radius: 50%;
	}
	.col-F7AB27{
		color: #F7AB27;
	}
</style>