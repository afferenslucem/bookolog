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
    public class SignOutServiceTests
    {
        private Mock<SignOutService> service;
        private Mock<ISessionService> sessionServiceMock = new Mock<ISessionService>();
        private Mock<ILogger<SignOutService>> loggerMock = new Mock<ILogger<SignOutService>>();
        private Mock<HttpContext> contextMock = new Mock<HttpContext>();
        
        [TestInitialize]
        public void BeforeEach()
        {
            this.service = new Mock<SignOutService>(
                MockBehavior.Default,
                sessionServiceMock.Object,
                loggerMock.Object
            );

            this.service.CallBase = true;
        }

        [TestMethod]
        public async Task SignOutShouldRemoveTokensAndSession()
        {
            service.Setup(m => m.RemoveTokens(It.IsAny<HttpContext>()));
            service.Setup(m => m.RemoveSession(It.IsAny<HttpContext>()));

            await service.Object.SignOutAsync(contextMock.Object);
            
            service.Verify(m => m.RemoveTokens(It.IsAny<HttpContext>()), Times.Once());
            service.Verify(m => m.RemoveSession(It.IsAny<HttpContext>()), Times.Once());
        }
    }
}