import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/backend/users/Users.vue')
    },
    {
      path: '/users/create',
      name: 'userCreate',
      component: () => import('../views/backend/users/UserCreate.vue')
    },
    {
      path: '/edit-user/:id',
      name: 'editUser',
      component: () => import('../views/backend/users/EditUser.vue'),
      props: true
    }
  ]
})

export default router
