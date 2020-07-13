using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SQLReader = Microsoft.Data.Sqlite.SqliteDataReader;

namespace Storage.Readers
{
    abstract class Reader<T> where T : class
    {
        private SQLReader reader;

        public Reader(SQLReader reader)
        {
            this.reader = reader;
        }

        public Reader()
        {
        }

        public async Task<T> ReadOne()
        {
            if (reader.HasRows)
            {
                await reader.ReadAsync();
                return this.GetModel(reader);
            }
            else return null;
        }

        public async Task<T[]> ReadAll()
        {
            var result = new List<T>();

            if (reader.HasRows)
            {
                while (await reader.ReadAsync())
                {
                    var model = this.GetModel(reader);

                    result.Add(model);
                }
            }

            return result.ToArray();
        }

        public T GetModel(SQLReader reader)
        {
            var countOfReadColumns = 0;
            return this.GetModel(reader, ref countOfReadColumns);
        }

        public T GetModel(SQLReader reader, ref int countOfReadColumns)
        {
            if (reader.IsDBNull(countOfReadColumns))
            {
                return null;
            }
            else return this.ParseModel(reader, ref countOfReadColumns);
        }


        protected abstract T ParseModel(SQLReader reader, ref int countOfReadColumns);
        
        protected string GetNullableString(SQLReader reader, ref int readCount)
        {
            var result = reader.IsDBNull(readCount) ? null : reader.GetString(readCount);
            readCount++;

            return result;
        }
        protected string GetString(SQLReader reader, ref int readCount)
        {
            var result = reader.GetString(readCount);
            readCount++;

            return result;
        }

        protected int GetInt32(SQLReader reader, ref int readCount)
        {
            var result = reader.GetInt32(readCount);
            readCount++;

            return result;
        }

        protected long GetInt64(SQLReader reader, ref int readCount)
        {
            var result = reader.GetInt64(readCount);
            readCount++;

            return result;
        }

        protected string[] GetStringArray(SQLReader reader, ref int readCount)
        {
            var result = reader.GetFieldValue<string[]>(readCount);
            readCount++;

            return result;
        }

        protected short? GetNullableInt16(SQLReader reader, ref int readCount)
        {
            var result = reader.IsDBNull(readCount) ? (short?)null : reader.GetInt16(readCount);
            readCount++;

            return result;
        }

        protected int? GetNullableInt32(SQLReader reader, ref int readCount)
        {
            var result = reader.IsDBNull(readCount) ? (int?)null : reader.GetInt32(readCount);
            readCount++;

            return result;
        }

        protected DateTime GetDateTime(SQLReader reader, ref int readCount)
        {
            var result = reader.GetDateTime(readCount);
            readCount++;

            return result;
        }
        protected DateTime? GetNullableDateTime(SQLReader reader, ref int readCount)
        {
            var result = reader.IsDBNull(readCount) ? (DateTime?)null : (DateTime?)reader.GetDateTime(readCount);
            readCount++;

            return result;
        }

        protected bool GetBoolean(SQLReader reader, ref int readCount)
        {
            var result = reader.GetBoolean(readCount);
            readCount++;

            return result;
        }
        protected bool? GetNullableBoolean(SQLReader reader, ref int readCount)
        {
            var result = reader.IsDBNull(readCount) ? (bool?)null : reader.GetBoolean(readCount);
            readCount++;

            return result;
        }
    }
}
