<template>
	<view class="cost">
		<view class="plr-20">费用信息</view>
		<view class="flex font-24 text-767676 plr-20 mt-20">
			<view class="ptb-10 plr-30 border-radius-10" :class="choose==1?'bg-F3C720 text-white':''" @click="choose=1;change()">
				成人</view>
			<view class="ptb-10 plr-30 border-radius-10" :class="choose==2?'bg-F3C720 text-white':''" @click="choose=2;change()" v-if="fees.child.length&&fees.child[0].value">
				儿童</view>
		</view>
		<view class="cost-item" v-show="list1.length">
			<view class="text-center cost-title">
				套餐包含
			</view>
			<view class="font-24 text-0B0B0B ">
				<view v-for="(item,index) in list1" :key="index" class="flex">
					<view class="cost-left pl-20 pr-10 ptb-24">{{item.name}}</view>
					<view class="flex-1 ptb-24 mlr-14 cost-right">{{item.value}}</view>
				</view>
			</view>
		</view>
		<view class="cost-item" v-show="list2.length">
			<view class="text-center cost-title">
				自理费用
			</view>
			<view class="font-24 text-0B0B0B ">
				<view v-for="(item,index) in list2" :key="index" class="flex">
					<view class="cost-left pl-20 pr-10 ptb-24">{{item.name}}</view>
					<view class="flex-1 ptb-24 mlr-14 cost-right">{{item.value}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const props = defineProps(['fees'])
	let choose = ref(1);
	let list1 = ref(props.fees.grown);
	let list2 = ref(props.fees.grownun);
	const change = ()=>{
		if(choose.value==1){
			list1.value = props.fees.grown;
			list2.value = props.fees.grownun;
		}else{
			list1.value = props.fees.child.filter((e)=>{
				return e.value
			});
			list2.value = props.fees.childun.filter((e)=>{
				return e.value
			});;
		}
	}
</script>

<style lang="scss" scoped>
	.cost {
		&-item{
			margin-top: 30rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(16,8,13,0.06);
		}
		// background:var(--active-bg);
		&-left {
			width: 147rpx;
			background: #F7FDFE;
		}
		&-right{
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
		}
		&-title{
			font-weight: 500;
			font-size: 28rpx;
			color: #3D91F5;
			line-height: 64rpx;
		}
	}
</style>