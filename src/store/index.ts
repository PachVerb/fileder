/*
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-21 22:20:15
 * @Description:
 */
import Vue from 'vue';
import Vuex from 'vuex';
import Login from './module/login';
import file from './module/file';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Login,
    file
  }
});
