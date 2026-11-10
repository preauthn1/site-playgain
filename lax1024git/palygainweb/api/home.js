
// 首页导航分类
export function index_type(params){
	return uni.$u.http.get('/index/index_type',{params})
}
// 首页导航菜单产品列表
export function product_list(params){
	return uni.$u.http.get('/index/product_list',{params})
}
// 首页旅游服务列表
export function tourism_serve(params){
	return uni.$u.http.get('/index/type',{params})
}
// 首页轮播图
export function home_banner(params){
	return uni.$u.http.get('/index/banner',{params})
}
// 推荐旅游套餐轮播
export function tourism_banner(params){
	return uni.$u.http.get('/index/tourism_banner',{params})
}
// 搜索推荐页面-关键词列表
export function search_recommendations(params){
	return uni.$u.http.get('/tourism/search_recommend',{params})
}
// 搜索页面新品推荐列表
export function search_new(params){
	return uni.$u.http.get('/tourism/search_new',{params})
}
// 删除单个关键词
export function deletekeyword(params){
	return uni.$u.http.get('/tourism/del_keyword',{params})
}
// 获取城市名称首字母列表 /tourism/city_region
export function city_region(params){
	return uni.$u.http.get('/tourism/city_region',{params})
}
// 获取热门城市
export function hot_city(params){
	return uni.$u.http.get('/tourism/city_list',{params})
}
// 获取IP定位数据
export function getLocationByIp(){
	return uni.$u.http.get('/index/ip_location')
}