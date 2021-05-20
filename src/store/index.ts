/*
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-21 01:48:52
 * @Description:
 */
import Vue from 'vue';
import Vuex from 'vuex';
import Login from './module/login';
import File from './module/file';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Login,
    File
  }
});
