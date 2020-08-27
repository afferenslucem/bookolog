"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _book = require("@/models/book");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  methods: {
    goToEdit: function goToEdit(guid) {
      this.$router.push({
        name: 'UpdateBook',
        params: {
          guid: guid
        }
      });
    },
    goToInfo: function goToInfo(guid) {
      this.$router.push({
        name: 'Book',
        params: {
          guid: guid
        }
      });
    }
  },
  computed: {
    progress: function progress() {
      return Math.min(Math.round(this.done / this.total * 100), 100);
    },
    done: function done() {
      return Math.min(this.book.doneUnits || 0, this.book.totalUnits || 0);
    },
    total: function total() {
      return this.book.totalUnits || Number.MAX_SAFE_INTEGER;
    },
    shouldShowProgress: function shouldShowProgress() {
      return this.book.status == _book.IN_PROGRESS_STATUS;
    },
    startedBook: function startedBook() {
      return this.book.status == _book.IN_PROGRESS_STATUS;
    },
    toReadDook: function toReadDook() {
      return this.book.status == _book.TO_READ_STATUS;
    },
    doneBook: function doneBook() {
      return this.book.status == _book.DONE_STATUS;
    },
    startDate: function startDate() {
      return (0, _moment["default"])(this.book.startDate).format('ll');
    },
    endDate: function endDate() {
      return (0, _moment["default"])(this.book.endDate).format('ll');
    }
  }
};
exports["default"] = _default;