import { createRouter, createWebHistory } from 'vue-router'
import WorkOrderManagement from '../components/WorkOrderManagement.vue'
import Login from '../components/Login.vue'
import IPConfig from '../components/IPConfig.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: WorkOrderManagement,
      meta: { requiresAuth: true }
    },
    {
      path: '/ip-config',
      name: 'ipConfig',
      component: IPConfig
    }
  ]
})

// 全局前置守卫，验证用户是否登录
router.beforeEach((to, from, next) => {
  // 检查路由是否需要登录验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查是否有token
    const token = localStorage.getItem('token')
    if (!token) {
      // 如果没有token，重定向到登录页面
      next({ name: 'login' })
    } else {
      // 有token，允许访问
      next()
    }
  } else {
    // 不需要登录验证的路由，直接访问
    next()
  }
})

export default router