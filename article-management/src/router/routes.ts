import Login from '@/views/login/LoginPage.vue'
import Register from '@/views/login/RegisterPage.vue'
import Articles from '@/views/articles/IndexPage.vue'
import ArticleForm from '@/views/articles/FormPage.vue'

const routes = [
    {
      path: '/login',
      name: 'login',
      meta: { noCheck: true },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: { noCheck: true },
      component: Register
    },
    {
      path: '/articles',
      name: 'articlesIndex',
      component: Articles
    },
    {
      path: '/articles/new',
      name: 'articlesAdd',
      component: ArticleForm
    },
    {
      path: '/articles/edit/:id',
      props: true,
      name: 'articlesEdit',
      component: ArticleForm
    }
  ]

  export default routes