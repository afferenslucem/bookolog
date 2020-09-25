export const books = [{
    authors: ["Андрей Круз", "Андрей Царев"],
    genre: "Фантастика",
    name: "Земля лишних. Последний борт на Одессу",
    status: 0,
    tags: ["Другие миры", "попаданцы", "боевая фантастика"],
    type: 2,
    note: 'Книга про добрых авантюристов.',
},{
    authors: ["Андрей Круз", "Андрей Царев"],
    totalUnits: 100,
    doneUnits: 20,
    endDate: "2222-08-31",
    endDateYear: "2222",
    endDateMonth: "8",
    endDateDay: "31",
    genre: "Фантастика",
    name: "Земля лишних. Два билета туда",
    startDate: "2020-08-27",
    startDateYear: "2020",
    startDateMonth: "8",
    startDateDay: "27",
    status: 2,
    tags: ["Другие миры", "попаданцы", "боевая фантастика"],
    type: 2,
    note: 'Главные персонажи очень душевные'
},{
    authors: ["Андрей Круз"],
    doneUnits: 332,
    genre: "Фантастика",
    name: "Ар Деко",
    note: "Про мафию",
    startDate: "2020-09-16",
    startDateYear: "2020",
    startDateMonth: "9",
    startDateDay: "16",
    status: 1,
    tags: ["Мафия", "боевая фантастика"],
    totalUnits: 710,
    type: 2,
},{
    guid: 'a08cf143-2a58-40b4-8b6d-1105802bc490',
    authors: ["Резиг Д.","Бибо Б.","Марас И."],
    doneUnits: 0,
    genre: "Компьютерная литература",
    name: "Секреты JavaScript ниндзя",
    note: "",
    startDate: "5000-12-05",
    startDateYear: "5000",
    startDateMonth: "12",
    startDateDay: "05",
    status: 0,
    tags: ["JavaScript", "Языки программирования", "Web"],
    totalUnits: 0,
    type: 1,
}];

export const credentials = {
    fullUserAccount: {
        username: "fullUser",
        password: "masterkey"
    },
    emptyUserAccount: {
        username: "emptyUser",
        password: "masterkey"
    },
    passwordChangeAccount: {
        username: "passwordChange",
        password: "masterkey"
    },
    emailChangeAccount: {
        username: "emailChange",
        password: "masterkey",
        email: "nfillippov@gmail.com"
    },

    newAccount: {
        username: "newLogin",
        password: "masterkey",
        email: "newMail@gmail.com"
    },

    sameLoginAccount: {
        username: "newLogin",
        password: "masterkey",
        email: "otherMail@gmail.com"
    },

    sameEmailAccount: {
        username: "otherLogin",
        password: "masterkey",
        email: "newMail@gmail.com"
    }
}