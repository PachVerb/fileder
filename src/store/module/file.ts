/*
 * @Author: wangshan
 * @Date: 2021-05-19 01:15:35
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-26 23:17:50
 * @Description:
 */
import { notification } from 'ant-design-vue';
interface fles {
  name: string;
  upState: number;
}

const files = {
  state: () => ({
    fdir: new Set(),
    dowpro: 0
  }),
  mutations: {
    addFile(state: any, { currentfile, upState }: any) {
      currentfile.upState = upState;
      state.fdir.add(currentfile);
    },
    updateState(state: any) {
      notification.success({ description: '传输完成', message: 'upload' });
      const prefile = [...state.fdir];
      prefile[prefile.length - 1].upState = 0;
      state.fdir = new Set(prefile);
    },
    clearFile(state: any, payload: any) {
      console.log(payload);
      state.fdir.delete(payload);
    },
    addDownFile(state: any, payload: any) {
      const { title } = payload;
      const files: fles = {
        name: title,
        upState: 1
      };

      state.fdir.add(files);
    },
    downprocess(state: any, payload: number) {
      state.dowpro = payload;
    }
  }
};
export default files;
