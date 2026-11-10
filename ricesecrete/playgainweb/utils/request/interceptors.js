import {
	http,
	toast
} from '@/uni_modules/uview-plus'
import {
	useUserStore
} from "@/store/modules/user.js"
import {
	AesDecryptKey
} from './secret.js'
import {
	refreshToken
} from '../../api/test.js'

const whiteList = [
	'/user/login','/user/register','/send_code',
	'/user/token', '/tourism/type', 'goodstype',
	'/index/index_type','/index/product_list','/index/banner','/index/type',
	'/order/comment_list','/check_code','/index/tourism_banner','/user/social_login',
	'/index/ip_location','/tourism/city_region','/tourism/city_list','/tourism/city_location','/content','/user/phone_login','/index/gzhAuth'
]
let queue = [] //请求队列
let timerId = null
let isRefreshing = false; // 标记是否正在刷新 Token
let failedRequests = []; // 缓存失败请求的列表

const requestInterceptors = (vm) => {
	http.interceptors.request.use(async (config) => {
		timerId && clearTimeout(timerId);
		if (!config.custom.notLoading) {
			queue.length === 0 && uni.showLoading();
			queue.push('request');
		}
		config.header['Client-Type'] = 'AppIndex';

		if (!whiteList.includes(config.url)) {
			console.log(config.url)
			const userStore = useUserStore();
			if(!userStore.tokenInfo){
				uni.showToast({
					icon:'none',
					title:'请登录'
				})
				uni.navigateTo({
					url:"/pages_others/pages/login/login"
				})
				return
			}
			console.log(userStore.tokenInfo,'----userStore.tokenInfo');
			const {
				token,
				refresh_token,
				expires_time
			} = userStore.tokenInfo;

			// 检查 Token 是否即将过期或已过期
			console.log(expires_time - Date.now() < 10, '------',expires_time, Date.now());
			if (expires_time - Date.now() < 10) {
				if (!isRefreshing) {
					new Promise((resolve, reject) => {
						failedRequests.push((newToken) => {
							config.header.Authorization = newToken;
							resolve(config);
						});
					});
					isRefreshing = true;

					try {
						const newTokenInfo = await refreshToken({
							refresh_token
						});
						let tokenInfo = {
							...newTokenInfo
						}
						tokenInfo.expires_time = tokenInfo.expires_time * 1000 + Date.now()
						userStore.setTokenInfo(tokenInfo)

						console.log('--11--11--');
						isRefreshing = false;

						// 重新请求缓存的接口
						failedRequests.forEach(req => req(newTokenInfo.token));
						failedRequests = [];
					} catch (error) {
						console.log(error, '---error');
						isRefreshing = false;
						// vm.$u.route('/login'); // 退出登录，跳转到登录页面
					}
				}

				// 返回一个新的 Promise，以便在刷新 Token 完成后重新执行请求
				return new Promise((resolve, reject) => {
					failedRequests.push((newToken) => {
						config.header.Authorization = newToken;
						resolve(config);
					});
				});
			} else {
				config.header.Authorization = token;
			}
		}

		config.data = config.data || {};

		return config;
	}, (config) => Promise.reject(config));
};

const responseInterceptors = (vm) => {
	http.interceptors.response.use((response) => {
		const {
			data,
			code,
			encrypt,
			config
		} = response.data;
		complete(response.config);

		switch (code) {
			case 1:
				if (encrypt == 1) {
					const {
						WebAesDecrypt
					} = useUserStore();
					const aesData = WebAesDecrypt(data);
					return aesData;
				} else {
					if (data&&data.key_iv) {
						const {
							AesDecryptKey
						} = useUserStore();
						AesDecryptKey(data.key_iv);
					}
					return data;
				}

			case 2003:
			case 2007:
				const {
					clearTokenInfo, clearProfile
				} = useUserStore();
				clearTokenInfo()
				clearProfile()
				// token过期，清除用户信息，跳转登陆页面
				break
			default:
				uni.showToast({
					icon:'error',
					title: response.data.msg
				})
				if (response.config.custom && typeof response.config.custom.onFailure === 'function') {
					response.config.custom.onFailure();
				}
				return Promise.reject(response);
		}
		// return data.data || {};
	}, (error) => {
		const {config} = error
		console.log(config, '------1');
		if (config&&config.custom && typeof config.custom.onFailure === 'function') {
			config.custom.onFailure();
		}

		complete(config);
		return Promise.reject(error);
	});
};

function complete(config) {
	if (config&&!config.custom.notLoading) {
		queue.pop()
		queue.length === 0 && queue.push('requset')
		timerId = setTimeout(() => {
			queue.pop()
			queue.length === 0 && uni.hideLoading()
			clearTimeout(timerId)
		}, 1)
	}
}




export {
	requestInterceptors,
	responseInterceptors
}