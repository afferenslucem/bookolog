using backend.v2.Utils;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace backend.v2.tests.Utils
{
    [TestClass]
    public class AESCrypterTests
    {
        private AESCrypter crypter;

        [TestInitialize]
        public void BeforeEach()
        {
            crypter = new AESCrypter("Up2dIK78cXz23LrLjyMP+w==", "Up3dIK78cXz23LrMjyMP+w==");
        }

        [TestMethod]
        public void ShouldRead()
        {
            Assert.AreEqual(crypter.Key, "Up2dIK78cXz23LrLjyMP+w==");
            Assert.AreEqual(crypter.IV, "Up3dIK78cXz23LrMjyMP+w==");
        }

        [TestMethod]
        public void ShouldHaveProps()
        {
            crypter = new AESCrypter();
            
            Assert.AreEqual(crypter.Key.Length, 44);
            Assert.AreEqual(crypter.IV.Length, 24);
        }

        [TestMethod]
        public void ShouldEncodeDecode()
        {
            var msg = "Qwerty";

            var encoded = crypter.Encode(msg);
            var decoded = crypter.Decode(encoded);
            
            Assert.AreEqual(decoded, "Qwerty");
        }

        [TestMethod]
        public void ShouldDispose()
        {
            crypter.Dispose();
        }
    }
}