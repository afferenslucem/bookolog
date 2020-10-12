import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import ifAuthenticated from './guards/authenticated';

import booksRoutes from './groups/book';
import statisticRoutes from './groups/statistic';
import readingRoutes from './groups/reading';
import authRoutes from './groups/auth';

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
  path: '/',
  name: 'Main',
  props: false,
  component: () => import('../views/Main.vue'),
}, {
  path: '/about',
  name: 'About',
  props: false,
  component: () => import('../views/About.vue')
}, ];

const routes = [{
  path: '/',
  component: Home,
  children: [{
      path: '/',
      name: 'Workspace',
      component: () => import('../views/Workspace.vue'),
      children: workspaceRoutes,
      beforeEnter: ifAuthenticated
    },
    ...externalRoutes,
    ...authRoutes,
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router