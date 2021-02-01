using System;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Extensions.Logging;
using backend.Controllers;
using backend.Exceptions.BookExceptions;
using backend.Exceptions.AuthenticationExceptions;
using backend.Models;
using backend.v2.Services;
using backend.Models.Authentication;
using backend.Storages;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using tests.Services;
using Moq;
using tests.Storage;

namespace tests.Services
{
    [TestClass]
    public class UserServicesTests
    {
        IUserStorage userStorage;
        private IUserService service;

        [TestInitialize]
        public void BeforeEach() {
            this.userStorage = new UserStorageMock();

            service = new UserService(this.userStorage);
        }

        [TestMethod]
        public async Task ShouldAuthenticate()
        {
            var result = await this.service.Authenticate("login", "masterkey");
            
            Assert.AreEqual(result.Login, "login");
        }

        [TestMethod]
        public async Task ShouldThrowException()
        {
            await Assert.ThrowsExceptionAsync<IncorrectCredentianlsException>(() => this.service.Authenticate("login", "wrongPassword"));
        }

        [TestMethod]
        public async Task ShouldThrowException2()
        {
            await Assert.ThrowsExceptionAsync<IncorrectCredentianlsException>(() => this.service.Authenticate("wrong-login", "masterkey"));
        }
    }
}
