import {
	defineStore
} from 'pinia'
import {
	get_cart_list
} from '@/api/shop'
import {
	ref,
	computed
} from 'vue'
export const useCartStore = defineStore('cart', () => {
	let cart_list = ref([])
	let curtype = ref(1)
	const cart_list_data = ref()
	const get_cart_data = () => {
		get_cart_list().then(res => {
			cart_list_data.value = res
			if(curtype.value == 1){
				cart_list.value = res.logistics_list
			}else{
				cart_list.value = res.take_list
			}
			// 
		})
	}
	const sele_all = computed(() => {
		let is_sele_all = ref(false)
		if (cart_list.value.length) {
			is_sele_all.value = cart_list.value.every(item => item.radio == 1)
		} else {
			is_sele_all.value = false
		}
		return is_sele_all.value
	})

	const total_product = computed(() => {
		return cart_list.value.reduce((prev, item) => {
			return prev + Number(item.number)
		}, 0)

	})

	const is_radio = computed(() => {
		return cart_list.value.filter(item => item.radio == 1)
	})

	const total_price = computed(() => {
		let is_radios = cart_list.value.filter(item => item.radio == 1)
		let total = ref(0)
		let total_num = ref(0)
		total.value = is_radios.reduce((prev, item) => {
			return prev + (Number(item.price) * Number(item.number))
		}, 0)
		total_num.value = is_radios.reduce((prev, item) => {
			return prev + Number(item.number)
		}, 0)
		return [total.value, total_num.value]

	})
	const total_shop = computed(() => {
		let logistics = cart_list_data.value.logistics_list.reduce((prev, item) => {
			return prev + Number(item.number)
		}, 0)
		let take = cart_list_data.value.take_list.reduce((prev, item) => {
			return prev + Number(item.number)
		}, 0)
		return logistics + take
	})
	//邮寄购物车数据
	const mail = () => {
		cart_list.value = cart_list_data.value.logistics_list
	}
	//到店购物车数据
	const Instore = () => {
		cart_list.value = cart_list_data.value.take_list
	}
	return {
		cart_list,
		curtype,
		cart_list_data,
		get_cart_data,
		sele_all,
		total_product,
		is_radio,
		total_price,
		total_shop,
		mail,
		Instore
	};

}, {
	persist: {
		enabled: true, //Store中数据持久化生效
	},
})