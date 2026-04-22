import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/HomeView.vue'),
    meta: { requiresAuth: true }
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
    path: '/card/:id',
    name: 'card-view',
    component: () => import('./views/CardView.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/edit/:id',
    name: 'edit-task',
    component: () => import('./views/EditView.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/create',
    name: 'create-task',
    component: () => import('./views/CreateView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/logout',
    name: 'logout-task',
    component: () => import('./views/LogoutView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)*',  // исправленный wildcard
    name: 'not-found',
    component: () => import('./views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Защита маршрутов с обработкой ошибок
router.beforeEach((to, from, next) => {
  try {
    const isAuth = localStorage.getItem('isAuth') === 'true'

    if (to.meta.requiresAuth) {
      if (isAuth) {
        next()
      } else {
        next('/login')
      }
    } else {
      if (to.path === '/login' && isAuth) {
        next('/')
      } else {
        next()
      }
    }
  } catch (error) {
    console.error('Routing protection error:', error)
    next('/login')
  }
})

export default router