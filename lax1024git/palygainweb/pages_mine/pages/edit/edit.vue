<template>
	<view class="edit">
		<view class="mtb-36 bg-white box-shadow-1">
			<view class="flex justify-between items-center pl-24 pr-24 ptb-18" @click="changeavatar">
				<view class="font-26 font-medium text-0B0B0B">
					个人头像
				</view>
				<view class="flex items-center">
					<image :src="store.userInfo.head_img" class="avatar"></image>
					<view class="pl-22">
						<image src="../../static/img/edit/3.png" class="width-14" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white box-shadow-1 pl-24 pr-24 text-0B0B0B font-26">
			<view class="flex justify-between items-center ptb-30 font-medium border-bottom">
				<view>
					ID
				</view>
				<view>
					{{store.userInfo.id}}
				</view>
			</view>
			<view class="flex justify-between ptb-30 items-center font-medium border-bottom" @click="jupmnickname">
				<view>
					昵称
				</view>
				<view class="flex items-center">
					<view class="font-regular pr-22">
						{{store.userInfo.nick_name}}
					</view>
					<image src="../../static/img/edit/3.png" class="width-14" mode="widthFix"></image>
				</view>
			</view>
			<view class="flex justify-between ptb-30 items-center font-medium border-bottom" @click="openSex">
				<view>
					性别
				</view>
				<view class="flex items-center">
					<view class="font-regular pr-22" v-if="gender">
						{{gender == 1 ? '男' : '女'}}
					</view>
					<image src="../../static/img/edit/3.png" class="width-14" mode="widthFix"></image>
				</view>
			</view>
			<view class="flex justify-between ptb-30 items-center font-medium border-bottom" @click="choosedatatime">
				<view>
					生日
				</view>
				<view class="flex items-center">
					<view class="font-regular pr-22">
						<datatime ref="choosetime"></datatime>
					</view>
					<image src="../../static/img/edit/3.png" class="width-14" mode="widthFix"></image>
				</view>
			</view>
			<view class="flex justify-between ptb-30 items-center font-medium border-bottom" @click="jumphobbies">
				<view>
					兴趣
				</view>
				<view class="flex items-center">
					<view class="font-regular pr-22">
						{{store.userInfo.hobby}}
					</view>
					<image src="../../static/img/edit/3.png" class="width-14" mode="widthFix"></image>
				</view>
			</view>
			<view class="flex justify-between ptb-30 items-center font-medium border-bottom" @click="showchooseaddress">
				<view>
					所在地址
				</view>
				<view class="flex items-center">
					<view class="font-regular pr-22">
						{{province == city ? province : province + city}}
					</view>
					<image src="../../static/img/edit/3.png" class="width-14" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 选择性别 -->
		<u-popup :show="showsex" :round="20" bgColor='#f5fbfcFF'>
			<view >
				<PopupTitle title='性别'></PopupTitle>
				<view class="text-center">
					<view :class="[`p-24 font-28 font-medium`, chooseGender == 1 ? `text-EDC74B` : ``]" @click="choosesex(1)">
						男
					</view>
					<view :class="[`p-24 font-28 font-medium`, chooseGender == 2 ? `text-EDC74B` : ``]" @click="choosesex(2)">
						女
					</view>
				</view>
			</view>
			<view class="flex justify-between pb-28">
				<u-button :custom-style="{height:'93rpx',width:'294rpx',background:'none',color:'#767676'}" @click="showsex=false">取消</u-button>
				<u-button :custom-style="{height:'93rpx',width:'294rpx',color:'#fff',background:'#3D91F5FF'}" @click="sexsure">确定</u-button>
			</view>
		</u-popup>
		<chooseaddressVue ref="address" @confirm="handleaddress"></chooseaddressVue>
	</view>
</template>

<script setup>
	import { ref,reactive } from 'vue';
	import datatime from '../../pages/edit/components/datetimePicker.vue'
	import chooseaddressVue from '../../pages/edit/components/chooseaddres.vue';
	import { useUserStore } from '@/store';
	import { update_user_info } from '@/api/login';
	const store = useUserStore()
	// 更换头像
	const changeavatar = () => {
		uni.navigateTo({
			url:"/pages_mine/pages/changeavatar/changeavatar"
		})
	}
	//昵称
	const jupmnickname = () => {
		uni.navigateTo({
			url:"/pages_mine/pages/nickname/nickname"
		})
	}
	// 性别 
	const showsex = ref(false)
	const openSex = () => {
		showsex.value = true
	}
	const gender = ref()
	gender.value = store.userInfo.gender
	const chooseGender = ref()
	chooseGender.value = store.userInfo.gender
	const choosesex = (num) => {
		chooseGender.value = num
	}
	const sexsure = () => {
		gender.value = chooseGender.value
		update_user_info({'gender':gender.value}).then(res =>{
			showsex.value = false
			store.getuserinfo()
		})
		
	}
	const address = ref(null)
	const choosetime = ref(null)
	const showchooseaddress = () => {
		address.value.showaddress = true
	}
	const jumphobbies = ()=> {
		uni.navigateTo({
			url:"/pages_mine/pages/hobbies/hobbies"
		})
	}
	const province = ref()
	const city = ref()
	province.value = store.userInfo.province
	city.value = store.userInfo.city
	const choosedatatime = () => {
		choosetime.value.showtime = true
	}
	const handleaddress = (data) => {
		province.value = data[0]
		city.value = data[1]
		update_user_info({'province':province.value,'city':city.value}).then(res =>{
			store.getuserinfo()
		})
	}
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.mtb-36{
		margin-top: 36rpx;
		margin-bottom: 36rpx;
	}
	.avatar {
		width: 126rpx;
		height: 126rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.border-bottom{
		border-bottom: 1px solid #ebebebFF;
	}
	::v-deep .u-button--square{
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}
</style>
