/*
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-13 23:28:49
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
    rmove: '/api/file/remove'
  }
};
export default api;
