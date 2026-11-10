<template>
	<view class="mt-30">
		<up-navbar :title="title" :autoBack="true" placeholder></up-navbar>
		<view class="bg-white box-shadow-1 plr-24 pb-30">
			<u-form :model="model" :rules="rules" ref="uformRef">
				<up-form-item label="姓名" prop="userinfo.name" label-width="80">
					<u--input border="bottom" v-model="model.userinfo.name" placeholder="请填写收货人姓名"></u--input>
				</up-form-item>
				<u-form-item label="手机号" prop="userinfo.mobile" label-width="80">
					<u--input border="bottom" maxlength="11"
						placeholder='请输入手机号码' type='number' v-model="model.userinfo.mobile" clearable></u--input>
				</u-form-item>
				<u-form-item label="所在地区" label-width="80" prop="userinfo.location" @click="choostaddress" :input-style="{'pointer-events': 'none'}">
					<u-input border="bottom" placeholder="省市区县，乡镇等" v-model="model.userinfo.location" clearable disabled disabledColor="#fff">
						<template #suffix>
							<u-icon name="arrow-right" size="30rpx"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="详细地址" label-width="80" prop="userinfo.address">
					<u-input border="bottom" placeholder="街道小区门牌号等" v-model="model.userinfo.address" clearable></u-input>
				</u-form-item>
			</u-form>
		</view>
		<view class="bg-white box-shadow-1 mt-30 p-24 flex justify-between items-center">
			<view class="flex flex-col">
				<view class="font-24 font-medium text-0B0B0B">
					设为默认地址
				</view>
				<view class="font-24 font-regular text-AEAEAE mt-22">
					提醒：每次下单都会默认使用该地址
				</view>
			</view>
			<view>
				<u-switch space="2" v-model="is_defaultaddress" activeColor="#F3C720" inactiveColor="rgb(230, 230, 230)">
				</u-switch>
			</view>
		</view>
		<view class="confirm flex justify-center items-center text-white" @click="handlesure">
			确认
		</view>
		<u-picker
		    :show="showPicker"
		    :columns="columns"
			@confirm="onConfirm"
			@change="onChange"
			@cancel="onCancel"
		  ></u-picker>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,onMounted
	} from 'vue';
	import {onLoad} from '@dcloudio/uni-app'
	import { add_address,getaddress } from '@/api/mine';
	import addressData from '@/utils/address.js'
	let model = reactive({
		userinfo:{
			id:'',
			name:'',
			mobile:'',
			location:'',
			province:'',
			city:'',
			area:'',
			address:'',
		}
	});
	let rules = reactive({
		'userinfo.name': {
			type: 'string',
			required: true,
			message: '请填写姓名',
			trigger: ['blur', 'change']
		},
		'userinfo.mobile': [{
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
		'userinfo.location': {
			type: 'string',
			required: true,
			message: '请填写所在地区',
			trigger: ['blur', 'change']
		},
		'userinfo.address': {
			type: 'string',
			required: true,
			message: '请填写详细地址',
			trigger: ['blur', 'change']
		},
	});
	const is_defaultaddress = ref(false)
	// 确定
	const uformRef = ref(null)
	const handlesure = () => {
		uformRef.value.validate().then(valid => {
			if (valid) {
				let addressinfo = JSON.parse(JSON.stringify(model.userinfo))
				delete addressinfo.location
				console.log(addressinfo)
				add_address({...addressinfo,"is_default":is_defaultaddress.value}).then(res =>{
					if(title.value == '修改收货地址'){
						uni.showToast({
						
							title:'修改地址成功！'
						})
					}else{
						uni.showToast({
						
							title:'新增地址成功！'
						})
					}
					
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},300)
				})
			} else {
				uni.$u.toast('校验失败', valid)
			}
		}).catch(() => {
			// 处理验证错误  
			// uni.$u.toast('校验失败')
			// uni.$u.toast('校验失败')
		});
	}
	const showPicker = ref(false);
	const columns = ref([[], [], []]); // 三维数组，分别存储省、市、区的数据
	const selectedValues = ref([]);
	const initPicker = () => {
	  const provinces = addressData?.map(item => item.name) || [];
	  const cities = addressData[0]?.city?.map(item => item.name) || [];
	  const areas = addressData[0]?.city[0]?.area?.map(item => item) || [];
	  columns.value = [provinces, cities, areas];
	};
	onMounted(() => {
	  if (addressData && addressData.length > 0) {
	      initPicker();
	    }
	});
	const onChange = (event) => {
	  const { columnIndex, value, index } = event;
	  if (columnIndex === 0) {
	    const cities = addressData[index]?.city?.map(item => item.name) || [];
	    const areas = addressData[index]?.city[0]?.area?.map(item => item) || [];
	    columns.value[1] = cities;
	    columns.value[2] = areas;
	  } else if (columnIndex === 1) {
	    const provinceIndex = selectedValues.value[0];
	    const areas = addressData[provinceIndex]?.city[index]?.area?.map(item => item) || [];
	    columns.value[2] = areas;
	  }
	  selectedValues.value[columnIndex] = index;
	};
	const onConfirm = (event) => {
	  console.log(event.value,'11111111111',)
	  if(event.value[0] == event.value[1]){
		  model.userinfo.province = '';
		  model.userinfo.city = event.value[1] + '市'
		  model.userinfo.area = event.value[2] 
		  model.userinfo.location = model.userinfo.city + model.userinfo.area
	  }else{
		  model.userinfo.province = event.value[0] +  '省'
		  model.userinfo.city = event.value[1] + '市'
		  model.userinfo.area = event.value[2] 
		  model.userinfo.location = model.userinfo.province + model.userinfo.city + model.userinfo.area
	  }
	  showPicker.value = false;
	};
	const onCancel = () => {
	  showPicker.value = false;
	};
	const choostaddress = () => {
		showPicker.value = true
	}
	const title = ref('新增收货地址')
	const addressList = ref([])
	onLoad((query)=>{
		if(query.id){
			title.value = '修改收货地址'
			getaddress().then(res => {
				addressList.value = res.dataList
				addressList.value = addressList.value.filter(item => item.id == query.id)
				model.userinfo = addressList.value[0]
				model.userinfo.location = model.userinfo.province + model.userinfo.city + model.userinfo.area
				is_defaultaddress.value = addressList.value[0].is_default
			})
		}
	})
</script>

<style scoped lang="scss">
	::v-deep .u-switch__node{
		background-color: #EDC74B !important;
	}
	.confirm {
		width: 635rpx;
		height: 93rpx;
		background: linear-gradient(180deg, #3B8EF5, #6BDBFB);
		border-radius: 20rpx;
		margin: 121rpx auto 0 auto;
	}
</style>