using System;
using backend.v2.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace backend.v2.tests.Models
{
    [TestClass]
    public class FileTests
    {
        private File model;
        
        [TestInitialize]
        public void BeforeEach()
        {
            this.model = new File();
        }

        [TestMethod]
        public void ShouldCreate()
        {
            Assert.IsNotNull(model);
        }

        [TestMethod]
        public void ShouldSaveProperties()
        {
            var id = 1;
            var name = "name";
            var path = "path";


            model.Id = id;
            model.Name = name;
            model.Path = path;

            Assert.AreEqual(model.Id, id);
            Assert.AreEqual(model.Name, name);
            Assert.AreEqual(model.Path, path);
        }
    }
}