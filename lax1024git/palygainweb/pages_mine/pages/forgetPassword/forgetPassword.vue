<template>
	<view>
		<view v-if="step==1">
			<view class="flex plr-26 mtb-30 tab-content">
				<view v-for="(item,index) in typeList" :key="index" class="mr-40 plr-10 tab-item"
					:class="chooseType==item.val?'tab_active':''" @click="chooseType=item.val">
					<view class="zIndex1 relative">{{item.name}}</view>
				</view>
			</view>

			<u-form labelPosition="top" :model="model" ref="uformRef" :rules="rules">
				<u-form-item :label="null" prop="userInfo.phone" borderBottom v-show="chooseType == 'phone'">
					<u--input v-model="model.userInfo.phone" :customStyle="inputStyle" maxlength="11"
						placeholder="注册或绑定的手机号码" type='number' clearable></u--input>
				</u-form-item>
				<u-form-item :label="null" prop="userInfo.email" borderBottom v-show="chooseType == 'email'">
					<u--input v-model="model.userInfo.email" :customStyle="inputStyle"
						placeholder="注册或绑定的邮箱" clearable></u--input>
				</u-form-item>
				<u-form-item :label="null" prop="userInfo.code" borderBottom>
					<u-input v-model="model.userInfo.code" :customStyle="inputStyle"
						:placeholder="chooseType=='email'?'登录邮箱输入验证码':'请输入短信验证码'" clearable>
						<template #suffix>
							<u-code ref="uCodeRef" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
							<u-button @tap="getCode" :text="tips" type="success" color="#F3C720"
								:customStyle='btnStyle'></u-button>
						</template>
					</u-input>
				</u-form-item>

			</u-form>
			<view class="plr-50 mt-300">
				<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB)"
					:custom-style="{height:'90rpx',fontSize:'30rpx','border-radius': '20rpx'}"
					@click="handleNext">下一步</u-button>
			</view>
		</view>
		<view v-else class="mt-24">
			<u-form :model="model" ref="uformRef" label-width="80" :rules="rules">
				<view class="bg-white box-shadow-1 pl-12">
					<u-form-item label="新密码" prop="userInfo.phone" borderBottom>
						<u--input v-model="model.userInfo.phone" :customStyle="inputStyle" maxlength="20"
							placeholder="设置新密码，6-20位" type='number' clearable></u--input>
					</u-form-item>
				</view>

				<view class="bg-white box-shadow-1 mt-24 pl-12" :rules="rules">
					<u-form-item label="确认密码" prop="userInfo.phone" borderBottom>
						<u--input v-model="model.userInfo.phone" :customStyle="inputStyle" maxlength="20"
							placeholder="请输入确认密码" type='number' clearable></u--input>
					</u-form-item>
				</view>
			</u-form>
			<view class="plr-50 mt-300">
				<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB)"
					:custom-style="{height:'90rpx',fontSize:'30rpx','border-radius': '20rpx'}">完成</u-button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import { send_code,check_code } from '../../../api/login';
	let typeList = ref([{
			name: '手机重置密码',
			val: 'phone'
		},
		{
			name: '邮箱找回密码',
			val: 'email'
		}
	])
	let chooseType = ref('phone')
	let inputStyle = reactive({
		'height': '70rpx',
		'border': 'none'
	})
	let btnStyle = reactive({
		'border-radius': '20rpx',
		'height': '80rpx',
		'font-weight': 'bold',
		'font-size': '24rpx',
		// 'color': '#DDDDDD'
	})
	let model = reactive({
		userInfo: {
			phone: '',
			code: '',
			email:'',
			password: '',
			password2: '',
			invitationCode: ''
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
		'userInfo.email': {
			type: 'string',
			required: true,
			message:'请填写邮箱',
			trigger: ['blur', 'change'],
		},
		'userInfo.code': {
			type: 'string',
			required: true,
			message: '请填写验证码',
			trigger: ['blur']
		},
	})
	let step = ref(1)
	const tips = ref('');
	const value = ref('');
	let uCodeRef = ref(null);
	const codeChange = (text) => {
		tips.value = text;
	};
	const uformRef = ref(null)
	const getCode = () => {
		uformRef.value.validateField(chooseType.value == 'phone'?'userInfo.phone':'userInfo.email', (valid) => {
			if(valid.length){
				console.log('校验失败')
			}else{
				if (uCodeRef.value.canGetCode) {	
					// 模拟向后端请求验证码
					if(chooseType.value == 'phone'){
						send_code({phone:model.userInfo.phone}).then(res => {
							console.log(res)
						})
					}else{
						send_code({email:model.userInfo.email}).then(res => {
							console.log(res)
						})
					}
					
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						uCodeRef.value.start();
					}, 200);
				} else {
					// uni.$u.toast('倒计时结束后再发送');
				}
				
			}
		})
	};
	const handleNext = () => {
		uformRef.value.validate().then(valid => {
			if (valid) {
				//校验成功，进行下一步，请求。
				console.log('校验成功，进行请求', valid)
				// 验证手机号验证码
				check_code({
					phone: model.userInfo.phone,
					code: model.userInfo.code
				}).then(res => {
					console.log(res)
				})
				// is_active.value = !is_active.value
			} else {
				uni.$u.toast('校验失败', valid)
			}
		}).catch(() => {
			// 处理验证错误  
			uni.$u.toast('校验失败')
		});

	};
	// const handleNext = () => {
	// 	uformRef.value.validate().then(valid => {
	// 		if (valid) {
	// 			//校验成功，进行下一步，请求。
	// 			console.log('校验成功，进行请求',valid)
	// 			// 验证手机号验证码
	// 			check_code({phone:model.userInfo.phone,code:model.userInfo.code}).then(res=>{
	// 				console.log(res)
	// 			})
	// 			// is_active.value = !is_active.value
	// 		} else {
	// 			uni.$u.toast('校验失败',valid)
	// 		}
	// 	}).catch(() => {
	// 		// 处理验证错误  
	// 		uni.$u.toast('校验失败')
	// 	});
	
	// };
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.tab-content {
		font-weight: 500;
		font-size: 26rpx;
		color: #ABACAC;
	}

	.tab-item {

		position: relative;
	}
</style>