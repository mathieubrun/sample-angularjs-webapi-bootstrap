using Cogimator.SampleDataGenerator;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace SampleApplication.Web.Tests.Controllers
{
    [TestClass]
    public class NamesControllerIntegrationTest : ControllerTestBase
    {
        [TestMethod]
        public void All_methods_with_valid_values_must_return_OK()
        {
            var value = StaticData.FirstNames.First();

            AssertStatus("api/names/" + value, HttpStatusCode.OK);
            AssertStatus("api/names/" + value + "/ienumerable", HttpStatusCode.OK);
            AssertStatus("api/names/" + value + "/httpresponsemessage", HttpStatusCode.OK);
        }

        [TestMethod]
        public void All_methods_with_valid_values_must_return_same_content()
        {
            var value = StaticData.FirstNames.First();

            var c1 = GetContent<IEnumerable<string>>("api/names/" + value);
            var c2 = GetContent<IEnumerable<string>>("api/names/" + value + "/ienumerable");
            var c3 = GetContent<IEnumerable<string>>("api/names/" + value + "/httpresponsemessage");

            Assert.AreEqual(c1.First(), c2.First());
            Assert.AreEqual(c2.First(), c3.First());
        }

        [TestMethod]
        public void All_methods_with_inexistant_values_must_return_NotFound()
        {
            AssertStatus("api/names/thisIsNotAName", HttpStatusCode.NotFound);
            AssertStatus("api/names/thisIsNotAName/ienumerable", HttpStatusCode.NotFound);
            AssertStatus("api/names/thisIsNotAName/httpresponsemessage", HttpStatusCode.NotFound);
        }

        [TestMethod]
        public void All_methods_with_invalid_values_must_return_BadRequest()
        {
            AssertStatus("api/names/1", HttpStatusCode.BadRequest);
            AssertStatus("api/names/1/ienumerable", HttpStatusCode.BadRequest);
            AssertStatus("api/names/1/httpresponsemessage", HttpStatusCode.BadRequest);
        }
    }
}
