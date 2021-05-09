const api = {
  count: {
    login: '/api/users/login',
    logout: '/api/users/logout',
    getinfo: '/api/users/userinfo'
  },
  file: {
    list: '/api/file/list',
    getlist: '/api/file/getcontent',
    mkdir: '/api/file/mkdir'
  }
};
export default api;