import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/global.less'
import Plugin from '@/utils/requst'
import '@/permission'

// window.localStorage.setItem('token', 'shanshan')

Vue.use(Plugin as {install: () => void})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
