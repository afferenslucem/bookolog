import ifAuthenticated from '../guards/authenticated';

export default [{
  path: 'book/create/:status',
  name: 'CreateBook',
  component: () => import('@/views/books/entity/BookCreate.vue'),
  props: true,
  beforeEnter: ifAuthenticated,
}, {
  path: 'book/update/:guid',
  name: 'UpdateBook',
  component: () => import('@/views/books/entity/BookUpdate.vue'),
  props: true,
  beforeEnter: ifAuthenticated,
}, {
  path: 'book/:guid',
  name: 'Book',
  component: () => import('@/views/books/entity/Book.vue'),
  props: true,
  beforeEnter: ifAuthenticated,
}, ];