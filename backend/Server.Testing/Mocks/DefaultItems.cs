using Server.Models;
using Server.Utils;
using System;
using System.Collections.Generic;
using System.Text;

namespace Server.Testing.Mocks
{
    class DefaultItems
    {
        public static User user = new User
        {
            Login = "test",
            Password = "masterkey",
            Salt = "123",
            PasswordHash = new SHA256Hasher().GetSHA256Hash("masterkey", "123")
        };

        public static Book book = new Book
        {
            Name = "test",
            Authors = new string[] { "test1", "test2" },
            Status = Status.Done,
            UserId = 1,
            StartDate = DateTime.Now,
            EndDate = DateTime.Now,
            PagesRead = 10,
            TotalPages = 100
        };
    }
}
