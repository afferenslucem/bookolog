"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../views/Home.vue"));

var _naming = require("../store/naming");

var _store = _interopRequireDefault(require("../store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ifAuthenticated = function ifAuthenticated(to, from, next) {
  if (_store["default"].getters[_naming.USER_LOGGED_IN_GETTER] || to.name === 'Login' || to.name === 'Registration') {
    console.log('go to next');
    next();
  } else {
    console.log('redirect to home');
    next({
      name: 'Home'
    });
  }
};

_vue["default"].use(_vueRouter["default"]);

var booksRoutes = [{
  path: 'book/create/:status',
  name: 'CreateBook',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/books/entity/BookCreate.vue'));
    });
  },
  props: true
}, {
  path: 'book/update/:guid',
  name: 'UpdateBook',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/books/entity/BookUpdate.vue'));
    });
  },
  props: true
}, {
  path: 'book/:guid',
  name: 'Book',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/books/entity/Book.vue'));
    });
  },
  props: true
}];
var statisticRoutes = [{
  path: 'genres',
  name: 'Genres',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/lists/GenresList.vue'));
    });
  },
  props: true
}, {
  path: 'authors',
  name: 'Authors',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/lists/AuthorsList.vue'));
    });
  },
  props: true
}, {
  path: 'tags',
  name: 'Tags',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/lists/TagsList.vue'));
    });
  },
  props: true
}];
var readingRoutes = [{
  path: 'in-progress',
  name: 'InProgress',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/books/lists/BooksInProgressList.vue'));
    });
  }
}, {
  path: 'to-read',
  name: 'ToRead',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/books/lists/BooksToReadList.vue'));
    });
  }
}, {
  path: 'done',
  name: 'Done',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/books/lists/BooksDoneList.vue'));
    });
  }
}];
var booksBySomething = [{
  path: 'by-genre/:name',
  name: 'ByGenre',
  props: true,
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/books/lists/BooksByGenreList.vue'));
    });
  }
}, {
  path: 'by-tag/:name',
  name: 'ByTag',
  props: true,
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/books/lists/BooksByTagList.vue'));
    });
  }
}, {
  path: 'by-author/:name',
  name: 'ByAuthor',
  props: true,
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/books/lists/BooksByAuthorList.vue'));
    });
  }
}];
var workspaceRoutes = [].concat(booksRoutes, statisticRoutes, readingRoutes, booksBySomething);
var routes = [{
  path: '/',
  name: 'Home',
  component: _Home["default"],
  children: [{
    path: 'workspace',
    name: 'Workspace',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Workspace.vue'));
      });
    },
    children: workspaceRoutes,
    beforeEnter: ifAuthenticated
  }]
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;