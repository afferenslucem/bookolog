"use strict";

var _chai = require("chai");

var _books = _interopRequireDefault(require("../data/books"));

var _testUtils = require("@vue/test-utils");

var _DoneBook = _interopRequireDefault(require("@/components/book/DoneBook.vue"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('DoneBook.vue', function () {
  it('Render props.book.name', function () {
    var book = _books["default"][0];
    var wrapper = (0, _testUtils.shallowMount)(_DoneBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.text()).to.include("\u0412\u043E\u0439\u043D\u0430 \u043C\u0438\u0440\u043E\u0432");
  });
  it('Render props.book.authors', function () {
    var book = _books["default"][2];
    var wrapper = (0, _testUtils.shallowMount)(_DoneBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.text()).to.include("\u041C\u0430\u0440\u043A \u0410\u0432\u0440\u0435\u043B\u0438\u0439");
  });
  it('Render props.book.authors', function () {
    var book = _books["default"][3];
    var wrapper = (0, _testUtils.shallowMount)(_DoneBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.text()).to.include("[\n  \"\u041D\u0438\u043A\u043E\u043B\u0430\u0439 \u041A\u043E\u0441\u0442\u043E\u043C\u0430\u0440\u043E\u0432\",\n  \"\u041C\u0438\u0445\u0430\u0438\u043B \u0413\u0430\u043B\u0443\u0441\u0442\u044F\u043D\"\n]");
  });
  it('Render no props.book.progress', function () {
    var book = _books["default"][3];
    var wrapper = (0, _testUtils.shallowMount)(_DoneBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.html()).to.not.include("<progress-bar-stub");
  });
  it('Render props.book.startDate and props.book.endDate', function () {
    var book = _books["default"][2];
    var wrapper = (0, _testUtils.shallowMount)(_DoneBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.html()).to.not.include("<progress-bar-stub");
  });
  it('Render props.book.startDate', function () {
    var book = _books["default"][13];
    var wrapper = (0, _testUtils.shallowMount)(_DoneBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.html()).to.not.include("[ ".concat((0, _moment["default"])(book.startDate).format('ll'), " - ... ]"));
  });
  it('Render props.book.endDate', function () {
    var book = _books["default"][14];
    var wrapper = (0, _testUtils.shallowMount)(_DoneBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.html()).to.not.include("[ ... - ".concat((0, _moment["default"])(book.endDate).format('ll'), " ]"));
  });
  it('Render no dates', function () {
    var book = _books["default"][15];
    var wrapper = (0, _testUtils.shallowMount)(_DoneBook["default"], {
      propsData: {
        book: book
      }
    });
    (0, _chai.expect)(wrapper.html()).to.not.include('<div class="date-range');
  });
});