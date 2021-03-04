using backend.v2.Utils;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace backend.v2.tests.Utils
{
    [TestClass]
    public class SHA256HasherTests
    {
        private SHA256Hasher hasher = new SHA256Hasher();
        
        [TestMethod]
        public void ShouldCreate()
        {
            Assert.IsNotNull(hasher);
        }
        
        [TestMethod]
        public void ShouldGetSalt()
        {
            var salt = hasher.GetSalt();
            
            Assert.IsNotNull(salt);
            Assert.IsFalse(salt.Length == 0);
        }
        
        [TestMethod]
        public void ShouldGetHash()
        {
            var hash = hasher.GetSHA256Hash("qwerty", "uiop");
            
            Assert.IsNotNull(hash);
            Assert.IsFalse(hash.Length == 0);
        }
    }
}