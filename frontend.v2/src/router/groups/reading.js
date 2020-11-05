import ifAuthenticated from '../guards/authenticated';
import i18n from '@/i18n';

export default [{
  path: 'in-progress',
  name: 'InProgress',
  meta: {
    title: i18n.t('book.lists.byStatus.inProgress'),
  },
  component: () => import('@/views/books/lists/BooksInProgressList.vue'),
  beforeEnter: ifAuthenticated,
}, {
  path: 'to-read',
  name: 'ToRead',
  meta: {
    title: i18n.t('book.lists.byStatus.toRead'),
  },
  component: () => import('@/views/books/lists/BooksToReadList.vue'),
  beforeEnter: ifAuthenticated,
}, {
  path: 'done',
  name: 'Done',
  meta: {
    title: i18n.t('book.lists.byStatus.done'),
  },
  component: () => import('@/views/books/lists/BooksDoneList.vue'),
  beforeEnter: ifAuthenticated,
}, ];
