//stores->modules->member.ts
import {
	defineStore
} from 'pinia'
import CryptoJS from 'crypto-js'
import { user_info,update_user_info } from '@/api/login'
// 定义 Store

export const useUserStore = defineStore('user', {
	state: () => ({
		profile: null,
		tokenInfo: null,
		key_iv: 'O6r0sXtEiqJWK2Npghsf2fNNAcQsCRrhJfgYUh1oHGv8tibyb5j2fc/lPz5HUmYs',
		web_key: '',
		web_iv: '',
		userInfo: null,
		cid:'',
		longLat:null,
		selectCity:{
			city:'贵阳市'
		},
	}),
	actions: {
		setSelectCity(obj) {
			this.selectCity = obj
		},
		clearSelectCity() {
			this.selectCity = null
		},
		setLongLat(obj) {
			this.longLat = obj
		},
		clearLongLat() {
			this.longLat = null
		},
		setProfile(obj) {
			this.profile = obj
		},
		clearProfile() {
			this.profile = null
		},
		setTokenInfo(obj) {
			this.tokenInfo = obj
		},
		clearTokenInfo() {
			this.tokenInfo = null
		},
		setUserInfo(obj) {
			this.userInfo = obj
		},
		setCid(id){
			this.cid = id;
		},
		clearUserInfo() {
			this.userInfo = null
		},
		AesDecryptKey(word) {
			let decrypt = CryptoJS.AES.decrypt(word, CryptoJS.enc.Utf8.parse('c900b15a7f0912a5'), {
				iv: CryptoJS.enc.Utf8.parse('9012700612310671'),
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7
			})
			let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
			let key_arr = decryptedStr.split("_");
			this.web_key = CryptoJS.enc.Utf8.parse(key_arr[0]),
				this.web_iv = CryptoJS.enc.Utf8.parse(key_arr[1])
		},
		WebAesDecrypt(word) {
			let decrypt = CryptoJS.AES.decrypt(word, this.web_key, {
				iv: this.web_iv,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7
			})
			let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
			return JSON.parse(decryptedStr.toString())
		},
		async getuserinfo(){
			const res = await user_info()
			console.log(res,'这是store中的获取用户信息')
			this.userInfo = res
		}
	},
	persist: {
		storage: {
			getItem: uni.getStorageSync,
			setItem: uni.setStorageSync,
		},
	},

})