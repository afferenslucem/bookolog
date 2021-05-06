using System;
using System.Threading.Tasks;
using backend.v2.Controllers;
using backend.v2.Exceptions.AuthenticationExceptions;
using backend.v2.Exceptions.StorageExceptions;
using backend.v2.Models;
using backend.v2.Models.Authentication;
using backend.v2.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace backend.v2.tests.Controllers
{
    [TestClass]
    public class AuthControllerTests
    {
        private Mock<ISessionService> sessionServiceMock;
        private Mock<IUserSession> userSessionMock;
        private Mock<IUserService> userServiceMock;
        private Mock<IMailService> mailServiceMock;
        private Mock<HttpRequest> requestMock;
        private Mock<HttpContext> httpContextMock;
        private Mock<ILogger<AuthController>> loggerMock;

        private Mock<AuthController> controllerMock;
        
        [TestInitialize]
        public void BeforeEach()
        {
            sessionServiceMock = new Mock<ISessionService>();
            userSessionMock = new Mock<IUserSession>();
            userServiceMock = new Mock<IUserService>();
            mailServiceMock = new Mock<IMailService>();
            requestMock = new Mock<HttpRequest>();
            httpContextMock = new Mock<HttpContext>();
            loggerMock = new Mock<ILogger<AuthController>>();
            controllerMock = new Mock<AuthController>(
                MockBehavior.Default,
                userServiceMock.Object,
                userSessionMock.Object,
                mailServiceMock.Object,
                loggerMock.Object
            );

            controllerMock.CallBase = true;

            requestMock.SetupGet(m => m.Path).Returns(new PathString("/path"));
            httpContextMock.SetupGet(m => m.Request).Returns(requestMock.Object);
            controllerMock.Object.ControllerContext.HttpContext = httpContextMock.Object;
        }
        
        [TestMethod]
        public async Task LoginShouldAuthorizeUser()
        {
            var user = new User()
            {
                Id = 2,
                Login = "hrodvitnir",
                Email = "alexshakirov74@gmail.com"
            };
            
            userServiceMock.Setup(m => m.Authenticate(It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(user);
            
            controllerMock.Setup(m => m.AuthenticateUser(It.IsAny<User>())).Returns(Task.CompletedTask);
            controllerMock.Setup(m => m.Ok(It.IsAny<User>()));
            
            await controllerMock.Object.Login(new AuthenticateModel()
            {
                Login = "hrodvitnir",
                Password = "qwerty"
            });
            
            userServiceMock.Verify(
                m => m.Authenticate(
                    It.Is<string>(v => v == "hrodvitnir"),
                    It.Is<string>(v => v == "qwerty")
                ),
                Times.Once()
            );
            
            controllerMock.Verify(m => m.AuthenticateUser(It.Is<User>(v => v == user)));
            controllerMock.Verify(m => m.Ok(It.Is<User>(v => v == user)));
        }
        
        [TestMethod]
        public async Task LoginShouldReturnUnauthorized()
        {
            
            userServiceMock.Setup(m => m.Authenticate(It.IsAny<string>(), It.IsAny<string>())).ThrowsAsync(new IncorrectCredentianlsException());
            controllerMock.Setup(m => m.Unauthorized(It.IsAny<User>()));
            
            await controllerMock.Object.Login(new AuthenticateModel()
            {
                Login = "hrodvitnir",
                Password = "qwerty2"
            });
            
            userServiceMock.Verify(
                m => m.Authenticate(
                    It.Is<string>(v => v == "hrodvitnir"),
                    It.Is<string>(v => v == "qwerty2")
                ),
                Times.Once()
            );
            
            controllerMock.Verify(m => m.Unauthorized(It.IsAny<string>()));
        }
        
        [TestMethod]
        public async Task LoginShouldReturn500()
        {
            
            userServiceMock.Setup(m => m.Authenticate(It.IsAny<string>(), It.IsAny<string>())).ThrowsAsync(new Exception());
            controllerMock.Setup(m => m.Unauthorized(It.IsAny<User>()));
            
            await controllerMock.Object.Login(new AuthenticateModel()
            {
                Login = "hrodvitnir",
                Password = "qwerty2"
            });
            
            userServiceMock.Verify(
                m => m.Authenticate(
                    It.Is<string>(v => v == "hrodvitnir"),
                    It.Is<string>(v => v == "qwerty2")
                ),
                Times.Once()
            );
            
            controllerMock.Verify(m => m.StatusCode(500, It.IsAny<string>()));
        }
        
        [TestMethod]
        public async Task RegisterShouldCreateUser()
        {
            var user = new User()
            {
                Id = 2,
                Login = "hrodvitnir",
                Email = "alexshakirov74@gmail.com"
            };

            userServiceMock.Setup(m => m.RegisterUser(It.IsAny<User>())).ReturnsAsync(user);
            controllerMock.Setup(m => m.Created(It.IsAny<string>(), It.IsAny<User>()));

            await controllerMock.Object.Register(user);
            
            userServiceMock.Verify(m => m.RegisterUser(It.Is<User>(v => v == user)), Times.Once());
            controllerMock.Verify(m => m.Created(It.Is<string>(v => v == "/path"),It.Is<User>(v => v.Id == user.Id)), Times.Once());
        }
        
        [TestMethod]
        public async Task RegisterShouldThrowEmailException()
        {
            var user = new User()
            {
                Id = 2,
                Login = "hrodvitnir",
                Email = "alexshakirov74@gmail.com"
            };

            userServiceMock.Setup(m => m.RegisterUser(It.IsAny<User>())).ThrowsAsync(new UserWithSameEmailAlreadyExistsException());
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));

            await controllerMock.Object.Register(user);
            
            userServiceMock.Verify(m => m.RegisterUser(It.Is<User>(v => v == user)), Times.Once());
            controllerMock.Verify(
                m => m.StatusCode(
                    It.Is<int>(v => v == 400),
                    It.Is<object>(v => v == "User with same email already exisists")
                ),
                Times.Once());
        }
        
        [TestMethod]
        public async Task RegisterShouldThrowLoginException()
        {
            var user = new User()
            {
                Id = 2,
                Login = "hrodvitnir",
                Email = "alexshakirov74@gmail.com"
            };

            userServiceMock.Setup(m => m.RegisterUser(It.IsAny<User>())).ThrowsAsync(new UserWithSameLoginAlreadyExistsException());
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));

            await controllerMock.Object.Register(user);
            
            userServiceMock.Verify(m => m.RegisterUser(It.Is<User>(v => v == user)), Times.Once());
            controllerMock.Verify(
                m => m.StatusCode(
                    It.Is<int>(v => v == 400),
                    It.Is<object>(v => v == "User with same login already exisists")
                ),
                Times.Once());
        }
        
        [TestMethod]
        public async Task RegisterShouldReturn500()
        {
            var user = new User()
            {
                Id = 2,
                Login = "hrodvitnir",
                Email = "alexshakirov74@gmail.com"
            };

            userServiceMock.Setup(m => m.RegisterUser(It.IsAny<User>())).ThrowsAsync(new Exception());
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));

            await controllerMock.Object.Register(user);
            
            userServiceMock.Verify(m => m.RegisterUser(It.Is<User>(v => v == user)), Times.Once());
            controllerMock.Verify(m => m.StatusCode(500, It.IsAny<string>()), Times.Once());
        }
        
        [TestMethod]
        public async Task ChangePasswordShouldRunRoutine()
        {
            userSessionMock.SetupGet(m => m.User).Returns(new User()
            {
                Id = 2
            });
            userServiceMock.Setup(m => m.ChangePassword(It.IsAny<long>(), It.IsAny<string>(), It.IsAny<string>())).Returns(Task.CompletedTask);
            controllerMock.Setup(m => m.Ok());

            await controllerMock.Object.ChangePassword(new PasswordChangeModel()
            {
                NewPassword = "qwerty",
                OldPassword = "uiop"
            });
            
            userSessionMock.VerifyGet(m => m.User, Times.Once());
            userServiceMock.Verify(m => m.ChangePassword(2, "uiop", "qwerty"), Times.Once());
            controllerMock.Verify(m => m.Ok(), Times.Once());
        }
        
        [TestMethod]
        public async Task ChangePasswordShouldThrowPasswordError()
        {
            userSessionMock.SetupGet(m => m.User).Returns(new User()
            {
                Id = 2
            });
            userServiceMock.Setup(m => m.ChangePassword(It.IsAny<long>(), It.IsAny<string>(), It.IsAny<string>()))
                .ThrowsAsync(new IncorrectCredentianlsException());
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));

            await controllerMock.Object.ChangePassword(new PasswordChangeModel()
            {
                NewPassword = "qwerty",
                OldPassword = "uiop"
            });
            
            userSessionMock.VerifyGet(m => m.User, Times.Once());
            userServiceMock.Verify(m => m.ChangePassword(2, "uiop", "qwerty"), Times.Once());
            controllerMock.Verify(m => m.StatusCode(403, "Incorrect old password"), Times.Once());
        }
        
        [TestMethod]
        public async Task ChangePasswordShouldReturn500()
        {
            userSessionMock.SetupGet(m => m.User).Returns(new User()
            {
                Id = 2
            });
            userServiceMock.Setup(m => m.ChangePassword(It.IsAny<long>(), It.IsAny<string>(), It.IsAny<string>()))
                .ThrowsAsync(new Exception());
            controllerMock.Setup(m => m.StatusCode(It.IsAny<int>(), It.IsAny<object>()));

            await controllerMock.Object.ChangePassword(new PasswordChangeModel()
            {
                NewPassword = "qwerty",
                OldPassword = "uiop"
            });
            
            userSessionMock.VerifyGet(m => m.User, Times.Once());
            userServiceMock.Verify(m => m.ChangePassword(2, "uiop", "qwerty"), Times.Once());
            controllerMock.Verify(m => m.StatusCode(500, It.IsAny<string>()), Times.Once());
        }
        
        [TestMethod]
        public async Task CheckUserShouldUseAuthenticate()
        {
            userServiceMock.Setup(m => m.Authenticate(It.IsAny<string>(), It.IsAny<string>()));

            await controllerMock.Object.CheckUser("hrodvitnir", "qwerty");
            
            userServiceMock.Verify(m => m.Authenticate("hrodvitnir", "qwerty"), Times.Once());
        }
        
        [TestMethod]
        public async Task RecoverPasswordShouldChangeEmailForExistingUser()
        {
            var user = new User()
            {
                Id = 1,
                Email = "alexshakirov74@gmail.com",
            };
            
            userServiceMock.Setup(m => m.GetByEmail(It.IsAny<string>())).ReturnsAsync(user);
            userServiceMock.Setup(m => m.SetNewPassword(It.IsAny<long>(), It.IsAny<string>()))
                .Returns(Task.CompletedTask);
            mailServiceMock.Setup(m => m.SendPasswordRecover(It.IsAny<User>(), It.IsAny<string>()))
                .Returns(Task.CompletedTask);
            controllerMock.Setup(m => m.Ok());

            await controllerMock.Object.RecoverPassword("alexshakirov74@gmail.com");

            userServiceMock.Verify(m => m.GetByEmail("alexshakirov74@gmail.com"), Times.Once());
            userServiceMock.Verify(m => m.SetNewPassword(1, It.IsAny<string>()), Times.Once());
            mailServiceMock.Verify(m => m.SendPasswordRecover(user, It.IsAny<string>()), Times.Once());
            
            controllerMock.Verify(m => m.Ok(), Times.Once());
        }
        
        [TestMethod]
        public async Task RecoverPasswordShouldSkipForNonExistingUser()
        {
            userServiceMock.Setup(m => m.GetByEmail(It.IsAny<string>())).ThrowsAsync(new StorageReadException());
            userServiceMock.Setup(m => m.SetNewPassword(It.IsAny<long>(), It.IsAny<string>()))
                .Returns(Task.CompletedTask);
            mailServiceMock.Setup(m => m.SendPasswordRecover(It.IsAny<User>(), It.IsAny<string>()))
                .Returns(Task.CompletedTask);
            controllerMock.Setup(m => m.Ok());

            await controllerMock.Object.RecoverPassword("alexshakirov74@gmail.com");

            userServiceMock.Verify(m => m.GetByEmail("alexshakirov74@gmail.com"), Times.Once());
            userServiceMock.Verify(m => m.SetNewPassword(1, It.IsAny<string>()), Times.Never());
            mailServiceMock.Verify(m => m.SendPasswordRecover(It.IsAny<User>(), It.IsAny<string>()), Times.Never());
            
            controllerMock.Verify(m => m.Ok(), Times.Once());
        }
    }
}