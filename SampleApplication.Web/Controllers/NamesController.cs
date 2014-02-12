using SampleApplication.Web.Data;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;

namespace SampleApplication.Web.Controllers
{
    /// <summary>
    /// This is my controller, there are many like this, but this one is mine...
    /// </summary>
    /// <remarks>
    /// Builtin attribute routing is new in WebAPI 2.0
    /// Previously you had to cope with conventions, like {controller}/{action}/{id} that got out of control quickly when building REST like APIs
    /// </remarks>
    [RoutePrefix("api/names")]
    public class NamesController : ApiController
    {
        private const string PrefixRegex = "[a-zA-Z]+";

        private readonly IDataProvider dataProvider;

        public NamesController(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }
        
        /// <summary>
        /// Like ASP.NET MVC, the actions are made available through routes (see : http://localhost:60000/api/names/Al)
        /// </summary>
        /// <remarks>
        /// This action returns an IHttpResult, which you should use with current WebAPI version (2.0)
        /// The others actions will return the same data (there are unit tests to prove it !)
        /// More details on parameters : http://www.asp.net/web-api/overview/web-api-routing-and-actions/attribute-routing-in-web-api-2
        /// </remarks>
        [HttpGet]
        [Route("{prefix}")]
        public IHttpActionResult GetNames(string prefix)
        {
            // Get some data from the business/data access/whatever_is_below layer
            // if this layer is async/await capable, your action can be asynchronous as well, and won't wait for blocking DB calls anymore
            var names = this.dataProvider.GetFirstNames().Where(x => x.StartsWith(prefix));

            if (!Regex.IsMatch(prefix, PrefixRegex))
            {
                // 400 : see : http://localhost:60000/api/names/123
                return BadRequest();
            }

            if (!names.Any())
            {
                // 404 : see : http://localhost:60000/api/names/thisIsClearlyNotAName
                return NotFound();
            }

            // 200
            return Ok(names);
        }

        [HttpGet]
        [Route("{prefix}/ienumerable")]
        public IEnumerable<string> GetNamesAsIEnumerable(string prefix)
        {
            var names = this.dataProvider.GetFirstNames().Where(x => x.StartsWith(prefix));

            if (!Regex.IsMatch(prefix, PrefixRegex))
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            if (!names.Any())
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            return names;
        }

        [HttpGet]
        [Route("{prefix}/httpresponsemessage")]
        public HttpResponseMessage GetNamesAsHttpResponseMessage(string prefix)
        {
            var names = this.dataProvider.GetFirstNames().Where(x => x.StartsWith(prefix));

            if (!Regex.IsMatch(prefix, PrefixRegex))
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            if (!names.Any())
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, names);
        }
    }
}
