using Microsoft.Data.Sqlite;
using Storage.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Storage.Repositories
{
    public class Repository
    {
        private SqliteConnectionStringBuilder builder;

        protected Repository(string connectionString)
        {
            this.builder = new SqliteConnectionStringBuilder(connectionString);
        }


        public async Task<SqliteConnection> GetConnection()
        {
            try
            {
                var result = new SqliteConnection(this.builder.ConnectionString);
                await result.OpenAsync();

                return result;
            }
            catch (SqliteException e)
            {
                throw new StorageConnectionException("Could not connect to storage", e);
            }
        }
    }
}
