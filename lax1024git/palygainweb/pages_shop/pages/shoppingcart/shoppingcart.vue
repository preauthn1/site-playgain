<template>
	<view class="pt-30 shoppingcart">
		<view class="plr-24">
			<view class="font-28 font-medium text-0B0B0B">
				购物车
			</view>
			<view class="flex justify-end font-28 font-medium text-0B0B0B" v-if="!is_delete" @click="handledelete">
				管理
			</view>
			<view class="flex justify-end font-28 font-medium text-0B0B0B" v-else @click="handledelete">
				完成
			</view>
			<view class="flex justify-around ptb-20">
				<view class="font-28 font-medium text-0B0B0B relative" :class="shoptype == 'logistics_list' ? 'tab_active': ''" @click="choosetype('logistics_list')">
					<view class="relative zindex20">
						邮寄商品
					</view>
					
				</view>
				<view class="font-28 font-medium text-0B0B0B relative" :class="shoptype == 'take_list' ? 'tab_active': ''" @click="choosetype('take_list')">
					<view class="relative zindex20">
						到店商品
					</view>
				</view>
			</view>
			<view class="font-regular font-24 text-0B0B0B">
				共{{store.total_product}}件商品
			</view>
		</view>
		<template v-if="store.cart_list.length">
			<view class="bg-white box-shadow-1 mt-30 mlr-24" v-for="item in store.cart_list">
				<view class="flex ptb-20 plr-12 items-center">
					<view>
				
						<image :src="item.radio == 1 ? `/pages_mine/static/img/address/active.png` : `/pages_shop/static/img/unchecked.png`" 
						class="width-30" mode="widthFix" @click="edit_item(item)">
						</image>
						<!-- <image src="../../static/img/unchecked.png" class="width-30" mode="widthFix"></image> -->
					</view>
					<view class="plr-14">
						<view class="relative">
							<image :src="item.img" class="cart-image"></image>
						</view>
					</view>
					<view>
						<view class="text-2line font-medium font-26 text-0B0B0B">
							{{item.title}}
						</view>
						<view class="flex ptb-20 justify-between" >
							<view class="bg-E6E6E6FF border-radius-10 flex items-center p-12">
								<view class="font-22 font-medium text-0B0B0B pr-12 text-line width-220" >
									{{item.name}}
								</view>
								<up-icon name="arrow-down" size="21rpx" @click="showselpro(item.id)"></up-icon>
							</view>
						</view>
						<view class="flex justify-between items-center">
							<view class="flex items-center">
								<view class="text-F66A01 font-30 font-bold">
									¥{{item.price}}
								</view>
							</view>
							<up-number-box v-model="item.number" buttonSize="40rpx" inputWidth="36rpx" :max="item.store" @change="valChange"></up-number-box>
						</view>
					</view>
				</view>
			</view>
		</template>
		<up-empty v-else
		        mode="car"
		        icon="http://cdn.uviewui.com/uview/empty/car.png"
		>
		</up-empty>
		<view class="footbar bg-white box-shadow-1" v-show="!is_delete">
			<view class="flex justify-between items-center plr-22 ptb-16">
				<view class="flex">
					<image :src="store.sele_all? `../../../pages_mine/static/img/address/active.png` : `/pages_shop/static/img/unchecked.png`" class="width-30" mode="widthFix" @click="selectall">
					</image>
					<view class="font-24 font-regular text-767676 pl-10">
						全选
					</view>
				</view>
				<view class="flex items-center">
					<view class="font-regular font-24 text-767676">
						合计：
					</view>
					<view class="text-F66A01 font-30 font-bold">
						¥{{store.total_price[0]}}
					</view>
				</view>
				<view class="billing-btn text-center text-white font-30 font-medium" @click="suborder">
					结算 ({{store.total_price[1]}})
				</view>
			</view>
		</view>
		<view class="footbar bg-white box-shadow-1" v-show="is_delete">
			<view class="flex justify-between items-center plr-22 ptb-16">
				<view class="flex items-center" @click="selectall">
					<image :src="store.sele_all ? `/pages_mine/static/img/address/active.png` : `/pages_shop/static/img/unchecked.png`" class="width-30" mode="widthFix">
					</image>
					<view class="font-24 font-regular text-767676 pl-10">
						全选
					</view>
				</view>
				
				<view class="billing-btn text-center text-white font-30 font-medium" @click="clear_cart">
					删除
				</view>
			</view>
		</view>
		<SelectproductVue ref="Selpro" :spec="product_detail[0]" @success='getProduct'></SelectproductVue>
	</view>
</template>

<script setup>
	import SelectproductVue from './components/Selectproduct/Selectproduct.vue';
	import { ref,reactive,computed} from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	import {storeToRefs} from 'pinia';
	import { useCartStore } from '@/store/modules/shopcart';
	import { get_cart_list,goods_edit_cart,goods_delete_cart} from '@/api/shop';
	const store = useCartStore()
	// let {cart_list,cart_list_data,is_radio} = storeToRefs(store)
	
	const Selpro = ref(null)
	const product_detail = ref([])
	const showselpro = (id) => {
		product_detail.value = store.cart_list.value.filter(e => e.id == id)
		Selpro.value.showSelectproduct = true
	}
	//选择商品类型 默认邮寄
	const shoptype = ref('logistics_list')
	const choosetype = (num) => {
		if(num != 1){
			shoptype.value = num
		}
		if(shoptype.value == 'logistics_list'){
			store.curtype = 1
			store.mail();
		}else{
			store.curtype = 2
			store.Instore()	
		}
		
	}
	
	//修改购物车
	const edit_item = async (item,state) =>{
		if(state){
			await goods_edit_cart({'id':item.id,'spec_id':item.spec_id,'number':item.number,'radio':item.radio})
		}else{
			if(item.radio == 1){
				item.radio = 0
			}else{
				item.radio = 1
			}
			goods_edit_cart({'id':item.id,'spec_id':item.spec_id,'number':item.number,'radio':item.radio}).then(res =>{
			})
		}
	}
	const valChange = (num) =>{
		console.log(num,'11111')
	}
	const getProduct = async (val,num,item)=>{
		console.log(val.id)
		let params = reactive({
			id: item.id,
			spec_id:val.id,
			number:num,
			radio:item.radio
		})
		await edit_item(params,{state:true});
		store.get_cart_data()
	}
	// 点击管理底部显示删除栏
	const is_delete = ref(false)
	const handledelete = () => {
		is_delete.value = !is_delete.value
	}
	const selectall = () => {
		const is_sele_all = !store.sele_all
		if(is_sele_all){
			store.cart_list = store.cart_list.map(e => {
				if(e.radio == 0){
					e.radio = 1
					edit_item(e,{state:true})
				}
				return e
			})
		}else{
			store.cart_list = store.cart_list.map(e => {
				if(e.radio == 1){
					e.radio = 0
					edit_item(e,{state:true})
				}
				return e
			})
		}
		
	}
	const suborder = () =>{
		if(store.is_radio.length){
			const products = ref([])
			products.value = store.is_radio.map(item=>{
				return {'product_id':item.product_id,'spec_id':item.spec_id,'number':item.number}
			})
			uni.navigateTo({
				url:`/pages_mine/pages/pointsorders/pointsorders?type=2&products=` + JSON.stringify(products.value)
			})
		}else{
			uni.showToast({
				icon:"none",
				title:'请选择需要下单的商品',
			})
		}
	}
	const clear_cart = async () =>{
		if(!store.is_radio.length > 0)return;
		const ids = ref([])
		store.is_radio.map(item=>{
			ids.value.push(item.id)
		})
		await goods_delete_cart({'id':ids.value.join(',')})
		await store.get_cart_data()
	}
	onLoad(async()=>{
		await store.get_cart_data()
		choosetype(1)
	})
</script>
<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.shoppingcart{
		padding-bottom: 200rpx;
	}
	.cart-image {
		width: 235rpx;
		height: 223rpx;
		border-radius: 15rpx;
	}
	
	::v-deep .number-box__minus{
		width: 44rpx !important;
	}
	.footbar{
		width: 100%;
		position: fixed;
		bottom: 0;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		z-index: 10;
	}
	.billing-btn{
		height: 93rpx;
		background: linear-gradient(180deg, #FACC22, #F83600);
		border-radius: 15rpx;
		line-height: 93rpx;
		padding:0 90rpx;
	}
	.zindex20{
		z-index: 20;
	}
	.width-220{
		width: 320rpx;
	}
</style>