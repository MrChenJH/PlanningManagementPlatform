import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import '@/utils/dateFmt'
import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import {Select, Option, OptionGroup} from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(ElementUI, { locale })

Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('OptionGroup', OptionGroup);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
