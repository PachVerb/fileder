/*
 * @Author: wangshan
 * @Date: 2021-05-19 01:15:35
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-21 02:07:54
 * @Description:
 */
let Files = {
  state: () => ({
    files: []
  }),
  mutations: {
    addFile(state: any, payload: any) {
      state.files.push(payload);
    }
  }
};
export default Files;
