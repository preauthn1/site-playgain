<template>
	<view>
		<u-waterfall v-model="list" ref="WF">
			<template v-slot:left="{leftList}">
				<view v-for="(item, index) in leftList" :key="index" @click="jumpdetails(item)">
					<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
					<view class="card mt-24 relative pb-10">
						<image :src="item.img" class="card-img" mode="aspectFill"></image>
						<view class="pl-14 pr-10">
							<view class="mt-10">
								<view class="font-26 font-medium text-0B0B0B line30 text-2line">
									<text>{{item.title}}</text>
								</view>
							</view>
							<view class="mt-14 flex">
								<view class="card-btn font-regular font-16 text-white " v-for="(item2,index) in item.tag_arr.slice(0,2)">
									{{item2}}
								</view>

							</view>
							<view class="mt-14">
								<view class="flex justify-between items-center">
									<view>
										<text
											class="font-semi-bold font-30 text-F66A01 line30">¥{{item.min_price}}</text>
										<text class="text-767676 font-20 pl-10">起</text>
									</view>
									<text class="text-767676 font-20">{{item.buy}}人已报名</text>
								</view>
							</view>
							<view class="mt-12">
								<view class="font-medium font-24 text-0790FD">
									{{item.city}}
								</view>
							</view>
						</view>
						<view class="days">
							<view class="font-22 font-regular text-white text-center line41">
								{{item.spec_name}}
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view v-for="(item, index) in rightList" :key="index" @click="jumpdetails(item)">
					<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
					<view class="card mt-24 relative pb-10">
						<image :src="item.img" class="card-img" mode="aspectFill"></image>
						<view class="pl-14 pr-10">
							<view class="mt-10">
								<view class="font-26 font-medium text-0B0B0B line30 text-2line">
									<text>{{item.title}}</text>
								</view>
							</view>
							<view class="mt-14 flex">
								<view class="card-btn font-regular font-16 text-white" v-for="(item2,index) in item.tag_arr.slice(0,2)">
									{{item2}}
								</view>
							</view>
							<view class="mt-14">
								<view class="flex justify-between items-center">
									<view>
										<text
											class="font-semi-bold font-30 text-F66A01 line30">¥{{item.min_price}}</text>
										<text class="text-767676 font-20 pl-10">起</text>
									</view>
									<text class="text-767676 font-20">{{item.buy}}人已报名</text>
								</view>
							</view>
							<view class="mt-12">
								<view class="font-medium font-24 text-0790FD">
									{{item.city}}
								</view>
							</view>
						</view>
						<view class="days">
							<view class="font-22 font-regular text-white text-center line41">
								{{item.spec_name}}
							</view>
						</view>
					</view>
				</view>
			</template>
		</u-waterfall>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	let list = ref([])
	let WF = ref(null)
	const jumpdetails = (item) => {
		uni.navigateTo({
			url: "/pages_home/pages/tourDetails/tourDetails?id=" + item.id
		})
	}
	const setData = (e)=>{
		console.log(e);
		if (e.length<11) {
			WF.value.clear()
		}
		setTimeout(function(){
			list.value = e;
		},100)
	
	}
	defineExpose({setData})
</script>

<style lang="scss" scoped>
	.card {
		width: 337rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(16, 8, 13, 0.06);
		border-radius: 15rpx;
	}

	.card-btn {
		// height: 43rpx;
		background: #0791FD;
		border-radius: 10rpx;
		text-align: center;
		// line-height: 32rpx;
		padding:6rpx;
		margin-right: 10rpx;
	}

	.card-img {
		width: 100%;
		// width: 337rpx;
		height: 281rpx;
		border-radius: 15rpx 15rpx 0rpx 0rpx;
	}

	.days {
		position: absolute;
		width: 125rpx;
		height: 41rpx;
		background: #A98FFE;
		border-radius: 0 15rpx 0 15rpx;
		top: 0;
		right: 0;
		line-height: 41rpx;
	}
</style>