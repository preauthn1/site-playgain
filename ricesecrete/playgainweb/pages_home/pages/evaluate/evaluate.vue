<template>
	<view>
		<u-sticky bgColor="#F8FDFE"> 
			<view class="flex font-26 ptb-30 evaluate-tab plr-24">
				<view v-for="(item,index) in tabList" :key="index" class="flex-1 text-center ptb-12"
					:class="pageInfo.type==item.val?'active':''" @click="tabChange(item)">
					{{item.name}}
				</view>
			</view>
		</u-sticky>
		<view>

			<view class="bg-white p-22 mb-20 box-shadow-1" v-for="(item,index) in list" :key='index'>
				<view class="flex items-center">
					<image :src="item.user_head" class="evaluate-item-avatar"></image>
					<view class="ml-20">
						<view>{{item.user_name}}</view>
						<u-rate count='5' v-model="item.all_score" active-color="#FFE401" inactive-color="#C4C4C4"
							readonly></u-rate>
					</view>
				</view>
				<view class="font-24 text-767676 line-height-60">{{item.time}}发表</view>
				<view class="font-26 text-0B0B0B">
					{{item.content}}
				</view>
				<view class="evaluate-img">
					<view v-for="(item2,index) in item.images" :key="index" class="evaluate-img-item">
						<image :src="item2"></image>
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		onLoad,
		onReachBottom
	} from '@dcloudio/uni-app'
	import {
		comment_list
	} from '@/api/order.js'
	let tabList = ref([{
			name: '全部',
			val: ''
		},
		{
			name: '最新',
			val: 'new'
		},
		{
			name: '好评',
			val: 'goods'
		},
		{
			name: '有图',
			val: 'img'
		},
	])
	let pageInfo = reactive({
		type: '',
		page: 1,
		limit: 10
	})
	let list = ref([])
	let noMoreData = ref(false);
	let chooseTab = ref(0);
	let urls2 = ref([
		'https://cdn.uviewui.com/uview/album/1.jpg',
		'https://cdn.uviewui.com/uview/album/2.jpg',
		'https://cdn.uviewui.com/uview/album/3.jpg',
		'https://cdn.uviewui.com/uview/album/4.jpg',
		'https://cdn.uviewui.com/uview/album/5.jpg',
		'https://cdn.uviewui.com/uview/album/6.jpg',
		'https://cdn.uviewui.com/uview/album/7.jpg',
		'https://cdn.uviewui.com/uview/album/8.jpg',
		'https://cdn.uviewui.com/uview/album/9.jpg'
	])
	let rate = ref(4);
	let productId = ref('')
	onLoad((e) => {
		productId.value = e.id;
		getList()
	})
	// 触底后去新数据
	onReachBottom(() => {
		console.log('触底后去新数据')
		if (noMoreData.value) return;
		pageInfo.page++;
		getList()
	})
	const getList = () => {
		comment_list({
			...pageInfo,
			product_id: productId.value
		}).then(res => {
			if (pageInfo.page > 1) {
				list.value.push(...res.dataList);
			} else {
				list.value = res.dataList;
			}
			if (list.value.length >= res.total) {
				noMoreData.value = true
			}
		})
	}
	const tabChange = (item) => {
		pageInfo.type = item.val;
		pageInfo.page = 1;
		getList()
	}
</script>

<style>
	page {
		background-color: #F8FDFE;
	}
</style>

<style lang="scss" scoped>
	.evaluate-tab {
		color: #D8D6D6;

		.active {
			background-color: #EDC74B;
			border-radius: 10rpx;
			color: #fff;
		}
	}

	.evaluate-item-avatar {
		width: 84rpx;
		height: 84rpx;
		border-radius: 50%;
	}

	.evaluate-img {
		margin-top: 20rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		/* 创建三列，每列宽度相等 */
		gap: 15rpx;

		/* 设置网格项之间的间隙 */
		&-item {
			height: 0;
			padding-bottom: 100%;
			/*高度设置为0，使用内间距100%，将匡高设置为一致*/
			position: relative;

			image {
				width: 100%;
				height: 100%;
				position: absolute;
				object-fit: cover;
				border-radius: 10rpx;
				/*预览图片的缩略图最好基于正中心显示*/
			}
		}
	}
</style>