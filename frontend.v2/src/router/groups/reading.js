import ifAuthenticated from '../guards/authenticated';

export default [{
  path: 'in-progress',
  name: 'InProgress',
  component: () => import('@/views/books/lists/BooksInProgressList.vue'),
  beforeEnter: ifAuthenticated,
}, {
  path: 'to-read',
  name: 'ToRead',
  component: () => import('@/views/books/lists/BooksToReadList.vue'),
  beforeEnter: ifAuthenticated,
}, {
  path: 'done',
  name: 'Done',
  component: () => import('@/views/books/lists/BooksDoneList.vue'),
  beforeEnter: ifAuthenticated,
}, ];