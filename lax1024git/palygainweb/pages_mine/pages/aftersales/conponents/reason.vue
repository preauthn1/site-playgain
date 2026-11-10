<template>
	<view class="">
		<up-popup :show="showreason" :round="20" mode="bottom" @close="showreason=false" bgColor="#f5fbfcFF">
			<PopupTitle title="选择售后类型"></PopupTitle>
			<view class="plr-24 pb-50">
				<view class="flex justify-between pb-30" v-for="(item,index) in cause">
					<view class="font-regular font-26 text-767676">
						{{item}}
					</view>
					<image :src="chooseIndex == index ?'/pages_mine/static/img/address/active.png':'/pages_mine/static/img/address/active-static.png'" 
					class="width-30" mode="widthFix" @click="choosecauseType(index)"></image>
					
				</view>
				
			</view>
			<view class="flex justify-between plr-26 pb-30">
				<view class="cancel-btn text-center font-30 text-767676" @click="showreason = false">
					取消
				</view>
				<view class="confirm-btn text-center font-30 text-white" @click="confirm">
					确认
				</view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const showreason = ref(false)
	const emit = defineEmits(['success'])
	const cause = ref(['包装/商品破碎/污渍/裂痕/变形',
	'颜色/款式/大小/尺寸与描述不符','质量问题','发错商品','少件（含缺少配件）'])
	const confirm = () => {
		console.log('确认',cause.value[chooseIndex.value])
		emit('success',cause.value[chooseIndex.value])
		showreason.value = false
	}
	const chooseIndex = ref(0)
	const choosecauseType = (num)=>{
		chooseIndex.value = num
	}
	defineExpose({
		showreason
	})
</script>

<style lang="scss" scoped>
	.cancel-btn{
		width: 294rpx;
		height: 93rpx;
		border-radius: 15rpx;
		border: 1px solid #B4B4B4;
		line-height: 93rpx;
	}
	.confirm-btn{
		width: 294rpx;
		height: 93rpx;
		border-radius: 15rpx;
		border: 1px solid #B4B4B4;
		line-height: 93rpx;
		background: #3D91F5FF;
	}
</style>