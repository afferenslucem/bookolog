using Storage.Models;
using Storage.Readers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Storage.Repositories
{
    public interface IBookRepository {
        Task<IStorageBook> GetById(long id);
        Task<IEnumerable<IStorageBook>> GetByUserId(long userId);
        Task<IStorageBook> Save(IStorageBook book);
        Task Update(IStorageBook book);
        Task Delete(long bookId);
    }

    public class BookRepository : Repository, IBookRepository
    {
        protected BookRepository(string connectionString) : base(connectionString)
        {
        }

        public async Task<IStorageBook> GetById(long id)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();

            cmd.CommandText = "select * from books where id = @id limit 1";

            cmd.Parameters.AddWithValue("id", id);

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

            cmd.CommandText = "insert into books(name, authors, status, startDate, endDate, pages, totalPages, userId) values(@name, @authors, @status, @startDate, @endDate, @pages, @totalPages, @userId); select last_insert_rowid();";

            cmd.Parameters.AddWithValue("name", book.Name);
            cmd.Parameters.AddWithValue("authors", string.Join('|', book.Authors));
            cmd.Parameters.AddWithValue("status", book.Status);
            cmd.Parameters.AddWithValue("startDate", (object) book.StartDate ?? DBNull.Value);
            cmd.Parameters.AddWithValue("endDate", (object) book.EndDate ?? DBNull.Value);
            cmd.Parameters.AddWithValue("pages", (object)book.PagesRead ?? DBNull.Value);
            cmd.Parameters.AddWithValue("totalPages", (object)book.TotalPages ?? DBNull.Value);
            cmd.Parameters.AddWithValue("userId", book.UserId);

            var id = (long) await cmd.ExecuteScalarAsync();

            var result = new Book(book);
            result.Id = id;

            return result;
        }

        public async Task Update(IStorageBook book)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();
            
            cmd.CommandText = "update books set name = @name, " +
                "authors = @authors, " +
                "status = @status, " +
                "startDate = @startDate, " +
                "endDate = @endDate, " +
                "pages = @pages, " +
                "totalPages = @totalPages where id = @id;";

            cmd.Parameters.AddWithValue("id", book.Id);
            cmd.Parameters.AddWithValue("name", book.Name);
            cmd.Parameters.AddWithValue("authors", string.Join('|', book.Authors));
            cmd.Parameters.AddWithValue("status", book.Status);
            cmd.Parameters.AddWithValue("startDate", (object)book.StartDate ?? DBNull.Value);
            cmd.Parameters.AddWithValue("endDate", (object)book.EndDate ?? DBNull.Value);
            cmd.Parameters.AddWithValue("pages", (object)book.PagesRead ?? DBNull.Value);
            cmd.Parameters.AddWithValue("totalPages", (object)book.TotalPages ?? DBNull.Value);

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task Delete(long bookId)
        {
            using var connection = await this.GetConnection();

            var cmd = connection.CreateCommand();

            cmd.CommandText = "delete from books where id = @id";

            cmd.Parameters.AddWithValue("id", bookId);

            await cmd.ExecuteNonQueryAsync();
        }

        public static IBookRepository GetRepository(string connectionString)
        {
            return new BookRepository(connectionString);
        }
    }
}
