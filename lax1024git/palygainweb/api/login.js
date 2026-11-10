// 用户注册
export function user_register(data){
	return uni.$u.http.post('/user/register',data)
}
// 发送短信验证码
export function send_code(data){
	return uni.$u.http.post('/send_code',data)
}
// 手机号一键登录
export function one_click_login(data){
	return uni.$u.http.post('/user/phone_login',data)
}
// 用户基本信息
export const user_info = (data) => {
	return uni.$u.http.get('/user/userInfo',data,{custom:{notLoading:true}})	
}
// 更新用户信息
export const update_user_info = (data) =>{
	return uni.$u.http.post('/user/userInfo',data)	
}
// 三方登录
export function social_login(data){
	console.log(data)
	return uni.$u.http.post('/user/social_login',data)
}

//验证手机号验证码
export function check_code(data){
	return uni.$u.http.post('/check_code',data)
}
export function user_login(data){
	return uni.$u.http.post('/user/login',data)
}

// 发送邮箱验证码
export function getEmailCode(data){
	return uni.$u.http.post('/send_email_code',data)
}
// 绑定邮箱
export function bindEmail(data){
	return uni.$u.http.post('/bind_email',data)
}
// 绑定手机
export function bindPhone(data){
	return uni.$u.http.post('/bind_phone',data)
}

// 获取微信公众授权链接
export function gzhAuth(){
	return uni.$u.http.get('/index/gzhAuth',{})
}