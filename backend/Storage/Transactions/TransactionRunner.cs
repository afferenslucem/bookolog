using log4net;
using Connection = Npgsql.NpgsqlConnection;
using Storage.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Storage.Repositories
{
    public interface ITransactionRunner
    {
        Task Commit(Func<Connection, Task> func);
        Task<T> Commit<T>(Func<Connection, Task<T>> func);
    }

    public class TransactionRunner : Repository, ITransactionRunner
    {
        ILog logger = LogManager.GetLogger(typeof(TransactionRunner));
        protected TransactionRunner(string connectionString) : base(connectionString)
        {
        }

        public async Task Commit(Func<Connection, Task> func)
        {
            using var connection = await this.GetConnection();

            using var transaction = await connection.BeginTransactionAsync();

            try
            {
                await func(connection);

                this.logger.Info("Committing transaction");
                await transaction.CommitAsync();
            }
            catch (StorageException ex)
            {
                await transaction.RollbackAsync();
                this.logger.Error("Rollback transaction");

                throw;
            }
        }

        public async Task<T> Commit<T>(Func<Connection, Task<T>> func)
        {
            using var connection = await this.GetConnection();

            using var transaction = await connection.BeginTransactionAsync();

            try
            {
                var result = await func(connection);

                this.logger.Info("Committing transaction");
                await transaction.CommitAsync();

                return result;
            }
            catch (StorageException)
            {
                await transaction.RollbackAsync();
                this.logger.Error("Rollback transaction");
                throw;
            }
        }

        public static ITransactionRunner GetRunner(string connectionString)
        {
            return new TransactionRunner(connectionString);
        }
    }
}
