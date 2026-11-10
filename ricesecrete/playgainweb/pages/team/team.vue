<template>
	<view class="team">
		<image src="/static/image/team/banner.png" class="login-bg" mode="widthFix"></image>
		<u-navbar title="我的团队" leftIcon='' @rightClick="jumpmessage" :fixed="false" placeholder bgColor='transparent' :titleStyle='{fongSize:"32rpx",color:"#fff",fontWeight: "500"}'>
			<template #right>
					<MessageIcon></MessageIcon>
			</template>
		</u-navbar>
		<view class="relative zIndex1 team-box">
			<!-- <image src="/static/image/team/banner.png" class="w100" mode="widthFix"></image> -->
			<view class="plr-28 mtb-30">
				<view class="text-black font-28 font-bold">
					您的专属邀请码
					<text class="font-regular font-24 ">（用于邀请您的好友注册时使用）</text>
				</view>
				<view class="invitation-code bg-C4C4C4">
					<view class="font-28 font-medium text-center">
						{{teamoverview.popularize_code}}
					</view>
				</view>
				<view class="invitation-join">
					<view class="text-center font-medium font-30 text-white" @click="share_fn">
						邀请好友加入我的团队
					</view>
				</view>
			</view>
			<view class="bg-white box-shadow-1 mtb-30 border-radius-16">
				<view class="p-24">
					<view class="text-black font-bold font-28">
						团队总览
					</view>
					<view class="mt-30 flex justify-between">
						<view class="relative" @click="jumpTeamOverview(0)">
							<image src="/static/image/team/Rounded2.png" class="bg-size" mode="widthFix"></image>
							<image src="/static/image/team/teamnumber.png" class="total-number" mode="widthFix"></image>
							<view class="team-content w100">
								<view class="text-center text-white font-medium font-28">
									团队总人数
								</view>
								<view class="text-center mt-10 font-medium font-40 text-3D91F5">
									{{teamoverview?.level1.activated_count + teamoverview.level2.activated_count}}
								</view>
							</view>
						</view>
						<view class="relative" @click="jumpTeamOverview(1)">
							<image src="/static/image/team/Rounded1.png" class="bg-size" mode="widthFix"></image>
							<image
								src="/static/image/team/f75f3d0a7dff6c65e5a4c0b497032a9bd36ab6ed3432-4CBbba_fw1200.png"
								class="total-number" mode="widthFix"></image>
							<view class="team-content w100">
								<view class="text-center text-white font-medium font-28">
									团队总消费
								</view>
								<view class="text-center mt-10 font-medium font-40 text-3D91F5">
									{{teamoverview.consumption_amount}}
								</view>
							</view>
						</view>
						<view class="relative" @click="jumpTeamOverview(2)">
							<image src="/static/image/team/Rounded.png" class="bg-size" mode="widthFix"></image>
							<image
								src="/static/image/team/2016a1a99d11fc002efcd416711f92bd35984a9343ae-wtndH9_fw1200.png"
								class="total-number" mode="widthFix"></image>
							<view class="team-content w100">
								<view class="text-center text-white font-medium font-28">
									团队已提现
								</view>
								<view class="text-center mt-10 font-medium font-40 text-3D91F5">
									{{teamoverview.withdraw_amount}}
								</view>
							</view>
						</view>
					</view>
					<view class="p-24 box-shadow-1">
						<view class="flex justify-around">
							<view class="text-black font-medium font-28">
								一级代理
							</view>
							<view class="flex flex-col justify-center items-center">
							
							</view>
							<view class="flex flex-col justify-center items-center">
								<view class="font-26 font-regular">
									注册/有效
								</view>
								<view class="font-26 font-regular text-3D91F5">
									{{teamoverview.level1.unactivated_count}}/{{teamoverview.level1.activated_count}}
								</view>
							</view>
							<view class="flex flex-col justify-center items-center">
								<view class="font-26 font-regular">
									佣金比例
								</view>
								<view class="font-26 font-regular text-3D91F5">
									{{teamoverview.level1.rate}}
								</view>
							</view>
							<view class="flex flex-col justify-center items-center">
								<view class="font-26 font-regular">
									获得佣金
								</view>
								<view class="font-26 font-regular text-3D91F5">
									{{teamoverview.level1.commission}}
								</view>
							</view>
						</view>
						<view class="mt-10 flex pl-20 items-center">
							<image src="/static/image/team/broker.png" style="width: 117rpx;" mode="widthFix"></image>
							<view class="detail width-100 text-center text-white font-30 font-medium" @click="jumpteamAgent(0)">
								查看详情
							</view>
						</view>
					</view>
					<view class="p-24 box-shadow-1">
						<view class="flex justify-around">
							<view class="text-black font-medium font-28">
								二级代理
							</view>
							<view class="flex flex-col justify-center items-center">
								
							</view>
							<view class="flex flex-col justify-center items-center">
								<view class="font-26 font-regular">
									注册/有效
								</view>
								<view class="font-26 font-regular text-3D91F5">
									{{teamoverview?.level2?.unactivated_count }}/{{teamoverview?.level2?.activated_count}}
								</view>
							</view>
							<view class="flex flex-col justify-center items-center">
								<view class="font-26 font-regular">
									佣金比例
								</view>
								<view class="font-26 font-regular text-3D91F5">
									{{teamoverview.level2.rate}}
								</view>
							</view>
							<view class="flex flex-col justify-center items-center">
								<view class="font-26 font-regular">
									获得佣金
								</view>
								<view class="font-26 font-regular text-3D91F5">
									{{teamoverview.level1.commission}}
								</view>
							</view>
						</view>
						<view class="mt-10 flex pl-20 items-center">
							<image src="/static/image/team/broker.png" style="width: 117rpx;" mode="widthFix"></image>
							<view class="detail width-100 text-center text-white font-30 font-medium" @click="jumpteamAgent(1)">
								查看详情
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bg-white box-shadow-1 height-434 border-radius-16">
				<view class="p-24 relative">
					<view class="text-black font-bold font-28">
						返佣流程
					</view>
					<view class="p-24">
						<image src="/static/image/team/process.png" class="rebate-process"></image>
						<view class="flex justify-between rebate-process-content">
							<view class="text-center">
								<image src="/static/image/team/sharelink.png" class="rebate-process1" >
								</image>
								<view class="text-black font-26 font-regular">
									分享链接给好友
								</view>
							</view>
							<view class="text-center">
								<image src="/static/image/team/friendregistration.png" class="rebate-process2">
								</image>
								<view class="text-black font-26 font-regular">
									好友点击注册
								</view>
							</view>
							<view class="text-center">
								<image src="/static/image/team/purchase.png" class="rebate-process3">
								</image>
								<view class="text-black font-26 font-regular">
									好友购买旅游套餐
								</view>
							</view>
						</view>
					</view>
					<view class="flex justify-end rebate-process-content2">
						<view class="text-center mr-80">
							<image src="/static/image/team/commission.png" class="rebate-process5">
							</image>
							<view class="text-black font-26 font-regular">
								收到佣金
							</view>
						</view>
						<view class="text-center ml-30">
							<image src="/static/image/team/Completeorder.png" class="rebate-process4">
							</image>
							<view class="text-black font-26 font-regular">
								好友完成旅游订单
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="mt-40 bg-white box-shadow-1 border-radius-16">
				<view class="p-24">
					<view class="text-black font-28 font-bold">
						加入团队说明
						<view class="pl-10">
							<view class="text-black font-24 font-regular">
								<u-parse :content="teamContent"></u-parse>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<SharePopup ref="share"></SharePopup>
		<MidTabbar></MidTabbar>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import { team } from '@/api/team';
	import { getAgreement } from '@/api/common.js';
	import {onLoad} from '@dcloudio/uni-app'
	let teamoverview = ref()
	let teamContent = ref('')
	onLoad(()=>{
		team().then(res => {
			
			teamoverview.value = res
		})
		getAgreement({type:3}).then(res=>{
			console.log(res)
			teamContent.value = res[0].content;
		})
	})
	
	const share = ref(null)
	//分享
	const share_fn = () => {
		share.value.showShare = true
	}
	const jumpmessage = () => {
		uni.navigateTo({
			url:"/pages_home/pages/message/message"
		})
	}
	// 团队总览
	const jumpTeamOverview = (num) => {
		uni.navigateTo({
			url:`/pages_team/teamOverview/teamOverview?num=${num}`
		})
	}
	//代理详情
	const jumpteamAgent = (num) => {
		uni.navigateTo({
			url:`/pages_team/teamAgent/teamAgent?num=${num}`
		})
	}
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.team {
		padding-bottom: 180rpx;
	}
	.team-box{
		padding-top: 360rpx;
		padding-left: 24rpx;
		padding-right: 24rpx;
	}
	.login-bg {
		width: 100%;
		position: absolute;
		top: -50rpx;
	}
	.height-434{
		height:434rpx
	}
	.team-invitation{
		position: relative;
		z-index: 1;
		margin-top: 340rpx;
	}
	.invitation-code {
		width: 225rpx;
		height: 76rpx;
		border-radius: 10rpx;
		line-height: 76rpx;
		margin: 24rpx auto 0 auto;
	}

	.invitation-join {
		width: 635rpx;
		height: 93rpx;
		background: linear-gradient(0deg, #3B8EF5, #6BDBFB);
		border-radius: 20rpx;
		margin: 24rpx auto 0 auto;
		line-height: 93rpx;
	}
	.bg-size {
		width: 223rpx;
		position: relative;
	}

	.total-number {
		position: absolute;
		width: 113rpx;
		top: -15rpx;
		left: 50rpx;
	}

	.team-content {
		position: absolute;
		top: 80rpx;
	}

	.font-40 {
		font-size: 40rpx;
	}

	.detail {
		width: 351rpx;
		height: 88rpx;
		background: linear-gradient(0deg, #3B8EF5, #6BDBFB);
		border-radius: 15rpx;
		margin: auto;
		line-height: 88rpx;
	}

	.rebate-process {
		width: 100%;
		height: 295rpx;
	}

	.rebate-process-content {
		position: relative;
		top: -300rpx;
	}

	.rebate-process-content2 {
		position: relative;
		top: -250rpx;
	}
	.rebate-process1{
		width: 88rpx; 
		height:56rpx
	}
	.rebate-process2{
		width: 68rpx; 
		height: 71rpx;
	}
	.rebate-process3{
		width: 68rpx;
		height: 62rpx;
	}
	.rebate-process4{
		width: 78rpx;
		height: 62rpx;
	}
	.rebate-process5{
		width: 64rpx;
		height: 81rpx;
	}
</style>