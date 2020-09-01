using Npgsql;
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
        private NpgsqlConnectionStringBuilder builder;

        protected Repository(string connectionString)
        {
            this.builder = new NpgsqlConnectionStringBuilder(connectionString);
        }


        public async Task<NpgsqlConnection> GetConnection()
        {
            try
            {
                var result = new NpgsqlConnection(this.builder.ConnectionString);
                await result.OpenAsync();

                return result;
            }
            catch (NpgsqlException e)
            {
                throw new StorageConnectionException("Could not connect to storage", e);
            }
        }
    }
}
