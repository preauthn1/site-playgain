<template>
	<view class="benefit-detail">
		<scroll-view scroll-x class="benefit-detail-list font-24" :scroll-into-view="scrollInto">
			<view :id="`item${item.id}`" v-for="(item,index) in rightslist" :key="index" class="benefit-detail-list-item flex-center flex-col">
				<image :src="item.src" mode="heightFix" @click="chooseRightsType(item.id)"></image>
				<view class="text-white border-radius-10" :class="chooseIndex==item.id ?'bg-3D91F5':'bg-C4C4C4'">{{currentrights.includes(item.id) ? '已解锁':'未解锁'}}</view>
				<view :class="chooseIndex==item.id?'text-3D91F5':'text-767676'" class="mt-10">
					{{item.name}}
				</view>
			</view>
		</scroll-view> 
		<view class="box-shadow-1 bg-white p-24 mt-40" v-if="rightslist">
			<up-parse :content="rightslist[chooseIndex -1]?.content"></up-parse>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,onMounted, nextTick
	} from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { viprights,viplevel } from '@/api/vip';
	import { useUserStore } from '@/store';
	const store = useUserStore()
	const rightslist = ref([])
	viprights().then(res => {
		rightslist.value = res
	})
	let chooseIndex = ref()
	const levelList = ref([])
	const currentrights = ref([])
	const currentLevel = ref([])
	const queryId = ref()
	const scrollInto = ref('item1')
	onLoad((query)=>{
		queryId.value = query.id
		console.log(chooseIndex.value)
		chooseIndex.value = queryId.value
		viplevel().then(res => {
			levelList.value = res
			currentLevel.value = levelList.value.filter(item => item.level == store.userInfo.vip_level)
			currentrights.value = currentLevel.value[0].rights.map(item => {
				return item.id
			})
			// nextTick(()=>{
				scrollInto.value = `item${query.id}`
			// })
		})
		
	})
	const chooseRightsType = (num) => {
		if(num == chooseIndex.value)return;
		chooseIndex.value = num
	}
	// onMounted(()=>{
	// 	chooseIndex.value = queryId.value
	// })
</script>
<style>
	page{
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.benefit-detail-list {
		white-space: nowrap;
		width: 100%;
		margin-top: 28rpx;

		image {
			height: 100rpx;
		}

		&-item {
			display: inline-block;
			padding: 0 30rpx;
			text-align: center;
		}
	}
</style>