using System;
using System.Threading.Tasks;
using backend.v2.Authentication.Models;
using backend.v2.Authentication.Services;
using backend.v2.Exceptions.AuthenticationExceptions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace backend.v2.tests.Authentication.Services
{
    [TestClass]
    public class JWTTokenServiceTests
    {
        private Mock<IJWTTokenManager> tokenManagerMock = new Mock<IJWTTokenManager>();
        private Mock<ISystemClock> clockMock = new Mock<ISystemClock>();
        private Mock<IHttpContextAccessor> contextAccessorMock = new Mock<IHttpContextAccessor>();

        private Mock<JWTTokenService> service;
        
        [TestInitialize]
        public void BeforeEach()
        {
            this.service = new Mock<JWTTokenService>(
                MockBehavior.Default,
                this.tokenManagerMock.Object,
                this.clockMock.Object,
                this.contextAccessorMock.Object
            );

            this.service.CallBase = true;
        }
        

        [TestMethod]
        public void AuthenticateByTokens_ShouldThrowsTokenExpired()
        {
            this.tokenManagerMock
                .Setup(manager => manager.DecodeToken(It.IsAny<string>()))
                .Returns(new TokenData
                {
                    Type = TokenType.Access,
                    SessionGuid = Guid.NewGuid(),
                    UserId = 2,
                    ValidityDate = new DateTime(2021, 10, 26, 17, 24, 00),
                });

            this.clockMock.SetupGet(clock => clock.UtcNow).Returns(new DateTime(2021, 10, 26, 17, 24, 10));

            var exception = Assert.ThrowsException<AuthenticationException>(() =>
            {
                this.service.Object.AuthenticateByTokens("access token");
            });

            Assert.AreEqual(exception.Message, "Token expired");
        }
        
        [TestMethod]
        public void AuthenticateByTokens_ShouldThrowsSessionExpired()
        {
            this.tokenManagerMock
                .Setup(manager => manager.DecodeToken(It.IsAny<string>()))
                .Returns(new TokenData
                {
                    Type = TokenType.Refresh,
                    SessionGuid = Guid.NewGuid(),
                    UserId = 2,
                    ValidityDate = new DateTime(2021, 10, 26, 17, 24, 00),
                });

            this.clockMock.SetupGet(clock => clock.UtcNow).Returns(new DateTime(2021, 10, 26, 17, 24, 10));

            var exception = Assert.ThrowsException<AuthenticationException>(() =>
            {
                this.service.Object.AuthenticateByTokens("access token");
            });

            Assert.AreEqual(exception.Message, "Session expired");
        }
        
        [TestMethod]
        public void AuthenticateByTokens_ShouldAppendNewTokens()
        {
            this.tokenManagerMock
                .Setup(manager => manager.DecodeToken(It.IsAny<string>()))
                .Returns(new TokenData
                {
                    Type = TokenType.Refresh,
                    SessionGuid = Guid.NewGuid(),
                    UserId = 2,
                    ValidityDate = new DateTime(2021, 10, 26, 17, 24, 40),
                });

            this.clockMock.SetupGet(clock => clock.UtcNow).Returns(new DateTime(2021, 10, 26, 17, 24, 10));

            this.service
                .Setup(serv => serv.AppendTokens(It.IsAny<string>(), It.IsAny<string>()));
            
            var token = this.service.Object.AuthenticateByTokens("access token");
            
            this.service
                .Verify(
                    serv => serv.AppendTokens(It.IsAny<string>(), It.IsAny<string>()),
                    Times.Once
                );
            
            Assert.IsNotNull(token);
        }
        
        [TestMethod]
        public void AuthenticateByTokens_ShouldReturnTokenData()
        {
            this.tokenManagerMock
                .Setup(manager => manager.DecodeToken(It.IsAny<string>()))
                .Returns(new TokenData
                {
                    Type = TokenType.Access,
                    SessionGuid = Guid.NewGuid(),
                    UserId = 2,
                    ValidityDate = new DateTime(2021, 10, 26, 17, 24, 40),
                });

            this.clockMock.SetupGet(clock => clock.UtcNow).Returns(new DateTime(2021, 10, 26, 17, 24, 10));

            this.service
                .Setup(serv => serv.AppendTokens(It.IsAny<string>(), It.IsAny<string>()));
            
            var token = this.service.Object.AuthenticateByTokens("access token");
            
            this.service
                .Verify(
                    serv => serv.AppendTokens(It.IsAny<string>(), It.IsAny<string>()),
                    Times.Never
                );
            
            Assert.IsNotNull(token);
        }
    }
}