"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getState = getState;
exports["default"] = void 0;
var _default = [{
  "guid": "cfdbhgntjhfgndfndfvdfnbfgdv",
  "name": "Война миров",
  "authors": ["Герберт Уэллс"],
  "year": 2017,
  "status": 2,
  "tags": ["инопланетяне"],
  "genre": "фантастика",
  "totalUnits": 442,
  "doneUnits": 100,
  "startDate": "2020-08-05",
  "endDate": "2020-08-12",
  "type": 2,
  "note": ""
}, {
  "guid": "tmjmjmyjmtjm",
  "name": "Занимательная физика",
  "authors": ["Яков Перельман"],
  "year": 1984,
  "status": 2,
  "tags": ["физика", "научпоп"],
  "genre": "Образовательная литература",
  "totalUnits": 356,
  "doneUnits": 100,
  "startDate": "2020-04-15",
  "endDate": "2020-06-12",
  "type": 0,
  "note": "Интересная книга про физику"
}, {
  "guid": "cfdbhgndfsdfvsfdvsfvvdfnbfgdv",
  "name": "Наедене с собой",
  "authors": ["Марк Аврелий"],
  "year": 2015,
  "status": 0,
  "tags": ["стоицизм"],
  "genre": "философия",
  "totalUnits": 442,
  "doneUnits": 100,
  "startDate": "2019-08-05",
  "endDate": "2019-08-12",
  "type": 2,
  "note": ""
}, {
  "guid": "cfdbhgndfhgnfghnfghnfgvdfnbfgdv",
  "name": "Скотской бунт",
  "authors": ["Николай Костомаров", "Михаил Галустян"],
  "year": 2017,
  "status": 2,
  "tags": ["животные", "сатира"],
  "totalUnits": 0,
  "doneUnits": 0,
  "startDate": "1979-01-01",
  "endDate": "1979-01-01",
  "type": 0,
  "note": ""
}, {
  "guid": "cfdbhgndfvdfgbdfgbdfgbdfnbfgdv",
  "name": "BMW. Баварское сердце, Русская душа",
  "authors": ["Александр Пикуленко", "Денис Орлов"],
  "status": 1,
  "tags": ["Автомобили", "Германия", "СССР"],
  "genre": "история",
  "totalUnits": 200,
  "doneUnits": 100,
  "startDate": "2020-05-07",
  "endDate": "2020-05-09",
  "type": 2,
  "note": ""
}, {
  "guid": "cfdbhgnsdfbvsdfvsfddfvdfnbfgdv",
  "name": "Pro git",
  "authors": ["Скот Шакон", "Бен Страуп"],
  "year": 2020,
  "status": 1,
  "tags": ["scv", "git", "it"],
  "totalUnits": 500,
  "doneUnits": 200,
  "startDate": "2018-08-05",
  "endDate": "2018-08-12",
  "type": 1,
  "note": ""
}, {
  "guid": "dfgbdfgbdgfbdfgb",
  "name": "Таинственный Рыцарь",
  "authors": ["Джордж Мартин"],
  "year": 2014,
  "status": 1,
  "tags": ["средневековье"],
  "genre": "фентези",
  "totalUnits": 70,
  "doneUnits": 100,
  "type": 1,
  "note": ""
}, {
  "guid": "vdfvbbdfgb",
  "name": "1984",
  "authors": ["Джордж Оруел"],
  "year": 2015,
  "status": 0,
  "tags": ["антиутопия"],
  "genre": "фантастика",
  "totalUnits": 450,
  "doneUnits": 50,
  "type": 0,
  "note": "Или не фантастика?"
}, {
  "guid": "dfbgfbdffbsdsfvasdfbgd",
  "name": "Эпоха Мертвых. Прорыв",
  "authors": ["Андрей Круз"],
  "year": 2015,
  "status": 1,
  "tags": ["зомби"],
  "genre": "фантастика",
  "totalUnits": 0,
  "doneUnits": 50,
  "type": 0
}, {
  "guid": "vdfvbbdfdvsddsfbsdfbsdfbsdfbsfvsdfbsdfbsdfgb",
  "name": "Эпоха Мертвых. Москва",
  "authors": ["Андрей Круз"],
  "year": 2015,
  "status": 1,
  "tags": ["зомби"],
  "genre": "фантастика",
  "totalUnits": 340,
  "doneUnits": 0,
  "type": 0
}, {
  "guid": "vdfvbbfdsbsdfbsdfbsdfbsdfbsddfgb",
  "name": "Я еду домой",
  "authors": ["Андрей Круз"],
  "year": 2015,
  "status": 1,
  "tags": ["зомби"],
  "genre": "фантастика",
  "totalUnits": 340,
  "type": 0
}, {
  "guid": "vdfvgdfbdfgnfdgndfgnbbdfgb",
  "name": "От чужих берегов",
  "authors": ["Андрей Круз"],
  "year": 2015,
  "status": 1,
  "tags": ["зомби"],
  "genre": "фантастика",
  "doneUnits": 90,
  "type": 0
}, {
  "guid": "vdbfgbfgnfghnfgfvbbdfgb",
  "name": "Те, кто выжил",
  "authors": ["Андрей Круз"],
  "year": 2015,
  "status": 1,
  "tags": ["зомби"],
  "genre": "фантастика",
  "type": 0
}, {
  "guid": "cfdbhgndfsdfvvdfbdbdfbdfbdfsfdvsfvvdfnbfgdv",
  "name": "Земля лишних. Два билета туда",
  "authors": ["Андрей Круз"],
  "year": 2015,
  "status": 0,
  "totalUnits": 442,
  "doneUnits": 100,
  "startDate": "2019-08-05",
  "type": 2,
  "note": ""
}, {
  "guid": "cfdndfbfbdfdvsfvvdfnbfgdv",
  "name": "Земля лишних. Два билета туда",
  "authors": ["Андрей Круз"],
  "year": 2015,
  "status": 0,
  "totalUnits": 442,
  "doneUnits": 100,
  "endDate": "2019-08-05",
  "type": 2,
  "note": ""
}, {
  "guid": "bfbgfndfgdfgtfghfghbdsfdfsdghfgb",
  "name": "Земля лишних. Два билета туда",
  "authors": ["Андрей Круз"],
  "year": 2015,
  "status": 0,
  "totalUnits": 442,
  "doneUnits": 100,
  "type": 2,
  "note": ""
}, {
  "guid": "bdgfbxbxxcbxcvbxfgbfgb",
  "name": "Земля лишних. Два билета туда",
  "authors": ["Андрей Круз", "Андрей Царев"],
  "year": 2015,
  "status": 0,
  "totalUnits": 442,
  "doneUnits": 100,
  "type": 2,
  "note": ""
}];
exports["default"] = _default;

function getState(books) {
  var state = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = books[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      state[item.guid] = item;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return state;
}