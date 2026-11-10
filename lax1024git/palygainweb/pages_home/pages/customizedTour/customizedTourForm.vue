<template>
	<view class="pb200">
		<view class="p-24 form-head">
			<view class="text-0B0B0B form-head-left">
				<view class="font-26 font-medium">填写您的需求</view>
				<view class="font-24">在线提交您的定制需求，我们将尽快和 您联系确认</view>
			</view>
			<image src="../../static/img/customized/form-1.png"></image>
		</view>

		<view class="bg-white p-20">
			<view class="text-0B0B0B flex-center">
				<view class="font-32 font-medium">联系信息</view>
				<view class="font-24 ml-20">(带<text class="text-red">*</text>为必填项)</view>
			</view>
			<u-form labelPosition="left" :model="model" :rules="rules" ref="uformRef" labelWidth="90">
				<u-form-item label="手机号码" prop="userInfo.phone" required>
					<u-input v-model="model.userInfo.phone" border="bottom" placeholder="" 
						disabledColor="#fff" disabled></u-input>
				</u-form-item>
				<u-form-item label="姓名" prop="userInfo.name" required>
					<u-input v-model="model.userInfo.name" border="bottom" placeholder="请输入以便公司员工联系您" 
						disabledColor="#fff"></u-input>
				</u-form-item>
				<u-form-item label="公司名称" prop="userInfo.enterprise">
					<u-input v-model="model.userInfo.enterprise" border="bottom" placeholder="请输入以便公司员工联系您" 
						disabledColor="#fff"></u-input>
				</u-form-item>
				<view class="text-0B0B0B flex-center pt-50">
					<view class="font-32 font-medium">需求描述</view>
					<view class="font-24 ml-20">(完善您的需求)</view>
				</view>
				<u-form-item label="定制类型" required @click="showType=true">
					<u-input v-model="customizeType" border="bottom" placeholder="请选择定制类型" readonly
						@click.native="showType=true">
					</u-input>
					<template #right>
						<u-icon name="arrow-right"></u-icon>
					</template>
				</u-form-item>
				<u-form-item label="出发地" prop="userInfo.address" required @click="showCity=true">
					<u-input v-model="model.userInfo.address" border="bottom" placeholder="请选择出发地" disabled=""
						disabledColor="#fff"></u-input>
					<template #right>
						<u-icon name="arrow-right"></u-icon>
					</template>
				</u-form-item>
				<u-form-item label="目的地" prop="userInfo.destination">
					<u-input v-model="model.userInfo.destination" border="bottom" placeholder="请输入目的地"></u-input>
				</u-form-item>

				<u-form-item label="预计出行时间" prop="userInfo.start_day" required @click="showDate = true">
					<u-input v-model="model.userInfo.start_day" border="bottom" placeholder="请选择出行时间"
						disabledColor="#fff"></u-input>
					<template #right>
						<u-icon name="arrow-right"></u-icon>
					</template>
				</u-form-item>
				<u-form-item label="人数" prop="userInfo.number">
					<u-input v-model="model.userInfo.number" border="bottom" placeholder="请填写人数" type="number"></u-input>
				</u-form-item>
				<u-form-item label="人均预算" prop="userInfo.budget">
					<u-input v-model="model.userInfo.budget" border="bottom" placeholder="请填写人均预算" type="number"></u-input>
				</u-form-item>
				<u-form-item label="备注" prop="userInfo.remark">
					<u-textarea v-model="model.userInfo.remark" border="none"
						placeholder="您可以补充您的旅游需求：行程安排、交通、酒店 景点、导游等要求，或者其他特殊情况备注"></u-textarea>
				</u-form-item>
			</u-form>
		</view>

		<view class="fiexd-bottom-btn">
			<view class="flex justify-end">
				<view style="width: 50%;">
					<u-button color="linear-gradient(0deg, #F3CD4D, #E54925)"
						:custom-style="{borderRadius: '15rpx',height:'100rpx',fontSize:'30rpx'}" @click="subOrder">提交订单</u-button>
				</view>
			</view>
		</view>

		<u-picker :show="showType" :columns="columns" title='选择类型' @cancel="showType=false" @confirm="chooseType"></u-picker>
		<select-city v-model="showCity" @choosestartcity="choosestartcity"></select-city>
		<u-datetime-picker :show="showDate" v-model="dateValue" @confirm="choosetime" mode="date" @cancel="showDate=false"></u-datetime-picker>
	</view>
	
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import SelectCity from './components/SelectCity.vue';
	import {onLoad} from '@dcloudio/uni-app'
	import {add_custom,custom_detail} from '@/api/tourism.js'
	let showType = ref(false);
	let columns = reactive([
		['企业定制','私人定制']
	])
	const customizeType = ref('')
	let model = reactive({
		userInfo: {
			name: '',
			phone:'',
			enterprise:'',
			type:'',
			address:'',
			destination:'',
			start_day:'',
			number:'',
			budget:'',
			remark:'',
			id:''
		}
	})

	let rules = reactive({
		'userInfo.name': {
			type: 'string',
			required: true,
			message: '请填写姓名',
			trigger: ['blur']
		},
		'userInfo.address': {
			type: 'string',
			required: true,
			message: '请选择出发地',
			trigger: ['blur']
		},
		'userInfo.destination': {
			type: 'string',
			required: true,
			message: '请输入目的地',
			trigger: ['blur']
		},
		'userInfo.start_day': {
			type: 'string',
			required: true,
			message: '请输入出行时间',
			trigger: ['blur']
		}
		
	})
	onLoad((query)=>{
		console.log('是否存在id',)
		if(query.id){
			custom_detail({'id':query.id}).then(res => {
				model.userInfo.phone = res.phone
				model.userInfo.name = res.name
				model.userInfo.enterprise = res.enterprise
				model.userInfo.address = res.address
				model.userInfo.destination = res.destination
				model.userInfo.type = res.type
				model.userInfo.id = res.id
				model.userInfo.start_day = res.start_day
				model.userInfo.remark = res.remark
				model.userInfo.number = res.number
				model.userInfo.budget = res.budget
				if(res.type == 1){
					customizeType.value = '企业定制'
				}else{
					customizeType.value = '私人定制'
				}
			})
		}else{
			model.userInfo.phone = query.phone
			model.userInfo.address = query.startcity
			model.userInfo.destination = query.endcity
			model.userInfo.type = query.type
			if(query.type == 1){
				customizeType.value = '企业定制'
			}else{
				customizeType.value = '私人定制'
			}
		}
		
		
	})
	const showCity = ref(false)
	const uformRef = ref(null)
	const showDate = ref(false);
	const dateValue = ref(Date.now());
	const choosetime = (e) => {
		model.userInfo.start_day = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
		console.log(model.userInfo.start_day)
		showDate.value = false
	}
	const subOrder = () => {
		uformRef.value.validate().then(valid => {
			if(valid){
				add_custom({...model.userInfo}).then(res => {
					console.log(res)
				})
			}
		})
	}
	const choosestartcity = (startcity) =>{
		model.userInfo.address = startcity
	}
	const chooseType = (e) => {
		customizeType.value = e.value[0]
		if(customizeType.value == '企业定制'){
			model.userInfo.type = 1
		}else{
			model.userInfo.type = 2
		}
		showType.value = false
	}
</script>

<style>
	page {
		background: #F8FDFE;
	}
</style>
<style lang="scss" scoped>
	.form-head {
		display: flex;
		justify-content: space-between;
		align-items: center;

		&-left {
			width: 60%;
		}

		image {
			width: 195rpx;
			height: 167rpx;
		}
	}
</style>