<template>
	<view>
		<!-- :minDate="new Date('1970-01-01').getTime()"
			:maxDate="new Date('2024-01-01').getTime()" -->
		<up-datetime-picker
			hasInput
		    :show="showtime"
		    v-model="birthdayValue"
		    mode="date"
			title="选择生日"
			
			@confirm="confirm"
			@cancel="showtime=false"
			>
		</up-datetime-picker>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { update_user_info } from '@/api/login';
	import { useUserStore } from '@/store';
	const store = useUserStore()
	const showtime = ref(false);
	const birthdayValue = ref()
	birthdayValue.value = store.userInfo.birthday
	const confirm = async(e) => {
		birthdayValue.value = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
		await update_user_info({'birthday':birthdayValue.value})
		showtime.value = false
		console.log(uni.$u.timeFormat(e.value, 'yyyy-mm-dd'))
	}
	defineExpose({
		showtime,
	})
</script>

<style scoped>
	::v-deep .u-datetime-picker{
		width: 85px;
	}
	::v-deep .u-input{
		padding: 0 !important;
		border-style:none !important;
	}
</style>
