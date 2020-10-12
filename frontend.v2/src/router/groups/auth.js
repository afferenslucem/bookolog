export default [{
    path: 'login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    props: true
  }, {
    path: 'registration',
    name: 'Registration',
    component: () => import('@/views/auth/Registration.vue'),
    props: true
  }, {
    path: 'recover-password',
    name: 'RecoverPassword',
    component: () => import('@/views/auth/RecoverPassword.vue'),
    props: true
  }, ];