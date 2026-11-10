// 获取会员等级
export function viplevel(params){
	return uni.$u.http.get('/vip',{params})
}
// 1获取会员权益
export function viprights(params){
	return uni.$u.http.get('/rights',{params})
}