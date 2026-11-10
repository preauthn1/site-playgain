// import { http } from "../uni_modules/uview-plus";
// 产品二级分类列表
export function tourism_type(params) {
	return uni.$u.http.get('/tourism/type',{params},{custom:{notLoading:true}})
}
// 获取套餐产品详情
export function product_details(params){
	return uni.$u.http.get('/tourism/product_details',{params})
}
// 获取下单前套餐规格详情
export function tourism_order_info(params){
	return uni.$u.http.get('/tourism/order_info',{params})
}
//旅游套餐下单接口
export function tourism_create_order(data){
	return uni.$u.http.post('/tourism/create_order',data)
}
//（周边-国内-国外）分类轮播图
export function type_banner(params){
	return uni.$u.http.get('/tourism/banner',{params})
}

// 指定模块下套餐列表
export function tourism_product_list(params){
	return uni.$u.http.get('/tourism/product_list',{params})
}
//人气榜
export function hot_rank(params){
	return uni.$u.http.get('/tourism/hot_rank',{params})
}
//根据城市地名转化经纬度
export function city_location(params){
	return uni.$u.http.get('/tourism/city_location',{params})
}
// 旅游套餐获取订单详情
export const tourism_order_details = (params) => {
	return uni.$u.http.get('/tourism/order_details',{params})
}
// 添加/修改 定制游
export function add_custom (data){
	return uni.$u.http.post('/order/add_custom',data)
}
// 定制旅游套餐列表
export function custom_list (params){
	return uni.$u.http.get('/order/custom_list',{params})
}
// 定制游 套餐详情 
export function custom_detail (params){
	return uni.$u.http.get('/order/custom_detail',{params})
}
// 取消定制游订单  
export function custom_cancel (params){
	return uni.$u.http.get('/order/custom_cancel',{params})
}
// 删除
export function custom_delete (params){
	return uni.$u.http.get('/order/custom_delete',{params})
}