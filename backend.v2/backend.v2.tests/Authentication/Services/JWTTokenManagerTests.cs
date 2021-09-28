using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using backend.v2.Authentication.Models;
using backend.v2.Authentication.Services;
using backend.v2.Models;
using backend.v2.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Moq.Protected;

namespace backend.v2.tests.Authentication.Services
{
    [TestClass]
    public class JWTTokenManagerTests
    {
        private Mock<JWTTokenManager> manager;
        
        [TestInitialize]
        public void BeforeEach()
        {
            Config.SessionChiper.Key = "Up3dIK78cXz23LrLjyMP+w==";
            Config.SessionChiper.Salt = "Up3dIK78cXz23LrLjyMP+w==";
            
            this.manager = new Mock<JWTTokenManager>();

            this.manager.CallBase = true;
        }

        [TestMethod]
        public void ShouldConcatParameters()
        {
            var validityDate = new DateTime(2021, 2, 27, 2, 28, 0);
            var data = new TokenData()
            {
                SessionGuid = Guid.Empty,
                UserId = 2,
                ValidityDate = validityDate,
                Type = TokenType.Refresh
            };

            var result = manager.Object.ConcatParameters(data);
            
            Assert.AreEqual(result, $"00000000-0000-0000-0000-000000000000;2;{validityDate.ToString("o")};1");
        }

        [TestMethod]
        public void ShouldParseParameters()
        {
            var validityDate = new DateTime(2021, 2, 27, 2, 28, 0);
            var tokenStr = $"00000000-0000-0000-0000-000000000000;2;{validityDate};1";
            var data = manager.Object.ParseParameters(tokenStr);
            
            Assert.AreEqual(data.SessionGuid, Guid.Empty);
            Assert.AreEqual(data.UserId, 2);
            Assert.AreEqual(data.ValidityDate, validityDate);
            Assert.AreEqual(data.Type, TokenType.Refresh);
        }
    }
}