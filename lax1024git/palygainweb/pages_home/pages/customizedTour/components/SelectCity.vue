<template>
	<view>
		<u-picker :show="model" ref="uPickerRef" 
			:columns="columns" @confirm="confirm" 
			@cancel="model=false"
			@change="onChange">
		</u-picker>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,onMounted
	} from 'vue';
	import addressData from '@/utils/address.js'
	const model = defineModel()
	const emit = defineEmits(['choosestartcity'])
	const show = ref(false);
	const columns = ref([[], []]); // 三维数组，分别存储省、市
	const initPicker = () => {
	  const provinces = addressData?.map(item => item.name) || [];
	  const cities = addressData[0]?.city?.map(item => item.name) || [];
	  columns.value = [provinces, cities];
	};
	onMounted(() => {
	  if (addressData && addressData.length > 0) {
	      initPicker();
	    }
	});
	const onChange = (event) => {
	  const { columnIndex, value, index } = event;
	  if (columnIndex === 0) {
	    const cities = addressData[index]?.city?.map(item => item.name) || [];
	    columns.value[1] = cities;
	  }
	};
	const confirm = (e) => {
		console.log('confirm', e);
		emit('choosestartcity',e.value[1])
		model.value = false;
	};
	defineExpose({
		show
	})
</script>

<style>
</style>