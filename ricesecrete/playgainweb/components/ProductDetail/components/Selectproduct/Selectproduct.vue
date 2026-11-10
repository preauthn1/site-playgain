<template>
	<view>
		<up-popup :show="showSelectproduct" @close="showSelectproduct=false" :round="15" bgColor='#F5FBFC' @open="open">
			<view class="p-24">
				<view class="flex items-center">
					<view class="flex-shrink">
						<image :src="goodsSpecItem.img" class="product-img"></image>
					</view>
					
					<view class="pl-16">
						<view class="font-bold font-30 text-E6722D pb-14">
							{{props.spec.classify == 2 ? '¥'+goodsSpecItem.price : goodsSpecItem.integral}}{{props.spec.classify == 2 ? '' : '积分'}}
						</view>
						<view class="font-regular font-20 text-767676 pb-14">
							库存{{goodsSpecItem.store}}件
						</view>
						<view class="font-regular font-22 pb-14">
							已选: {{goodsSpecItem.name}}
						</view>
					</view>
				</view>
				<view class="mt-30 product-line">
				</view>
				<view class="pt-22" v-for="item in specList" :key="item.name">
					<view class="font-regular font-22">
						{{item.name}}
					</view>
					<view class="flex flex-wrap">
						<view class="mr-20" v-for="(item2,index) in item.list" :key="item2.name">
							<view :class="[`product-type plr-20 mt-24`,item.selectName==item2.name ? `bg-EDC74B` : 'bg-E6E6E6FF']">
								<view class="text-center font-22" @click="item.selectName=item2.name">
									{{item2.name}}
								</view>
							</view>
						</view>
						
					</view>
				</view>
				<view class="mt-40">
					<view class="flex justify-between">
						<view class="font-22 font-regular">
							购买数量
						</view>
						<up-number-box v-model="number" :max="goodsSpecItem.store"></up-number-box>
					</view>
				</view>
				<view :class="[`flex justify-center items-center text-white`,goodsSpecItem.store > 0 ? 'confirm' : 'unconfirm']" @click="confirm(goodsSpecItem.store)">
					确认
				</view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
	import { computed, reactive, ref, watch } from 'vue';
	const props = defineProps(['spec']);
	const emit = defineEmits(['success'])
	let specList = ref([])
	watch(()=>props.spec,()=>{
		specList.value = props.spec.spec.map(e=>{
			return {...e,selectName:e.list[0].name}
		})
	})
	
	const number = ref(1); 
	const showSelectproduct = ref(false)
	const goodsSpecItem = computed(()=>{
		let name = specList.value.map(_=>_.selectName).join(';');
		return props.spec.goods_spec.filter(e=>{
			return e.name == name
		})[0]
	})
	
	defineExpose({
		showSelectproduct,
	})
	const confirm = (num)=>{
		if(num <= 0)return;
		emit('success',goodsSpecItem.value,number.value)
		showSelectproduct.value = false;
	}
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
	.unconfirm{
		background: #E6E6E6FF;
		width: 635rpx;
		height: 93rpx;
		border-radius: 20rpx;
		margin: 121rpx auto 0 auto;
	}
</style>