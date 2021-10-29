using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using backend.v2.Authentication.Models;
using backend.v2.Authentication.Services;
using backend.v2.Exceptions.AuthenticationExceptions;
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
        private Mock<IUserSession> userSessionMock = new Mock<IUserSession>();
        private Mock<IUserService> userServiceMock = new Mock<IUserService>();
        private Mock<ISessionService> sessionServiceMock = new Mock<ISessionService>();
        private Mock<IJWTTokenService> tokenServiceMock = new Mock<IJWTTokenService>();
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
                userSessionMock.Object,
                userServiceMock.Object,
                sessionServiceMock.Object,
                tokenServiceMock.Object,
                jwtLoggerMock.Object
            );

            this.service.CallBase = true;
        }

        [TestMethod]
        public async Task AuthenticateByTokens_ShouldThrowsTokenExpired()
        {
            this.tokenServiceMock
                .Setup(tokenService => tokenService.AuthenticateByTokens(It.IsAny<string>()))
                .Throws(new AuthenticationException("Token expired", new TokenData() { SessionGuid = Guid.NewGuid()}));

            var result = await this.service.Object.AuthenticateByTokens("token");
            
            Assert.IsNotNull(result.Failure);
            Assert.AreEqual(result.Failure.Message, "Token expired");
        }

        [TestMethod]
        public async Task AuthenticateByTokens_ShouldThrowsSessionExpired()
        {
            var sessionGuid = Guid.NewGuid();
            
            this.tokenServiceMock
                .Setup(tokenService => tokenService.AuthenticateByTokens(It.IsAny<string>()))
                .Throws(new AuthenticationException("Session expired", new TokenData() { SessionGuid = sessionGuid }));

            this.sessionServiceMock.Setup(sessionService => sessionService.Delete(It.IsAny<Guid>()));

            var result = await this.service.Object.AuthenticateByTokens("token");
            
            Assert.IsNotNull(result.Failure);
            Assert.AreEqual(result.Failure.Message, "Session expired");

            this.sessionServiceMock
                .Verify(
                    sessionService => sessionService.Delete(It.Is<Guid>(val => val == sessionGuid)),
                    Times.Once
                );
        }

        [TestMethod]
        public async Task AuthenticateByTokens_ShouldReturnTicket()
        {
            var sessionGuid = Guid.NewGuid();
            
            this.tokenServiceMock
                .Setup(tokenService => tokenService.AuthenticateByTokens(It.IsAny<string>()))
                .Returns(new TokenData { Type = TokenType.Access, SessionGuid = sessionGuid });

            this.sessionServiceMock
                .Setup(sessionService => sessionService.Get(It.IsAny<Guid>()))
                .ReturnsAsync(new Session());

            var result = await this.service.Object.AuthenticateByTokens("token");
            
            Assert.IsNull(result.Failure);

            this.sessionServiceMock
                .Verify(
                    sessionService => sessionService.Get(It.Is<Guid>(val => val == sessionGuid)),
                    Times.Once
                );
        }

        [TestMethod]
        public async Task AuthenticateByTokens_ShouldReturnSessionError()
        {
            var sessionGuid = Guid.NewGuid();
            
            this.tokenServiceMock
                .Setup(tokenService => tokenService.AuthenticateByTokens(It.IsAny<string>()))
                .Returns(new TokenData { Type = TokenType.Access, SessionGuid = sessionGuid });

            this.sessionServiceMock.Setup(sessionService => sessionService.Get(It.IsAny<Guid>())).ReturnsAsync((Session)null);

            var result = await this.service.Object.AuthenticateByTokens("token");
            
            Assert.IsNotNull(result.Failure);
            Assert.AreEqual(result.Failure.Message, "Token error");
        }
    }
}