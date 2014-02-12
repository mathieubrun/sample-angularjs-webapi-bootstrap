using Castle.MicroKernel.Lifestyle.Scoped;
using Castle.Windsor;
using Microsoft.Owin;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SampleApplication.Web.Tests.Ioc
{
    /// <remarks>
    /// Inspired from : https://github.com/castleproject/Windsor/blob/master/src/Castle.Windsor/MicroKernel/Lifestyle/PerWebRequestLifestyleModule.cs
    /// </remarks>
    public class OwinRequestLifeTimeManager : OwinMiddleware
    {
        private readonly IWindsorContainer container;

        public OwinRequestLifeTimeManager(OwinMiddleware next, IWindsorContainer container)
            : base(next)
        {
            this.container = container;
        }

        public override Task Invoke(IOwinContext context)
        {
            using (new CallContextLifetimeScope(container))
            {
                // subsequent middlewares are executed inside this scope
                return Next.Invoke(context);
            }
        }
    }
}
