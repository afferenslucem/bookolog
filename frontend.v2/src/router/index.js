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
        component: () => import('../views/books/lists/BooksInProgressList.vue')
      }, {
        path: '/to-read',
        name: 'ToRead',
        component: () => import('../views/books/lists/BooksToReadList.vue')
      }, {
        path: '/done',
        name: 'Done',
        component: () => import('../views/books/lists/BooksDoneList.vue')
      }, {
        path: '/book/create/:status',
        name: 'CreateBook',
        component: () => import('../views/books/entity/BookCreate.vue'),
        props: true
      }, {
        path: '/book/update/:guid',
        name: 'UpdateBook',
        component: () => import('../views/books/entity/BookUpdate.vue'),
        props: true
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
