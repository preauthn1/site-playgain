import {
	one_click_login,
	user_info,
	social_login,
	gzhAuth
} from '@/api/login.js'
import {
	useUserStore
} from "@/store/modules/user.js"
// const store = useUserStore()
export function login() {
	univerify_login()
}

export function univerify_login() {
	uni.login({
		provider: 'univerify',
		univerifyStyle: {
			"fullScreen": true, // 是否全屏显示，默认值： false
			"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff
			"backgroundImage": "static/image/login/login-bg.png", // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）
			"icon": {
				"path": "static/image/login/logo.png", // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
				"width": "153px", //图标宽度 默认值：60px
				"height": "75px" //图标高度 默认值：60px
			},
			// "closeIcon": {
			// 	"path": "static/xxx.png", // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
			// 	"width": "60px", //图标宽度 默认值：60px (HBuilderX 4.0支持)
			// 	"height": "60px" //图标高度 默认值：60px (HBuilderX 4.0支持)
			// },
			"phoneNum": {
				"color": "#FFFFFF" // 手机号文字颜色 默认值：#202020
			},
			"slogan": {
				"color": "#fff" //  slogan 字体颜色 默认值：#BBBBBB
			},
			"authButton": {
				"normalColor": "#068EFD", // 授权按钮正常状态背景颜色 默认值：#3479f5
				"highlightColor": "#2861c5", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
				"disabledColor": "#73aaf5", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
				"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff
				"title": "本机号码一键登录", // 授权按钮文案 默认值：“本机号码一键登录”
				"borderRadius": "20px" // 授权按钮圆角 默认值："24px" （按钮高度的一半）
			},
			"otherLoginButton": {
				"visible": true, // 是否显示其他登录按钮，默认值：true
				"normalColor": "", // 其他登录按钮正常状态背景颜色 默认值：透明
				"highlightColor": "", // 其他登录按钮按下状态背景颜色 默认值：透明
				"textColor": "#0790FD", // 其他登录按钮文字颜色 默认值：#656565
				"title": "切换账号登录", // 其他登录方式按钮文字 默认值：“其他登录方式”
				"borderColor": "", //边框颜色 默认值：透明（仅iOS支持）
				"borderRadius": "0px" // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
			},
			"privacyTerms": {
				"defaultCheckBoxState": true, // 条款勾选框初始状态 默认值： true
				"isCenterHint": false, //未勾选服务条款时点击登录按钮的提示是否居中显示 默认值: false (3.7.13+ 版本支持)
				"uncheckedImage": "", // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)
				"checkedImage": "", // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)
				"checkBoxSize": 12, // 可选 条款勾选框大小
				"textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB
				"termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3
				"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”
				"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”
				"privacyItems": [ // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效
					{
						"url": "https://", // 点击跳转的协议详情页面
						"title": "用户服务协议" // 协议名称
					}
				]
			},
			"buttons": { // 自定义页面下方按钮仅全屏模式生效（3.1.14+ 版本支持）
				"iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px
				"list": [{
						"provider": "qq",
						"iconPath": "/static/image/login/qq.png" // 图标路径仅支持本地图片
					},
					{
						"provider": "weixin",
						"iconPath": "/static/image/login/wx.png" // 图标路径仅支持本地图片
					}
				]
			}
		},
		success(res) { // 登录成功
			console.log(res.authResult); // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
			let {
				openid,
				access_token
			} = res.authResult;
			const store = useUserStore()
			one_click_login({
				openid,
				access_token,
				cid: store.cid
			}).then(ressult => {
				loginSuccess(ressult)
			})
		},
		fail(res) { // 登录失败
			if (res.code == '30008') { //三方登录
				if (res.provider == 'weixin') {
					wxLogin('weixin')
				}
				if (res.provider == 'qq') {
					qqLogin()
				}
			} else { //选择了账号登录或者一键登录失败跳到登录页面
				uni.navigateTo({
					url: '/pages_others/pages/login/login'
				})
			}
		}
	})
}

export function getUserInfo() {
	user_info().then(res => {
		userStore.setUserInfo(res)
		uni.showToast({
			title: '登录成功！'
		})
	})
}

export function gzhLogin() {
	gzhAuth().then(res => {
		if (res.url) {
			window.location.href = res.url;
		}
	})
}

export function wxLogin(val) {
	const store = useUserStore()
	uni.login({
		"provider": "weixin",
		"onlyAuthorize": true, // 微信登录仅请求授权认证
		success: function(event) {
			console.log(event)
			const {
				code
			} = event;
			social_login({
				code,
				type: 'weixin',
				cid: store.cid
			}).then(result => {
				loginSuccess(result, val)
			})
		},
		fail: function(err) {
			// 登录授权失败
			// err.code是错误码
		}
	})
}
export function qqLogin(val) {
	const store = useUserStore()
	uni.login({
		provider: 'qq',
		success: function(loginRes) {
			console.log(loginRes)
			const {
				access_token
			} = loginRes.authResult;
			social_login({
				access_token,
				type: 'qq',
				cid: store.cid
			}).then(result => {
				loginSuccess(result, val)
			})
		},
		fail: function(err) {
			// 登录授权失败
			// err.code是错误码
		}
	});
}
export function loginSuccess(result, val) {
	const userStore = useUserStore();
	result.expires_time = result.expires_time * 1000 + Date.now();
	userStore.setTokenInfo(result);
	user_info().then(res => {
		userStore.setUserInfo(res)

	})
	if (!val) {
		uni.closeAuthView()
	}
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
			if (val) {
				uni.redirectTo({
					url: redirectUrl.page
				})
			} else {
				uni.navigateTo({
					url: redirectUrl.page
				})
			}
		}
		uni.clearStorageSync('redirectUrl')
	} else {
		uni.switchTab({
			url: '/pages/home/home'
		})
	}
}