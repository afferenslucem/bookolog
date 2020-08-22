import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/in-progress',
        name: 'InProgress',
        component: () => import('../views/books/BooksInProgressList.vue')
      },
      {
        path: '/to-read',
        name: 'ToRead',
        component: () => import('../views/books/BooksToReadList.vue')
      },
      {
        path: '/done',
        name: 'Done',
        component: () => import('../views/books/BooksDoneList.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
