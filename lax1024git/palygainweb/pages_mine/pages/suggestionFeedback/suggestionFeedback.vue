<template>
	<view>
		<view class="bg-white plr-26 pt-20">
			<u-form labelPosition="top" :model="model" :rules="rules" ref="uFormRef" label-width="auto">
				<u-form-item label="问题类型" required prop="userInfo.type">
					<view class="flex justify-between flex-1">
						<view v-for="(item,index) in questionTypeList" :key="index" class="ptb-16 plr-30"
							:class="model.userInfo.type==item.value?'ques-active':'ques'"
							@click="model.userInfo.type=item.value">
							{{item.name}}
						</view>
					</view>
				</u-form-item>
				<u-form-item label="请具体描述您遇到的问题" required prop="userInfo.content">
					<u-textarea count maxlength="500" v-model="model.userInfo.content"></u-textarea>
				</u-form-item>
				<u-form-item label="问题截图" required prop="userInfo.picture">
					<u-upload :file-list="fileList" @afterRead="afterRead" @delete="delPic" :max-count="4"></u-upload>
				</u-form-item>
				<u-form-item label="联系方式" required prop="userInfo.contact">
					<u-input placeholder="请输入联系方式（电话或邮箱" v-model="model.userInfo.contact"></u-input>
				</u-form-item>
			</u-form>
		</view>
		<view class="mt-80 plr-40">
			<u-button :custom-style="{height:'90rpx',fontSize:'30rpx'}" color="linear-gradient(0deg, #3B8EF5, #6BDBFB)"
				:loading="btnLoading" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		common_upload
	} from '@/api/mine.js'
	import {
		delFile,
		feedback
	} from '@/api/common.js'
	let uFormRef = ref(null);
	let model = reactive({
		userInfo: {
			type: 1,
			content: '',
			contact: '',
			picture: ''
		}
	})
	let btnLoading = ref(false);
	let rules = reactive({
		'userInfo.content': [{
				required: true,
				message: '请描述遇到的问题',
				// blur和change事件触发检验
				trigger: ['change', 'blur'],
			},
			{
				min: 10,
				max: 500,
				message: '最少10个字'
			},
		],
		'userInfo.picture': {
			required: true,
			message: '请上传图片',
			// blur和change事件触发检验
			trigger: ['change'],
		},
		'userInfo.contact': [{
				required: true,
				message: '请输入手机号',
				trigger: ['change', 'blur'],
			},
			{
				// 自定义验证函数，见上说明
				validator: (rule, value, callback) => {
					// 上面有说，返回true表示校验通过，返回false表示不通过
					// uni.$u.test.mobile()就是返回true或者false的
					return uni.$u.test.mobile(value);
				},
				message: '手机号码不正确',
				// 触发器可以同时用blur和change
				trigger: ['change', 'blur'],
			}
		]
	})

	let questionTypeList = ref([{
			name: '功能异常',
			value: 1
		},
		{
			name: '产品建议',
			value: 2
		},
		{
			name: '界面美观',
			value: 3
		},
		{
			name: '其他问题',
			value: 4
		}
	])

	let fileList = ref([]);
	const afterRead = async (event) => {
		console.log(event)
		let fileListLen = fileList.value.length
		fileList.value.push({
			...event.file,
			status: 'uploading',
			message: '上传中'
		})
		const result = await common_upload({
			filePath: event.file.url,
			name: 'file',
			formData: {
				folder: 'opinion'
			}
		})
		let item = fileList.value[fileListLen]
		fileList.value.splice(fileListLen, 1, Object.assign(item, {
			status: 'success',
			message: '',
			url: result[0].url
		}))
		model.userInfo.picture = fileList.value.map(_ => _.url).join(';')
		// console.log(result);
	}
	const delPic = async (event) => {
		let res = await delFile({
			url: fileList.value[event.index].url
		})
		fileList.value.splice(event.index, 1)
		model.userInfo.picture = fileList.value.map(_ => _.url).join(';')
	}

	const submit = () => {
		uFormRef.value.validate().then(res => {
			btnLoading.value = true
			feedback(model.userInfo).then(res => {
				uni.showToast({
					title: '提交成功！'
				})
				uFormRef.value.resetFields()
				fileList.value = [];
			}).finally(_ => {
				btnLoading.value = false;
			})
		}).catch(errors => {})

	}
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.ques-active {
		background: #EDC74B;
		border-radius: 10rpx;
		color: #fff;
	}

	.ques {
		border-radius: 10rpx;
		border: 1px solid #ABACAC;
	}
</style>