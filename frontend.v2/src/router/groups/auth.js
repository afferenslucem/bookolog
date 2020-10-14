import ifNotAuthenticated from '../guards/not-authenticated';

export default [{
  path: 'login',
  name: 'Login',
  component: () => import('@/views/auth/Login.vue'),
  props: true,
  beforeEnter: ifNotAuthenticated,
}, {
  path: 'registration',
  name: 'Registration',
  component: () => import('@/views/auth/Registration.vue'),
  props: true,
  beforeEnter: ifNotAuthenticated,
}, {
  path: 'recover-password',
  name: 'RecoverPassword',
  component: () => import('@/views/auth/RecoverPassword.vue'),
  props: true,
  beforeEnter: ifNotAuthenticated,
}, ];