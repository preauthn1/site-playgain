<script>
import {
	useUserStore
} from '@/store/modules/user.js'
import {
		user_info
	} from '@/api/login';
export default {
	onLaunch: function(options) {
		console.log(options)
		console.log('App Launch')
		// #ifdef APP-PLUS
		if (options.launcher == 'shortcut' || options.launcher == 'default') {
			if (!uni.getStorageSync('launchFlag')) {
				uni.redirectTo({
					url: '/pages/guide/guide'
				})
			}
		}
		// #endif
		uni.getPushClientId({
			success(res) {
				const store = useUserStore()
				console.log(res);
				store.setCid(res.cid);
			},
			fail(err) {
				console.log(err)
			}
		})
	},
	onShow: function() {
		console.log('App Show')
		uni.hideTabBar()
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-plus/index.scss";
	@import "@/static/css/common.css";
	@import "@/static/css/globa.scss"
</style>