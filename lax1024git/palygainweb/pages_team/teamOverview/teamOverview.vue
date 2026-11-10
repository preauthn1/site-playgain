<template>
	<view>
		<view class="plr-24 flex justify-between items-center font-28 font-medium text-767676 relative team-tab">
			<view v-for="(item,index) in tabList" :key="index" class="relative"
				:class="chooseTab==index?'tab_active':''" @click="chooseteamtype(index)">
				<view class="flex items-center plr-10 relative" style="z-index: 20;">
					<view class="mr-16">{{item.name}}</view>
					<u-icon :name="(showPopup&&chooseTab==index)?'arrow-up':'arrow-down'"
						:color="chooseTab==index?'text-0B0B0B':'text-767676'" size="28rpx"
						@click="showPopup=!showPopup"></u-icon>
				</view>
			</view>
			<view class="diy-popup">
				<u-transition :show="showPopup" mode="slide-down">
					<view class="plr-20 ptb-30 diy-popup-content">
						<view class="font-28" v-if="chooseTab == 0">注册日期：</view>
						<view class="font-28" v-if="chooseTab == 1">消费时间：</view>
						<view class="font-28" v-if="chooseTab == 2">提现时间：</view>
						<view class="flex items-center mt-16">
							<uni-datetime-picker type="date" :clear-icon="false" v-model="paramsInfo.start_time"
								placeholder="开始时间" />
							<view class="mlr-10"> ——— </view>
							<uni-datetime-picker type="date" :clear-icon="false" v-model="paramsInfo.end_time"
								placeholder="结束时间" />
							<!-- <uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" /> -->
						</view>
						<view class="font-28 mt-30 mb-20">所属级别：</view>
						<uni-data-select v-model="paramsInfo.level" :localdata="range"></uni-data-select>
						<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB"
							:custom-style="{height:'100rpx',fontSize:'30rpx',marginTop:'80rpx'}" @click="teamSreach">搜索</u-button>
					</view>
				</u-transition>
			</view>
		</view>

		<view class="plr-24">
			<view v-for="(item,index) in content_List" :key="index" class="flex items-center justify-between team-item plr-14 ptb-24" v-if="content_List.length">
				<view class="flex items-center">
					<text class="mr-20" v-if="chooseTab==0">{{index+1}}</text>
					<image src="../../static/image/share/qq.png" class="avatar mr-18"></image>
					<view class="font-26 font-medium text-0B0B0B">
						<view>{{item.nick_name}}</view>
						<view>{{item.phone}}</view>
					</view>
				</view>
				<view class="flex flex-col items-end" v-if="chooseTab==0">
					<view class="proxy-btn">{{item.team_level == 2 ? '二级代理' : '一级代理'}}</view>
					<view class="font-26 text-0B0B0B mt-20">注册时间：{{item.register_date}}</view>
				</view>
				<view class="font-26" v-else>
					<view class="flex justify-between"><text>消费金额：</text><text class="col-F7AB27">{{item.amount}}¥</text></view>
					<view class=" text-0B0B0B mt-20">消费时间：{{item.create_date}}</view>
				</view>
			</view>
		</view>
		<u-overlay :show="showPopup" zIndex="9"></u-overlay>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {onLoad,onReachBottom} from '@dcloudio/uni-app'
	import { team_members,team_withdrawal,team_commission } from '@/api/team';
	let tabList = ref([{
			name: '团队人数'
		},
		{
			name: '团队消费'
		},
		{
			name: '团队提现'
		}
	])
	let chooseTab = ref(0);
	let showPopup = ref(false)
	let value = ref(1);
	let range = ref([{
			value: 0,
			text: "一级代理"
		},
		{
			value: 1,
			text: "二级代理"
		}
	])
	let staticParamsInfo = reactive({
		level:'',
		page:1,
		limit:10,
		start_time:'',
		end_time:''
	})
	let paramsInfo = reactive({
		level:'',
		page:1,
		limit:10,
		start_time:'',
		end_time:''
	})
	const content_List = ref([])
	let teamdata = ref([])
	const chooseteamtype = (num) => {
		if(num == chooseTab.value)return;
		paramsInfo =JSON.parse(JSON.stringify(staticParamsInfo)) 
		chooseTab.value = num
		getTeamType(num)
	}
	const noMoreData = ref(false)
	const getTeamType = (num) =>{
		if(num == 0){
			team_members({...paramsInfo}).then(res=>{
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
		}else if (num == 1){
			team_commission({...paramsInfo}).then(res => {
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
		}else if (num == 2){
			team_withdrawal({...paramsInfo}).then(res => {
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
		}else{
			return false;
		}
	}
	const teamSreach = () =>{
		getTeamType(chooseTab.value)
		showPopup.value = false
	}
	onLoad((query)=>{
		console.log(query.num)
		chooseTab.value = query.num
		getTeamType(query.num)
		
	}) 
	onReachBottom(() => {
		if (noMoreData.value) return;
		pageInfo.page++;
		getTeamType(chooseTab.value)
	})
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>

<style lang="scss" scoped>
	.diy-popup {
		position: absolute;
		width: 100%;
		top: 120rpx;
		left: 0;
		border-radius: 0rpx 0rpx 15rpx 15rpx;
		z-index: 10;
		overflow: hidden;
	}
	.diy-popup-content{
		background-color: #fff;
		box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(15, 9, 13, 0.06);
	}
	.team-tab {
		height: 120rpx;
		background: var(--primary-bg);
		z-index: 10000;
	}
	.avatar{
		width: 84rpx;
		height: 84rpx;
		border-radius: 50%;
	}
	.team-item{
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 11rpx 2rpx rgba(61,62,63,0.04);
		border-radius: 15rpx;
		margin-bottom: 24rpx;
	}
	.proxy-btn{
		background: #F74E27;
		border-radius: 10rpx;
		display: inline-block;
		font-weight: 500;
		font-size: 24rpx;
		color: #FFFFFF;
		padding: 16rpx 34rpx;
	}
	.col-F7AB27{
		color: #F7AB27;
	}
</style>