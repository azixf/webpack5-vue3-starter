import {
  type Router,
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
    meta: {
      title: '首页',
    },
  },
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.set(0.2)
  if (to.meta && to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export { router }

export default router
