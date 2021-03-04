using System;
using backend.v2.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace backend.v2.tests.Models
{
    [TestClass]
    public class UserTests
    {
        private User model;
        
        [TestInitialize]
        public void BeforeEach()
        {
            this.model = new User();
        }

        [TestMethod]
        public void ShouldCreate()
        {
            Assert.IsNotNull(model);
        }

        [TestMethod]
        public void ShouldSaveProperties()
        {
            var id = 1;
            var login = "hrodvitnir";
            var email = "alexshakirov74@gmail.com";
            var hash = "hash";
            var password = "password";
            var lastSyncTime = new DateTime(2021, 3, 1, 16, 43, 40);
            var salt = "salt";
            var avatarId = 1;
            var avatarName = "name";


            model.Id = id;
            model.Login = login;
            model.Email = email;
            model.PasswordHash = hash;
            model.Password = password;
            model.LastSyncTime = lastSyncTime;
            model.Salt = salt;
            model.AvatarId = avatarId;
            model.AvatarName = avatarName;
            
            Assert.AreEqual(model.Id, id);
            Assert.AreEqual(model.Login, login);
            Assert.AreEqual(model.Email, email);
            Assert.AreEqual(model.PasswordHash, hash);
            Assert.AreEqual(model.Password, password);
            Assert.AreEqual(model.LastSyncTime, lastSyncTime);
            Assert.AreEqual(model.Salt, salt);
            Assert.AreEqual(model.AvatarId, avatarId);
            Assert.AreEqual(model.AvatarName, avatarName);
        }

        [TestMethod]
        public void ShouldGiveWithoutPrivate()
        {
            var id = 1;
            var login = "hrodvitnir";
            var email = "alexshakirov74@gmail.com";
            var hash = "hash";
            var password = "password";
            var lastSyncTime = new DateTime(2021, 3, 1, 16, 43, 40);
            var salt = "salt";
            var avatarId = 1;
            var avatarName = "name";


            model.Id = id;
            model.Login = login;
            model.Email = email;
            model.PasswordHash = hash;
            model.Password = password;
            model.LastSyncTime = lastSyncTime;
            model.Salt = salt;
            model.AvatarId = avatarId;
            model.AvatarName = avatarName;

            var publicModel = model.WithoutPrivate();
            
            Assert.AreEqual(publicModel.PasswordHash, null);
            Assert.AreEqual(publicModel.Password, null);
            Assert.AreEqual(publicModel.Salt, null);
            Assert.AreEqual(publicModel.AvatarId, null);
        }
    }
}