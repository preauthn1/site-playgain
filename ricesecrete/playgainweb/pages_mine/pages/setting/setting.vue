<template>
	<view>
		<template v-for="(item,index) in settingList">
			<view class="setting-title">{{item.name}}</view>
			<view class="setting-content">
				<u-cell-group :border="false">
					<template v-for="(item2,index2) in item.list">
						<u-cell :title="item2.title" is-link :border="(item.list.length>1)?true:false"
							:title-style="titleStyle" @click="set_fn(item2)"></u-cell>
					</template>
				</u-cell-group>
			</view>
		</template>
		<view class="plr-40 mt-40" v-if="store.tokenInfo?.token">
			<u-button :customStyle="btnStyle" color="#F6F6F6" @click="logout">退出登录</u-button>
		</view>
		
		<view class="font-22 text-center text-767676 mt-40 pb-20">
			<view>当前版本：Ver {{version_number}} Copyrignt 2024 </view>
			<view>玩赚全球-不仅能玩，还能赚钱</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive, ref
	} from 'vue';
	import { useUserStore } from '@/store';
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
	const store = useUserStore()
	const btnStyle = {
		height:'100rpx',
		'font-weight': '500',
		'font-size': '30rpx',
		color:'#000'
	}
	const systemInfo = uni.getSystemInfoSync();
	const version_number = ref(systemInfo.appWgtVersion);
	let settingList = reactive([{
			name: '账户设置',
			list: [{
				title: '账户安全',
				url: '/pages_mine/pages/accountSecurity/accountSecurity'
			}]
		},
		{
			name: '权限设置',
			list: [{
				title: '系统权限管理 ',
				url: '/pages_mine/pages/sysPermissionSettings/sysPermissionSettings'
			}]
		},
		{
			name: '协议与政策',
			list: [{
					title: '用户服务协议',
					url: '/pages/agreement/agreement?type=1'
				},
				{
					title: '隐私政策',
					url: '/pages/agreement/agreement?type=2'
				},
				{
					title: '儿童隐私政策',
					url: '/pages/agreement/agreement?type=8'
				},
			]
		},
		{
			name: '个人信息收集与共享',
			list: [{
				title: '个人信息收集与第三方共享清单',
				url: '/pages/agreement/agreement?type=9'
			}]
		},
		{
			name: '通用设置',
			list: [{
					title: '清理缓存',
					fn: 'clear'
				},
				{
					title: '检查更新',
					fn: 'checkUpdate'
				},
				{
					title: '关于玩赚全球',
					url: '/pages_mine/pages/aboutApp/aboutApp'
				},
				{
					title: '意见建议',
					url: '/pages_mine/pages/suggestionFeedback/suggestionFeedback'
				}
			]
		},
	]);
	let titleStyle = reactive({
		'font-weight': '500',
		'font-size': '26rpx',
		'color': '#0B0B0B'
	})


	const set_fn = (item) => {
		if (item.url) {
			if (item.url.indexOf('http') != -1) {
				uni.navigateTo({
					url: '/pages/webview/webview?title=' + item.title + '&url=' + encodeURIComponent(item.url)
				})
			} else {
				uni.navigateTo({
					url: item.url
				})
			}

		} else if (item.fn) {
			if(item.fn == 'clear'){
				clear()
			}else if(item.fn == 'checkUpdate'){
				console.log("检查更新")
				checkUpdate()
			}
		} else {

		}
	}


	const clear = () => {
		uni.showLoading({
			title:'清理中'
		})
		uni.clearStorage()
		setTimeout(()=>{
			uni.showToast({
				title: '清理成功！'
			})
		},500)
	}
	
	const logout = ()=>{
		store.setTokenInfo(null);
		store.setUserInfo(null);
		uni.navigateTo({
			url:"/pages_others/pages/login/login"
		})
	}
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.setting-title {
		padding-bottom: 12rpx;
		padding-top: 42rpx;
		font-weight: 400;
		font-size: 26rpx;
		color: #0B0B0B;
		padding-left: 26rpx;
	}

	.setting-content {
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(15, 9, 13, 0.06);
	}
</style>