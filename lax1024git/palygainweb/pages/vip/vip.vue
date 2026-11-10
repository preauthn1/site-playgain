<template>
	<view class="vip relative">
		<image src="../../static/image/vip/vip-bg.png" class="w100 vip-bg" mode="widthFix"></image>
		<view class="relative zIndex1">
			<u-navbar title="我的会员" leftIcon='' placeholder bgColor='transparent' :fixed="false"
				:titleStyle='{fongSize:"32rpx",color:"#fff",fontWeight: "500"}' @rightClick="jumpmessage">
				<template #right>
					<MessageIcon></MessageIcon>
				</template>
			</u-navbar>
			<view class="flex items-center pl-26">
				<image :src="store.userInfo.head_img" class="avatar"></image>
				<view class="font-32 text-white mlr-20">
					<view>{{store.userInfo.nick_name}}</view>
				</view>
				<view class="level">
					{{vipname[0].name}}
				</view>
			</view>
			<view class="pl-26 mt-30">
				<ContentTitle title="会员等级"></ContentTitle>
				<swiper previous-margin="30rpx"
					next-margin="30rpx" class="vip-list" @change="changeimage">
					<swiper-item v-for="(item,index) in vip_level_list" :key="item.level"> 
						<image :src="item.src" class="vip-list-item-bg"></image>
						<view class="vip-list-item-content">
							<view class="flex items-center">
								<image src="../../static/image/vip/V.png" class="width-30 " mode="widthFix"></image>
								<text class="text-3D91F5 font-30">{{store.userInfo.nick_name}}</text>
							</view>
							<view class="level mt-20">
								{{item.name}}
							</view>
							<view v-if="item.level == vipname[0].level">
								<view class="text-3D91F5 font-24 flex-center mt-50">
									<view class="mr-20 flex-center flex-col">
										<view>当前消费值</view>
										<view>0</view>
									</view>
									<view class="ml-20 flex-center flex-col">
										<view>团队有效人数</view>
										<view>0</view>
									</view>
								</view>
							</view>
							<view class="mt-50 flex justify-center" v-else>
								<view class="lock-btn text-767676 font-24 font-regular flex justify-between flex-center">
									<image src="/static/image/vip/lock.png" class="width-30" mode="widthFix"></image>
									<view class="pl-10">
										待升级
									</view>
								</view>
							</view>
							
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="plr-22 ptb-24 bg-white mt-30 box-shadow-1">
				<ContentTitle title="会员权益" righttitle="查看更多" jumpurl="/pages_vip/benefitDetails/benefitDetails?id=1"></ContentTitle>
				<view class="equity">
					<view v-for="(item,index) in Rights[0].rights" :key="index" @click="jumpRights(item.id)" class="equity-item">
						<image :src="item.src" mode="heightFix"></image>
						<view class="">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			
			<view class="plr-22 ptb-24 bg-white mt-30 box-shadow-1">
				<ContentTitle title="等级要求" righttitle="消费等级规则" jumpurl="/pages_vip/levelRulesDetails/levelRulesDetails"></ContentTitle>
				<view class="consumption mt-24">
					<image src="../../static/image/vip/lv-1.png" class="consumption-bg"></image>
					<view class="consumption-content">
						<view class="flex items-center justify-between mb-20">
							<text class="text-white">消费值</text>
							<text class="text-darkRed">{{ConsumptionProgress == 100 ? '已达标' :''}}</text>
						</view>
						<u-line-progress :percentage="ConsumptionProgress" activeColor="#EDC74B"></u-line-progress>
						<view class="flex items-center justify-between mt-14 text-white">
							<text>还差{{Rights[0].money - store.userInfo.consumption_amount}}消费</text>
							<text>{{store.userInfo.consumption_amount}}/{{Rights[0].money}}</text>
						</view>
						
					</view>
				</view>
				<view class="consumption mt-24" v-if="is_showTeamProgress">
					<image src="../../static/image/vip/lv-2.png" class="consumption-bg"></image>
					<view class="consumption-content">
						<view class="flex items-center justify-between mb-20">
							<text class="text-white">团队有效下级人数</text>
							<text class="text-darkRed">{{TeamProgress == 100 ? '已达标' : ''}}</text>
						</view>
						<u-line-progress :percentage="TeamProgress" activeColor="#EDC74B"></u-line-progress>
						<view class="flex items-center justify-between mt-14 text-white">
							<text>还差{{Rights[0].invite_num - store.userInfo.team_activated_count}}人</text>
							<text>{{store.userInfo.team_activated_count}}/{{Rights[0].invite_num}}</text>
						</view>
						
					</view>
				</view>
			</view>
		</view>

		<MidTabbar></MidTabbar>
	</view>
</template>

<script setup>
	import { onMounted, ref,reactive } from 'vue';
	import { viplevel,viprights } from '@/api/vip';
	import { useUserStore } from '@/store';
import commoditycontentVue from '../../pages_mine/pages/myordersdetail/components/commodity/commoditycontent.vue';
	const store = useUserStore()
	// 当前会员名称
	const vipname = ref()
	// 会员权益
	const Rights = ref()
	// 会员等级
    const vip_level_list = ref([])
	const jumpmessage = () => {
		uni.navigateTo({
			url:"/pages_home/pages/message/message"
		})
	}
	const list3 = reactive([  
	    'https://cdn.uviewui.com/uview/swiper/swiper3.png',  
	    'https://cdn.uviewui.com/uview/swiper/swiper2.png',  
	    'https://cdn.uviewui.com/uview/swiper/swiper1.png',  
	]);  
	
	// 消费进度
	let ConsumptionProgress = ref(0)
	// 团队人数进度
	let TeamProgress = ref(0)
	let is_showTeamProgress = ref(true)
	const getlevel = (num) => {
		Rights.value = vip_level_list.value.filter(item => item.level == num)
		let team_activated_count = store.userInfo.team_activated_count
		let  invite_num = Rights.value[0].invite_num
		let consumption_amount = store.userInfo.consumption_amount
		let money = Rights.value[0].money
		if(invite_num == 0){
			is_showTeamProgress.value = false
		}else{
			is_showTeamProgress.value = true
			TeamProgress.value =Math.round(team_activated_count / invite_num * 100)
		}
		if(money == 0){
			ConsumptionProgress.value = 100
		}else{
			ConsumptionProgress.value = Math.round(consumption_amount / money * 100)
		}
	}
	viplevel().then(res => {
		vip_level_list.value = res
		vipname.value = vip_level_list.value.filter(item => item.level == store.userInfo.vip_level)
		getlevel(store.userInfo.vip_level)
	})
	
	// 跳转会员权益
	const jumpRights = (id) => {
		console.log(id,'这是权益id')
		uni.navigateTo({
			url:"/pages_vip/benefitDetails/benefitDetails?id=" + id
		})
	}
	const changeimage = (e) => {
		getlevel(e.detail.current)
	}
</script>
<style>
	page{
		background: #F6FDFE;
	}
</style>
<style lang="scss" scoped>
	.vip{
		padding-bottom: 150rpx;
	}
	.vip-bg {
		position: absolute;
		top: 0;
		left: 0;
	}

	.avatar {
		width: 126rpx;
		height: 126rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.level {
		background: #FAE7CB;
		border-radius: 16rpx;
		font-size: 21rpx;
		color: #363956;
		padding: 4rpx 20rpx;
		display: inline-block;
	}

	.vip-title {
		padding-left: 13rpx;
		font-weight: 500;
		font-size: 30rpx;
		color: #0B0B0B;
		line-height: 40rpx;
		position: relative;
	}

	.vip-title::before {
		content: '';
		width: 8rpx;
		height: 100%;
		background: linear-gradient(0deg, #3B8EF5, #6BDBFB);
		border-radius: 4rpx;
		position: absolute;
		left: 0;
		top: 0;
	}

	.vip-list {
		white-space: nowrap;
		width: 100%;
		margin-top: 28rpx;
		.vip-list-item{
			width: 549rpx;
			height: 247rpx;
			// background: #E2E2E2;
			border-radius: 15rpx;
			display: inline-block;
			margin-right: 20rpx;
			&-bg{
				width: 98%;
				height: 100%;
			}
			position: relative;
		}
		.vip-list-item-content{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 99;
			top: 0;
			left: 0;
			padding: 16rpx;
			box-sizing: border-box;
		}
	}
	.equity{
		display: flex;
		flex-wrap: wrap;
		&-item{
			width: 25%;
			font-size: 24rpx;
			text-align: center;
			margin-top: 30rpx;
			image{
				height: 62rpx;
				
			}
		}
	}
	.consumption{
		width: 100%;
		height: 167rpx;
		position: relative;
		&-bg{
			width: 100%;
			height: 100%;
		}
		&-content{
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
			box-sizing: border-box;
			padding: 22rpx;
			font-size: 24rpx;
		}
	}
	.lock-btn{
		// height: 51rpx;
		padding:10rpx;
		border-radius: 10rpx;
		border: 1px solid #767676;
		// line-height: 51rpx;
	}
</style>