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
            Email = "321",
            PasswordHash = new SHA256Hasher().GetSHA256Hash("masterkey", "123"),
            LastAction = DateTime.Now
        };

        public static Book book = new Book
        {
            Name = "test",
            Authors = new string[] { "test1", "test2" },
            Status = Status.Done,
            UserId = 1,
            StartYear = 2020,
            StartMonth = 10,
            StartDay = 1,
            EndYear = 2021,
            EndMonth = 10,
            EndDay = 4,
            PagesRead = 10,
            TotalPages = 100
        };
    }
}
