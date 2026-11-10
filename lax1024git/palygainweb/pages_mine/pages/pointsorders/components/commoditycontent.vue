<template>
	<view class="bg-white box-shadow-1 mt-40 plr-28 pb-20">
		<view class="pt-30">
			<view class="pt-40 pb-20 flex relative content-line" v-for="item in 3">
				<view>
					<image src="/static/image/home/1.png" class="content-image"></image>
				</view>
				<view class="pl-40">
					<view class="text-2line font-26 font-medium pb-24">
						男士女士帆布腰带自动扣皮带简约韩 版个性潮人青年学生加长
					</view>
					<view class="text-767676 font-regular font-20 pb-20">
						卡其色：120cm
					</view>
					<view class="text-767676 font-regular font-20 pb-20">
						数量：1
					</view>
					<view class="flex justify-end font-30 font-bold text-E6722D pb-20">
						¥100
					</view>
				</view>
			</view>
			<view class="pt-20 flex justify-between">
				<view class="font-medium font-26 text-0B0B0B">
					运费
				</view>
				<view class="font-30 font-bold text-E6722D">
					¥100
				</view>
			</view>
			<view class="pt-20 flex justify-between">
				<view class="font-medium font-26 text-0B0B0B">
					商品总计
				</view>
				<view class="font-30 font-bold text-E6722D">
					¥100
				</view>
			</view>
			<view class="pt-20 flex justify-between">
				<view class="font-medium font-26 text-0B0B0B">
					实付款
				</view>
				<view class="font-30 font-bold text-E6722D">
					¥100
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.content-image{
		width: 235rpx;
		height: 223rpx;
		border-radius: 10rpx;
	}
	.content-line::after{
		content: "";
		width: 100%;
		height: 1rpx;
		background: #000000;
		opacity: 0.14;
		position: absolute;
		bottom:20rpx;
	}
</style>