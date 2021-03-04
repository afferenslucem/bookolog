using System;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.v2.Configuration.Middlewares;
using backend.v2.Models.Authentication;
using backend.v2.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace backend.v2.tests.Authentication.Services
{
    [TestClass]
    public class SessionMiddlewareTests
    {
        private Mock<SessionMiddleware> middlewareMock;
        private Mock<RequestDelegate> @delegateMock;
        private Mock<HttpContext> contextMock;
        private Mock<ISessionService> sessionServiceMock;
        private Mock<IUserSession> userSessionMock;
        private Mock<ILogger<SessionMiddleware>> loggerMock;
        
        [TestInitialize]
        public void BeforeEach()
        {
            @delegateMock = new Mock<RequestDelegate>();
            middlewareMock = new Mock<SessionMiddleware>(MockBehavior.Default, @delegateMock.Object);
            middlewareMock.CallBase = true;
            contextMock = new Mock<HttpContext>();
            sessionServiceMock = new Mock<ISessionService>();
            userSessionMock = new Mock<IUserSession>();
            loggerMock = new Mock<ILogger<SessionMiddleware>>();
        }

        [TestMethod]
        public async Task ShouldRunRoutines()
        {
            middlewareMock.Setup(m => m.LoadSession(
                It.IsAny<HttpContext>(),
                It.IsAny<ISessionService>(),
                It.IsAny<IUserSession>(),
                It.IsAny<ILogger<SessionMiddleware>>())
            );

            delegateMock.Setup(_ => _(It.IsAny<HttpContext>()));
            
            middlewareMock.Setup(m => m.SaveSession(It.IsAny<ISessionService>(), It.IsAny<IUserSession>(),
                It.IsAny<ILogger<SessionMiddleware>>()));

            await middlewareMock.Object.InvokeAsync(contextMock.Object, sessionServiceMock.Object,
                userSessionMock.Object, loggerMock.Object);
            
            middlewareMock.Verify(m => m.LoadSession(
                It.Is<HttpContext>(v => v == contextMock.Object), 
                It.Is<ISessionService>(v => v == sessionServiceMock.Object),
                It.Is<IUserSession>(v => v == userSessionMock.Object), 
                It.Is<ILogger<SessionMiddleware>>(v => v == loggerMock.Object)
            ), Times.Once());

            delegateMock.Verify(_ => _(It.Is<HttpContext>(v => v == contextMock.Object)), Times.Once());
            
            middlewareMock.Verify(m => m.SaveSession(
                It.Is<ISessionService>(v => v == sessionServiceMock.Object),
                It.Is<IUserSession>(v => v == userSessionMock.Object),
                It.Is<ILogger<SessionMiddleware>>(v => v == loggerMock.Object)
            ), Times.Once());
        }

        [TestMethod]
        public async Task SaveSessionShouldPassEmptySession()
        {
            userSessionMock.SetupGet(m => m.Session).Returns((Session)null);
            sessionServiceMock.Setup(m => m.Update(It.IsAny<Session>()));

            await middlewareMock.Object.SaveSession(
                sessionServiceMock.Object,
                userSessionMock.Object,
                loggerMock.Object
            );
            
            userSessionMock.VerifyGet(m => m.Session, Times.Once());
            sessionServiceMock.Verify(m => m.Update(It.IsAny<Session>()), Times.Never());
        }

        [TestMethod]
        public async Task SaveSessionShouldUpdateSession()
        {
            var session = new Session()
            {
                Guid = Guid.NewGuid(),
            };
            
            userSessionMock.SetupGet(m => m.Session).Returns(session);
            middlewareMock.SetupGet(m => m.SessionLifeTime).Returns(new DateTime(2021, 2, 27, 5, 34, 0));
            sessionServiceMock.Setup(m => m.Update(It.IsAny<Session>()));

            await middlewareMock.Object.SaveSession(
                sessionServiceMock.Object,
                userSessionMock.Object,
                loggerMock.Object
            );
            
            userSessionMock.VerifyGet(m => m.Session, Times.Once());
            sessionServiceMock.Verify(m => m.Update(It.Is<Session>(
                v => v == session && v.ValidityExpired == new DateTime(2021, 2, 27, 5, 34, 0)
            )), Times.Once);
        }

        [TestMethod]
        public async Task LoadSessionShouldPassEmptySession()
        {
            contextMock.Setup<Claim>(m => m.User.FindFirst(It.IsAny<string>())).Returns((Claim)null);
            middlewareMock.Setup(m => m.GetSession(It.IsAny<SessionService>(), It.IsAny<Guid>()));

            await middlewareMock.Object.LoadSession(
                contextMock.Object,
                sessionServiceMock.Object,
                userSessionMock.Object,
                loggerMock.Object
            );

            contextMock.Verify(m => m.User.FindFirst(It.Is<string>(v => v == ClaimTypes.Sid)));
            middlewareMock.Verify(m => m.GetSession(sessionServiceMock.Object, It.IsAny<Guid>()), Times.Never());
        }
        
        [TestMethod]
        public async Task LoadSessionShouldReturnExistingSession()
        {
            var guid = Guid.NewGuid();
            contextMock.Setup<Claim>(m => m.User.FindFirst(It.IsAny<string>())).Returns(
                new Claim(ClaimTypes.Sid, guid.ToString())
            );
            
            middlewareMock.Setup(m => m.GetSession(It.IsAny<ISessionService>(), It.IsAny<Guid>())).Returns(Task.FromResult(new Session() { Guid = guid, } ));
            middlewareMock.Setup(m => m.CreateSession(It.IsAny<ISessionService>(), It.IsAny<Guid>()));
            userSessionMock.SetupSet(m => m.Session = It.IsAny<Session>());

            await middlewareMock.Object.LoadSession(
                contextMock.Object,
                sessionServiceMock.Object,
                userSessionMock.Object,
                loggerMock.Object
            );

            contextMock.Verify(m => m.User.FindFirst(It.Is<string>(v => v == ClaimTypes.Sid)));
            middlewareMock.Verify(m => m.GetSession(sessionServiceMock.Object, It.Is<Guid>(v => v == guid)), Times.Once());
            middlewareMock.Verify(m => m.CreateSession(sessionServiceMock.Object, It.IsAny<Guid>()), Times.Never());
            userSessionMock.VerifySet(m => m.Session = It.Is<Session>(v => v.Guid == guid), Times.Once());
        }
        
        [TestMethod]
        public async Task LoadSessionShouldReturnNewSession()
        {
            var guid = Guid.NewGuid();
            contextMock.Setup<Claim>(m => m.User.FindFirst(It.IsAny<string>())).Returns(
                new Claim(ClaimTypes.Sid, guid.ToString())
            );
            
            middlewareMock.Setup(m => m.GetSession(It.IsAny<ISessionService>(), It.IsAny<Guid>())).Returns(Task.FromResult((Session) null));
            middlewareMock.Setup(m => m.CreateSession(It.IsAny<ISessionService>(), It.IsAny<Guid>())).Returns(Task.FromResult<Session>(new Session() { Guid = guid, }));
            userSessionMock.SetupSet(m => m.Session = It.IsAny<Session>());

            await middlewareMock.Object.LoadSession(
                contextMock.Object,
                sessionServiceMock.Object,
                userSessionMock.Object,
                loggerMock.Object
            );

            contextMock.Verify(m => m.User.FindFirst(It.Is<string>(v => v == ClaimTypes.Sid)));
            middlewareMock.Verify(m => m.GetSession(sessionServiceMock.Object, It.Is<Guid>(v => v == guid)), Times.Once());
            middlewareMock.Verify(m => m.CreateSession(sessionServiceMock.Object, It.Is<Guid>(v => v == guid)), Times.Once());
            userSessionMock.VerifySet(m => m.Session = It.Is<Session>(v => v.Guid == guid), Times.Once());
        }
        
        [TestMethod]
        public async Task GetSessionShouldFindSessionByGuid()
        {
            var guid = Guid.NewGuid();

            var session = new Session();
            
            sessionServiceMock.Setup(m => m.Get(It.IsAny<Guid>())).Returns(Task.FromResult(session));

            var result = await middlewareMock.Object.GetSession(sessionServiceMock.Object, guid);
            
            sessionServiceMock.Verify(m => m.Get(It.Is<Guid>(v => v == guid)), Times.Once());
            Assert.AreSame(session, result);
        }
        
        [TestMethod]
        public async Task CreateSessionShouldCreateSessionWithGuid()
        {
            var guid = Guid.NewGuid();

            var session = new Session()
            {
                Guid = guid
            };
            
            sessionServiceMock.Setup(m => m.Save(It.IsAny<Session>())).Returns(Task.FromResult(session));

            var result = await middlewareMock.Object.CreateSession(sessionServiceMock.Object, guid);
            
            sessionServiceMock.Verify(m => m.Save(It.Is<Session>(v => v.Guid == guid)), Times.Once());
            Assert.AreSame(session, result);
        }
    }
}