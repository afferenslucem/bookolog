import ifAuthenticated from '../guards/authenticated';
import i18n from '@/i18n';

export default [{
  path: 'genres',
  name: 'Genres',
  meta: {
    title: i18n.t('book.lists.statistic.genres'),
  },
  component: () => import('@/views/lists/GenresList.vue'),
  props: true,
  beforeEnter: ifAuthenticated,
}, {
  path: 'authors',
  name: 'Authors',
  meta: {
    title: i18n.t('book.lists.statistic.authors'),
  },
  component: () => import('@/views/lists/AuthorsList.vue'),
  props: true,
  beforeEnter: ifAuthenticated,
}, {
  path: 'tags',
  name: 'Tags',
  meta: {
    title: i18n.t('book.lists.statistic.tags'),
  },
  component: () => import('@/views/lists/TagsList.vue'),
  props: true,
  beforeEnter: ifAuthenticated,
}, {
  path: 'by-genre/:name',
  name: 'ByGenre',
  props: true,
  beforeEnter: ifAuthenticated,
  component: () => import('@/views/books/lists/BooksByGenreList.vue')
}, {
  path: 'by-tag/:name',
  name: 'ByTag',
  props: true,
  beforeEnter: ifAuthenticated,
  component: () => import('@/views/books/lists/BooksByTagList.vue')
}, {
  path: 'by-author/:name',
  name: 'ByAuthor',
  props: true,
  beforeEnter: ifAuthenticated,
  component: () => import('@/views/books/lists/BooksByAuthorList.vue')
}, ];
