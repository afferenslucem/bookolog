"use strict";

var _chai = require("chai");

var _books = _interopRequireDefault(require("../data/books"));

var _testUtils = require("@vue/test-utils");

var _ToReadBook = _interopRequireDefault(require("@/components/book/ToReadBook.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('ProgressingBook.vue', function () {
  it('Render props.book.name', function () {
    var book = _books["default"][2];
    var wrapper = (0, _testUtils.shallowMount)(_ToReadBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.text()).to.include("\u041D\u0430\u0435\u0434\u0435\u043D\u0435 \u0441 \u0441\u043E\u0431\u043E\u0439");
  });
  it('Render props.book.authors', function () {
    var book = _books["default"][16];
    var wrapper = (0, _testUtils.shallowMount)(_ToReadBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.text()).to.include("[\n  \"\u0410\u043D\u0434\u0440\u0435\u0439 \u041A\u0440\u0443\u0437\",\n  \"\u0410\u043D\u0434\u0440\u0435\u0439 \u0426\u0430\u0440\u0435\u0432\"\n]");
  });
  it('Render props.book.authors', function () {
    var book = _books["default"][2];
    var wrapper = (0, _testUtils.shallowMount)(_ToReadBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.text()).to.include("\u041C\u0430\u0440\u043A \u0410\u0432\u0440\u0435\u043B\u0438\u0439");
  });
});