using SampleApplication.Web.Data;
using SampleApplication.Web.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web.Http;

namespace SampleApplication.Web.Controllers
{
    [RoutePrefix("api/recommandations")]
    public class RecommandationsController : ApiController
    {
        private readonly IDataProvider dataProvider;

        public RecommandationsController(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetList()
        {
            return Ok(this.dataProvider.GetRecommandations());
        }
    }
}
