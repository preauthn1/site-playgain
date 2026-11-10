<template>
	<view class="address">
		<view class="box-shadow-1 bg-white p-26 mt-30" v-for="item in addressList">
			<view @click="chooseaddress(item)">
				<view class="flex items-center pb-10">
					<view class="font-26 font-medium text-0B0B0B pr-26 width-51">
						姓名
					</view>
					<view class="font-24 font-regular pr-18">
						{{item.name}}
					</view>
					<view class="default font-24 font-regular text-center" v-if="item.is_default">
						默认
					</view>
				</view>
				<view class="flex justify-end">
					<view class="font-24 font-regular text-black text-0B0B0B btnUse" v-if="address_id">
						{{item.id == address_id ? '已使用' :'使用'}}
					</view>
				</view>
				<view class="flex items-center pb-30">
					<view class="font-26 font-medium text-0B0B0B pr-26 width-51">
						地址
					</view>
					<view class="font-24 font-regular pr-18">
						{{item.province}}{{item.city}}{{item.area}}{{item.address}}
					</view>
				</view>
			</view>

			<view class="border-bottom">

			</view>
			<view class="flex justify-between items-center pt-30">
				<view class="flex">
					<image
						:src="item.is_default ? '/pages_mine/static/img/myorders/checked.png' : '/pages_mine/static/img/myorders/unchecked.png'"
						class="width-30" mode="widthFix" @click="setdefault(item)"></image>
					<view class="pl-22 font-24 font-regular">
						设为默认
					</view>
				</view>
				<view class="flex items-center">
					<image src="../../static/img/address/edit.png" class="width-26" mode="widthFix"
						@click="addaddress(item.id)">
					</image>
					<view class="font-24 font-regular text-AEAEAE pl-30" @click="deleteaddress(item.id)">
						删除
					</view>
				</view>
			</view>
		</view>
		<view class="confirm flex justify-center items-center text-white" @click="addaddress('')">
			新增收货地址
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getaddress,
		add_address,
		delete_address
	} from '@/api/mine';
	const addaddress = (id) => {
		uni.navigateTo({
			url: "/pages_mine/pages/newaddress/newaddress?id=" + id
		})
	}
	const addressList = ref([])
	const address_id = ref()
	//删除收货地址
	const deleteaddress = async (id) => {
		await delete_address({
			'id': id
		})
		getaddress().then(res => {
			addressList.value = res.dataList
		})
	}
	onShow(() => {
		getaddress().then(res => {
			addressList.value = res.dataList
		})
	})
	onLoad((query) => {
		address_id.value = query.id
	})
	const setdefault = async (item) => {
		if (item.is_default) {
			item.is_default = false
		} else {
			item.is_default = true
		}
		await add_address({
			...item
		})
		getaddress().then(res => {
			addressList.value = res.dataList
		})
	}
	const chooseaddress = (item) => {
		if (address_id.value) {
			uni.navigateBack({ //返回
				success: function() {
					uni.$emit("handClickBack", {
						code: item
					});
				}
			});
		}
	}
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.default {
		width: 81rpx;
		height: 36rpx;
		background: #EDC74B;
		border-radius: 5rpx;
	}

	.width-51 {
		width: 75rpx;
	}

	.border-bottom {
		width: 701rpx;
		height: 1rpx;
		background: #000000;
		opacity: 0.08;
	}

	.confirm {
		width: 635rpx;
		height: 93rpx;
		background: linear-gradient(180deg, #3B8EF5, #6BDBFB);
		border-radius: 20rpx;
		margin: 121rpx auto 0 auto;
	}
	.btnUse{
		padding: 5rpx 20rpx;
		border-radius: 8rpx;
		border: 1rpx solid black;
	}
</style>