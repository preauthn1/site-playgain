<template>
	<view>
		<u-navbar title="提现" placeholder autoBack>
			<template #right>
				<navigator url="/pages_mine/pages/withdrawal/withdrawalRecord">
					<view class="flex items-center">
						<image src="../../static/img/withdrawal/log.png" class="width-30 mr-12" mode="widthFix"></image>
						<text class="text-EDC74B font-24">提现记录</text>
					</view>
				</navigator>
			</template>
		</u-navbar>
		<view class="box-shadow-1 bg-white text-0B0B0B pb-30 font-26 font-medium mt-30">
			<view class="ptb-18 text-center  font-30 ">提现金额</view>
			<view class="flex items-center plr-26 bg-EDC74B ptb-24 ">
				<view class="pr-28"> 当前佣金余额</view>
				<view>¥{{store.userInfo.commission}}</view>
			</view>
			<view class="flex items-center plr-26 mt-20">
				<view class="pr-28">本次提现金额</view>
				<view class="flex-1">
					<u-input placeholder="请输入本次提现金额" border="bottom" v-model="formData.original_amount"></u-input>
				</view>
			</view>
		</view>
		<view class="box-shadow-1 bg-white text-0B0B0B font-26 font-medium mt-30">
			<view class="ptb-18 text-center font-30">选择提现方式</view>
			<view class="plr-24">
				<view v-for="(item,index) in payList" :key="index" class="flex justify-between items-center" @click="formData.channel_id=item.id;ident=item.ident">
					<image :src="item.src" class="width-80" mode="widthFix" v-if="item.src"></image>
					<view class="flex items-center justify-between flex-1 ptb-40"
						style="border-bottom: 1px solid rgba(0, 0, 0, .08);">
						<view class="ml-26">{{item.name}}</view>
						<image src="../../static/img/withdrawal/select-on.png" class="width-30" mode="widthFix" v-if='formData.channel_id==item.id'></image>
						<image src="../../static/img/withdrawal/select-off.png" class="width-30" mode="widthFix" v-else></image>
					</view>
				</view>
			</view>
			
			
		</view>
		<view class="box-shadow-1 bg-white text-0B0B0B font-26 font-medium mt-30 p-24 card-list" v-if="ident=='bank'">
			<view v-for="(item,index) in bankList" :key="index" class="box-shadow-1 p-20 flex items-center justify-between" @click="formData.user_bank_id=item.id">
				<view>
					 <u-tooltip :text="item.bank_name + ' ('+item.card_no+')'" :buttons="['删除']" :show-copy="false" @click="(v)=>{del_Bank(item,v)}"></u-tooltip>		
				</view>
				<image src="../../static/img/withdrawal/select-on.png" class="width-30" mode="widthFix" v-if='formData.user_bank_id==item.id'></image>
				<image src="../../static/img/withdrawal/select-off.png" class="width-30" mode="widthFix" v-else></image>
			</view>
		</view>
		<navigator url="/pages_mine/pages/withdrawal/addBankCard">
			<view class="bg-white box-shadow-1 flex-center ptb-20 mt-30">
				<image src="../../static/img/withdrawal/upload.png" style="width: 48rpx;" mode="widthFix"></image>
				<view class="ml-22">添加银行卡</view>
			</view>
		</navigator>
		<view class="plr-40 mt-60">
			<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB)" :customStyle="btnStyle" @click="submit">确定</u-button>
		</view>
		<view class="plr-26 font-24 mt-40">
			提现说明：
			<view>1.每个账号每天只能提现1次；</view>
			<view>2.发起提现后24小时内到账；</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,ref
	} from 'vue';submit
	import {payment_channel} from '@/api/common.js'
	import {getUserBank,delBank,subWithdrawal} from '@/api/money.js'
	let btnStyle = {
		height: '90rpx',
		fontSize: '30rpx',
		'border-radius': '20rpx'
	};
	import {
		useUserStore
	} from '@/store';
	const store = useUserStore();
	let formData = reactive({
		channel_id:'',
		original_amount:'',
		user_bank_id:''
	})
	
	let ident = ref('')
	let payList = ref([])
	payment_channel().then(res =>{
		payList.value = res;
	})
	let bankList = ref([])
	const getBank = ()=>{
		getUserBank().then(res =>{
			bankList.value = res;
		})
	}
	getBank()
	const del_Bank = (item,v) =>{
		uni.showModal({
			content:'确认删除？',
			success(e) {
				if(e.confirm){
					delBank({id:item.id}).then(res =>{
						uni.showToast({
							title:'删除成功！'
						})
						setTimeout(function(){
							getBank()
						},300)
					})
				}
			}
		})
		
	}
	
	const submit = ()=>{
		subWithdrawal(formData).then(res =>{
			uni.showToast({
				title:'提现成功！'
			})
			setTimeout(function(){
				store.getuserinfo()
			},500)
			
		})
	}
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.bg-EDC74B {
		background-color: rgba(237, 199, 75, 0.08);
	}
	.width-48{
		width: 48rpx;
	}
	.card-list{
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}
</style>