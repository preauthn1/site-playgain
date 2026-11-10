<template>
	<view>
		<up-popup :show="showSelectproduct" @close="showSelectproduct=false" :round="15" bgColor='#F5FBFC' @open="open">
			<view class="p-24">
				<view class="flex items-center">
					<image src="../../../../../static/image/home/1.png" class="product-img"></image>
					<view class="pl-16">
						<view class="font-bold font-30 text-E6722D pb-14">
							1999积分
						</view>
						<view class="font-regular font-20 text-767676 pb-14">
							库存200件
						</view>
						<view class="font-regular font-22 pb-14">
							已选: {{colors[1]}} 12件套
						</view>
					</view>
				</view>
				<view class="mt-30 product-line">
				</view>
				<view class="pt-22" v-for="item in 2">
					<view class="font-regular font-22">
						颜色
					</view>
					<view class="">
						<up-grid col="4">
							<up-grid-item v-for="(item,index) in colors">
								<view :class="[`product-type mt-24`,index == 0 ? `bg-EDC74B` : 'bg-E6E6E6FF']" >
									<view class="text-center font-22">
										{{item}}
									</view>
								</view>
							</up-grid-item>
						</up-grid>
					</view>
				</view>
				<view class="mt-40">
					<view class="flex justify-between">
						<view class="font-22 font-regular">
							购买数量
						</view>
						<up-number-box v-model="value"></up-number-box>
					</view>
				</view>
				<view class="confirm flex justify-center items-center text-white">
					确认
				</view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	
	const colors = ref(['高级灰','红色','黄色','卡其色','金色','蓝色','紫色'])
	
	const value = ref(0); 
	const showSelectproduct = ref(false)
	defineExpose({
		showSelectproduct,
	})
	
</script>

<style lang="scss" scoped>
	.product-img {
		width: 211rpx;
		height: 197rpx;
		border-radius: 10rpx;
	}

	.product-line {
		width: 704rpx;
		height: 1rpx;
		background: #000000;
		opacity: 0.12;
	}
	.product-type{
		width: 157rpx;
		height: 57rpx;
		border-radius: 10rpx;
		line-height: 57rpx;
	}
	.confirm {
		width: 635rpx;
		height: 93rpx;
		background: linear-gradient(180deg, #3B8EF5, #6BDBFB);
		border-radius: 20rpx;
		margin: 121rpx auto 0 auto;
	}
</style>