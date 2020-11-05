import ifNotAuthenticated from '../guards/not-authenticated';
import i18n from "@/i18n";

export default [{
  path: 'login',
  name: 'Login',
  meta: {
    title: i18n.t('auth.loginForm.title'),
  },
  component: () => import('@/views/auth/Login.vue'),
  props: true,
  beforeEnter: ifNotAuthenticated,
}, {
  path: 'registration',
  name: 'Registration',
  meta: {
    title: i18n.t('auth.registrationForm.title'),
  },
  component: () => import('@/views/auth/Registration.vue'),
  props: true,
  beforeEnter: ifNotAuthenticated,
}, {
  path: 'recover-password',
  name: 'RecoverPassword',
  meta: {
    title: i18n.t('auth.recoveryPasswordForm.title'),
  },
  component: () => import('@/views/auth/RecoverPassword.vue'),
  props: true,
  beforeEnter: ifNotAuthenticated,
}, ];
