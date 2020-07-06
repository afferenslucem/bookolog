import { BooksModule, Book } from '@/types/books-module';

const books: Book[] = [
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
        "startDate": new Date("2020-06-25")
    },
    {
        "id": 3,
        "name": "Vue.js в действии",
        "authors": ["Эрик Хэнчетт", "Бенджамин Листуон"],
        "status": 2,
        "startDate": new Date("2020-06-18"),
        "endDate": new Date("2020-06-28")
    },
    {
        "id": 4,
        "name": "Занимательная физика",
        "authors": ["Яков Перельман"],
        "status": 2,
        "endDate": new Date("2020-06-29")
    },
    {
        "id": 5,
        "name": "Как устроен javascript",
        "authors": ["Дуглас Крокфорд"],
        "status": 1,
        "progress": 60
        "startDate": new Date("2020-06-29")
    },
    {
        "id": 6,
        "name": "BMW. Баварское сердце, Русская душа",
        "authors": ["Александр Пикуленко", "Денис Орлов"],
        "status": 1,
        "progress": 25
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

export const statusMock: BooksModule = {
    books
}