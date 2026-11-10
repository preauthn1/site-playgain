// 银行列表
export function getBank(params) {
	return uni.$u.http.get('/bank',{params})
}
// 新增银行卡
export function addBank(data){
	return uni.$u.http.post('/user_bank',data)
}
// 删除银行卡
export function delBank(data){
	return uni.$u.http.post('/user_bank/delete',data)
}
// 用户银行卡列表
export function getUserBank(params){
	return uni.$u.http.get('/user_bank',{params})
}

// 提现申请
export function subWithdrawal(data){
	return uni.$u.http.post('/withdrawal',data)
}
// 提现记录
export function getWithdrawalLog(params){
	return uni.$u.http.get('/withdrawal',{params})
}


// 积分兑换首页
export function getIntegral(params){
	return uni.$u.http.get('/integral',{params})
}
// 提交积分兑换
export function integral_exchange(data){
	return uni.$u.http.post('/integral/exchange',data)
}
// 积分兑换记录
export function getIntegralExchangeLog(data){
	return uni.$u.http.get('/integral/page',data)
}
// 积分到账记录
export function income_integral(params){
	return uni.$u.http.get('/income/integral',{params})
}
// 佣金到账记录
export function income_commission(params){
	return uni.$u.http.get('/income/commission',{params})
}