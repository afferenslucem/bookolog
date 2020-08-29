import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import {USER_LOGGED_IN_GETTER} from '../store/naming';
import store from '../store';

const ifAuthenticated = (to, from, next) => {
  if (store.getters[USER_LOGGED_IN_GETTER] || ((to.name === 'Login') || to.name === 'Registration')) {
    console.log('go to next')
    next()
  } else {
    console.log('redirect to home')
    next({name: 'Home'})
  }
}

Vue.use(VueRouter)

const workspaceRoutes = [
  {
    path: 'in-progress',
    name: 'InProgress',
    component: () => import('../views/books/lists/BooksInProgressList.vue')
  }, {
    path: 'to-read',
    name: 'ToRead',
    component: () => import('../views/books/lists/BooksToReadList.vue')
  }, {
    path: 'done',
    name: 'Done',
    component: () => import('../views/books/lists/BooksDoneList.vue')
  }, {
    path: 'by-genre/:name',
    name: 'ByGenre',
    props: true,
    component: () => import('../views/books/lists/BooksByGenreList.vue')
  }, {
    path: 'by-tag/:name',
    name: 'ByTag',
    props: true,
    component: () => import('../views/books/lists/BooksByTagList.vue')
  }, {
    path: 'book/create/:status',
    name: 'CreateBook',
    component: () => import('../views/books/entity/BookCreate.vue'),
    props: true
  }, {
    path: 'book/update/:guid',
    name: 'UpdateBook',
    component: () => import('../views/books/entity/BookUpdate.vue'),
    props: true
  }, {
    path: 'book/:guid',
    name: 'Book',
    component: () => import('../views/books/entity/Book.vue'),
    props: true
  }, {
    path: 'genres',
    name: 'Genres',
    component: () => import('../views/lists/GenresList.vue'),
    props: true
  }, {
    path: 'tags',
    name: 'Tags',
    component: () => import('../views/lists/TagsList.vue'),
    props: true
  },
];

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'workspace',
        name: 'Workspace',
        component: () => import('../views/Workspace.vue'),
        children: workspaceRoutes,
        beforeEnter: ifAuthenticated
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
