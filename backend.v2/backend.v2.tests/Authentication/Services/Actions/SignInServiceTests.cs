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
        private Mock<IJWTTokenService> tokenServiceMock = new Mock<IJWTTokenService>();
        private Mock<ISessionService> sessionServiceMock = new Mock<ISessionService>();
        private Mock<IUserSession> userSessionMock = new Mock<IUserSession>();
        private Mock<ILogger<SignInService>> loggerMock = new Mock<ILogger<SignInService>>();

        private ClaimsPrincipal principal = null;
        private int userId = -1;
        
        [TestInitialize]
        public void BeforeEach()
        {
            tokenServiceMock.CallBase = true;
            
            this.service = new Mock<SignInService>(
                MockBehavior.Default,
                tokenServiceMock.Object,
                sessionServiceMock.Object,
                userSessionMock.Object,
                loggerMock.Object
            );
            
            this.service.CallBase = true;

            this.userId = 42;
            this.principal = new ClaimsPrincipal();
            principal.AddIdentity(new ClaimsIdentity(new [] { new Claim(ClaimTypes.NameIdentifier, this.userId.ToString()) }));
        }
        
        [TestMethod]
        public async Task SignIn_ShouldAppendTokens()
        {
            tokenServiceMock.Setup(service => service.AppendTokens(It.IsAny<string>(), It.IsAny<string>()));

            await this.service.Object.SignInAsync(this.principal);
            
            this.tokenServiceMock.Verify(service => service.AppendTokens(It.IsAny<string>(), It.IsAny<string>()), Times.Once);
        }
        
        [TestMethod]
        public async Task SignIn_ShouldCreateSession()
        {
            sessionServiceMock.Setup(service => service.Save(It.IsAny<Session>()));

            await this.service.Object.SignInAsync(this.principal);
            
            this.sessionServiceMock.Verify(service => service.Save(It.IsAny<Session>()), Times.Once);
        }
    }
}