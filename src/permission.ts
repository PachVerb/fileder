import router from '@/router/index';
import store from '@/store/index';
import { Store } from 'vuex';

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    if (to.name === 'Login') {
      next({ path: '/home', replace: true });
    } else {
      if ((store as Store<any>).state.Login.info) {
        store.dispatch('getInfo');
      }
      next();
    }
  } else {
    if (to.name !== 'Login') {
      next({ path: '/login', replace: true });
    } else {
      next();
    }
  }
});
