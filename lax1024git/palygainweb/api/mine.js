// 收货地址
export function getaddress(){
	return uni.$u.http.get('/address/page')
}
// 新增收货地址
export const add_address = (data) => {
	return uni.$u.http.post('/address/save',data)
}
// 删除收货地址 
export const delete_address = (data) => {
	return uni.$u.http.post('/address/delete',data)
}
// 兴趣
export function hobby(params){
	return uni.$u.http.get('/hobby',{params})
}
export function revisehobby(data){
	return uni.$u.http.post('/hobby',data)
}
// 收藏列表
export function collectlist(params){
	return uni.$u.http.get('/user/collect_list',{params})
}
// 产品收藏/取消收藏
export function collectproduct(params){
	return uni.$u.http.get('/user/collect_product',{params})
}
// 浏览记录
export function viewlist(params){
	return uni.$u.http.get('/user/view_list',{params})
}
//清空浏览记录
export function del_view(params){
	return uni.$u.http.get('/user/del_view',{params})
}
// 图片上传
export function common_upload(data){
	return uni.$u.http.upload('/common/upload',data)
}
// 个人中心套餐推荐列表
export function user_recommend(params){
	return uni.$u.http.get('/tourism/user_recommend',{params})
}
// 活动列表
export function activity_page(params){
	return uni.$u.http.get('/activity/page',{params})
}
//活动详情 /activity/detail
export function activity_detail(params){
	return uni.$u.http.get('/activity/detail',{params})
}
// 修改密码
export function changePassword(data){
	return uni.$u.http.post('/change_password',data)
}