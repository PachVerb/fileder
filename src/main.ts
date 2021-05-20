/*
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-21 00:48:27
 * @Description: p
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/global.less';
import Plugin from '@/utils/requst';
import '@/permission';
import io from 'socket.io-client';

// window.localStorage.setItem('token', 'shanshan')

Vue.use(Plugin as { install: () => void });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
