export default [{
        path: 'genres',
        name: 'Genres',
        component: () => import('@/views/lists/GenresList.vue'),
        props: true
      }, {
        path: 'authors',
        name: 'Authors',
        component: () => import('@/views/lists/AuthorsList.vue'),
        props: true
      }, {
        path: 'tags',
        name: 'Tags',
        component: () => import('@/views/lists/TagsList.vue'),
        props: true
      }, {
        path: 'by-genre/:name',
        name: 'ByGenre',
        props: true,
        component: () => import('@/views/books/lists/BooksByGenreList.vue')
      }, {
        path: 'by-tag/:name',
        name: 'ByTag',
        props: true,
        component: () => import('@/views/books/lists/BooksByTagList.vue')
      }, {
        path: 'by-author/:name',
        name: 'ByAuthor',
        props: true,
        component: () => import('@/views/books/lists/BooksByAuthorList.vue')
      }, ];