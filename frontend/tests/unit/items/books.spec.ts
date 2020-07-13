import { BooksModule, BookData, Book } from '@/types/books-module';
import { expect } from 'chai';

const temp: BookData[] = [
    {
        "id": 1,
        "name": "Политика",
        "authors": ["Аристотель"],
        "status": 0
    },
    {
        "id": 2,
        "name": "Введение в ESMAScript 6 - 2016",
        "authors": ["Нараян Прасти"],
        "status": 2,
        "startDate": "2020-06-25"
    },
    {
        "id": 3,
        "name": "Vue.js в действии",
        "authors": ["Эрик Хэнчетт", "Бенджамин Листуон"],
        "status": 2,
        "startDate": "2020-06-18",
        "endDate": "2020-06-28"
    },
    {
        "id": 4,
        "name": "Занимательная физика",
        "authors": ["Яков Перельман"],
        "status": 2,
        "endDate": "2020-06-29"
    },
    {
        "id": 5,
        "name": "Как устроен javascript",
        "authors": ["Дуглас Крокфорд"],
        "status": 1,
        "startDate": "2020-06-29T12:15:00",
        "totalPages": 100,
        "pagesRead": 60
    },
    {
        "id": 6,
        "name": "BMW. Баварское сердце, Русская душа",
        "authors": ["Александр Пикуленко", "Денис Орлов"],
        "status": 1,
        "totalPages": 100,
        "pagesRead": 25
    },
    {
        "id": 7,
        "name": "Про Git",
        "authors": ["Скот Шакон", "Бен Страуп"],
        "status": 0
    },
    {
        "id": 8,
        "name": "Библиотека душ",
        "authors": ["Ренсом Риггз"],
        "status": 0
    }
];

const books: Book[] = temp.map(item => new Book(item));

export const statusMock: BooksModule = {
    books
}

describe('Book.ts', () => {
    it('check date equality', () => {
      const book = statusMock.books.find(item => item.id == 5);

      if(book) {
        expect(book.StartDate).to.deep.equal(new Date("2020-06-29T12:15:00"));
      } else {
        expect.fail()
      }
    })
  })