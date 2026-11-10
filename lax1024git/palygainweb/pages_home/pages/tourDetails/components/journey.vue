<template>
	<view>
		<view class="journey mt-30" v-if="journeyData.length">
			<view class="journey-left">
				<view v-for="(item,index) in journeyData" :key="index" :class="chooseDate==index?'active':''" class="ptb-20" @click="chooseDate=index">
					{{item.label}}
				</view>
			</view>
			<view class="journey-right" >
				<!-- <view v-html="journeyData[chooseDate].content"></view> -->
				<u-parse :content="content" :lazyLoad="true"></u-parse>
				<!-- <rich-text :nodes="journeyData[chooseDate].content"></rich-text> -->
			</view>
		</view>
		<u-empty text="暂无行程数据" v-else>
		        
		</u-empty>
	</view>
</template>

<script setup>
	
	import {
		computed,
		ref
	} from 'vue';
	let chooseDate = ref(0)
	const props = defineProps({
		journeyData:{
			type:Array,
			default:[]
		}
	})
	const content = computed(()=>{
		return props.journeyData[chooseDate.value].content.replace(regex, `<img style="max-width: 100%; height: auto"`);
	})
	const regex = new RegExp('<img', 'gi')
	// this.content = res.data.content.replace(regex, `<img style="max-width: 100%; height: auto"`)
</script>

<style lang="scss" scoped>
	.journey{
		display: flex;
		&-left{
			background: #F7FDFE;
			box-shadow: 0rpx 0rpx 7rpx 0rpx rgba(16,8,13,0.06);
			font-weight: 400;
			font-size: 26rpx;
			color: #767676;
			text-align: center;
			line-height: 60rpx;
			min-width: 125rpx;
		}
		&-right{
			// flex: 1;
			width: calc(100% - 125rpx);
			padding: 0 24rpx;
			box-sizing: border-box;
			image{
				width: 100%;
			}
			img{
				width: 100%;
			}
		}
		.active{
			background-color: #fff;
			color: #F3C720;
		}
	}
	img{
		max-width: 100%;
	}
</style>