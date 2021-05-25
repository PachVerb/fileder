/*
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-25 22:04:10
 * @Description:
 */
const api = {
  count: {
    login: '/api/users/login',
    logout: '/api/users/logout',
    getinfo: '/api/users/userinfo'
  },
  file: {
    list: '/api/file/list',
    getlist: '/api/file/getcontent',
    mkdir: '/api/file/mkdir',
    rmove: '/api/file/remove',
    download: '/api/file/download'
  }
};
export default api;
