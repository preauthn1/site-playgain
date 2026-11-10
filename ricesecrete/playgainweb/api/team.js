export function team(){
	return uni.$u.http.get('/team')
}
// 团队成员
export function team_members(params){
	return uni.$u.http.get('/team/user/page',{params})
}
// 提现
export function team_withdrawal(params){
	return uni.$u.http.get('/team/withdrawal/page',{params})
}
// 
export function team_commission(params){
	return uni.$u.http.get('/team/commission/page',{params})
}