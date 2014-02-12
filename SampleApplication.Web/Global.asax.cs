using Castle.MicroKernel.Lifestyle;
using System.Web.Http;
using System.Web.Optimization;

namespace SampleApplication.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            BundleConfig.Register(BundleTable.Bundles);
            WindsorConfig.Register<WebRequestScopeAccessor>(GlobalConfiguration.Configuration);

            GlobalConfiguration.Configuration.EnsureInitialized();
        }
    }
}