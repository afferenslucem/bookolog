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
        private Mock<ISignInService> signInServiceMock = new Mock<ISignInService>();
        private Mock<ISignOutService> signOutServiceMock = new Mock<ISignOutService>();
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
                signInServiceMock.Object,
                signOutServiceMock.Object
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
        public async Task SignInShouldRunAction()
        {
            signInServiceMock.Setup(m => m.SignInAsync(It.IsAny<HttpContext>(), It.IsAny<ClaimsPrincipal>()));
            
            await service.Object.SignInAsync(contextMock.Object, null, null, null);
            
            signInServiceMock.Verify(m => m.SignInAsync(It.IsAny<HttpContext>(), It.IsAny<ClaimsPrincipal>()), Times.Once());
        }

        [TestMethod]
        public async Task SignOutShouldRemoveTokensAndSession()
        {
            signOutServiceMock.Setup(m => m.SignOutAsync(It.IsAny<HttpContext>()));

            await service.Object.SignOutAsync(contextMock.Object, null, null);
            
            signOutServiceMock.Verify(m => m.SignOutAsync(It.IsAny<HttpContext>()), Times.Once());
        }
    }
}