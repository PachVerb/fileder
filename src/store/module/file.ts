/*
 * @Author: wangshan
 * @Date: 2021-05-19 01:15:35
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-24 00:58:51
 * @Description:
 */
import { notification } from 'ant-design-vue';
let file = null;
const files = {
  state: () => ({
    fdir: new Set()
  }),
  mutations: {
    addFile(state: any, { currentfile, upState }: any) {
      file = { currentfile, upState };
      state.fdir.add(file);
    },
    updateState(state: any) {
      notification.success({ description: '上传成功', message: 'upload' });
      const prefile = [...state.fdir];
      prefile[prefile.length - 1].upState = 0;
      state.fdir = new Set(prefile);
    },
    clearFile(state: any, payload: any) {
      console.log(payload);
      state.fdir.delete(payload);
    }
  },
  actions: {
    down(state: any): void {
      return undefined;
    }
  }
};
export default files;
