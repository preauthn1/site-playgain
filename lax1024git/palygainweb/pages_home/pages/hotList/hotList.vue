<template>
	<view>
		<view>
			<image :src="poster[tourism]" class="image-size" mode="widthFix"></image>
		</view>
		<view class="hot-list-content">
			<view class="hot-card" v-for="(item,index) in hotdatalist" :key="item.id">
				<view class="flex hot-card-content">
					<view class="relative">
						<image :src="item.img" class="hot-card-img" mode=""></image>
						<view class="ranking-style">
							<image :src="rankingIcon[index]" class="ranking-icon"></image>
						</view>
					</view>
					<view class="ml-60">
						<view class="text-0B0B0B font-26 text-2line">
							{{item.title}}
						</view>
						<view class="mt-16 flex">
							<view class="label-btn text-white font-regular font-16" v-for="tag in item.tag_arr.slice(0,2)">
								{{tag}}
							</view>
						</view>
						<view class="mt-10">
							<view class="flex">
								<view class="font-bold font-30 text-E6722D">
									¥{{item.min_price}}
								</view>
								<view class="font-regular font-20 text-767676 line-height-40 ml-10">
									起
								</view>
								<view class="font-regular font-20 text-767676 line-height-40 ml-20">
									{{item.buy}}人已报名
								</view>
							</view>
						</view>
						<view class="mt-10">
							<view class="flex font-medium font-24 text-3D91F5 justify-end">
								<view class="">
									{{item.spec_name}}
								</view>
								<view class="ml-16">
									{{item.city}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		hot_rank
	} from '@/api/tourism';
	import { useUserStore } from '@/store';
	const store = useUserStore()
	let Latlong = reactive({})
	const poster = reactive([
		'/static/image/home/tourism/gettingaround.png',
		'/static/image/home/tourism/domestictravel.png',
		'/static/image/home/tourism/outboundtravel.png',
	])

	const rankingIcon = reactive([
		'/static/image/home/tourism/1.png',
		'/static/image/home/tourism/2.png',
		'/static/image/home/tourism/3.png',
		'/static/image/home/tourism/4.png',
		'/static/image/home/tourism/5.png',
		'/static/image/home/tourism/6.png',
		'/static/image/home/tourism/7.png',
		'/static/image/home/tourism/8.png',
		'/static/image/home/tourism/9.png',
		'/static/image/home/tourism/10.png',
	])
	const tourism = ref(0)
	const hotdatalist = ref([])
	onLoad((query) => {
		console.log(query)
		if (query.title == "国内游") {
			tourism.value = 1
			hot_rank_data(query.id)
		} else if (query.title == "出境游") {
			tourism.value = 2
			hot_rank_data(query.id)
		} else {
			tourism.value = 0
			Latlong = store.longLat
			hot_rank_data(query.id)
		}
	})
	const hot_rank_data = (id) => {
		hot_rank({
			'type_id': id,
			'limit': 10,
			...Latlong
		}).then(res => {
			console.log(res.dataList,'热销榜')
			hotdatalist.value = res.dataList
		})
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f6fdfeFF;
	}

	.image-size {
		width: 100%;
	}

	.hot-list-content {
		padding: 0rpx 24rpx;
	}

	.hot-card {
		width: 702rpx;
		height: 260rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 11rpx 2rpx rgba(61, 62, 63, 0.04);
		border-radius: 20rpx;
		margin-top: 24rpx;
	}

	.hot-card-content {
		padding: 23rpx 0 20rpx 14rpx;
	}

	.hot-card-img {
		width: 235rpx;
		height: 223rpx;
		border-radius: 10rpx;
	}

	.ranking-icon {
		width: 64rpx;
		height: 57rpx;
	}

	.ranking-style {
		position: absolute;
		top: -30rpx;
		right: -30rpx;
	}

	.label-btn {
		background: #0791FD;
		border-radius: 10rpx;
		text-align: center;
		padding:6rpx;
		margin-right: 10rpx;
	}
</style>