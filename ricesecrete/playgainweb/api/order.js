// 订单评论列表
export function comment_list(params){
	return uni.$u.http.get('/order/comment_list',{params})
}
// 订单提交评论
export function submit_comment(data){
	return uni.$u.http.post('/order/submit_comment',data)
}
// 订单支付信息
export function order_pay_info(params){
	return uni.$u.http.get('/order/pay_info',{params})
}
// 积分支付 
export function order_integral_pay(params){
	return uni.$u.http.get('/order/integral_pay',{params})
}
// 订单列表 /order/order_list
export function orderList(params){
	return uni.$u.http.get('/order/order_list',{params})
}
export const ordertotal = (params) => {
	return uni.$u.http.get('/order/order_list',{params})
}
// 商品（积分）订单详情
export const goods_order_details = (params) => {
	return uni.$u.http.get('/goods/order_details',{params})
}
// 订单确认签收
export function order_sign_order(data){
	return uni.$u.http.post('/order/sign_order',data)
}
// 取消未支付订单
export function cancelOrder(data){
	return uni.$u.http.post('/order/cancel_order',data)
}
// 订单申请退款（未核销/未收货）
export function apply_refund_order(data){
	return uni.$u.http.post('/order/apply_refund_order',data)
}
// 删除订单
export function delete_order(data){
	return uni.$u.http.post('/order/delete_order',data)
}
// 撤销取消订单申请
export function cancel_refund_order(data){
	return uni.$u.http.post('/order/cancel_refund_order',data)
}
//订单申请退货退款
export function apply_refund_goods_order(data){
	return uni.$u.http.post('/order/apply_refund_goods_order',data)
}
// 退货物流信息填写
export function set_refund_logistics_order(data){
	return uni.$u.http.post('/order/set_refund_logistics_order',data)
}
// 物流公司列表
export function get_logistics_list(params){
	return uni.$u.http.get('/order/get_logistics_list',{params})
}
// 操作员订单核验
export function ver_order_code(data){
	return uni.$u.http.post('/order/ver_order_code',data)
}