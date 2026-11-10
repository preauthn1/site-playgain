import config from '@/config'
import account from "@/api/modules/account"
import router from '@/router'
import { setStorage, getStorage } from '@/libs/util'

export default {
    state: {
        access_token: getStorage(config.accessTokenKey),
        refresh_token: getStorage(config.refreshTokenKey),
        realname: '',
        avatar: '',
        menuTree: [],
        permission:[],
        activeTab:getStorage('activeTab')
    },
    mutations: {
        setAccessToken (state, access_token) {
            state.access_token = access_token
            setStorage(config.accessTokenKey,access_token)
        },
        setRefreshToken (state, refresh_token) {
            state.refresh_token = refresh_token
            setStorage(config.refreshTokenKey,refresh_token)
        },
        setRealname (state, realname) {
            state.realname = realname
        },
        setAvatar (state, avatar) {
            state.avatar = avatar
        },
        setMenuTree (state, menuTree) {
            state.menuTree = menuTree
        },
        setPermission(state, permission) {
            state.permission = permission
        },
        setActiveTab(state, activeTab) {
            state.activeTab = activeTab
            setStorage('activeTab',activeTab)
        }
    },
    getters: {
        access_token: state => state.access_token,
        refresh_token: state => state.refresh_token,
        realname: state => state.realname,
        avatar: state => state.avatar,
        menuTree: state => state.menuTree,
        permission:state=>state.permission,
        activeTab:state=>state.activeTab
    },
    actions: {
        // 获取用户信息
        getProfile({ commit }){
            return new Promise((resolve, reject) => {
                account.profile().then(res => {
                    if(res.code==1){
                        const data = res.data
                        commit('setRealname', data.realname)
                        commit('setAvatar', data.avatar)
                        commit('setMenuTree', data.menuTree)
                        commit('setPermission', data.permission)
                        config.sysConfig = data.sysConfig
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        // 刷新token
        handleRefreshToken({ commit },refresh_token){
            return new Promise((resolve, reject) => {
                account.token(refresh_token).then(res => {
                    if(res.code==1){
                        const data = res.data
                        commit('setAccessToken', data.access_token)
                        commit('setRefreshToken', data.refresh_token)
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        // 账号登录
        handleLogin ({ commit }, { username, password,captcha }) {
            return new Promise((resolve, reject) => {
                account.login({username, password, captcha}).then(res => {
                    if(res.code==1){
                        const data = res.data
                        commit('setAccessToken', data.access_token)
                        commit('setRefreshToken', data.refresh_token)
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogOut (isReset=true) {
            if(isReset){
                return new Promise((resolve, reject) => {
                    account.logout().then(res => {
                        if(res.code==1){
                            this.dispatch('handleReset')
                        }
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                })
            }else{
                return this.dispatch('handleReset')
            }
        },

        handleReset({commit}){
            return new Promise((resolve) => {
                commit('setAccessToken', null)
                commit('setRefreshToken', null)
                commit('setRealname', '')
                commit('setAvatar', '')
                commit('activeTab', '')
                commit('setMenuTree', [])
                commit('setPermission', [])
                router.push({name: 'login'}).catch(()=>{})
                resolve()
            })
        }
    }
}
