import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import config from '@/config/index'
import api from '@/api/index'
import { hasPermission } from '@/libs/util'

Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$moment = moment
Vue.prototype.$api = api
Vue.prototype.hasPerm = hasPermission
ElementUI.Dialog.props.closeOnClickModal.default = false;
ElementUI.Dialog.props.destroyOnClose.default = true;
Vue.use(ElementUI)
Vue.use(Viewer, {
	defaultOptions: {
		zIndex: 9999,
		url:'data-src'
	}
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
