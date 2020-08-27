"use strict";

var _chai = require("chai");

var _books = _interopRequireDefault(require("../data/books"));

var _testUtils = require("@vue/test-utils");

var _ProgressingBook = _interopRequireDefault(require("@/components/book/ProgressingBook.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('ProgressingBook.vue', function () {
  it('Render props.book.name', function () {
    var book = _books["default"][4];
    var wrapper = (0, _testUtils.shallowMount)(_ProgressingBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.text()).to.include("BMW. \u0411\u0430\u0432\u0430\u0440\u0441\u043A\u043E\u0435 \u0441\u0435\u0440\u0434\u0446\u0435, \u0420\u0443\u0441\u0441\u043A\u0430\u044F \u0434\u0443\u0448\u0430");
  });
  it('Render props.book.authors', function () {
    var book = _books["default"][4];
    var wrapper = (0, _testUtils.shallowMount)(_ProgressingBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.text()).to.include("[\n  \"\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 \u041F\u0438\u043A\u0443\u043B\u0435\u043D\u043A\u043E\",\n  \"\u0414\u0435\u043D\u0438\u0441 \u041E\u0440\u043B\u043E\u0432\"\n]");
  });
  it('Render props.book.authors', function () {
    var book = _books["default"][6];
    var wrapper = (0, _testUtils.shallowMount)(_ProgressingBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.text()).to.include("\u0414\u0436\u043E\u0440\u0434\u0436 \u041C\u0430\u0440\u0442\u0438\u043D");
  });
  it('Render props.book.progress', function () {
    var book = _books["default"][4];
    var wrapper = (0, _testUtils.shallowMount)(_ProgressingBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.html()).to.include("<progress-bar-stub progress=\"50\"></progress-bar-stub>");
  });
  it('Render empty props.book.progress', function () {
    var book = _books["default"][8];
    var wrapper = (0, _testUtils.shallowMount)(_ProgressingBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.html()).to.include("<progress-bar-stub progress=\"0\"></progress-bar-stub>");
  });
  it('Render empty props.book.progress', function () {
    var book = _books["default"][9];
    var wrapper = (0, _testUtils.shallowMount)(_ProgressingBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.html()).to.include("<progress-bar-stub progress=\"0\"></progress-bar-stub>");
  });
  it('Render empty props.book.progress', function () {
    var book = _books["default"][10];
    var wrapper = (0, _testUtils.shallowMount)(_ProgressingBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.html()).to.include("<progress-bar-stub progress=\"0\"></progress-bar-stub>");
  });
  it('Render empty props.book.progress', function () {
    var book = _books["default"][11];
    var wrapper = (0, _testUtils.shallowMount)(_ProgressingBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.html()).to.include("<progress-bar-stub progress=\"0\"></progress-bar-stub>");
  });
  it('Render empty props.book.progress', function () {
    var book = _books["default"][12];
    var wrapper = (0, _testUtils.shallowMount)(_ProgressingBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.html()).to.include("<progress-bar-stub progress=\"0\"></progress-bar-stub>");
  });
});