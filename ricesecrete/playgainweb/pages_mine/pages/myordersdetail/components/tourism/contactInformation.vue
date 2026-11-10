<template>
	<view class="information">
		<view class="mt-30 bg-white box-shadow-1 pb-30">
			<view class="font-30 font-medium text-0B0B0B ptb-20 text-center">
				联系信息
			</view>
			<view class="flex pl-24">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					手机号码
				</view>
				<view class="font-regular font-24 pl-30">
					{{contacts.mobile}}
				</view>
			</view>
			<view class="flex pl-24 pt-40">
				<view class="font-medium width-120 font-26 text-0B0B0B">
					姓名
				</view>
				<view class="font-regular font-24 pl-30">
					{{contacts.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['contact'])
	const contacts = props.contact[0]
</script>

<style lang="scss" scoped>
</style>