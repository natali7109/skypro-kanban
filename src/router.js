import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/new-card',
    name: 'new-card-modal',
    component: HomeView,  // Та же HomeView, но с открытой модалкой
    meta: { requiresAuth: true, modal: 'new-card' }
  },
  {
    path: '/card/:id',
    name: 'task-modal',
    component: HomeView,
    meta: { requiresAuth: true, modal: 'task' }
  },
  {
    path: '/edit/:id',
    name: 'edit-modal',
    component: HomeView,
    meta: { requiresAuth: true, modal: 'edit' }
  },
  {
    path: '/exit',
    name: 'exit-modal',
    component: HomeView,
    meta: { requiresAuth: true, modal: 'exit' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./views/RegisterView.vue')
  },
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('./views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuth = !!token  

  if (to.meta.requiresAuth && !isAuth) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && isAuth) {
    next('/')
  } else {
    next()
  }
})

export default router