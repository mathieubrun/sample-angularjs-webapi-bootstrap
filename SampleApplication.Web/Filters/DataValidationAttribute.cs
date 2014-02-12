using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Http.Results;

namespace SampleApplication.Web.Filters
{
    /// <summary>
    ///vThis one will put DataValidation errors in a neatly formatted bad request (see : http://localhost:60000/#/webapi/filters)
    /// </summary>
    public class DataValidationFilterAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// Before executing the action
        /// </summary>
        public override void OnActionExecuting(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            if (!actionContext.ModelState.IsValid)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.BadRequest, actionContext.ModelState.Keys.Select(x => new
                {
                    Field = x,
                    Errors = actionContext.ModelState[x].Errors.Select(y => y.ErrorMessage)
                }));
            }
        }
    }
}