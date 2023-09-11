import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { getUserInfo } from '@/api/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

import { useUserStore } from '@/stores/user'

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()
  const isLogin = user.getToken
  const token = sessionStorage.getItem('token')
  const { noCheck } = to.meta
  if (token) {
    if (!isLogin) {
      const { data } = await getUserInfo(token)
      console.log('clk', data)
      user.login(data.user)
    }
    if (['/', '/login'].includes(to.fullPath)) next({ name: 'articlesIndex' })
    else next()
  } else if (noCheck) {
    next()
  } else {
    next({ name: 'login' })
  }
})
export default router
