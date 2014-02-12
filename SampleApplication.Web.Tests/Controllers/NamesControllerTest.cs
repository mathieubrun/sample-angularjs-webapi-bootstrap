using Cogimator.SampleDataGenerator;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using SampleApplication.Web.Controllers;
using SampleApplication.Web.Data;
using System.Web.Http.Results;
using Moq;

namespace SampleApplication.Web.Tests.Controllers
{
    [TestClass]
    public class NamesControllerTest : ControllerTestBase
    {
        [TestMethod]
        public void Valid_values_must_return_OK()
        {
            // mocks
            var dataProviderMock = new Mock<IDataProvider>();
            dataProviderMock.Setup(x => x.GetFirstNames())
                .Returns(new string[] { "AAA", "BBB", "CCC" });

            // arrange
            var expected = "AAA";
            var sut = new NamesController(dataProviderMock.Object);

            // act
            var data = sut.GetNames(expected);

            // assert
            Assert.IsInstanceOfType(data, typeof(OkNegotiatedContentResult<IEnumerable<string>>));
            Assert.IsTrue(((OkNegotiatedContentResult<IEnumerable<string>>)data).Content.Contains(expected));
        }

        [TestMethod]
        public void Inexistant_values_must_return_NotFound()
        {
            // arrange
            var sut = new NamesController(new DataProvider());

            // act
            var data = sut.GetNames("thisIsNotAName");

            // assert
            Assert.IsInstanceOfType(data, typeof(NotFoundResult));
        }

        [TestMethod]
        public void Invalid_values_must_return_BadRequest()
        {
            // arrange
            var sut = new NamesController(new DataProvider());

            // act
            var data = sut.GetNames("1");

            // assert
            Assert.IsInstanceOfType(data, typeof(BadRequestResult));
        }
    }
}
