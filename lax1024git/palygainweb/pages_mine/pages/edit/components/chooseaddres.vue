<template>
	<view>
			<u-picker
			    :show="showaddress"
			    :columns="columns"
				@confirm="confirm"
				@change="onChange"
				@cancel="showaddress=false"
			  ></u-picker>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,onMounted
	} from 'vue';
	import addressData from '@/utils/address.js'
	const showaddress = ref(false);
	const emit = defineEmits(['confirm'])
	const confirm = (e) => {
		emit('confirm',e.value)
		showaddress.value = false;
	};
	defineExpose({
		showaddress,
	})
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
</script>

<style lang="scss" scoped>

</style>