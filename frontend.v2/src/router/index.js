import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import booksRoutes from './groups/statistic';
import statisticRoutes from './groups/book';
import readingRoutes from './groups/reading';
import authRoutes from './groups/auth';
import ifNotAuthenticated from './guards/not-authenticated';
import i18n from "@/i18n";

Vue.use(VueRouter);

const settingsRoutes = [{
  path: 'settings',
  name: 'Settings',
  meta: {
    title: i18n.t('settings.title'),
  },
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
  meta: {
    title: i18n.t('about.title'),
  },
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
}, {
  path: '/logs',
  name: 'Logs',
  props: false,
  component: () => import('@/views/Logs.vue'),
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
