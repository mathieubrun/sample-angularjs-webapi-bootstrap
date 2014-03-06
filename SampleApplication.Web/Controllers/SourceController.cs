using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace SampleApplication.Web.Controllers
{
    [RoutePrefix("api/source")]
    public class SourceController : ApiController
    {
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetSource(string path)
        {
            var url = HttpUtility.UrlDecode(path);
            var lines = File.ReadAllLines(HostingEnvironment.MapPath("~/" + url));
            var file = string.Join(Environment.NewLine, lines);

            return this.Ok(new
            {
                File = url,
                Content = file
            });
        }
    }
}
