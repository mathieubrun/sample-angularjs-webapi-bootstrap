using System.Web.Optimization;

namespace SampleApplication.Web
{
    public class BundleConfig
    {
        public static void Register(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/app/common")
                .Include("~/Scripts/jquery-{version}.js")
                .Include("~/Scripts/jquery-ui-{version}.js")
                .Include("~/Scripts/underscore.js")
                .Include("~/Scripts/angular.js")
                .Include("~/Scripts/angular-resource.js")
                .Include("~/Scripts/angular-route.js")
                .Include("~/Scripts/ui-date.js")
                .Include("~/Scripts/ui-bootstrap-{version}.js")
                );

            bundles.Add(new ScriptBundle("~/app/sampleApplication")
               .Include("~/app/app.js")
               .Include("~/app/common/common.js")
               .Include("~/app/angular/caching/cacheInterceptor.js")
               .Include("~/app/angular/data/data.js")
               .Include("~/app/angular/loader/loader.js")
               .Include("~/app/angular/loader/loader.directive.js"));

            bundles.Add(new StyleBundle("~/css/common")
                .Include("~/content/bootstrap.css")
                .Include("~/content/bootstrap-theme.css")
                .Include("~/content/font-awesome.css")
                .Include("~/content/themes/base/jquery-ui.css")
                .Include("~/content/app.css"));
        }
    }
}