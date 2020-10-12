export default [{
    path: 'in-progress',
    name: 'InProgress',
    component: () => import('@/views/books/lists/BooksInProgressList.vue')
  }, {
    path: 'to-read',
    name: 'ToRead',
    component: () => import('@/views/books/lists/BooksToReadList.vue')
  }, {
    path: 'done',
    name: 'Done',
    component: () => import('@/views/books/lists/BooksDoneList.vue')
  }, ];