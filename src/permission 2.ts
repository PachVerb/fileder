import router from '@/router/index'
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  if (token) {
    if (to.name === 'Login') {
      next({ path: '/home', replace: true })
    } else {
      next()
    }
  } else {
    if (to.name !== "Login") {
      next({ path: '/login', replace: true })
    } else {
      next()
    }
  }
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
