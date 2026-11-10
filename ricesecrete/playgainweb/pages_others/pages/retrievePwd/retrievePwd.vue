<template>
	<view class="register">
		<u-navbar title="找回密码" bgColor="transparent" leftIconColor="#fff" :titleStyle="titleStyle" autoBack></u-navbar>
		<image src="/static/image/login/login-bg.png" class="login-bg"></image>
		<view class="flex relative z2 mlr-30 mt-30">
			<view :class="[`navi-tab`,is_active ? `active` : ``]">
				1.验证手机号码
				<view class="active-state" v-if="is_active"></view>
			</view>
			<view :class="[`mlr-40 navi-tab`,!is_active ? `active` : ``]">
				2.设置新密码
				<view class="active-state" v-if="!is_active">
				</view>
			</view>
		</view>
		<view class="register-content" v-if="is_active">
			<view class="form">
				<u-form labelPosition="top" :model="model" :rules="rules" ref="uformRef">
					<u-form-item :label="null" prop="userInfo.phone" borderBottom>
						<u--input v-model="model.userInfo.phone" :customStyle="inputStyle" maxlength="11"
							placeholder='请输入手机号码' type='number' clearable></u--input>
					</u-form-item>
					<u-form-item :label="null" prop="userInfo.code" borderBottom>
						<u-input v-model="model.userInfo.code" :customStyle="inputStyle" placeholder='请输入短信验证码'
							clearable>
							<template #suffix>
								<u-code ref="uCodeRef" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
								<u-button @tap="getCode" :text="tips" type="success" color="#F3C720"
									:customStyle='btnStyle'></u-button>
							</template>
						</u-input>
					</u-form-item>
				</u-form>
			</view>
			<view class="plr-50  mt-60">
				<u-button color="linear-gradient(0deg, #068EFD, #2EDEFF)" :customStyle='regBtnStyle'
					@click="handleNext">下一步</u-button>
			</view>
		</view>
		<view class="register-content" v-else>
			<view class="form">
				<u-form labelPosition="top" :model="model" :rules="rules" ref="uformRef">
					<u-form-item :label="null" prop="userInfo.password" borderBottom>
						<u--input v-model="model.userInfo.password" :customStyle="inputStyle"
							placeholder='请这设置6-20位登录密码' type='password' maxlength="20" clearable></u--input>
					</u-form-item>
					<u-form-item :label="null" prop="userInfo.password2" borderBottom>
						<u--input v-model="model.userInfo.password2" :customStyle="inputStyle" maxlength="20"
							placeholder='请再次确认登录密码' type='password'></u--input>
					</u-form-item>
				</u-form>
			</view>
			<view class="plr-50  mt-60">
				<u-button color="linear-gradient(0deg, #068EFD, #2EDEFF)" :customStyle='regBtnStyle'
					@click="handleSubmit">提交</u-button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import { send_code,check_code } from '../../../api/login';
import { mode } from 'crypto-js';
	let titleStyle = reactive({
		'font-weight': '500',
		'font-size': '32rpx',
		'color': '#FFFFFF'
	})
	let inputStyle = reactive({
		'height': '100rpx',
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
			password2: '',
		},

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
		'userInfo.password2': [{
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
	const is_active = ref(true)
	const tips = ref('');
	const value = ref('');
	let uCodeRef = ref(null);
	let agreement = ref(false)

	const codeChange = (text) => {
		tips.value = text;
	};
	//获取验证码
	const getCode = () => {
		uformRef.value.validateField('userInfo.phone', (valid) => {
			if(valid.length){
				console.log('校验失败')
			}else{
				if (uCodeRef.value.canGetCode) {
					// 模拟向后端请求验证码
					send_code({phone:model.userInfo.phone}).then(res => {
						console.log(res)
						uni.$u.toast('验证码已发送');
						uCodeRef.value.start();
					})
					// setTimeout(() => {
					// 	uni.hideLoading();
					// 	// 这里此提示会被start()方法中的提示覆盖
						
					// 	// 通知验证码组件内部开始倒计时
					// 	uCodeRef.value.start();
					// }, 6000);
				} else {
					// uni.$u.toast('倒计时结束后再发送');
				}
				
			}
		})
	};

	const change = (e) => {
		console.log('change', e);
	};
	const uformRef = ref(null)
	//下一步
	const handleNext = () => {
		uformRef.value.validate().then(valid => {
			if (valid) {
				//校验成功，进行下一步，请求。
				console.log('校验成功，进行请求',valid)
				// 验证手机号验证码
				check_code({phone:model.userInfo.phone,code:model.userInfo.code}).then(res=>{
					console.log(res)
				})
				// is_active.value = !is_active.value
			} else {
				uni.$u.toast('校验失败',valid)
			}
		}).catch(() => {
			// 处理验证错误  
			uni.$u.toast('校验失败')
		});

	};

	//提交
	const handleSubmit = () => {
		uformRef.value.validate().then(valid => {
			if (valid) {
				//校验成功，进行下一步，请求。
				
			} else {
				uni.$u.toast('校验失败',valid)
			}
		}).catch(() => {
			// 处理验证错误  
			uni.$u.toast('校验失败')
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

	.navi-tab {
		font-weight: 500;
		font-size: 26rpx;
		color: #DDDDDD;
		line-height: 64rpx;
	}

	.active {
		font-weight: 500;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 64rpx;
	}

	.active-state {
		width: 150rpx;
		height: 15rpx;
		background: #F3C720;
		border-radius: 8rpx;
		margin-left: 15rpx;
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