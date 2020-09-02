using Storage.Models;
using Storage.Readers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Storage.Repositories
{
    public interface IBookRepository {
        Task<IStorageBook> GetByGuid(string guid);
        Task<IEnumerable<IStorageBook>> GetByUserId(long userId);
        Task<IStorageBook> Save(IStorageBook book);
        Task Update(IStorageBook book);
        Task Delete(string bookGuid);
    }

    public class BookRepository : Repository, IBookRepository
    {
        protected BookRepository(string connectionString) : base(connectionString)
        {
        }

        public async Task<IStorageBook> GetByGuid(string guid)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();

            cmd.CommandText = "select * from books where guid = @guid limit 1";

            cmd.Parameters.AddWithValue("guid", guid);

            using var reader = await cmd.ExecuteReaderAsync();

            var dataReader = new BookReader(reader);

            var result = await dataReader.ReadOne();

            return result;
        }

        public async Task<IEnumerable<IStorageBook>> GetByUserId(long userId)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();

            cmd.CommandText = "select * from books where userId = @userId";

            cmd.Parameters.AddWithValue("userId", userId);

            using var reader = await cmd.ExecuteReaderAsync();

            var dataReader = new BookReader(reader);

            var result = await dataReader.ReadAll();

            return result;
        }

        public async Task<IStorageBook> Save(IStorageBook book)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();

            cmd.CommandText = "select \"createBook\"(@guid, @name, @authors, @year, @status, @tags, @doneUnits, @totalUnits, @genre, @startdate, @modifyDate, @enddate, @type, @note, @userid);";

            cmd.Parameters.AddWithValue("guid", book.Guid);
            cmd.Parameters.AddWithValue("name", book.Name);
            cmd.Parameters.AddWithValue("authors", (object) book.Authors ?? DBNull.Value);
            cmd.Parameters.AddWithValue("year", (object) book.Year ?? DBNull.Value);
            cmd.Parameters.AddWithValue("status", (object) book.Status ?? DBNull.Value);
            cmd.Parameters.AddWithValue("tags", (object) book.Tags ?? DBNull.Value);
            cmd.Parameters.AddWithValue("doneUnits", (object) book.DoneUnits ?? DBNull.Value);
            cmd.Parameters.AddWithValue("totalUnits", (object) book.TotalUnits ?? DBNull.Value);
            cmd.Parameters.AddWithValue("genre", (object) book.Genge ?? DBNull.Value);
            cmd.Parameters.AddWithValue("startdate", (object) book.StartDate ?? DBNull.Value);
            cmd.Parameters.AddWithValue("modifyDate", (object)book.ModifyDate ?? DBNull.Value);
            cmd.Parameters.AddWithValue("enddate", (object)book.EndDate ?? DBNull.Value);
            cmd.Parameters.AddWithValue("type", (object)book.Type ?? DBNull.Value);
            cmd.Parameters.AddWithValue("note", (object)book.Note ?? DBNull.Value);
            cmd.Parameters.AddWithValue("userId", book.UserId);

            var id = (string) await cmd.ExecuteScalarAsync();

            var result = new Book(book);
            result.Guid = id;

            return result;
        }

        public async Task Update(IStorageBook book)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();
            
            cmd.CommandText = "select \"updateBook\"(@guid, @name, @authors, @year, @status, @tags, @doneUnits, @totalUnits, @genre, @startdate, @modifyDate, @enddate, @type, @note)";

            cmd.Parameters.AddWithValue("guid", book.Guid);
            cmd.Parameters.AddWithValue("name", book.Name);
            cmd.Parameters.AddWithValue("authors", (object) book.Authors ?? DBNull.Value);
            cmd.Parameters.AddWithValue("year", (object) book.Year ?? DBNull.Value);
            cmd.Parameters.AddWithValue("status", (object) book.Status ?? DBNull.Value);
            cmd.Parameters.AddWithValue("tags", (object) book.Tags ?? DBNull.Value);
            cmd.Parameters.AddWithValue("doneUnits", (object) book.DoneUnits ?? DBNull.Value);
            cmd.Parameters.AddWithValue("totalUnits", (object) book.TotalUnits ?? DBNull.Value);
            cmd.Parameters.AddWithValue("genre", (object) book.Genge ?? DBNull.Value);
            cmd.Parameters.AddWithValue("startdate", (object) book.StartDate ?? DBNull.Value);
            cmd.Parameters.AddWithValue("modifyDate", (object)book.ModifyDate ?? DBNull.Value);
            cmd.Parameters.AddWithValue("enddate", (object)book.EndDate ?? DBNull.Value);
            cmd.Parameters.AddWithValue("type", (object)book.Type ?? DBNull.Value);
            cmd.Parameters.AddWithValue("note", (object)book.Note ?? DBNull.Value);

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task Delete(string bookGuid)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();

            cmd.CommandText = "delete from books where guid = @guid";

            cmd.Parameters.AddWithValue("guid", bookGuid);

            await cmd.ExecuteNonQueryAsync();
        }

        public static IBookRepository GetRepository(string connectionString)
        {
            return new BookRepository(connectionString);
        }
    }
}
