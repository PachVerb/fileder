/*
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-04 23:36:03
 * @Description:
 */
import Vue from 'vue';
import api from '@/api/api';

type Option = {
  commit: (mutaion: string, op: { info: unknown }) => void;
};
const LoginModule = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  state: () => ({
    info: {}
  }),
  mutations: {
    regisUserinfo(
      state: { info: unknown },
      prefix: Record<string, unknown>
    ): void {
      state.info = prefix.info;
    }
  },
  actions: {
    getInfo({ commit }: Option): void {
      const $req = Vue.prototype.$req;
      $req.get(api.count.getinfo).then((res: { data: { info: unknown } }) => {
        const { info } = res.data;
        commit('regisUserinfo', {
          info
        });
      });
    }
  }
};

export default LoginModule;
