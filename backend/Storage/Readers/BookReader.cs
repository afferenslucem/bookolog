using Storage.Models;
using System;
using Reader = Npgsql.NpgsqlDataReader;

namespace Storage.Readers
{
    class BookReader : Reader<Book>
    {
        public BookReader(Reader reader) : base(reader)
        {
        }

        protected override Book ParseModel(Reader reader, ref int countOfReadColumns)
        {
            var guid = this.GetString(reader, ref countOfReadColumns);
            var name = this.GetString(reader, ref countOfReadColumns);
            var authors = this.GetNullableStringArray(reader, ref countOfReadColumns);
            var year = this.GetNullableInt32(reader, ref countOfReadColumns);
            var status = this.GetNullableInt32(reader, ref countOfReadColumns);
            var tags = this.GetNullableStringArray(reader, ref countOfReadColumns);
            var doneUnits = this.GetNullableInt32(reader, ref countOfReadColumns);
            var totalUnits = this.GetNullableInt32(reader, ref countOfReadColumns);
            var genge = this.GetNullableString(reader, ref countOfReadColumns);
            var startDate = this.GetNullableDateTime(reader, ref countOfReadColumns);
            var modifyDate = this.GetNullableDateTime(reader, ref countOfReadColumns);
            var endDate = this.GetNullableDateTime(reader, ref countOfReadColumns);
            var type = this.GetNullableInt32(reader, ref countOfReadColumns);
            var note = this.GetNullableString(reader, ref countOfReadColumns);
            var userId = this.GetInt32(reader, ref countOfReadColumns);

            return new Book
            {
                Guid = guid,
                Name = name,
                Authors = authors,
                Year = year,
                Status = status,
                Tags = tags,                      
                DoneUnits = doneUnits,
                TotalUnits = totalUnits,
                Genge = genge,
                StartDate = startDate,
                ModifyDate = modifyDate,
                EndDate = endDate,
                Type = type,
                Note = note,
                UserId = userId,
            };
        }
    }
}
