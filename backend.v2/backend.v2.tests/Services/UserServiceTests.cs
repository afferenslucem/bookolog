using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using backend.v2.Exceptions.AuthenticationExceptions;
using backend.v2.Exceptions.BookExceptions;
using backend.v2.Exceptions.StorageExceptions;
using backend.v2.Models;
using backend.v2.Models.Authentication;
using backend.v2.Services;
using backend.v2.Storages;
using backend.v2.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Swashbuckle.Swagger;

namespace backend.v2.tests.Services
{
    [TestClass]
    public class UserServiceTests
    {
        private Mock<IUserStorage> storageMock;
        private Mock<UserService> serviceMock;

        [TestInitialize]
        public void BeforeEach()
        {
            this.storageMock = new Mock<IUserStorage>();

            this.serviceMock = new Mock<UserService>(
                MockBehavior.Default,
                storageMock.Object
            );

            this.serviceMock.CallBase = true;
        }

        [TestMethod]
        public void ShouldCreate()
        {
            Assert.IsNotNull(serviceMock.Object);
        }

        [TestMethod]
        public void ShouldCreate2()
        {
            Assert.IsNotNull(new Mock<UserService>(MockBehavior.Default).Object);
        }

        [TestMethod]
        public async Task ShouldAuthenticateForValidHash()
        {
            var user = new User();

            serviceMock.Setup(m => m.GetByLogin(It.IsAny<string>())).ReturnsAsync(user);
            serviceMock.Setup(m => m.CheckHash(It.IsAny<User>(), It.IsAny<string>())).Returns(true);

            await serviceMock.Object.Authenticate("hrodvitnir", "qwerty");
            
            serviceMock.Verify(m => m.GetByLogin("hrodvitnir"), Times.Once());
            serviceMock.Verify(m => m.CheckHash(user, "qwerty"), Times.Once());
        }

        [TestMethod]
        public async Task ShouldThrowIncorrectCredentianlsExceptionForInvalidHash()
        {
            var user = new User();

            serviceMock.Setup(m => m.GetByLogin(It.IsAny<string>())).ReturnsAsync(user);
            serviceMock.Setup(m => m.CheckHash(It.IsAny<User>(), It.IsAny<string>())).Returns(false);

            await Assert.ThrowsExceptionAsync<IncorrectCredentianlsException>(() =>
                serviceMock.Object.Authenticate("hrodvitnir", "qwerty"));
        }

        [TestMethod]
        public async Task ShouldThrowIncorrectCredentianlsExceptionForNullPatient()
        {
            serviceMock.Setup(m => m.GetByLogin(It.IsAny<string>())).ThrowsAsync(new StorageReadException());

            await Assert.ThrowsExceptionAsync<IncorrectCredentianlsException>(() =>
                serviceMock.Object.Authenticate("hrodvitnir", "qwerty"));
        }

        [TestMethod]
        public void CheckHashShouldReturnTrue()
        {
            var hasher = new SHA256Hasher();
            
            var user = new User()
            {
                Salt = "uiop",
                PasswordHash = hasher.GetSHA256Hash("qwerty", "uiop")
            };

            var result = serviceMock.Object.CheckHash(user, "qwerty");
            
            Assert.AreEqual(result, true);
        }

        [TestMethod]
        public void CheckHashShouldReturnFalse()
        {
            var hasher = new SHA256Hasher();
            
            var user = new User()
            {
                Salt = "uiop",
                PasswordHash = hasher.GetSHA256Hash("qwerty2", "uiop")
            };

            var result = serviceMock.Object.CheckHash(user, "qwerty");
            
            Assert.AreEqual(result, false);
        }
        

        [TestMethod]
        public async Task AuthenticateShouldFindById()
        {
            var hasher = new SHA256Hasher();
            var user = new User()
            {
                PasswordHash = hasher.GetSHA256Hash("qwerty", "salt"),
                Salt = "salt"
            };

            serviceMock.Setup(m => m.GetById(It.IsAny<long>())).ReturnsAsync(user);

            await serviceMock.Object.Authenticate(1, "qwerty");
            
            serviceMock.Verify(m => m.GetById(1), Times.Once());
        }
        
        [TestMethod]
        public async Task AuthenticateShouldThrowIncorrectCredentialsExceptionForUnexistingUser()
        {
            serviceMock.Setup(m => m.GetById(It.IsAny<long>())).ReturnsAsync((User)null);

            await Assert.ThrowsExceptionAsync<IncorrectCredentianlsException>(() => serviceMock.Object.Authenticate(1, "qwerty"));
        }
        
        [TestMethod]
        public async Task AuthenticateShouldThrowIncorrectCredentialsExceptionForWrongPassword()
        {
            var hasher = new SHA256Hasher();
            var user = new User()
            {
                PasswordHash = hasher.GetSHA256Hash("qwerty2", "salt"),
                Salt = "salt"
            };

            serviceMock.Setup(m => m.GetById(It.IsAny<long>())).ReturnsAsync(user);

            await Assert.ThrowsExceptionAsync<IncorrectCredentianlsException>(() => serviceMock.Object.Authenticate(1, "qwerty"));
        }
        
        [TestMethod]
        public async Task ShouldChangePassword()
        {
            serviceMock.Setup(m => m.Authenticate(It.IsAny<long>(), It.IsAny<string>())).ReturnsAsync((User)null);
            serviceMock.Setup(m => m.SetNewPassword(It.IsAny<long>(), It.IsAny<string>())).Returns(Task.CompletedTask);

            await serviceMock.Object.ChangePassword(1, "qwerty", "uiop");
            
            serviceMock.Verify(m => m.Authenticate(1, "qwerty"), Times.Once());
            serviceMock.Verify(m => m.SetNewPassword(1, "uiop"), Times.Once());
        }
        
        [TestMethod]
        public async Task ShouldSetNewPassword()
        {            
            var user = new User()
            {
            };

            serviceMock.Setup(m => m.GetById(It.IsAny<long>())).ReturnsAsync(user);
            storageMock.Setup(m => m.Update(It.IsAny<User>()));

            await serviceMock.Object.SetNewPassword(1, "qwerty");
            
            serviceMock.Verify(m => m.GetById(1), Times.Once());
            storageMock.Verify(m => m.Update(It.Is<User>(v => v.PasswordHash != null && v.Salt != null)), Times.Once());
        }
        
        [TestMethod]
        public async Task ShouldUpdate()
        {            
            var user = new User()
            {
            };

            storageMock.Setup(m => m.Update(It.IsAny<User>()));

            await serviceMock.Object.Update(user);
            
            storageMock.Verify(m => m.Update(user), Times.Once());
        }
        
        [TestMethod]
        public async Task ShouldRegisterUser()
        {            
            var user = new User()
            {
                Password = "qwerty"
            };

            storageMock.Setup(m => m.Save(It.IsAny<User>()));

            await serviceMock.Object.RegisterUser(user);
            
            storageMock.Verify(m => m.Save(It.Is<User>(v => v.PasswordHash != null && v.Salt != null)), Times.Once());
        }
        
        [TestMethod]
        public async Task RegisterUserShouldThrowLoginError()
        {            
            var user = new User()
            {
                Password = "qwerty"
            };

            storageMock.Setup(m => m.Save(It.IsAny<User>())).ThrowsAsync(new Exception("I have inner", 
                new Exception("Login unique error"))
            );

            await Assert.ThrowsExceptionAsync<UserWithSameLoginAlreadyExistsException>(() =>
                serviceMock.Object.RegisterUser(user));
        }
        
        [TestMethod]
        public async Task RegisterUserShouldThrowEmailError()
        {            
            var user = new User()
            {
                Password = "qwerty"
            };

            storageMock.Setup(m => m.Save(It.IsAny<User>())).ThrowsAsync(new Exception("I have inner", 
                new Exception("Email unique error"))
            );

            await Assert.ThrowsExceptionAsync<UserWithSameEmailAlreadyExistsException>(() =>
                serviceMock.Object.RegisterUser(user));
        }
        
        [TestMethod]
        public async Task RegisterUserShouldThrowError()
        {            
            var user = new User()
            {
                Password = "qwerty"
            };

            storageMock.Setup(m => m.Save(It.IsAny<User>())).ThrowsAsync(new Exception("I have not inner"));

            await Assert.ThrowsExceptionAsync<Exception>(() =>
                serviceMock.Object.RegisterUser(user));
        }
        
        [TestMethod]
        public async Task RegisterUserShouldThrowError2()
        {            
            var user = new User()
            {
                Password = "qwerty"
            };

            storageMock.Setup(m => m.Save(It.IsAny<User>())).ThrowsAsync(new Exception("I have inner", 
                new Exception("Id unique error"))
            );

            await Assert.ThrowsExceptionAsync<Exception>(() =>
                serviceMock.Object.RegisterUser(user));
        }
        
        [TestMethod]
        public async Task ShouldGetByLogin()
        {            
            var user = new User()
            {
            };

            storageMock.Setup(m => m.GetByLogin(It.IsAny<string>())).ReturnsAsync(user);

            var result = await serviceMock.Object.GetByLogin("hrodvitnir");
            
            storageMock.Verify(m => m.GetByLogin("hrodvitnir"), Times.Once());
            Assert.AreSame(result, user);
        }
        
        [TestMethod]
        public async Task GetByLoginShouldThrowStorageReadException()
        {            

            storageMock.Setup(m => m.GetByLogin(It.IsAny<string>())).ReturnsAsync((User)null);

            await Assert.ThrowsExceptionAsync<StorageReadException>(() => serviceMock.Object.GetByLogin("hrodvitnir"));
        }
        
        [TestMethod]
        public async Task ShouldGetByEmail()
        {            
            var user = new User()
            {
            };

            storageMock.Setup(m => m.GetByEmail(It.IsAny<string>())).ReturnsAsync(user);

            var result = await serviceMock.Object.GetByEmail("alexshakirov74@gmail.com");
            
            storageMock.Verify(m => m.GetByEmail("alexshakirov74@gmail.com"), Times.Once());
            Assert.AreSame(result, user);
        }
        
        [TestMethod]
        public async Task GetByEmailShouldThrowStorageReadException()
        {            

            storageMock.Setup(m => m.GetByEmail(It.IsAny<string>())).ReturnsAsync((User)null);

            await Assert.ThrowsExceptionAsync<StorageReadException>(() => serviceMock.Object.GetByEmail("alexshakirov74@gmail.com"));
        }
        
        [TestMethod]
        public async Task ShouldGetById()
        {            
            var user = new User()
            {
            };

            storageMock.Setup(m => m.GetById(It.IsAny<long>())).ReturnsAsync(user);

            var result = await serviceMock.Object.GetById(1);
            
            storageMock.Verify(m => m.GetById(1), Times.Once());
            Assert.AreSame(result, user);
        }
    }
}