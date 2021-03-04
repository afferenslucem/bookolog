using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using backend.v2.Exceptions.BookExceptions;
using backend.v2.Models;
using backend.v2.Models.Authentication;
using backend.v2.Services;
using backend.v2.Storages;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace backend.v2.tests.Services
{
    [TestClass]
    public class SessionServiceTests
    {
        private Mock<ISessionStorage> storageMock;

        private Mock<SessionService> serviceMock;

        [TestInitialize]
        public void BeforeEach()
        {
            this.storageMock = new Mock<ISessionStorage>();

            this.serviceMock = new Mock<SessionService>(
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
            Assert.IsNotNull(new Mock<SessionService>(MockBehavior.Default).Object);
        }

        [TestMethod]
        public async Task ShouldSaveSession()
        {
            var session = new Session();
            
            storageMock.Setup(m => m.Save(It.IsAny<Session>()));

            await serviceMock.Object.Save(session);
            
            storageMock.Verify(m => m.Save(It.IsAny<Session>()), Times.Once());
        }

        [TestMethod]
        public async Task ShouldDeleteSession()
        {
            var guid = Guid.NewGuid();
            
            storageMock.Setup(m => m.Delete(It.IsAny<Guid>()));

            await serviceMock.Object.Delete(guid);
            
            storageMock.Verify(m => m.Delete(guid), Times.Once());
        }

        [TestMethod]
        public async Task ShouldUpdateSession()
        {
            var session = new Session();
            
            storageMock.Setup(m => m.Update(It.IsAny<Session>()));

            await serviceMock.Object.Update(session);
            
            storageMock.Verify(m => m.Update(session), Times.Once());
        }

        [TestMethod]
        public async Task ShouldGetByIdSession()
        {
            var guid = Guid.NewGuid();
            
            storageMock.Setup(m => m.Get(It.IsAny<Guid>()));

            await serviceMock.Object.Get(guid);
            
            storageMock.Verify(m => m.Get(guid), Times.Once());
        }
    }
}