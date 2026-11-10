<template>
	<view class="returnaddress">
		<view class="mt-30 bg-white box-shadow-1 plr-24 pb-30">
			<view class="font-30 font-medium text-0B0B0B ptb-20 text-center">
				商品退货地址
			</view>
			<view class="flex pb-30 items-center">
				<view class="font-regular font-24 text-0B0B0B width-120">
					收件人：
				</view>
				<view class="font-regular font-24 text-0B0B0B">
					{{address.name}}
				</view>
				<view class="pl-16">
					<up-copy content="玩赚全球商品揽收部" notice="复制成功">
						<image src="../../../static/img/myorders/copy.png" class="width-24" mode="widthFix"></image>
					</up-copy>

				</view>
			</view>
			<view class="flex items-center">
				<view class="font-regular font-24 text-0B0B0B width-120">
					电话：
				</view>
				<view class="font-regular font-24 text-0B0B0B">
					{{address.mobile}}
				</view>
			</view>
			<view class="flex items-center pt-30 relative returnadd-line">
				<view class="font-regular font-24 text-0B0B0B width-120">
					地址：
				</view>
				<view class="font-regular font-24 text-0B0B0B">
					{{address.address}}
				</view>
			</view>
			<view class="flex items-center ptb-30">
				<view class="font-medium font-26 text-0B0B0B pr-40">
					选择物流
				</view>
				<up-input placeholder="请选择物流" v-model="logisticsname" border="bottom" disabled="true" disabledColor="#fff">
					<template #suffix v-if="!refund_logistics.number">
						<view>
							<up-icon color="#767676" name="arrow-right" @click="chooselogistics"></up-icon>
						</view>
					</template>
				</up-input>
			</view>
			<view class="flex items-center">
				<view class="font-medium font-26 text-0B0B0B pr-40">
					寄件单号
				</view>
				<up-input placeholder="请输入您的商品寄件单号" @blur="finish" v-model="trackingnumber" border="bottom" disabledColor="#fff" :disabled="refund_logistics.number?`true`:`false`">
				</up-input>
			</view>
		</view>
		<up-picker :show="show" :columns="columns"  @cancel="show=false" @confirm="confirm"></up-picker>
	</view>
</template>

<script setup>
	import { ref,reactive } from 'vue';
	import { get_logistics_list } from '@/api/order';
	const props = defineProps(['Business','refund_logistics'])
	const emit = defineEmits(['returnaddressfinsh'])
	const address = props.Business
	const refund_logistics = props.refund_logistics
	console.log(refund_logistics.number)
	const logisticsname = ref('')
	// 选择物流
	const show = ref(false);
	// 寄件单号
	const trackingnumber = ref('')
	const columns = ref([[]])
	const logistics_list = ref([])
	logisticsname.value = refund_logistics.name
	trackingnumber.value = refund_logistics.number
	const chooselogistics = () => {
		console.log('选择物流')
		show.value = true
	}
	// 获取物流公司列表
	get_logistics_list().then(res => {
		logistics_list.value = res
		res.map(item =>{
			 columns.value[0].push(item.name)
			return item.name
		})
	})
	const confirm = (e) => {
		logisticsname.value = e.value[0]
		let logis_item = logistics_list.value.filter(item => item.name == logisticsname.value)
		emit('returnaddressfinsh',logis_item[0].id,trackingnumber.value)
		show.value = false
	}
	const finish = () => {
		let logis_item = logistics_list.value.filter(item => item.name == logisticsname.value)
		emit('returnaddressfinsh',logis_item[0].id,trackingnumber.value)
	}
</script>

<style lang="scss" scoped>
	.width-120 {
		width: 120rpx;
	}

	.returnadd-line::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 1rpx;
		background: #000000;
		opacity: 0.08;
		bottom: -17rpx;

	}
</style>