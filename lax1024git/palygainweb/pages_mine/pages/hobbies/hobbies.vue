<template>
	<view class="pt-30 plr-12">
		<u-grid :border="false" col="3">
			<u-grid-item v-for="(item,gridindex) in hobbylist " :key="gridindex"
				@click="choosehobbies(item.id,gridindex)">
				<view class="relative">
					<image :src="item.src" class="hobbies-img"></image>
					<view class="text-center ptb-20 font-medium font-24 text-0B0B0B">{{item.title}}</view>
				</view>
				<image :src="item.selected ? is_checked[0] : is_checked[1]" class="width-30 checked" mode="widthFix">
				</image>
			</u-grid-item>
		</u-grid>
		<view class="confirm flex justify-center items-center text-white" @click="confirm">
			确认
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		hobby,
		revisehobby
	} from '@/api/mine';
	import {
		useUserStore
	} from '@/store';
	const store = useUserStore()
	const is_checked = ref(['/pages_mine/static/img/hobbies/checked.png', '/pages_mine/static/img/hobbies/unchecked.png'])
	const hobbylist = ref([])
	const ids = ref([])
	const choosehobbies = (id, num) => {
		console.log(hobbylist.value)
		const maxchoose = hobbylist.value.filter(item => item.selected == true).length + 1
		if (maxchoose <= 3) {
			hobbylist.value[num].selected = !hobbylist.value[num].selected
		} else {
			if (hobbylist.value[num].selected) {
				hobbylist.value[num].selected = !hobbylist.value[num].selected
			}else{
				uni.showToast({
					icon: "error",
					title: "最多选择三个"
				})
			}
			
		}
	}
	const current = ref([])
	hobby().then(res => {
		hobbylist.value = res
		current.value = hobbylist.value.filter(item => item.selected == true)
	})
	const confirm = async () => {
		ids.value = []
		hobbylist.value.forEach(item =>{
			if(item.selected){
				ids.value.push(item.id)	
			}
		})
		ids.value = ids.value.join(',')
		await revisehobby({
			'ids': ids.value
		})
		uni.showToast({
			icon:'success',
			title:"操作成功"
		})
		store.getuserinfo()
	}
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.hobbies-img {
		width: 220rpx;
		height: 220rpx;
		border-radius: 10rpx;
	}

	.checked {
		position: absolute;
		top: 5rpx;
		right: 20rpx;
	}

	.confirm {
		width: 635rpx;
		height: 93rpx;
		background: linear-gradient(180deg, #3B8EF5, #6BDBFB);
		border-radius: 20rpx;
		margin: 121rpx auto 0 auto;
	}
</style>