import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Main from '@/views/Main.vue';
import ToRead from '@/views/ToReadList.vue';
import Reading from '@/views/MyReadingList.vue';
import BookForm from '@/views/BookForm.vue';
import LoginForm from '@/views/LoginForm.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/to-read',
    name: 'ToRead',
    component: ToRead
  },
  {
    path: '/reading',
    name: 'Reading',
    component: Reading
  },
  {
    path: '/book/:action/:id',
    name: 'BookForm',
    component: BookForm,
    props: true
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
