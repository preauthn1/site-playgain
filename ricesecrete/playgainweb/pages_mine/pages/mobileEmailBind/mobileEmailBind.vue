<template>
	<view>
		<view class="plr-24 mt-40 font-26 font-medium text-0B0B0B">{{type=='email'?userInfo.email:userInfo.phone}}
		</view>
		<u-form labelPosition="top" :model="model" ref="uformRef">
			<u-form-item :label="null" prop="userInfo.phone" borderBottom v-if="type=='phone'">
				<u--input v-model="model.userInfo.phone" :customStyle="inputStyle" maxlength="11"
					placeholder="请输入更换绑定的手机号码" type='number' clearable></u--input>
			</u-form-item>
			<u-form-item :label="null" prop="userInfo.email" borderBottom v-if="type=='email'">
				<u--input v-model="model.userInfo.email" :customStyle="inputStyle" placeholder="请输入更换绑定的邮箱"
					clearable></u--input>
			</u-form-item>
			<u-form-item :label="null" prop="userInfo.code" borderBottom>
				<u-input v-model="model.userInfo.code" :customStyle="inputStyle"
					:placeholder="type=='email'?'登录邮箱输入验证码':'请输入短信验证码'" clearable>
					<template #suffix>
						<u-code ref="uCodeRef" @change="codeChange" seconds="20" changeText="X秒重新获取"></u-code>
						<u-button @tap="getCode" :text="tips" type="success" color="#F3C720"
							:customStyle='btnStyle'></u-button>
					</template>
				</u-input>
			</u-form-item>

		</u-form>
		<view class="plr-50 mt-300">
			<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB)" :custom-style="{height:'90rpx',fontSize:'30rpx'}"
				@click="submit">修改</u-button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getEmailCode,
		send_code,bindEmail,bindPhone
	} from '@/api/login.js'
	import {
		useUserStore
	} from '@/store';
	import {
		mode
	} from 'crypto-js';
	const {
		userInfo,getuserinfo
	} = useUserStore()
	let type = ref('')
	onLoad((e) => {
		type.value = e.type;
		if (e.type == 'email') {
			uni.setNavigationBarTitle({
				title: '邮箱绑定'
			})
		}
	})
	let inputStyle ={
		'height': '70rpx',
		'background': '#fff',
		'box-shadow': '0rpx 0rpx 26rpx 1rpx rgba(16,8,13,0.06)',
		'border-radius': '20rpx',
		'border': 'none'
	}
	let btnStyle = {
		'border-radius': '20rpx',
		'height': '80rpx',
		'font-weight': 'bold',
		'font-size': '24rpx',
	}
	let model = reactive({
		userInfo: {
			phone: '',
			code: '',
			email: ''
		}
	})
	const tips = ref('');
	const value = ref('');
	let uCodeRef = ref(null);
	const codeChange = (text) => {
		tips.value = text;
	};
	const uformRef = ref(null)
	const getCode = () => {
		if (type.value == 'email') {
			if (!uni.$u.test.email(model.userInfo.email)) {
				uni.showToast({
					title: '请输入正确的邮箱！',
					icon: "error"
				})
				return;
			}
			getCodeT()
		} else {
			if (!uni.$u.test.mobile(model.userInfo.phone)) {
				uni.showToast({
					title: '请输入正确的手机号！',
					icon: "error"
				})
				return;
			}
			getCodeT()
		}
	};
	const getCodeT = () => {
		// 模拟向后端请求验证码
		uni.showLoading({
			title: '正在获取验证码',
		});
		if (type.value == 'phone') {
			send_code({
				phone: model.userInfo.phone
			}).then(res => {
				uni.hideLoading();
				uni.$u.toast('验证码已发送');
				// 通知验证码组件内部开始倒计时
				uCodeRef.value.start();
			})
		} else {
			getEmailCode({
				email: model.userInfo.email
			}).then(res => {
				uni.hideLoading();
				uni.$u.toast('验证码已发送');
				// 通知验证码组件内部开始倒计时
				uCodeRef.value.start();
			})
		}
	}
	const submit = () => {
		if (type.value == 'email') {
			bindEmail({
				email: model.userInfo.email,
				code: model.userInfo.code
			}).then(res => {
				uni.showToast({
					title:'绑定邮箱成功！'
				})
				getuserinfo()
				setTimeout(function(){
					uni.navigateBack({delta:1})
				},300)
			})
		}else{
			bindPhone({
				phone:model.userInfo.phone,
				code: model.userInfo.code
			}).then(res=>{
				uni.showToast({
					title:'修改成功！'
				})
				getuserinfo()
				setTimeout(function(){
					uni.navigateBack({delta:1})
				},300)
			})
		}
	}
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>