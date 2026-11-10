<template>
	<view>
		<view class="flex font-26 ptb-30 evaluate-tab plr-24">
			<view v-for="(item,index) in tabList" :key="index" class="flex-1 text-center ptb-12"
				:class="chooseTab==index?'active':''" @click="chooseTab=index">
				{{item.name}}
			</view>
		</view>

		<view>
			<view class="bg-white p-22">
				<view class="flex items-center">
					<image src="../../static/img/tour/user1.png" class="evaluate-item-avatar"></image>
					<view class="ml-20">
						<view>用户名x x x</view>
						<u-rate count='5' v-model="rate" active-color="#FFE401" inactive-color="#C4C4C4"
							readonly></u-rate>
					</view>
				</view>
				<view class="font-24 text-767676 line-height-60">2024/07/31发表</view>
				<view class="font-26 text-0B0B0B">
					在此之前这是一段评价在此之前这是一段评价在此之前这是一
					段评价在此之前这是一段评价在此之前这是一段评价在此之前
					这是一段评价
				</view>
				<view class="evaluate-img">
					<view v-for="(item,index) in urls2" :key="index" class="evaluate-img-item">
						<image :src="item"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	let tabList = ref([{
			name: '全部（12）'
		},
		{
			name: '最新'
		},
		{
			name: '好评'
		},
		{
			name: '有图（5张）'
		},
	])
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
	let rate = ref(4)
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