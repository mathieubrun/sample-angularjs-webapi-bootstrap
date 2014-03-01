using SampleApplication.Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;

namespace SampleApplication.Web.Controllers
{
    [RoutePrefix("api/filters")]
    public class FilterController : ApiController
    {
        [HttpGet]
        [Authorize]
        [Route("authorize")]
        public IHttpActionResult TestAuthorize()
        {
            return this.Ok();
        }

        [HttpGet]
        [CustomHeader]
        [Route("header")]
        public IHttpActionResult TestHeader()
        {
            return this.Ok("test");
        }
    }
}
