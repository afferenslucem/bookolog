import data from './data.json';
import fs from 'fs';

main();

async function main() {
    const collections = data[1].result.reverse() as any[];
    const books = data[0].result.sort((a, b) => new Date(a.createDate).valueOf() - (new Date(b.createDate)).valueOf()) as any[];

    for (let collection of collections) {
        const command = `insert into "Collections" ("Guid", "Name", "Description", "ModifyDate", "CreateDate", "DeleteDate", "CoverId", "UserId") values ('${collection.guid}', '${collection.name}', '${collection.description}', '${formatDate(collection.createDate)}', '${formatDate(collection.modifyDate)}', null, null, ${collection.userId}); \n`

        await write(command);
    }

    await write('\n\n -- Книги Книги Книги Книги Книги Книги Книги Книги Книги Книги Книги Книги Книги Книги Книги Книги \n\n');

    for (let book of books) {
        const command = `insert into "Books" 
(
    "Guid", "Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "ModifyDate", "Type", "Note", "UserId", "CreateDate", "EndDateDay", "EndDateMonth", "EndDateYear", "StartDateDay", "StartDateMonth", "StartDateYear", "Year", "DeleteDate", "CollectionGuid", "CollectionOrder", "ProgressType", "RereadingBookGuid"
) values (
    '${book.guid}', '${book.name}', ${formatArray(book.authors)}, ${book.status}, ${formatArray(book.tags)}, ${book.doneUnits}, ${book.totalUnits}, '${book.genre}', '${formatDate(book.modifyDate)}', ${book.type}, '${book.note}', ${book.userId}, '${formatDate(book.createDate)}', ${book.endDateDay}, ${book.endDateMonth}, ${book.endDateYear}, ${book.startDateDay}, ${book.startDateMonth}, ${book.startDateYear}, ${book.year}, null, ${formatGuid(book.collectionGuid)}, ${book.collectionOrder}, '${book.progressType}', ${formatGuid(book.rereadingBookGuid)}
);\n`

        await write(command);
    }

}

async function write(str: string): Promise<void> {
    return new Promise(resolve => {
        fs.appendFile('insertContent.sql', str, () => resolve());
    })
}

function formatGuid(guid: string | null): string | null {
    return guid ? `'${guid}'` : null;
}

function formatDate(date: string): string {
    const value = new Date(date);

    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const day = value.getDate();

    const hours = value.getHours().toString().padStart(2, '0');
    const minutes = value.getMinutes().toString().padStart(2, '0');
    const seconds = value.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

function formatArray(data: string[]): string {
    if(data.length == 0) {
        return `array[]::text[]`
    }

    const dataString = data.map(item => `'${item}'`).join(', ');
    return `array [${dataString}]`
}