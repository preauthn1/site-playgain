
export function notice(params){
	return uni.$u.http.get('/notification/page',{params})
}

export function msgdetail(params){
	return uni.$u.http.get('/notification/detail',{params})
}
// 清空未读信息
export function notification_read(data){
	return uni.$u.http.post('/notification/read',data)
}

export function notification_allread(data){
	return uni.$u.http.post('/notification/readAll',data)
}

export function unread_count(){
	return uni.$u.http.get('/notification/unread_count')
}