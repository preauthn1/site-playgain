<template>
	<view class="register">
		<u-navbar bgColor="transparent" leftIconColor="#fff" :titleStyle="titleStyle" autoBack></u-navbar>
		<image src="/static/image/login/login-bg.png" class="login-bg"></image>
		<view class="register-content">
			<view class="flex-center">
				<image src="/static/image/login/logo.png" class="logo"></image>
			</view>
			<view class="form">
				<u-form labelPosition="top" :model="model" :rules="rules" ref="uformRef">
					<u-form-item :label="null" prop="userInfo.phone" borderBottom>
						<u--input v-model="model.userInfo.phone" :customStyle="inputStyle" maxlength="11"
							placeholder='请输入手机号码' type='number' clearable></u--input>
					</u-form-item>
					<u-form-item :label="null" prop="userInfo.password" borderBottom>
						<u-input v-model="model.userInfo.password" :customStyle="inputStyle"
							:type="is_open_pwd ? `text` : `password`" placeholder='请输入密码' clearable>
							<template #suffix>
								<u-switch space="2" v-model="is_open_pwd" activeColor="#F3C720"
									inactiveColor="rgb(230, 230, 230)" @change="is_open_password">
								</u-switch>
							</template>
						</u-input>
					</u-form-item>
				</u-form>
			</view>
			<image src="../../static/img/login-foot.png" class="login-bg-img"></image>
			<view class="plr-30 mt-50">
				<u-button color="linear-gradient(0deg, #068EFD, #2EDEFF)" :customStyle='regBtnStyle'
					@click="handleLogin">登录</u-button>
			</view>
			<view class="flex justify-between text-center text-0790FD font-28 font-medium mt-22 plr-30">
				<navigator url="/pages_others/pages/register/register">
					<view>
						注册新用户
					</view>
				</navigator>
				<navigator url="/pages_others/pages/retrievePwd/retrievePwd">
					<view>
						找回密码
					</view>
				</navigator>

			</view>
			<view class="other-login">
				<view class="w100 text-center font-28">
					——其他登录方式——
				</view>
				<view class="flex justify-center text-center">
					<!-- #ifdef APP-PLUS -->
					<view class="">
						<image src="../../../static/image/login/wx.png" class="other-login-img"
							@click="otherLogin('wx')"></image>
					</view>
					<view>
						<image src="../../../static/image/login/qq.png" class="other-login-img"
							@click="otherLogin('qq')"></image>
					</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view class="">
						<image src="../../../static/image/login/wx.png" class="other-login-img"
							@click="otherLogin('gzh')"></image>
					</view>
					<!-- #endif -->
				</view>
			</view>
			<view class="plr-30 flex items-center font-28 mt-50 mb-50">
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
		</view>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		gzhLogin,
		wxLogin,
		qqLogin
	} from '@/utils/login.js'
	import {
		route
	} from '@/uni_modules/uview-plus';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		user_login,
		user_info
	} from '../../../api/login';
	import {
		useUserStore
	} from '../../../store';
	let titleStyle = reactive({
		'font-weight': '500',
		'font-size': '32rpx',
		'color': '#FFFFFF'
	})
	let inputStyle = reactive({
		'height': '80rpx',
		'background': '#fff',
		'box-shadow': '0rpx 0rpx 26rpx 1rpx rgba(16,8,13,0.06)',
		'border-radius': '20rpx',
		'border': 'none'
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
			password: '',
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
				return uni.$u.test.mobile(value);
			},
			message: '手机号码不正确',
			// 触发器可以同时用blur和change
			trigger: ['change', 'blur'],
		}],
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
		}],
	})
	// 隐藏或显示密码
	const is_open_pwd = ref(false)

	const tips = ref('');
	const value = ref('');
	let uCodeRef = ref(null);
	let agreement = ref(false)

	const codeChange = (text) => {
		tips.value = text;
	};
	const uformRef = ref(null)

	const change = (e) => {
		console.log('change', e);
	};
	// 隐藏或显示密码
	const is_open_password = (e) => {
		is_open_pwd.value = e

	}
	const returnpath = ref('')
	onLoad((query) => {
		returnpath.value = query.pagepath
		// #ifdef H5
		//获取公众号授权登录信息
		if (query.params) {
			let res = JSON.parse(query.params);
			res.expires_time = res.expires_time * 1000 + Date.now();
			const store = useUserStore()
			store.setTokenInfo(res);
			user_info().then(result => {
				store.setUserInfo(result)
			})
			uni.showToast({
				title: '登录成功！'
			})
			uni.switchTab({
				url: '/pages/mine/mine'
			})
		}
		// #endif
	})
	const store = useUserStore()
	//登录
	const handleLogin = () => {
		if (!agreement.value) {
			uni.$u.toast('请阅读并同意服务协议和隐私政策！')
			return;
		}
		uformRef.value.validate().then(valid => {
			if (valid) {
				user_login(model.userInfo).then(res => {
					res.expires_time = res.expires_time * 1000 + Date.now();
					store.setTokenInfo(res);
					user_info().then(result => {
						store.setUserInfo(result)
					})
					uni.showToast({
						title: '登录成功！'
					})
					let redirectUrl = uni.getStorageSync('redirectUrl');
					if (uni.getStorageSync('redirectUrl')) {
						if (redirectUrl.type == 'tabbar') {
							uni.switchTab({
								url: redirectUrl.page
							})
						} else {
							uni.redirectTo({
								url: redirectUrl.page
							})
						}
						uni.clearStorageSync('redirectUrl')
					} else {
						uni.switchTab({
							url: '/pages/home/home'
						})
					}
				})

			} else {
				uni.$u.toast('校验失败', valid)
			}
		}).catch(() => {
			// 处理验证错误  
			uni.$u.toast('校验失败')
		});
	}
	const otherLogin = (val) => {
		if (!agreement.value) {
			uni.$u.toast('请阅读并同意服务协议和隐私政策！')
			return;
		}
		if (val == 'wx') {
			wxLogin({
				page: true
			})
		}
		if (val == 'gzh') {
			gzhLogin()
		}
		if (val == 'qq') {
			qqLogin({
				page: true
			})
		}
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

	.login-bg-img {
		position: absolute;
		width: 100%;
		height: 522rpx;
		margin-top: 150rpx;
		z-index: -1;
	}

	.other-login {
		margin-top: 124rpx;
	}

	.other-login-img {
		width: 140rpx;
		height: 140rpx;
	}

	::v-deep .u-switch__node {
		background-color: #0793FF;

	}

	// ::v-deep .u-switch__bg{
	// 	width: 127rpx !important;
	// 	height: 60rpx !important;
	// 	border-radius: 30rpx !important;

	// }
</style>