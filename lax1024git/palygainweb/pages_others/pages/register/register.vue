<template>
	<view class="register">
		<u-navbar title="新用户注册" bgColor="transparent" leftIconColor="#fff" :titleStyle="titleStyle" autoBack></u-navbar>
		<image src="/static/image/login/login-bg.png" class="login-bg"></image>
		<view class="register-content">
			<view class="flex-center">
				<image src="/static/image/login/logo.png" class="logo"></image>
			</view>
			<view class="form">
				<u-form labelPosition="top" :model="model" :rules="rules" ref="uformRef">
					<u-form-item :label="null" prop="userInfo.phone" borderBottom>
						<u--input v-model="model.userInfo.phone" :customStyle="inputStyle" maxlength="11" placeholder='请输入手机号码'
							type='number' clearable></u--input>
					</u-form-item>
					<u-form-item :label="null" prop="userInfo.code" borderBottom>
						<u-input v-model="model.userInfo.code" :customStyle="inputStyle" placeholder='请输入短信验证码' clearable>
							<template #suffix>
								<u-code ref="uCodeRef" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
								<u-button @tap="getCode" :text="tips" type="success" color="#F3C720"
									:customStyle='btnStyle'></u-button>
							</template>
						</u-input>
					</u-form-item>
					<u-form-item :label="null" prop="userInfo.password" borderBottom>
						<u--input v-model="model.userInfo.password" :customStyle="inputStyle"
							placeholder='请这设置6-20位登录密码' type='password' clearable></u--input>
					</u-form-item>
					<u-form-item :label="null" prop="userInfo.confirm_password" borderBottom>
						<u--input v-model="model.userInfo.confirm_password" :customStyle="inputStyle" placeholder='请再次确认登录密码'
							type='password'></u--input>
					</u-form-item>
					<u-form-item :label="null" prop="userInfo.popularize_code" borderBottom>
						<u--input v-model="model.userInfo.popularize_code" :customStyle="inputStyle"
							placeholder='选填请输入邀请码' clearable></u--input>
					</u-form-item>
				</u-form>
			</view>
			<view class="plr-30 flex items-center font-28 mt-50">
				<image :src="agreement?'/static/image/login/select-on.png':'/static/image/login/select-off.png'"
					class="check-img" @click="agreement=!agreement"></image>
				<view class="flex">
					已阅读并同意
					<navigator url="/pages/agreement/agreement?type=1" :hover-class="false">
						<text class="text-3162FF">《用户服务协议》</text>
					</navigator>
					和
					<navigator url="/pages/agreement/agreement?type=2" :hover-class="false">
						<text class="text-3162FF">《平台隐私政策》</text>
					</navigator>
				</view>
			</view>
			<view class="plr-30 mt-50">
				<u-button color="linear-gradient(0deg, #068EFD, #2EDEFF)" :customStyle='regBtnStyle' @click="register">注册</u-button>
			</view>
			<navigator url="/pages_others/pages/login/login" open-type="redirect">
				<view class="text-center text-0790FD font-28 font-medium mt-22">
					已有账户，立即登录
				</view>
			</navigator>
		</view>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import { user_register,send_code,user_info } from '@/api/login';
	import { useUserStore } from '@/store';
	let titleStyle = reactive({
		'font-weight': '500',
		'font-size': '32rpx',
		'color': '#FFFFFF'
	})
	let inputStyle = reactive({
		'height': '70rpx',
		'background': '#fff',
		'box-shadow': '0rpx 0rpx 26rpx 1rpx rgba(16,8,13,0.06)',
		'border-radius': '20rpx',
		'border': 'none'
	})
	let btnStyle = reactive({
		'border-radius': '20rpx',
		'height': '80rpx',
		'font-weight': 'bold',
		'font-size': '24rpx',
		// 'color': '#DDDDDD'
	})
	let regBtnStyle = reactive({
		'border-radius': '20rpx',
		'height': '90rpx',
		'font-weight': '500',
		'font-size': '30rpx'
	})
	let model = reactive({
		userInfo: {
			phone: '',
			code: '',
			password: '',
			confirm_password: '',
			popularize_code: ''
		}
	})
	let rules = reactive({
		'userInfo.phone': [{
			type: 'string',
			required: true,
			message: '请填写手机号码',
			trigger: ['blur', 'change'],
		}, {
			// 自定义验证函数，见上说明
			validator: (rule, value, callback) => {
				// 上面有说，返回true表示校验通过，返回false表示不通过
				// uni.$u.test.mobile()就是返回true或者false的
				return uni.$u.test.mobile(value);
			},
			message: '手机号码不正确',
			// 触发器可以同时用blur和change
			trigger: ['change', 'blur'],
		}],
		'userInfo.code': {
			type: 'string',
			required: true,
			message: '请填写验证码',
			trigger: ['blur']
		},
		'userInfo.password': [{
			type: 'string',
			required: true,
			message: '请填写密码',
			trigger: ['blur', 'change']
		}, {
			pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}$/,
			// 正则检验前先将值转为字符串
			transform(value) {
				return String(value);
			},
			message: '密码长度6-20位，需包含字母和数字',
			trigger: ['blur'],
		}, ],
		'userInfo.confirm_password': [{
			type: 'string',
			required: true,
			message: '请填写密码',
			trigger: ['blur', 'change']
		}, {
			pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}$/,
			// 正则检验前先将值转为字符串
			transform(value) {
				return String(value);
			},
			message: '密码长度6-20位，需包含字母和数字',
			trigger: ['blur'],
		}, {
			validator: (rule, value, callback) => {
				return model.userInfo.password == value;
			},
			message: '两次密码不一致',
			trigger: ['blur']
		}],
	})

	const tips = ref('');
	const value = ref('');
	let uCodeRef = ref(null);
	let agreement = ref(false)
	// watch(value, (newValue, oldValue) => {
	//   // console.log('v-model', newValue);
	// });

	const codeChange = (text) => {
		tips.value = text;
	};
	const uformRef = ref(null)
	
	const getCode = () => {
		uformRef.value.validateField('userInfo.phone', (valid) => {
			if(valid.length){
				console.log('校验失败')
			}else{
				if (uCodeRef.value.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
					});
					send_code({phone:model.userInfo.phone}).then(res =>{
						uni.hideLoading();
						// 这里此提示会被start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						uCodeRef.value.start();
					})
				} else {
					// uni.$u.toast('倒计时结束后再发送');
				}
				
			}
		})
	};
	
	const change = (e) => {
		console.log('change', e);
	};
	
	// 注册
	const store = useUserStore()
	const register = () => {
		if (!agreement.value) {
			uni.$u.toast('请阅读并同意服务协议和隐私政策！')
			return;
		}
		uformRef.value.validate().then(valid => {
			if (valid) {
				console.log('校验成功')
				//校验成功，进行下一步，判断是否勾选用户协议。
				if(agreement.value){
					// 勾选用户协议，进行请求
					console.log("用户注册")
					user_register(model.userInfo).then(res => {
						res.expires_time = res.expires_time * 1000 + Date.now();
						store.setTokenInfo(res);
						user_info().then(result =>{
							store.setUserInfo(result)
						})
						uni.showToast({
							title:'注册成功！'
						})
						let redirectUrl = uni.getStorageSync('redirectUrl');
						if(uni.getStorageSync('redirectUrl')){
							if(redirectUrl.type == 'tabbar'){
								uni.switchTab({
									url:redirectUrl.page
								})
							}else{
								uni.redirectTo({
									url:redirectUrl.page
								})
							}
							uni.clearStorageSync('redirectUrl')
						}else{
							uni.switchTab({
								url:'/pages/home/home'
							})
						}
					})
				}else{
					uni.$u.toast('请阅读协议，并勾选在进行注册！！！！')
				}
			} else {
				uni.$u.toast('校验失败', valid)
			}
		}).catch(() => {
			// 处理验证错误  
			// uni.$u.toast('校验失败')
		});
	}
</script>

<style scoped lang="scss">
	page {
		background: #F7FDFE;
	}

	.register {
		position: relative;
		padding-top: 48px;
	}

	.register-content {
		position: absolute;
		width: 100%;
	}

	.login-bg {
		width: 100%;
		height: 808rpx;
		position: absolute;
		top: 0;
	}

	.logo {
		width: 462rpx;
		height: 216rpx;
		margin-top: 40rpx;
	}

	.form {
		padding: 0 60rpx;
		margin-top: 30rpx;
	}

	.check-img {
		width: 32rpx;
		height: 32rpx;
		margin-right: 14rpx;
	}
</style>