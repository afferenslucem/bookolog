using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using backend.v2.Authentication.Models;
using backend.v2.Authentication.Services;
using backend.v2.Authentication.Services.Actions;
using backend.v2.Models;
using backend.v2.Models.Authentication;
using backend.v2.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Moq.Protected;

namespace backend.v2.tests.Authentication.Services.Actions
{
    [TestClass]
    public class SignInServiceTests
    {
        private Mock<SignInService> service;
        private Mock<IJWTTokenManager> tokenManagerMock = new Mock<IJWTTokenManager>();
        private Mock<ISessionService> sessionServiceMock = new Mock<ISessionService>();
        private Mock<IUserSession> userSessionMock = new Mock<IUserSession>();
        private Mock<ILogger<SignInService>> loggerMock = new Mock<ILogger<SignInService>>();
        private Mock<HttpContext> contextMock = new Mock<HttpContext>();
        
        [TestInitialize]
        public void BeforeEach()
        {
            this.service = new Mock<SignInService>(
                MockBehavior.Default,
                tokenManagerMock.Object,
                sessionServiceMock.Object,
                userSessionMock.Object,
                loggerMock.Object
            );

            this.service.CallBase = true;
        }
        

        [TestMethod]
        public async Task SignInShouldRunSetTokens()
        {
            service.Setup(m => m.SetTokens(It.IsAny<HttpContext>(), It.IsAny<ClaimsPrincipal>()));
            service.Setup(m => m.CreateSession(It.IsAny<ISessionService>(), It.IsAny<ClaimsPrincipal>())).ReturnsAsync(It.IsAny<Session>());

            await service.Object.SignInAsync(contextMock.Object, null);
            
            service.Verify(m => m.SetTokens(It.IsAny<HttpContext>(), It.IsAny<ClaimsPrincipal>()), Times.Once());
            service.Verify(m => m.CreateSession(It.IsAny<ISessionService>(), It.IsAny<ClaimsPrincipal>()), Times.Once());
        }

        [TestMethod]
        public void GetAccessTokenShouldGenerateAccessToken()
        {
            var data = new Mock<TokenData>();

            data.SetupSet(m => m.ValidityDate = It.IsAny<DateTime>());
            tokenManagerMock.Setup(m => m.EncodeToken(It.IsAny<TokenData>())).Returns("Access");
            tokenManagerMock.SetupGet(m => m.NextAccessTime).Returns(new DateTime(2021, 2, 27, 1, 59, 0));

            var result = service.Object.GetAccessToken(data.Object);
            
            data.VerifySet(m => m.ValidityDate = It.Is<DateTime>(v => v == new DateTime(2021, 2, 27, 1, 59, 0)), Times.Once());
            tokenManagerMock.Verify(m => m.EncodeToken(It.IsAny<TokenData>()), Times.Once());
            tokenManagerMock.VerifyGet(m => m.NextAccessTime, Times.Once());
            
            Assert.AreEqual(result, "Access");
        }

        [TestMethod]
        public void GetRefreshTokenShouldGenerateRefreshToken()
        {
            var data = new Mock<TokenData>();

            data.SetupSet(m => m.ValidityDate = It.IsAny<DateTime>());
            tokenManagerMock.Setup(m => m.EncodeToken(It.IsAny<TokenData>())).Returns("Refresh");
            tokenManagerMock.SetupGet(m => m.NextRefreshTime).Returns(new DateTime(2021, 2, 27, 1, 59, 0));

            var result = service.Object.GetRefreshToken(data.Object);
            
            data.VerifySet(m => m.ValidityDate = It.Is<DateTime>(v => v == new DateTime(2021, 2, 27, 1, 59, 0)), Times.Once());
            tokenManagerMock.Verify(m => m.EncodeToken(It.IsAny<TokenData>()), Times.Once());
            tokenManagerMock.VerifyGet(m => m.NextRefreshTime, Times.Once());
            
            Assert.AreEqual(result, "Refresh");
        }
    }
}