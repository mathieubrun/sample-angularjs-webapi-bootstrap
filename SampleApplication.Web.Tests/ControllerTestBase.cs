using Castle.MicroKernel.Lifestyle;
using Microsoft.Owin.Hosting;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Owin;
using SampleApplication.Web.Controllers;
using SampleApplication.Web.Tests.Ioc;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace SampleApplication.Web.Tests
{
    [TestClass]
    public class ControllerTestBase
    {
        protected static readonly string BaseAddress = "http://localhost:9000/";
        private static IDisposable app;

        /// <summary>
        /// Start the self hosted server once per assembly
        /// </summary>
        [AssemblyInitialize]
        public static void AssemblyInitialize(TestContext context)
        {
            app = WebApp.Start<Startup>(BaseAddress);
        }

        /// <summary>
        /// Do not forget to clean up !
        /// </summary>
        [AssemblyCleanup]
        public static void AssemblyCleanup()
        {
            if (app != null)
            {
                app.Dispose();
            }
        }

        protected T GetContent<T>(string url)
        {
            using (var client = new HttpClient())
            {
                var response = client.GetAsync(BaseAddress + url).Result;

                var str = response.Content.ReadAsStringAsync().Result;

                if (response.StatusCode == HttpStatusCode.InternalServerError)
                {
                    throw new Exception(str);
                }

                // convert to json
                var result = JsonConvert.DeserializeObject<T>(str);

                return result;
            }
        }

        protected void AssertStatus(string url, HttpStatusCode status)
        {
            using (var client = new HttpClient())
            {
                var response = client.GetAsync(BaseAddress + url).Result;

                var str = response.Content.ReadAsStringAsync().Result;

                if (response.StatusCode == HttpStatusCode.InternalServerError)
                {
                    throw new Exception(str);
                }

                Assert.AreEqual(status, response.StatusCode);
            }
        }

        public class Startup
        {
            public void Configuration(IAppBuilder appBuilder)
            {
                var config = new HttpConfiguration();

                // usual registration
                var container = WindsorConfig.Register<LifetimeScopeAccessor>(config);
                WebApiConfig.Register(config);

                config.EnsureInitialized();

                // OWIN middleware for Windsor lifestyle
                appBuilder.Use<OwinRequestLifeTimeManager>(container);

                // register WebAPI with OWIN
                appBuilder.UseWebApi(config);
            }
        }
    }
}
