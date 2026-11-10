// 侧边导航数据
export function goodstype(params){
	return uni.$u.http.get('/goods/type',{params})
}
//商品列表
export function good_product_list(params){
	return uni.$u.http.get('/goods/product_list',{params})
}
// 商品详情
export function good_product_detail(params){
	return uni.$u.http.get('/goods/product_details',{params})
}
//商品（积分）下单前规格详情
export function product_order_info(params){
	return uni.$u.http.get('/goods/order_info',{params})
}
//商品（积分）下单接口
export function goods_create_order(data){
	return uni.$u.http.post('/goods/create_order',data)
}
// 添加-减少购物车
export function goods_add_cart(data){
	return uni.$u.http.post('/goods/add_cart',data)
}
// 商品购物车列表
export function get_cart_list(){
	return uni.$u.http.get('/goods/cart_list')
}
// 修改购物车
export const goods_edit_cart = (data) => {
	return uni.$u.http.post('/goods/edit_cart',data)
}
// 批量删除购物车
export const goods_delete_cart = (data) => {
	return uni.$u.http.post('/goods/clear_cart',data)
}
//积分兑换记录
export function integral_exchange(data){
	return uni.$u.http.post('/integral/page',data)
}
// 商品搜索关键词列表
export function search_recommend(params){
	return uni.$u.http.get('/goods/search_recommend',{params})
}