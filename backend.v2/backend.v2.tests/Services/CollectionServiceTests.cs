using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using backend.v2.Exceptions.BookExceptions;
using backend.v2.Models;
using backend.v2.Services;
using backend.v2.Storages;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace backend.v2.tests.Services
{
    [TestClass]
    public class CollectionServiceTests
    {
        private Mock<ICollectionStorage> storageMock;
        private Mock<IUserSession> sessionMock;

        private Mock<CollectionService> serviceMock;

        [TestInitialize]
        public void BeforeEach()
        {
            this.storageMock = new Mock<ICollectionStorage>();
            this.sessionMock = new Mock<IUserSession>();

            this.serviceMock = new Mock<CollectionService>(
                MockBehavior.Default,
                storageMock.Object,
                sessionMock.Object
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
            Assert.IsNotNull(new Mock<CollectionService>(MockBehavior.Default, sessionMock.Object).Object);
        }

        [TestMethod]
        public void CheckEntityShouldWork()
        {
            var collection = new Collection();

            serviceMock.Object.CheckEntity(collection);
        }
    }
}