<template>
	<view class="nickname">
		<view class="mt-36 box-shadow-1 p-26 font-26 font-medium text-0B0B0B">
			<u-form>
				<u-form-item label="昵称">
					<u-input v-model="nickname" placeholder="请填写昵称" border="none"></u-input>
				</u-form-item>
			</u-form>
		</view>
		<view class="confirm flex justify-center items-center text-white" @click="confirm">
			确认
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		update_user_info
	} from '@/api/login';
	import {
		useUserStore
	} from '@/store';
	const store = useUserStore()
	let nickname = store.userInfo.nick_name
	const confirm = async() => {
		const res = await update_user_info({'nick_name':nickname})
		uni.showToast({
			title:'修改成功！'
		})
		store.getuserinfo()
	}
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.mt-36 {
		margin-top: 36rpx;
	}
	.confirm {
		width: 635rpx;
		height: 93rpx;
		background: linear-gradient(180deg, #3B8EF5, #6BDBFB);
		border-radius: 20rpx;
		margin: 121rpx auto 0 auto;
	}
</style>