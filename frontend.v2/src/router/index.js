import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import booksRoutes from './groups/book';
import statisticRoutes from './groups/statistic';
import readingRoutes from './groups/reading';
import authRoutes from './groups/auth';
import ifNotAuthenticated from './guards/not-authenticated';

Vue.use(VueRouter);

const settingsRoutes = [{
  path: 'settings',
  name: 'Settings',
  props: false,
  component: () => import('../views/user/Settings.vue')
}, ]

const workspaceRoutes = [
  ...booksRoutes,
  ...statisticRoutes,
  ...readingRoutes,
  ...settingsRoutes,
];

const externalRoutes = [{
  path: 'about',
  name: 'About',
  props: false,
  component: () => import('@/views/About.vue')
}, {
  path: 'user/:login',
  name: 'User',
  props: true,
  component: () => import('@/views/user/User.vue')
}, {
  path: '/',
  name: 'Main',
  props: false,
  component: () => import('@/views/Main.vue'),
  beforeEnter: ifNotAuthenticated,
}, ];

const routes = [{
  path: '/',
  component: Home,
  children: [{
      path: 'me',
      props: false,
      children: [
        ...workspaceRoutes,
      ],
      component: () => import('@/views/Workspace.vue'),
    },
    ...authRoutes,
    ...externalRoutes,
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router