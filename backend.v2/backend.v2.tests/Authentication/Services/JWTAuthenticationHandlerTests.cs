using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using backend.v2.Authentication.Models;
using backend.v2.Authentication.Services;
using backend.v2.Models;
using backend.v2.Models.Authentication;
using backend.v2.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Moq.Protected;

namespace backend.v2.tests.Authentication.Services
{
    [TestClass]
    public class JWTAuthenticationHandlerTests
    {
        private Mock<JWTAuthenticationHandler> service;
        private Mock<IOptionsMonitor<JWTAuthenticationOptions>> optionsMock = new Mock<IOptionsMonitor<JWTAuthenticationOptions>>();
        private Mock<ILoggerFactory> loggerMock = new Mock<ILoggerFactory>();
        private Mock<UrlEncoder> encoderMock = new Mock<UrlEncoder>();
        private Mock<ISystemClock> clockMock = new Mock<ISystemClock>();
        private Mock<IAuthenticationService> authenticationServiceMock = new Mock<IAuthenticationService>();
        private Mock<IUserSession> userSessionMock = new Mock<IUserSession>();
        private Mock<IUserService> userServiceMock = new Mock<IUserService>();
        private Mock<ISessionService> sessionServiceMock = new Mock<ISessionService>();
        private Mock<IJWTTokenManager> tokenManagerMock = new Mock<IJWTTokenManager>();
        private Mock<ILogger<JWTAuthenticationService>> jwtLoggerMock = new Mock<ILogger<JWTAuthenticationService>>();
        
        [TestInitialize]
        public void BeforeEach()
        {
            this.service = new Mock<JWTAuthenticationHandler>(
                MockBehavior.Default,
                optionsMock.Object,
                loggerMock.Object,
                encoderMock.Object,
                clockMock.Object,
                authenticationServiceMock.Object,
                userSessionMock.Object,
                userServiceMock.Object,
                sessionServiceMock.Object,
                tokenManagerMock.Object,
                jwtLoggerMock.Object
            );

            this.service.CallBase = true;
        }
        
        [TestMethod]
        public async Task AuthenticateShouldSetUser()
        {
            var user = new User();
            
            userSessionMock.SetupSet(m => m.User = It.IsAny<User>());

            userServiceMock.Setup(m => m.GetById(It.IsAny<long>())).ReturnsAsync(user);

            await service.Object.Authenticate(new TokenData
            {
                UserId = 1,
            });

            userServiceMock.Verify(m => m.GetById(It.Is<long>(v => v == 1)), Times.Once());
            userSessionMock.VerifySet(m => m.User = user, Times.Once());
        }
        
        [TestMethod]
        public async Task AuthenticateByTokensShouldReturnFailForOldAccess()
        {
            tokenManagerMock 
                .Setup(m => m.DecodeToken(It.IsAny<string>())).Returns(new TokenData()
                {
                    ValidityDate = new DateTime(2021, 2, 26, 4, 4, 0, DateTimeKind.Utc),
                    Type = TokenType.Access,
                });

            clockMock.SetupGet(m => m.UtcNow).Returns(new DateTimeOffset(2021, 2, 26, 4, 5, 0, new TimeSpan(0)));

            service.Setup(s => s.DeleteSession(It.IsAny<Guid>()));

            var result = await this.service.Object.AuthenticateByTokens("token");
            
            Assert.IsNotNull(result.Failure);
            Assert.AreEqual(result.Failure.Message, "Token expired");
            service.Verify(s => s.DeleteSession(It.IsAny<Guid>()), Times.Never);
        }
        
        [TestMethod]
        public async Task AuthenticateByTokensShouldReturnDeleteSessionForOldRefresh()
        {
            var guid = Guid.NewGuid();
            tokenManagerMock 
                .Setup(m => m.DecodeToken(It.IsAny<string>())).Returns(new TokenData()
                {
                    ValidityDate = new DateTime(2021, 2, 26, 4, 4, 0, DateTimeKind.Utc),
                    Type = TokenType.Refresh,
                    SessionGuid = guid,
                });

            clockMock.SetupGet(m => m.UtcNow).Returns(new DateTimeOffset(2021, 2, 26, 4, 5, 0, new TimeSpan(0)));

            service.Setup(s => s.DeleteSession(It.IsAny<Guid>()));

            var result = await this.service.Object.AuthenticateByTokens("token");
            
            Assert.IsNotNull(result.Failure);
            Assert.AreEqual(result.Failure.Message, "Token expired");
            service.Verify(s => s.DeleteSession(guid), Times.Once);
        }
        
        [TestMethod]
        public async Task AuthenticateByTokensShouldRenewTokensForValidRefresh()
        {
            var tokenData = new TokenData()
            {
                ValidityDate = new DateTime(2021, 2, 26, 4, 5, 0, DateTimeKind.Utc),
                Type = TokenType.Refresh,
                SessionGuid = Guid.NewGuid(),
            };

            service.CallBase = false;
            
            tokenManagerMock.Setup(m => m.DecodeToken(It.IsAny<string>())).Returns(tokenData);
            clockMock.SetupGet(m => m.UtcNow).Returns(new DateTimeOffset(2021, 2, 26, 4, 5, 0, new TimeSpan(0)));
            service.Setup(s => s.Authenticate(It.IsAny<TokenData>())).ReturnsAsync(new AuthenticationTicket(new ClaimsPrincipal(), null));
            service.Setup(s => s.CheckSession(It.IsAny<Guid>()));
            
            service.Setup(s => s.GetAccessToken(It.IsAny<TokenData>())).Returns("access");
            service.Setup(s => s.GetRefreshToken(It.IsAny<TokenData>())).Returns("refresh");
            service.Setup(s => s.AppendTokens(It.IsAny<string>(), It.IsAny<string>()));

            var result = await this.service.Object.AuthenticateByTokens("token");
            
            Assert.IsNull(result.Failure);
            service.Verify(s => s.GetAccessToken(tokenData), Times.Once);
            service.Verify(s => s.GetRefreshToken(tokenData), Times.Once);
            service.Verify(s => s.AppendTokens("access", "refresh"), Times.Once);
        }
    }
}