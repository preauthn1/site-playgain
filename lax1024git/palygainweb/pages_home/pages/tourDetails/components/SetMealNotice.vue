<template>
	<view>
		<view class="flex plr-20 justify-between text-767676 font-26"> 
			<view v-for="(item,index) in noticeList" :key="index" :class="choose==item.value?'active':''" @click="choose=item.value">
				{{item.name}}
			</view>
		</view>
		<view class="mt-20 plr-24">
			<u-parse :content="noticeHtml[choose]"></u-parse>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const props = defineProps(['noticeHtml']);
	let noticeList = ref([{
			name: '报名须知',
			value:"apply_html"
		},
		{
			name: '报名限制',
			value:'restrict_html'
		},
		{
			name: '旅游装备',
			value:'equip_html'
		},
		{
			name: '退订政策',
			value:'policy_html'
		}
	])
	let choose = ref('apply_html')
</script>

<style lang="scss" scoped>
	.active {
		color: #EDC74B;
	}
</style>