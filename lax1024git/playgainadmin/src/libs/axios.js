import axios from 'axios'
import router from '@/router'
import { WebAesDecrypt} from "@/libs/secret"
import store from '@/store'
import { isEmpty,getApiUrl } from "@/libs/util"
import { showLoading, hideLoading } from '@/libs/loading'
import { Message,MessageBox } from 'element-ui'

let isRefreshing = false
let requestQueue = []

const logout = (isReset=true)=>{
    if(isReset){
        return store.dispatch('handleLogOut',isReset).then(()=>{
            requestQueue = []
            return Promise.reject()
        })
    }else{
        return store.dispatch('handleReset').then(()=>{
            requestQueue = []
            return Promise.reject()
        })
    }
}

const service = axios.create({
    baseURL: getApiUrl(),
    timeout: 10000,
    withCredentials:true,
    headers:{
        'Client-Type':'AppAdmin'
    }
})

service.interceptors.request.use(
    config=>{
        showLoading()
        let REDACTED
        if(!isEmpty(access_token)){
            config.headers['Authorization'] = access_token
        }
        return config
    },
    error=>{
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
            Message({
                message: 'timeout请求超时',
                type:'error'
            })
        }
        const errorInfo = error.response
        if (errorInfo) {
            error = errorInfo.data
            const errorStatus = errorInfo.status
            router.push({name: errorStatus}).catch(()=>{})
        }
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response=>{
        hideLoading()
        if (typeof(response.data) == 'string') {
            let temp = response.data;
            let data = WebAesDecrypt(temp);
            response.data = JSON.parse(data);
        }
        if(response.data==null){
           return Message({
                message: "数据有误",
                type:'error'
            })
        }
        let data = response.data;
        if(data.code!==1){
            if(data.code===2003){
                return MessageBox({
                    title:'账号提示',
                    message:'当前账号登录已过期或已在另一台设备登录！',
                    type:'error',
                    showCancelButton:false,
                    confirmButtonText: '确定',
                    center:true,
                    callback: () => {
                        return logout(false)
                    }
                })

            }else if(data.code===2004){
                let config = response.config
                if (!isRefreshing) {
                    isRefreshing = true
                    let refresh_token = store.getters.refresh_token
                    return store.dispatch('handleRefreshToken',refresh_token).then(res => {
                        if(res.code===1){
                            const REDACTED
                            config.baseURL = ''
                            config.headers['Authorization'] = access_token
                            requestQueue.forEach(callback => callback(access_token))
                            requestQueue = []
                            return service(config)
                        }else{
                            return logout(true)
                        }
                    }).catch((err) => {
                        return Promise.reject(err)
                    }).finally(() => {
                        isRefreshing = false
                    })
                }else{
                    return new Promise((resolve) => {
                        requestQueue.push((access_token) => {
                            config.baseURL = ''
                            config.headers['Authorization'] = access_token
                            resolve(service(config))
                        })
                    })
                }
            }else if(data.code===2005){
                return MessageBox({
                    title:'账号提示',
                    message:'当前账号登录已过期或已在另一台设备登录！',
                    type:'error',
                    showCancelButton:false,
                    confirmButtonText: '确定',
                    center:true,
                    callback: () => {
                        return logout(true)
                    }
                })
            }else if(data.code===2008){
                return MessageBox({
                    title:'账号提示',
                    message:'当前账号不存在或已被停用！',
                    type:'error',
                    showCancelButton:false,
                    confirmButtonText: '确定',
                    center:true,
                    callback: () => {
                        return logout(true)
                    }
                })
            }else if(data.code===2009){
                return MessageBox({
                    title:'账号提示',
                    message:'当前用户组不存在或已被停用！',
                    type:'error',
                    showCancelButton:false,
                    confirmButtonText: '确定',
                    center:true,
                    callback: () => {
                        return logout(true)
                    }
                })
            }else{
                Message({
                    message: data.msg,
                    type:'error'
                })
            }
        }
        return response.data
    },
    error=>{
        hideLoading()
        if(error.response && error.response.status === 404){
            router.push('/404.vue').catch(()=>{})
        }
        return Promise.reject(error)
    }
)

const get = (url,params={})=>{
    params.t = new Date().getTime()
    return service({
        url:url,
        method:'get',
        params,
    })
}

const post = (url,data={})=>{
    return service({
        url:url,
        method:'post',
        data:data
    })
}

const upload = (url,data={})=>{
    return service({
        url:url,
        method:'post',
        data:data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


export {
    get,
    post,
    upload
}
