/*
 * @Author: wangshan
 * @Date: 2021-05-19 01:15:35
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-22 00:45:14
 * @Description:
 */
const files = {
  state: () => ({
    fdir: []
  }),
  mutations: {
    addFile(state: any, payload: any) {
      state.fdir.push(payload);
    },
    clearFile(state: any, payload: any) {
      state.fdir = [];
    }
  }
};
export default files;
