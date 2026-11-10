<template>
	<view class="pb200">
		<view class="p-24 form-head">
			<view class="text-0B0B0B form-head-left" v-if="data.status == 1">
				<view class="font-26 font-medium">定制需求已提交</view>
				<view class="font-24">平台工作人员将尽快与您联系 请耐心等待</view>
			</view>
			<view class="text-0B0B0B form-head-left" v-else-if="data.status == 2">
				<view class="font-26 font-medium">订单已受理</view>
				<view class="font-24">您的旅游定制方案正在生成中，平台工作人员稍后将与您联系告知请耐心等待</view>
			</view>
			<view class="text-0B0B0B form-head-left" v-else-if="data.status == 3">
				<view class="font-26 font-medium">订单已完成</view>
				<view class="font-24">您的旅游定制方案已生成，本次订单已关闭期待下次为您服务</view>
			</view>
			<view class="text-0B0B0B form-head-left" v-else-if="data.status == 4">
				<view class="font-26 font-medium">订单已驳回</view>
				<view class="font-24">非常抱歉，您的旅游定制方案未能成功生成期待下次为您服务</view>
			</view>
			<view class="text-0B0B0B form-head-left" v-else>
				<view class="font-26 font-medium">订单已关闭</view>
				<view class="font-24">订单已关闭，期待下次为您服务</view>
			</view>
			<image :src="`/pages_home/static/img/customized/form-${data.status == 0 || data.status == 4? 3: 2}.png`"></image>
		</view>

		<view class="bg-white p-20">
			<view class="text-0B0B0B flex-center">
				<view class="font-32 font-medium">联系信息</view>
			</view>
			<u-form labelPosition="left" labelWidth="90">
				<u-form-item label="手机号码">
					<u-input v-model="data.phone" border="bottom" disabled
						disabledColor="#fff"></u-input>
				</u-form-item>
				<u-form-item label="姓名">
					<u-input v-model="data.name" border="bottom" disabled
						disabledColor="#fff"></u-input>
				</u-form-item>
				<u-form-item label="公司名称">
					<u-input v-model="data.enterprise" border="bottom"  disabled
						disabledColor="#fff"></u-input>
				</u-form-item>
			</u-form>
		</view>
		<view class="bg-white p-20 mt-26">
			<view class="text-0B0B0B flex-center">
				<view class="font-32 font-medium">需求描述</view>
			</view>
			<u-form labelPosition="left" labelWidth="100">
				<u-form-item label="定制类型">
					<u-input v-model="data.type_str" border="bottom" disabled
						disabledColor="#ffffff">
					</u-input>
				</u-form-item>
				<u-form-item label="出发地">
					<u-input v-model="data.address" border="bottom" disabled
						disabledColor="#fff"></u-input>
				</u-form-item>
				<u-form-item label="目的地" >
					<u-input v-model="data.destination" border="bottom" ></u-input>
				</u-form-item>

				<u-form-item label="预计出行时间" >
					<u-input v-model="data.start_day" border="bottom"  disabled
						disabledColor="#fff"></u-input>
				</u-form-item>
				<u-form-item label="人数">
					<u-input v-model="data.number" border="bottom"  disabled
						disabledColor="#fff"></u-input>
				</u-form-item>
				<u-form-item label="人均预算">
					<u-input v-model="data.budget" border="bottom"  disabled
						disabledColor="#fff"></u-input>
				</u-form-item>
				<u-form-item label="备注">
					<u-input v-model="data.remark" border="none"
						 disabled
						disabledColor="#fff">
					</u-input>
				</u-form-item>
			</u-form>
		</view>

		<view class="fiexd-bottom-btn" v-if="data.status == 1">
			<u-row>
				<u-col :span='5'>
					<u-button :custom-style="{borderRadius: '15rpx',height:'100rpx',fontSize:'30rpx'}" @click="cancelOrder">取消订单</u-button>
				</u-col>
				<u-col :span='2'></u-col>
				<u-col :span='5'>
					<u-button color="#3D91F5"
						:custom-style="{borderRadius: '15rpx',height:'100rpx',fontSize:'30rpx'}" @click="editrequer">修改需求</u-button>
				</u-col>
			</u-row>
		</view>
		<view class="fiexd-bottom-btn" v-else>
			<u-row>
				<u-col :span='5'>
				</u-col>
				<u-col :span='2'></u-col>
				<u-col :span='5'>
					<u-button :custom-style="{borderRadius: '15rpx',height:'100rpx',fontSize:'30rpx'}" @click="deleteOrder">删除订单</u-button>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive, ref
	} from 'vue';
	import {onLoad} from '@dcloudio/uni-app'
	import {custom_detail,custom_cancel,custom_delete} from '@/api/tourism.js'
	const data = ref()
	onLoad((options) => {
		get_custom_detail(options.id)
	})
	const get_custom_detail = (id) => {
		custom_detail({'id':id}).then(res => {
			data.value = res
		})
	}
	const editrequer = () => {
		uni.navigateTo({
			url:`./customizedTourForm?id=${data.value.id}`
		})
	}
	const cancelOrder = () => {
		console.log('取消订单',data.value.id)
		custom_cancel({'id':data.value.id}).then(res => {
			get_custom_detail(data.value.id)
		})
	}
	const deleteOrder = () => {
		console.log('删除订单',data.value.id)
		uni.showModal({
			content: '确认删除该订单？',
			confirmText: '确认',
			success(res) {
				if (res.confirm) {
					console.log('确认')
				  custom_delete({'id':data.value.id}).then(res => {
					  uni.navigateBack({ //返回
						success: function() {
							uni.$emit("IdBack", {
								id: data.value.id
							});
						}
					  });
				  })
				} 
			}
		})
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