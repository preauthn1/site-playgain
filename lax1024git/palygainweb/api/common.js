// 客服列表
export function customer_service(params) {
	return uni.$u.http.get('/customer_service', {
		params
	})
}

// 获取协议内容
export function getAgreement(params) {
	return uni.$u.http.get('/content', {
		params
	})
}
// 支付渠道
export function payment_channel(params) {
	return uni.$u.http.get('/payment_channel', {
		params
	})
}
// 图片删除
export function delFile(params) {
	return uni.$u.http.get('/common/delfile', {
		params
	})
}

export function feedback(data){
	return uni.$u.http.post('/feedback', data)
}