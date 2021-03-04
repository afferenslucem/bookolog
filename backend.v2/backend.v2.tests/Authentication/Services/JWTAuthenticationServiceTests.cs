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
    public class JWTAuthenticationServiceTests
    {
        private Mock<JWTAuthenticationService> service;
        private Mock<IAuthenticationSchemeProvider> schemesMock = new Mock<IAuthenticationSchemeProvider>();
        private Mock<IAuthenticationHandlerProvider> handlersMock = new Mock<IAuthenticationHandlerProvider>();
        private Mock<IClaimsTransformation> transformMock = new Mock<IClaimsTransformation>();
        private Mock<IOptions<AuthenticationOptions> > optionsMock = new Mock<IOptions<AuthenticationOptions> >();
        private Mock<IJWTTokenManager> tokenManagerMock = new Mock<IJWTTokenManager>();
        private Mock<ISessionService> sessionServiceMock = new Mock<ISessionService>();
        private Mock<ILogger<JWTAuthenticationService>> loggerMock = new Mock<ILogger<JWTAuthenticationService>>();
        private Mock<HttpContext> contextMock = new Mock<HttpContext>();
        
        [TestInitialize]
        public void BeforeEach()
        {
            this.service = new Mock<JWTAuthenticationService>(
                MockBehavior.Default,
                schemesMock.Object,
                handlersMock.Object,
                transformMock.Object,
                optionsMock.Object,
                tokenManagerMock.Object,
                sessionServiceMock.Object,
                loggerMock.Object
            );

            this.service.CallBase = true;
        }

        [TestMethod]
        public async Task ChallengeAsyncShouldCheckCode()
        {
            contextMock.SetupGet(m => m.Response.StatusCode).Returns(409);

            await service.Object.ChallengeAsync(contextMock.Object, null, null);
            
            contextMock.VerifyGet(m => m.Response.StatusCode, Times.Once());
        }

        [TestMethod]
        public async Task ForbidAsyncShouldSet403Code()
        {
            contextMock.SetupSet(m => m.Response.StatusCode = It.IsAny<int>());

            await service.Object.ForbidAsync(contextMock.Object, null, null);
            
            contextMock.VerifySet(m => m.Response.StatusCode = It.Is<int>(v => v == 403), Times.Once());
        }

        [TestMethod]
        public async Task SignInShouldRunSetTokens()
        {
            service.Setup(m => m.SetTokens(It.IsAny<HttpContext>(), It.IsAny<ClaimsPrincipal>()));

            await service.Object.SignInAsync(contextMock.Object, null, null, null);
            
            service.Verify(m => m.SetTokens(It.IsAny<HttpContext>(), It.IsAny<ClaimsPrincipal>()), Times.Once());
        }

        [TestMethod]
        public async Task SignOutShouldRemoveTokensAndSession()
        {
            service.Setup(m => m.RemoveTokens(It.IsAny<HttpContext>()));
            service.Setup(m => m.RemoveSession(It.IsAny<HttpContext>()));

            await service.Object.SignOutAsync(contextMock.Object, null, null);
            
            service.Verify(m => m.RemoveTokens(It.IsAny<HttpContext>()), Times.Once());
            service.Verify(m => m.RemoveSession(It.IsAny<HttpContext>()), Times.Once());
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