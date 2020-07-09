using Storage.Models;
using Reader = Microsoft.Data.Sqlite.SqliteDataReader;

namespace Storage.Readers
{
    class UserReader : Reader<User>
    {
        public UserReader(Reader reader) : base(reader)
        {
        }

        protected override User ParseModel(Reader reader, ref int countOfReadColumns)
        {
            var id = this.GetInt64(reader, ref countOfReadColumns);
            var login = this.GetString(reader, ref countOfReadColumns);
            var hash = this.GetString(reader, ref countOfReadColumns);
            var salt = this.GetString(reader, ref countOfReadColumns);

            return new User
            {
                Id = id,
                Login = login,
                PasswordHash = hash,
                Salt = salt,
            };
        }
    }
}
