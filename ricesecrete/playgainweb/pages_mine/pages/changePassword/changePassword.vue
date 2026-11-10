<template>
	<view class="pt-30">
		<u-form :model="model" ref="uformRef" label-width="80">
			<view class="bg-white box-shadow-1 pl-12">
				<u-form-item label="原始密码" prop="userInfo.old_password" borderBottom>
					<u--input v-model="model.userInfo.old_password" maxlength="20" placeholder="请输入原密码" type='password'
						clearable border='none'></u--input>
				</u-form-item>
			</view>
			<view class="bg-white box-shadow-1 pl-12 mt-24">
				<u-form-item label="新密码" prop="userInfo.password" borderBottom>
					<u--input v-model="model.userInfo.password" maxlength="20" placeholder="设置新密码，6-20位" type='password'
						clearable border='none'></u--input>
				</u-form-item>
			</view>

			<view class="bg-white box-shadow-1 mt-24 pl-12">
				<u-form-item label="确认密码" prop="userInfo.confirm_password" borderBottom>
					<u--input v-model="model.userInfo.confirm_password" maxlength="20" placeholder="请输入确认密码"
						type='password' clearable border='none'></u--input>
				</u-form-item>
			</view>
		</u-form>

		<view class="mt-80 plr-50">
			<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB)" :customStyle="btnStyle" :loading="btnLoading"
				@click="submit">确定</u-button>
		</view>
		<navigator url="/pages_mine/pages/forgetPassword/forgetPassword" hover-class='false'>
			<view class="text-center text-3D91F5 font-26 font-medium mt-26">
				忘记了密码？点击这里
			</view>
		</navigator>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		changePassword
	} from '@/api/mine.js'
	const btnStyle = {
		height: '90rpx',
		fontSize: '30rpx',
		'border-radius': '20rpx'
	}
	let btnLoading = ref(false);
	const model = reactive({
		userInfo: {
			old_password: '',
			password: '',
			confirm_password: ''
		}
	})
	const submit = () => {
		changePassword(model.userInfo).then(res => {

		})
	}
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>