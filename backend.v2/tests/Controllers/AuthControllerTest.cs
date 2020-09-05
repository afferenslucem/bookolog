using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Extensions.Logging;
using backend.Controllers;
using tests.Services;
using Moq;

namespace tests.Controllers
{
    [TestClass]
    public class AuthControllerTests
    {
        UserServiceMock userService;
        AuthController controller;

        [TestInitialize]
        public void BeforeEach() {
            var logger = new Mock<ILogger<AuthController>>();

            this.userService = new UserServiceMock();

            this.controller = new AuthController(userService, logger.Object);
        }


        [TestMethod]
        public void TestMethod1()
        {
            
        }
    }
}
