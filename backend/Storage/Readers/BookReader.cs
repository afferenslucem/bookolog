using Storage.Models;
using System;
using Reader = Microsoft.Data.Sqlite.SqliteDataReader;

namespace Storage.Readers
{
    class BookReader : Reader<Book>
    {
        public BookReader(Reader reader) : base(reader)
        {
        }

        protected override Book ParseModel(Reader reader, ref int countOfReadColumns)
        {
            var id = this.GetInt64(reader, ref countOfReadColumns);
            var name = this.GetString(reader, ref countOfReadColumns);
            var authors = this.GetString(reader, ref countOfReadColumns).Split('|');
            var status = this.GetInt32(reader, ref countOfReadColumns);
            var startYear = this.GetNullableInt16(reader, ref countOfReadColumns);
            var startMonth = this.GetNullableInt16(reader, ref countOfReadColumns);
            var startDay = this.GetNullableInt16(reader, ref countOfReadColumns);
            var endYear = this.GetNullableInt16(reader, ref countOfReadColumns);
            var endMonth = this.GetNullableInt16(reader, ref countOfReadColumns);
            var endDay = this.GetNullableInt16(reader, ref countOfReadColumns);
            var pages = this.GetNullableInt32(reader, ref countOfReadColumns);
            var totalPages = this.GetNullableInt32(reader, ref countOfReadColumns);
            var userId = this.GetInt64(reader, ref countOfReadColumns);

            return new Book
            {
                Id = id,
                Name = name,
                Authors = authors,
                Status = status,
                StartYear = startYear,
                StartMonth = startMonth,
                StartDay = startDay,
                EndYear = endYear,
                EndMonth = endMonth,
                EndDay = endDay,
                PagesRead = pages,
                TotalPages = totalPages,
                UserId = userId
            };
        }
    }
}
