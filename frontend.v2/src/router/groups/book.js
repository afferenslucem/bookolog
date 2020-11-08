import ifAuthenticated from '../guards/authenticated';
import i18n from "@/i18n";

export default [{
  path: 'book/create/:status',
  name: 'CreateBook',
  meta: {
    title: i18n.t('book.form.header.create'),
  },
  component: () => import('@/views/books/entity/BookCreate.vue'),
  props: true,
  beforeEnter: ifAuthenticated,
}, {
  path: 'book/update/:guid',
  name: 'UpdateBook',
  meta: {
    title: i18n.t('book.form.header.update'),
  },
  component: () => import('@/views/books/entity/BookUpdate.vue'),
  props: true,
  beforeEnter: ifAuthenticated,
}, {
  path: 'book/:guid',
  name: 'Book',
  meta: {
    title: i18n.t('book.entity.header'),
  },
  component: () => import('@/views/books/entity/Book.vue'),
  props: true,
  beforeEnter: ifAuthenticated,
}, ];
