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
        "startYear": 2020,
        "startMonth": 6,
        "startDay": 25,
    },
    {
        "id": 3,
        "name": "Vue.js в действии",
        "authors": ["Эрик Хэнчетт", "Бенджамин Листуон"],
        "status": 2,
        "startYear": 2020,
        "startMonth": 6,
        "startDay": 18,
        "endYear": 2020,
        "endMonth": 6,
        "endDay": 28,
    },
    {
        "id": 4,
        "name": "Занимательная физика",
        "authors": ["Яков Перельман"],
        "status": 2,
        "endYear": 2020,
        "endMonth": 6,
        "endDay": 29,
    },
    {
        "id": 5,
        "name": "Как устроен javascript",
        "authors": ["Дуглас Крокфорд"],
        "status": 1,
        "startYear": 2020,
        "startMonth": 6,
        "startDay": 29,
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