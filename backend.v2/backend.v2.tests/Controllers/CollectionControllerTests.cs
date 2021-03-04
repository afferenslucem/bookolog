using backend.v2.Controllers;
using backend.v2.Services;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace backend.v2.tests.Controllers
{
    [TestClass]
    public class CollectionControllerTests
    {
        private Mock<ICollectionService> collectionServiceMock;
        private Mock<ILogger<CollectionController>> loggerMock;
        private Mock<IUserSession> sessionMock;
        
        private Mock<CollectionController> controllerMock;
        
        [TestInitialize]
        public void BeforeEach()
        {
            collectionServiceMock = new Mock<ICollectionService>();
            sessionMock = new Mock<IUserSession>();
            loggerMock = new Mock<ILogger<CollectionController>>();
            controllerMock = new Mock<CollectionController>(
                MockBehavior.Default,
                collectionServiceMock.Object,
                sessionMock.Object,
                loggerMock.Object
            );

            controllerMock.CallBase = true;
        }
        
        [TestMethod]
        public void ShouldCreate()
        {
            Assert.IsNotNull(controllerMock.Object);
        }
    }
}