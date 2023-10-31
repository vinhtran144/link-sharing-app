// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Signup from  '@/views/Signup'
import Preview from  '@/views/Preview'

const routes = [
  // {
  //   path: '/',
  //   component: () => import('@/layouts/default/Default.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Home',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  //     },
      
  //   ],
  // },
  {
    path:'/login',
    redirect:'/login/0'
  },
  {
    path:'/home',
    redirect:'/'
  },
  {
    path: '/login/:status',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:id',
    name: 'Preview',
    component: Preview
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
