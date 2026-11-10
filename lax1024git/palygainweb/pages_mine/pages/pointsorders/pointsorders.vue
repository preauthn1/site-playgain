<template>
	<view class="mt-40 pointsorders">
		<view class="bg-white box-shadow-1 mb-20 pb-20" v-for="item in specdata" :key="item.id"
			v-if="productList.express_type == 2">
			<view class="text-0B0B0B font-30 font-medium text-center pt-18 pb-40">
				到店领取
			</view>
			<view class="text-0B0B0B font-30 font-medium plr-24 flex items-center pb-24">
				<view class="width-80 flex-shrink">
					地址
				</view>
				<view class="pl-20">
					{{productList.take_address[item.product_id].province}}{{productList.take_address[item.product_id].city}}{{productList.take_address[item.product_id].county}}{{productList.take_address[item.product_id].address}}
				</view>
			</view>
			<view class="mt-50" v-if="specdata.length == 1">
				<map style="width: 750rpx;height:370rpx;" :latitude="latitude" :longitude="longitude" :markers="covers"
					:scale='18' @markertap='markertap'>
				</map>
			</view>
			<view class="p-24 flex justify-between items-center">
				<view class="text-0B0B0B font-26 font-medium width-120 pr-20" style="white-space: nowrap;">
					领取日期
				</view>
				<up-datetime-picker hasInput :show="item.showtime" :minDate="item.timevalue" control
					v-model="item.timevalue" placeholder="请选择领取日期" mode="date" title="领取日期">
				</up-datetime-picker>
			</view>
			<view class="pt-14 plr-28 flex items-center">
				<view>
					<image :src="item.img" class="orders-img"></image>
				</view>
				<view class="pl-24 w100">
					<view class="text-2line font-medium font-26 text-0B0B0B">
						{{item.product_name}}
					</view>
					<view class="font-20 font-regular text-767676 pt-14">
						{{item.name}}
					</view>
					<view class="font-20 font-regular text-767676 pt-24">
						数量：{{item.number}}
					</view>
					<view class="flex justify-end font-30 font-bold text-E6722D pb-20" v-if="product_type == 2">
						¥{{item.amount}}
					</view>
					<view class="flex justify-end font-30 font-bold text-E6722D pb-20" v-else>
						{{item.integral_amount}}
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white box-shadow-1" v-else>
			<view class="mt-30 bg-white box-shadow-1 plr-24 pb-30">
				<view class="font-30 font-medium text-0B0B0B ptb-20 text-center">
					我的地址
				</view>
				<view class="flex pb-30 items-center">
					<view class="font-medium width-120 font-26 text-0B0B0B width-120">
						姓名
					</view>
					<view class="flex justify-between w100" @click="changeaddress(productList.address.id)">
						<view class="font-regular font-24">
							{{productList.address.name}}
						</view>
						<up-icon name="arrow-right" size="28rpx"></up-icon>
					</view>
				</view>
				<view class="flex items-center">
					<view class="font-medium width-120 font-26 text-0B0B0B width-120">
						地址
					</view>
					<view class="flex justify-between w100">
						<view class="font-regular font-24">
							{{productList.address.province}}{{productList.address.city}}{{productList.address.address}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bg-white box-shadow-1 mt-40 plr-28 pb-20">
			<view class="pt-30">
				<view class="pt-40 pb-20 flex relative content-line" v-for="item in specdata" :key="item.id"
					v-if="productList.express_type == 1">
					<view>
						<image :src="item.img" class="orders-img"></image>
					</view>
					<view class="pl-40 w100">
						<view class="text-2line font-26 font-medium">
							{{item.product_name}}
						</view>
						<view class="text-767676 font-regular font-20 ptb-20">
							{{item.name}}
						</view>
						<view class="text-767676 font-regular font-20 pb-20">
							数量：{{item.number}}
						</view>
						<view class="flex justify-end font-30 font-bold text-E6722D pb-20" v-if="product_type == 2">
							¥{{item.amount}}
						</view>
						<view class="flex justify-end font-30 font-bold text-E6722D pb-20" v-else>
							{{item.integral_amount}}
						</view>
					</view>
				</view>
				<view class="font-medium font-26 text-0B0B0B">
					买家留言
				</view>
				<view class="pl-60">
					<up-textarea v-model="value3" border="none" placeholder="选填，将填写内容告知平台，30字以内" height="30" count
						maxlength="30">
					</up-textarea>
				</view>
				<view class="pt-20 flex justify-between">
					<view class="font-medium font-26 text-0B0B0B">
						运费
					</view>
					<view class="font-30 font-bold text-E6722D">
						¥{{productList.spec_all.freight_amount}}
					</view>
				</view>
				<view class="pt-20 flex justify-between">
					<view class="font-medium font-26 text-0B0B0B">
						商品总计
					</view>
					<view class="font-30 font-bold text-E6722D">
						¥{{product_type == 2 ?productList.spec_all.all_amount : 0}}
					</view>
				</view>
				<view class="flex justify-between ptb-20" v-if="product_type == 3">
					<view class="font-medium font-26 text-0B0B0B">
						积分扣除
					</view>
					<view class="font-30 text-E6722D font-bold">
						{{productList.spec_all.integral_amount}}
					</view>
				</view>

			</view>
		</view>
		<view class="bg-white box-shadow-1 mt-40">
			<view class="text-0B0B0B font-30 font-medium text-center pt-18 pb-40">
				支付方式
			</view>
			<view class="p-24" v-if="product_type != 2">
				<view class="flex items-center relative">
					<image src="../../static/img/marketplaceCredits/exchange.png" class="width-80" mode="widthFix" />
					<view class="pl-28 w100">
						<view class="flex justify-between items-center">
							<view class="font-regular font-24">
								积分抵扣
							</view>
							<image src="../../static/img/marketplaceCredits/Selected.png" class="width-30"
								mode="widthFix" />
						</view>
					</view>
				</view>
				<view class="orders-line mt-20">
				</view>
				<view class="text-right font-regular font-24 pt-14">
					当前可用积分：199
				</view>
			</view>
			<view class="payfor p-24" v-else>
				<view class="flex justify-between items-center" @click="choosepay('wxpay')">
					<view>
						<image src="/pages_mine/static/img/wx.png" class="width-80" mode="widthFix"></image>
					</view>
					<view class="flex pl-28 w100 justify-between relative payfor-line">
						<view class="font-regular font-24 text-black">
							微信支付
						</view>
						<image
							:src="paymethed == 'wxpay' ? '/pages_mine/static/img/myorders/checked.png' : '/pages_mine/static/img/hobbies/unchecked.png'"
							class="width-30" mode="widthFix"></image>
					</view>

				</view>
				<view class="flex justify-between items-center pt-30" @click="choosepay('alipay')">
					<view>
						<image src="/pages_mine/static/img/zfb.png" class="width-80" mode="widthFix"></image>
					</view>
					<view class="flex pl-28 w100 justify-between relative">
						<view class="font-regular font-24 text-black">
							支付宝
						</view>
						<image
							:src="paymethed == 'alipay' ? '/pages_mine/static/img/myorders/checked.png' : '/pages_mine/static/img/hobbies/unchecked.png'"
							class="width-30" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<suborderVue @click="suborder"></suborderVue>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		product_order_info,
		goods_create_order
	} from '@/api/shop';
	import suborderVue from './components/suborder.vue';
	import {
		order_pay_info,
		order_integral_pay
	} from '@/api/order';
	// 使用 ref 创建响应式引用  
	const value3 = ref('');
	// 更改地址
	const changeaddress = (id) => {
		uni.navigateTo({
			url: "/pages_mine/pages/address/address?id=" + id
		})
	}
	let choosespec = ref()
	let product_type = ref()
	let productList = ref({})
	let paymethed = ref('wxpay')
	const choosepay = (methed) => {
		console.log(productList.value.address, '更改的地址')
		paymethed.value = methed
	}
	onShow(() => {
		uni.$on("handClickBack", res => {
			productList.value.address = res.code

		})
	})
	const specdata = ref([])
	const latitude = ref()
	const longitude = ref()
	const address_name = ref()
	let covers = ref([{
		id: 0,
		latitude: latitude.value,
		longitude: longitude.value,
		iconPath: '/static/image/mine/location.png'
	}])
	onLoad((query) => {

		product_type.value = query.type
		product_order_info({
			'product_ids': query.products
		}).then(res => {
			productList.value = res
			console.log(res, "这是商品确认订单")
			specdata.value = res.spec_list.map(e => {
				return {
					...e,
					timevalue: Date.now(),
					showtime: false
				}
			})

			latitude.value = productList.value.take_address[specdata.value[0].product_id].lat
			longitude.value = productList.value.take_address[specdata.value[0].product_id].lng
			address_name.value = productList.value.take_address[specdata.value[0].product_id].address
			covers.value[0].latitude = productList.value.take_address[specdata.value[0].product_id].lat
			covers.value[0].longitude = productList.value.take_address[specdata.value[0].product_id].lng

		})
	})
	const suborder = () => {

		let subdata = []
		subdata = specdata.value.map(e => {
			return {
				'spec_id': e.id,
				'product_id': e.product_id,
				'number': e.number,
				'take_day': uni.$u.timeFormat(e.timevalue, 'yyyy-mm-dd')
			}
		})
		const addressSpecific = productList.value.address.province + productList.value.address.city + productList.value
			.address.area + productList.value.address.address
		const product_ids = JSON.stringify(subdata)

		const address = JSON.stringify({
			'name': productList.value.address.name,
			'mobile': productList.value.address.mobile,
			'address': addressSpecific
		})
		if (productList.value.address.name || productList.value.express_type == 2) {
			goods_create_order({
				'product_ids': product_ids,
				'contacts': address,
				'remarks': value3.value,
				'type': product_type.value
			}).then(res => {
				console.log(res)
				let ids = ref([])
				res.map(item => {
					ids.value.push(item.order_id)
				})
				if (product_type.value == 2) {
					order_pay_info({
						'order_id': ids.value.join(','),
						'pay_type': paymethed.value
					}).then(res => {
						console.log(res.pay_info)
						let orderInfo = res.pay_info
						uni.getProvider({
							service: 'payment',
							success: function(res) {
								console.log(res.provider)
								if (~res.provider.indexOf(paymethed.value)) {
									uni.requestPayment({
										"provider": paymethed.value, //固定值为"alipay"
										"orderInfo": orderInfo, //此处为服务器返回的订单信息字符串
										success: function(res) {
											var rawdata = JSON.parse(res
												.rawdata);
											console.log("支付成功");
										},
										fail: function(err) {
											console.log('支付失败:' + JSON
												.stringify(err));
										}
									});
								}
							}
						})
					})
					// 积分支付
				} else {
					order_integral_pay({
						'order_id': ids.value[0]
					}).then(res => {
						console.log(res, '这是积分支付！！！')
					})
				}


			})
		} else {
			
			uni.showToast({
				icon: 'error',
				title: '请添加收货地址',
			})


		}


		// uni.navigateTo({
		// 	url: "../../pages/exchangeresults/exchangeresults"
		// })

	}


	const markertap = (e) => {
		uni.openLocation({
			latitude: latitude.value,
			longitude: longitude.value,
			name: address_name.value,
		})
	}
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.pointsorders {
		padding-bottom: 200rpx;
	}

	.orders-line {
		position: relative;
		bottom: 0;
		left: 120rpx;
		width: 588rpx;
		height: 1rpx;
		background: #000000;
		opacity: 0.08;
	}

	.orders-img {
		width: 235rpx;
		height: 223rpx;
		border-radius: 10rpx;
	}

	.orders-line-2 {
		width: 702rpx;
		height: 1rpx;
		background: #000000;
		opacity: 0.11;
	}

	.flex-shrink {
		flex-shrink: 0;
	}
</style>