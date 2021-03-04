using backend.v2.Models.Authentication;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace backend.v2.tests.Models.Authentication
{
    [TestClass]
    public class SessionTests
    {
        private Session model;
        
        [TestInitialize]
        public void BeforeEach()
        {
            this.model = new Session();
        }
        
        [TestMethod]
        public void ShouldCreate()
        {
            Assert.IsNotNull(model);
        }
        
        
        [TestMethod]
        public void ShouldSetProperty()
        {
            model.Set("qwerty", "uiop");

            var value = model.Get("qwerty");
            
            Assert.AreEqual(value, "uiop");
        }
        
        [TestMethod]
        public void ShouldRemoveProperty()
        {
            model.Set("qwerty", "uiop");

            model.Remove("qwerty");
            var value = model.Get("qwerty");
            
            Assert.AreEqual(value, null);
        }
        
        [TestMethod]
        public void ShouldReturnNullForUnexistingProperty()
        {
            var value = model.Get("qwerty");
            
            Assert.AreEqual(value, null);
        }
    }
}