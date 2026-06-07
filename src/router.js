import { createRouter, createWebHashHistory } from 'vue-router'

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
    path: '/exit',
    name: 'exit',
    component: () => import('./views/LogoutView.vue'),
    meta: { requiresAuth: true }
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