
export function testGet(params) {
	return uni.$u.http.get('/ad',{params})
}
export function testPost(data={}) {
	return uni.$u.http.post('/ad',data)
}

//若无需加载弹窗， 参数示例：http.post('/user/login',data,{custom:{notLoading:true}})

//为集中处理接口异常返回，可在custom 中多传一个用于失败需要执行的回调函数onFailure，示例如下
// export function loginIn(data,onFailure) {
// 	return uni.$u.http.post('/user/login',data,{custom:{notLoading:true,onFailure}})
// }


export function loginIn(data) {
	return uni.$u.http.post('/user/login',data,{custom:{notLoading:true}})
}

export function getUserInfo(data) {
	return uni.$u.http.post('/user/userInfo',data)
}

export function refreshToken(data) {
	return uni.$u.http.post('/user/token',data)
}
export const indextype = (data) => {
	return uni.$u.http.get('/index/index_type',data,{custom:{notLoading:true}})
}