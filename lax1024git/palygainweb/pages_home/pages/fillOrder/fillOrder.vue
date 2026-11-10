<template>
	<view class="fill-order">
		<view class="order-info plr-24 mt-30">
			<image :src="specification_details.product.img"></image>
			<view class="pl-10">
				<view class="font-28 text-0B0B0B font-medium">{{specification_details.product.title}}</view>
				<view class="flex flex-wrap items-center mt-20">
					<view v-for="(item,index) in specification_details.product.tag.slice(0,2)" :key="index"
						class="bg-0790FD mr-10 ptb-5 plr-10 font-22 text-white border-radius-10">
						{{item}}
					</view>
				</view>
				<view class="font-24 mtb-10">出发时间</view>
				<view class="flex justify-between font-20 text-0B0B0B">
					<view>{{specification_details.start_day_str}} {{specification_details.start_week}}</view>
					<view class="bg-F7D94C text-white plr-14 border-radius-10">11天10晚</view>
					<view>{{specification_details.end_day_str}} {{specification_details.end_week}}</view>
				</view>
			</view>
		</view>
		
		<view class="bg-white pb-30 plr-16 mt-30">
			<view class="font-28 pt-16 font-medium">联系人信息 <text class="text-AEAEAE font-24">（订单核实及出行通知接收）</text></view>
			<view class="plr-14">
				<u--form labelPosition="left" :model="model1" :rules="rules" ref="uformRef" labelWidth='auto'>
					<u-form-item label="真实姓名" prop="userInfo.name" required>
						<u--input v-model="model1.userInfo.name" border="bottom" placeholder='请输入真实姓名'></u--input>
					</u-form-item>
					<u-form-item label="手机号码" prop="userInfo.phone" required>
						<u--input v-model="model1.userInfo.phone" border="bottom" maxlength="11" placeholder='请输入手机号码'></u--input>
					</u-form-item>
				</u--form>
			</view>
		</view>

		<view class="bg-white pb-30 plr-16 mt-30 font-26">
			<view class="font-28 pt-16 font-medium mb-40">出发人数</view>
			<view class="flex items-center justify-between">
				<view class=" text-0B0B0B">成人</view>
				<view class="flex items-center">
					<view class="mr-16 ">¥{{specification_details.price}}</view>
					<u-number-box v-model="specification.number" integer :min='0'></u-number-box>
				</view>
			</view>
			<u-line margin="20rpx 0"></u-line>
			<view class="flex items-center justify-between">
				<view class=" text-0B0B0B ">儿童</view>
				<view class="flex items-center">
					<view class="mr-16">¥{{specification_details.kid_price}}</view>
					<u-number-box v-model="specification.kid_number" integer :min='0'></u-number-box>
				</view>
			</view>
		</view>

		<view class="bg-white pb-30 plr-16 mt-30">
			<view class="font-28 pt-16 font-medium mb-40">备注</view>
			<u--textarea v-model="specification.remarks" placeholder="如有对旅游行程需要提前告知旅行社的事宜可在此输入" border='none'></u--textarea>
		</view>

		<view class="flex items-center plr-22 mt-24">
			<image :src="agreement?'/static/image/login/select-on.png':'/static/image/login/select-off.png'"
				class="width-30" mode="widthFix" @click="agreement=!agreement"></image>
			<view class="ml-10 font-26">提交表示已阅读并接受</view>
		</view>
		<view class="flex items-center font-24 plr-22 mt-26">
			<view v-for="(item,index) in noticeList" :key="index" class="text-3D91F5 mr-12">
				{{item.name}}
			</view>
		</view>

		

		<view class="order-bottom-btn">
			<view class="order-info-bottom" v-if='specification.number>0||specification.kid_number>0'>
				<image src="../../static/img/fillorder.png"></image>
				<view class="order-info-bottom-content">
					<view>已选日期：{{specification_details.start_day_str}}～{{specification_details.end_day_str}}</view>
					<view>已选人数：成人{{specification.number}}人，儿童{{specification.kid_number}}人</view>
					<view>完成订单可赠送积分：{{countprice}}</view>
				</view>
			</view>
			<view class="flex plr-24 pt-26 justify-between items-center">
				<view class="flex-1 flex items-center" >
					<view class="font-28 text-0B0B0B font-medium">总额：<text class="text-F66A01">¥{{countprice}}</text></view>
					<!-- <view class="font-24 text-767676">成人：{{specification.number}} 儿童：{{specification.kid_number}}</view> -->
					<view class="flex items-center text-3D91F5 font-24 ml-24" @click="showDetail=true">
						明细<u-icon name='arrow-up' color="#3d91f5"></u-icon>
					</view>
				</view>
				
				<u-button color="linear-gradient(0deg, #F3CD4D, #E54925)" :custom-style="{height:'70rpx',width:'240rpx'}" @click="suborder">提交订单</u-button>
			</view>
		</view>

		<!-- 明细弹框 -->
		<u-popup v-model:show="showDetail" :round="20" bgColor='#F5FBFC'>
			<view>
				<PopupTitle title='费用明细'></PopupTitle>
				<view class="plr-24 mb-50">
					<view class="flex justify-between items-center">
						<text class="font-28 text-0B0B0B font-medium">套餐费用</text>
						<text class="text-E6722D font-30 font-semi-bold">¥{{countprice}}</text>
					</view>
					<view class="flex justify-between items-center font-24 text-767676 mt-24"><text>成人</text><text>{{specification_details.price}}*{{specification.number}}</text></view>
					<view class="flex justify-between items-center font-24 text-767676 mt-24"><text>儿童</text><text>{{specification_details.kid_price}}*{{specification.kid_number}}</text></view>
					<view class="mt-24 text-E6722D font-30 font-semi-bold text-right">总金额：{{countprice}}</view>
				</view>

				<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB)" @click="showDetail=false"
					:custom-style="{height:'100rpx',fontSize:'30rpx'}">确定</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script setup>
	import {
		computed,
		reactive,
		ref,
	} from 'vue';
	import {onLoad} from '@dcloudio/uni-app'
	import { tourism_order_info,tourism_create_order } from '@/api/tourism';
	
	let specification_details = ref({})
	
	let countprice = computed(()=>{
		return specification.number * specification_details.value.price + specification.kid_number * specification_details.value.kid_price
	})
	let showDetail = ref(false)
	onLoad((query)=>{
		tourism_order_info({'spec_id':query.spec_id}).then(res => {
			specification_details.value = res
		})
	})
	let model1 = reactive({
		userInfo: {
			name: '',
			phone:'',
			
		},
	})
	let specification = reactive({
		product_id:'',
		spec_id:'',
		number:0,
		kid_number:0,
		remarks:''
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
		'userInfo.name':{
			type: 'string',
			required: true,
			message: '请填写姓名',
			trigger: ['blur']
		}
	})
	const agreement = ref(false)
	let noticeList = ref([{
			name: '《报名须知》'
		},
		{
			name: '《报名限制》'
		},
		{
			name: '《退订政策》'
		}
	])
	const uformRef = ref(null)
	const suborder = () => {
		specification.product_id = specification_details.value.product_id
		specification.spec_id = specification_details.value.id
		if (!agreement.value) {
			uni.$u.toast('请勾选提交表示已阅读并接受！')
			return;
		}
		if(specification.number + specification.kid_number > specification_details.value.surplus_people){
			console.log()
			uni.showToast({
				icon:"none",
				title:`出发人数最多可选择${specification_details.value.surplus_people}人`
			})
			return;
		}
		if(!countprice.value){
			uni.showToast({
				icon:'none',
				title:"请选择出行人数"
			})
			return;
		}
		uformRef.value.validate().then(valid => {
			if(valid){
				let con = JSON.stringify([{"name":model1.userInfo.name,"mobile":model1.userInfo.phone}])
				tourism_create_order({...specification,"contacts":con}).then(res=>{
					// ?title=报名结果&name=报名成功&url=/pages_mine/pages/myorders/myorders?page=0
					setTimeout(()=>{
						let data = {title:'报名结果',name:'报名成功',url:'/pages_mine/pages/myorders/myorders?page=0'}
						uni.navigateTo({
							url:"/pages_mine/pages/exchangeresults/exchangeresults?data=" + encodeURIComponent(JSON.stringify(data))
						})
					},300)
					uni.showToast({
						icon:"success",
						title:"报名成功"
					})
					
				})
			}else{
				uni.$u.toast('校验失败')
			}
		})
	}
</script>

<style lang="scss">
	page {
		background: #F8FDFE;
	}
</style>
<style lang="scss" scoped>
	.fill-order{
		padding-bottom: 300rpx;
	}
	.order-info {
		display: flex;

		image {
			width: 276rpx;
			height: 208rpx;
			flex-shrink: 0;
		}
	}

	.order-info-bottom {
		font-weight: 400;
		font-size: 24rpx;
		color: #0B0B0B;
		width: 100%;
		height: 136rpx;
		// margin-top: 24rpx;
		position: relative;

		image {
			width: 100%;
			height: 100%;
		}

		&-content {
			position: absolute;
			width: 100%;
			padding: 20rpx;
			height: 100%;
			box-sizing: border-box;
			top: 0;
			left: 0;
		}
	}

	.order-bottom-btn {
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 9rpx 0rpx rgba(15, 9, 13, 0.09);
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		// display: flex;
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		bottom: 0;
		// padding: 16rpx 24rpx;
		align-items: center;
		padding-bottom: 16rpx;
	}
</style>