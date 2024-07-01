import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*', // Catch all undefined routes
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/backend/users/Users.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users/create',
    name: 'userCreate',
    component: () => import('../views/backend/users/UserCreate.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-user/:id',
    name: 'editUser',
    component: () => import('../views/backend/users/EditUser.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/my-account',
    name: 'myAccount',
    component: () => import('../views/backend/auth/Account.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'loginUser',
    component: () => import('../views/backend/auth/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'registerUser',
    component: () => import('../views/backend/auth/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      localStorage.removeItem('token') // Remove the token from local storage
      next({ name: 'loginUser' }) // Redirect to the login page
    },
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token') // Check if token exists

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'loginUser' }) // Redirect to login page if not authenticated
  } else if (to.name === 'loginUser' && isAuthenticated) {
    next({ name: 'home' }) // Redirect to home if authenticated and trying to access login page
  } else {
    next()
  }
})

export default router
