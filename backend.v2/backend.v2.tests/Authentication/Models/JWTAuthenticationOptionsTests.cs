using System;
using backend.v2.Authentication.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace backend.v2.tests.Authentication.Models
{
    [TestClass]
    public class JWTAuthenticationOptionsTests
    {
        private JWTAuthenticationOptions model;
        
        [TestInitialize]
        public void BeforeEach()
        {
            this.model = new JWTAuthenticationOptions();
        }

        [TestMethod]
        public void ShouldCreate()
        {
            Assert.IsNotNull(model);
        }

        [TestMethod]
        public void ShouldSaveProps()
        {
            var guid = Guid.NewGuid();
            var access = DateTime.Now;
            var refresh = DateTime.Now;
            var token = "qwerty";

            model.Guid = guid;
            model.AccessExpired = access;
            model.RefreshExpired = refresh;
            model.TokenData = token;
            
            Assert.AreEqual(model.Guid, guid);
            Assert.AreEqual(model.AccessExpired, access);
            Assert.AreEqual(model.RefreshExpired, refresh);
            Assert.AreEqual(model.TokenData, token);
        }
    }
}