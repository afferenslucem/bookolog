import ifAuthenticated from '../guards/authenticated';

export default [{
  path: 'genres',
  name: 'Genres',
  component: () => import('@/views/lists/GenresList.vue'),
  props: true,
  beforeEnter: ifAuthenticated,
}, {
  path: 'authors',
  name: 'Authors',
  component: () => import('@/views/lists/AuthorsList.vue'),
  props: true,
  beforeEnter: ifAuthenticated,
}, {
  path: 'tags',
  name: 'Tags',
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