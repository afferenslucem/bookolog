using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace backend.v2.Utils
{
    public class AESCrypter : IDisposable
    {
        public string Key
        {
            get
            {
                return this.BytesToString(this.chipher.Key);
            }
            private set {
                this.chipher.Key = this.StringToBytes(value);
            }
        }

        public string IV
        {
            get
            {
                return this.BytesToString(this.chipher.IV);
            }
            private set 
            {
                this.chipher.IV = this.StringToBytes(value);
            }
        }

        private Aes chipher;

        public AESCrypter()
        {
            this.chipher = Aes.Create();
        }

        public AESCrypter(string key, string iv)
        {
            this.chipher = Aes.Create();

            this.Key = key;
            this.IV = iv;
        }

        public string Encode(string plainText) {
            ICryptoTransform encryptor = chipher.CreateEncryptor(chipher.Key, chipher.IV);

            using var msEncrypt = new MemoryStream();
            using var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write);            
            using var swEncrypt = new StreamWriter(csEncrypt);
            
            swEncrypt.Write(plainText);  
            swEncrypt.Close();          

            var encrypted = msEncrypt.ToArray();

            return this.BytesToString(encrypted);                    
        }

        public string Decode(string encrypted) {

            var cipherText = this.StringToBytes(encrypted);

            ICryptoTransform decryptor = chipher.CreateDecryptor(chipher.Key, chipher.IV);

            using var msEncrypt = new MemoryStream(cipherText);
            using var csEncrypt = new CryptoStream(msEncrypt, decryptor, CryptoStreamMode.Read);            
            using var srEncrypt = new StreamReader(csEncrypt);
            
            return srEncrypt.ReadToEnd();              
        }

        public void Dispose()
        {
            this.chipher.Dispose();
        }

        private string BytesToString(byte[] bytes)
        {
            return Convert.ToBase64String(bytes);
        }

        private byte[] StringToBytes(string bytes)
        {
            return Convert.FromBase64String(bytes);
        }
    }
}