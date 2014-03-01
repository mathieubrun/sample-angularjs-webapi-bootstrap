using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web.Http;

using SampleApplication.Web.Data;
using SampleApplication.Web.Data.Models;
using SampleApplication.Web.Filters;

namespace SampleApplication.Web.Controllers
{
    /// <summary>
    /// This controller will return some more interesting data
    /// </summary>
    [RoutePrefix("api/clients")]
    public class ClientsController : ApiController
    {
        private readonly IDataProvider dataProvider;

        public ClientsController(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }
       
        /// <summary>
        /// This will serialize an array of objects (see : http://localhost:60000/#/angular/data/remote)
        /// </summary>
        /// <remarks>
        /// No contract is required here, just return some objects, they get serialized automatically
        /// </remarks>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetList()
        {
            var data = this.dataProvider.GetClients();

            return this.Ok(data);
        }

        /// <summary>
        /// And this will deserialize one client (edit one client from list, and check network tab)
        /// </summary>
        [HttpPost]
        [Route("")]
        [DataValidationFilter]
        public IHttpActionResult Save(Client client)
        {
            var updated = this.dataProvider.Save(client);

            // we should send the link to the resource as well to be fully REST compliant
            return this.Ok(updated);
        }

        [HttpGet]
        [Route("delay")]
        public IHttpActionResult GetListWithDelay()
        {
            Thread.Sleep(2000);

            return this.Ok(this.dataProvider.GetClients());
        }

        [HttpGet]
        [Route("error/{error:int}")]
        public IHttpActionResult GetListError(int error)
        {
            Thread.Sleep(2000);

            return this.StatusCode((HttpStatusCode)error);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IHttpActionResult Get(Guid id)
        {
            var client = this.dataProvider.GetClients().Single(x => x.Id == id);

            return this.Ok(client);
        }
    }
}
