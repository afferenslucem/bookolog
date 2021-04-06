using System;
using System.Collections;
using System.Collections.Generic;
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
        public void ShouldDeleteTokensOnRefreshExpired()
        {
            service.Setup(m => m.DeleteTokens());
            
            service.Object.OnRefreshExpired();
            
            service.Verify(m => m.DeleteTokens(), Times.Once());
        }
        
        [TestMethod]
        public void ShouldRenewTokensOnAccessExpired()
        {
            service
                .Setup(m => m.GetAccessToken(It.IsAny<TokenData>()))
                .Returns("Access");
            service
                .Setup(m => m.GetRefreshToken(It.IsAny<TokenData>()))
                .Returns("Refresh");
            service
                .Setup(m => m.RenewTokens(It.IsAny<string>(), It.IsAny<string>()));
            
            service.Object.OnAccessExpired(It.IsAny<TokenData>());

            service
                .Verify(m => m.GetAccessToken(It.IsAny<TokenData>()), Times.Once());
            service
                .Verify(m => m.GetRefreshToken(It.IsAny<TokenData>()), Times.Once());
            
            service
                .Verify(m => m.RenewTokens(It.Is<string>(v => v == "Access"), It.Is<string>(v => v == "Refresh")), Times.Once());
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
        public void RenewShouldAppendTokens()
        {
            service
                .Setup(m => m.AppendTokens(It.IsAny<string>(), It.IsAny<string>()));

            service.Object.RenewTokens("Access", "Refresh");
            
            service.Verify(m => m.AppendTokens(
                It.Is<string>(v => v == "Access"),
                It.Is<string>(v => v == "Refresh")));
        }
        
        [TestMethod]
        public async Task ShouldReturnNoResultForOldTokens()
        {
            tokenManagerMock 
                .Setup(m => m.DecodeToken(It.IsAny<string>())).Returns(new TokenData()
                {
                    ValidityDate = new DateTime(2021, 2, 26, 4, 4, 0, DateTimeKind.Utc)
                });

            clockMock.SetupGet(m => m.UtcNow).Returns(new DateTimeOffset(2021, 2, 26, 4, 5, 0, new TimeSpan(0)));

            service.Setup(m => m.OnRefreshExpired());
            service.Setup(m => m.OnAccessExpired(It.IsAny<TokenData>()));
            service.Setup(m => m.CopyTokens());

            var result = await service.Object.AuthenticateByTokens(null, null);
            
            tokenManagerMock.Verify(m => m.DecodeToken(It.IsAny<string>()), Times.Once());
            clockMock.VerifyGet(m => m.UtcNow, Times.Once());
            service.Verify(m => m.OnRefreshExpired(), Times.Once());
            service.Verify(m => m.CopyTokens(), Times.Never());
            service.Verify(m => m.OnAccessExpired(It.IsAny<TokenData>()), Times.Never());
            
            Assert.AreEqual(result.None, true);
        }
        
        [TestMethod]
        public async Task ShouldRenewTokensForOldTokens()
        {
            tokenManagerMock 
                .Setup(m => m.DecodeToken(It.IsAny<string>()))
                .Returns(
                    new Queue<TokenData>(new TokenData[] {
                        new TokenData()
                        {
                            ValidityDate = new DateTime(2021, 2, 26, 4, 6, 0, DateTimeKind.Utc)
                        },
                        new TokenData()
                        {
                            ValidityDate = new DateTime(2021, 2, 26, 4, 4, 0, DateTimeKind.Utc)
                        }
                    }).Dequeue
                );

            clockMock.SetupGet(m => m.UtcNow).Returns(
                new DateTimeOffset(2021, 2, 26, 4, 5, 0, new TimeSpan(0))
            );

            service.Setup(m => m.OnRefreshExpired());
            service.Setup(m => m.OnAccessExpired(It.IsAny<TokenData>()));
            service.Setup(m => m.CopyTokens());

            var result = await service.Object.AuthenticateByTokens(null, null);
            
            tokenManagerMock.Verify(m => m.DecodeToken(It.IsAny<string>()), Times.Exactly(2));
            clockMock.VerifyGet(m => m.UtcNow, Times.Exactly(2));
            service.Verify(m => m.OnRefreshExpired(), Times.Never());
            service.Verify(m => m.CopyTokens(), Times.Never());
            service.Verify(m => m.OnAccessExpired(It.IsAny<TokenData>()), Times.Once());
            
            Assert.AreEqual(result.None, false);
        }
        
        [TestMethod]
        public async Task ShouldNotRenewForValidTokens()
        {
            tokenManagerMock 
                .Setup(m => m.DecodeToken(It.IsAny<string>()))
                .Returns(
                    new Queue<TokenData>(new TokenData[] {
                        new TokenData()
                        {
                            ValidityDate = new DateTime(2021, 2, 26, 4, 7, 0, DateTimeKind.Utc)
                        },
                        new TokenData()
                        {
                            ValidityDate = new DateTime(2021, 2, 26, 4, 6, 0, DateTimeKind.Utc)
                        }
                    }).Dequeue
                );

            clockMock.SetupGet(m => m.UtcNow).Returns(
                new DateTimeOffset(2021, 2, 26, 4, 5, 0, new TimeSpan(0))
            );

            service.Setup(m => m.OnRefreshExpired());
            service.Setup(m => m.OnAccessExpired(It.IsAny<TokenData>()));
            service.Setup(m => m.CopyTokens());

            var result = await service.Object.AuthenticateByTokens(null, null);
            
            tokenManagerMock.Verify(m => m.DecodeToken(It.IsAny<string>()), Times.Exactly(2));
            clockMock.VerifyGet(m => m.UtcNow, Times.Exactly(2));
            service.Verify(m => m.OnRefreshExpired(), Times.Never());
            service.Verify(m => m.CopyTokens(), Times.Once());
            service.Verify(m => m.OnAccessExpired(It.IsAny<TokenData>()), Times.Never());
            
            Assert.AreEqual(result.None, false);
        }
        
        [TestMethod]
        public async Task ShouldThrowErrorForLostSession()
        {
            tokenManagerMock 
                .Setup(m => m.DecodeToken(It.IsAny<string>()))
                .Returns(
                    new Queue<TokenData>(new TokenData[] {
                        new TokenData()
                        {
                            ValidityDate = new DateTime(2021, 2, 26, 4, 7, 0, DateTimeKind.Utc)
                        },
                        new TokenData()
                        {
                            ValidityDate = new DateTime(2021, 2, 26, 4, 6, 0, DateTimeKind.Utc)
                        }
                    }).Dequeue
                );

            clockMock.SetupGet(m => m.UtcNow).Returns(
                new DateTimeOffset(2021, 2, 26, 4, 5, 0, new TimeSpan(0))
            );

            sessionServiceMock.Setup(m => m.Get(It.IsAny<Guid>())).ReturnsAsync((Session)null);
            service.Setup(m => m.OnRefreshExpired());
            service.Setup(m => m.OnAccessExpired(It.IsAny<TokenData>()));
            service.Setup(m => m.CopyTokens());

            var result = await service.Object.AuthenticateByTokens(null, null);
            
            tokenManagerMock.Verify(m => m.DecodeToken(It.IsAny<string>()), Times.Exactly(2));
            clockMock.VerifyGet(m => m.UtcNow, Times.Exactly(2));
            service.Verify(m => m.OnRefreshExpired(), Times.Never());
            service.Verify(m => m.CopyTokens(), Times.Once());
            service.Verify(m => m.OnAccessExpired(It.IsAny<TokenData>()), Times.Never());
            
            Assert.IsTrue(result.Failure != null);
        }
    }
}