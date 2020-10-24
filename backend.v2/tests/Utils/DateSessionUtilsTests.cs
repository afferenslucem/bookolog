using System;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Extensions.Logging;
using backend.Controllers;
using backend.Exceptions.BookExceptions;
using backend.Models;
using backend.Services;
using backend.Storages;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using tests.Services;
using Moq;
using tests.Storage;

namespace tests.Services
{
    [TestClass]
    public class DateSessionUtilsTests
    {
        [TestMethod]
        public void ShouldParseCorrect()
        {
            var now = DateSessionUtils.Now;

            var str = DateSessionUtils.Stringify(now);

            var result = DateSessionUtils.Parse(str);

            Assert.AreEqual(now.Year, result.Value.Year);
            Assert.AreEqual(now.Month, result.Value.Month);
            Assert.AreEqual(now.Day, result.Value.Day);
            Assert.AreEqual(now.Hour, result.Value.Hour);
            Assert.AreEqual(now.Minute, result.Value.Minute);
            Assert.AreEqual(now.Second, result.Value.Second);
            Assert.AreEqual(now.Millisecond, result.Value.Millisecond);
        }

        [TestMethod]
        public void ShouldReturnNullForNullString()
        {
            var result = DateSessionUtils.Parse(null);

            Assert.IsNull(result);
        }

        [TestMethod]
        public void ShouldReturnNullForIncorrectString()
        {
            var result = DateSessionUtils.Parse("null");

            Assert.IsNull(result);
        }
    }
}
