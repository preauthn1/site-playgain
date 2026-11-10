<template>
	<view class="records">
		<view class="bg-white box-shadow-1 mt-30" v-for="item in 3">
			<view class="p-24">
				<view class="ptb-14 flex items-center">
					<view>
						<image src="../../../static/image/home/1.png" class="records-img"></image>
					</view>
					<view class="pl-24">
						<view class="text-2line font-medium font-26 text-0B0B0B">
							男士女士帆布腰带自动扣皮带简约韩版 个性潮人青年学生加长
						</view>
						<view class="font-20 font-regular text-767676 pt-14">
							卡其色：120cm
						</view>
						<view class="font-20 font-regular text-767676 pt-14">
							数量：1
						</view>
						<view class="flex justify-between">
							<view class="font-24 font-regular flex items-center">
								扣除积分：
								<view class="text-E6722D font-30 font-bold">
									199
								</view>
							</view>
							<view class="font-24 font-regular flex items-center">
								兑换数量：1
							</view>
						</view>
					</view>
				</view>
				<view class="records-line">
				</view>
				<view class="ptb-14 flex justify-between">
					<view class="font-medium font-26 text-0B0B0B">
						订单编号
					</view>
					<view class="font-24 font-regular">
						2024718123123
					</view>
				</view>
				<view class="ptb-14 flex justify-between">
					<view class="font-medium font-26 text-0B0B0B">
						兑换时间
					</view>
					<view class="font-24 font-regular">
						2024718123123
					</view>
				</view>
				<view class="ptb-14 flex justify-between">
					<view class="font-medium font-26 text-0B0B0B">
						兑换结果
					</view>
					<view :class="[`font-24 font-regular`, item !== 2 ? 'text-51A838' :'text-C1423C']">
						{{item !== 2 ? '成功' : '失败'}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		integral_exchange
	} from '@/api/shop';
	import {
		ref
	} from 'vue';
	const exchangerecords = ref([])
	integral_exchange().then(res => {
		console.log(res)
	})
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.records-img {
		width: 235rpx;
		height: 223rpx;
		border-radius: 10rpx;
	}

	.records-line {
		width: 702rpx;
		height: 1rpx;
		background: #000000;
		opacity: 0.11;
	}
</style>