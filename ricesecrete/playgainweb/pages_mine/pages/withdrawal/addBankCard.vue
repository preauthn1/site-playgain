<template>
	<view>
		<view class="mt-40 bg-white box-shadow-1 plr-26 ptb-22">
			<u-form labelPosition="left" :model="model" :rules="rules" ref="uFormRef" label-width="70px">
				<u-form-item label="银行卡" prop="userInfo.bank_name" @click="showBank = true;">
					<u--input v-model="model.userInfo.bank_name" disabled disabledColor="#ffffff" placeholder="请选择银行卡"
						border="bottom"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="开户行" prop="userInfo.opening_bank">
					<u-input v-model="model.userInfo.opening_bank" border="bottom" placeholder="请输入您银行账户名称"></u-input>
				</u-form-item>
				<u-form-item label="银行卡号" prop="userInfo.card_no">
					<u-input v-model="model.userInfo.card_no" border="bottom" placeholder="请输入您的银行卡号"></u-input>
				</u-form-item>
			</u-form>
		</view>
		<view class="plr-40 mt-300">
			<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB)" :customStyle="btnStyle" :loading="btnLoading"
				@click="submit">确定</u-button>
		</view>
		<u-picker :show="showBank" :columns="[bankList]" keyName="name" @confirm='bankConfirm'
			@cancel="showBank=false"></u-picker>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		getBank,
		addBank
	} from '@/api/money.js'
	let btnStyle = {
		height: '90rpx',
		fontSize: '30rpx',
		'border-radius': '20rpx'
	};
	let showBank = ref(false);
	let btnLoading = ref(false);
	let model = reactive({
		userInfo: {
			bank_id: '',
			bank_name: '',
			opening_bank: '',
			card_no: ''
		}
	})
	let rules = reactive({
		'userInfo.bank_name': {
			type: 'string',
			required: true,
			message: '请选择银行卡',
			trigger: ['blur', 'change']
		},
		'userInfo.opening_bank': {
			type: 'string',
			required: true,
			message: '请输入开户行',
			trigger: ['blur', 'change']
		},
		'userInfo.card_no': [{
			type: 'string',
			required: true,
			message: '请输入银行卡号',
			trigger: ['blur', 'change']
		}, {
			pattern: /^([1-9][0-9]{15}|[1-9][0-9]{17})$/,
			// 正则检验前先将值转为字符串
			transform(value) {
				return String(value);
			},
			message: '请输入正确的银行卡号'
		}]
	})
	let uFormRef = ref(null)
	let bankList = ref([])
	getBank().then(res => {
		bankList.value = res;
	})
	const bankConfirm = (e) => {
		console.log(e)
		model.userInfo.bank_name = e.value[0].name;
		model.userInfo.bank_id = e.value[0].id;
		showBank.value = false;
	}


	const submit = () => {	
		uFormRef.value.validate().then(res => {
			btnLoading.value = true
			addBank(model.userInfo).then(res =>{
				uni.showToast({
					title:'新增银行卡成功！'
				})
				uni.navigateBack({
					delta:1
				})
			}).finally(_=>{
				btnLoading.value = false;
			})
			// uni.$u.toast('校验通过')
		}).catch(errors => {
			// uni.$u.toast('校验失败')
		})
	}
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>