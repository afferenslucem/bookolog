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
            DoneUnits = 100,
            TotalUnits = 450,
            Genge = "Fantastic",
            StartDate = DateTime.Now,
            EndDate = DateTime.Now.AddDays(1),
            ModifyDate = DateTime.Now.AddDays(2),
            Note = "note",
            Guid = "csdcsdvdfvsdbsdfb sfgdvbsfd",
            Tags = new string[] { "tag1" },
            Type = Server.Models.Type.Audio,
            Year = 2018
        };
    }
}
