<template>
	<view>
		<view class="box-shadow-1 mt-40">
			<u-cell-group :border="false">
				<u-cell title="手机号" is-link :rightIconStyle="rightIconStyle" @click="bindMobileEmail('phone')">
					<template #value>
						<text class="right-value">{{store.userInfo.phone}}</text>
					</template>
				</u-cell>
				<u-cell title="邮箱" is-link :border="false" :rightIconStyle="rightIconStyle" @click="bindMobileEmail('email')">
					<template #value>
						<text class="right-value">{{store.userInfo.email || '未绑定'}}</text>
					</template>
				</u-cell>
			</u-cell-group>
		</view>
		<view class="box-shadow-1 mt-40">
			<u-cell-group :border="false">
				<u-cell title="微信" is-link :rightIconStyle="rightIconStyle" @click="thirdBind('微信')">
					<template #value>
						<text class="right-value">未绑定</text>
					</template>
				</u-cell>
				<u-cell title="qq" is-link :rightIconStyle="rightIconStyle" @click="thirdBind('qq')">
					<template #value>
						<text class="right-value">未绑定</text>
					</template>
				</u-cell>
				<u-cell title="支付宝" is-link :border="false" :rightIconStyle="rightIconStyle" @click="thirdBind('支付宝')">
					<template #value>
						<text class="right-value">未绑定</text>
					</template>
				</u-cell>
			</u-cell-group>
		</view>
		<view class="box-shadow-1 mt-40">
			<u-cell-group :border="false">
				<u-cell title="修改密码" is-link :border="false" :rightIconStyle="rightIconStyle"
					:titleStyle="titleStyle" url="/pages_mine/pages/changePassword/changePassword"></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive
	} from 'vue';
	import { useUserStore } from '@/store';
	const store = useUserStore()
	let rightIconStyle = reactive({
		color: '#B4B4B4'
	})
	let titleStyle = reactive({
		'font-weight': '500',
		'font-size': '26rpx',
		'color': '#0B0B0B'
	})
	
	
	const bindMobileEmail = (val)=>{
		uni.navigateTo({
			url:'/pages_mine/pages/mobileEmailBind/mobileEmailBind?type='+val
		})
	}
	
	const thirdBind = (val)=>{
		uni.navigateTo({
			url:'/pages_mine/pages/thirdPartyBind/thirdPartyBind?typeName='+val
		})
	}
</script>

<style lang="scss" scoped>
	page {
		/* background: var(--primary-bg); */
	}

	.right-value {
		font-weight: 400;
		font-size: 24rpx;
		color: #B4B4B4;
	}
</style>