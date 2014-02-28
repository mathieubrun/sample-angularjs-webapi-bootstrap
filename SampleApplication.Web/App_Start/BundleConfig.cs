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
                .Include("~/Scripts/ui-bootstrap-{version}.js"));

            bundles.Add(new ScriptBundle("~/app/commonTests")
                .Include("~/Scripts/angular-mocks.js"));

            bundles.Add(new ScriptBundle("~/app/sampleApplication")
               .Include("~/app/app.js")
               .Include("~/app/common/common.js")
               .Include("~/app/angular/caching/cacheInterceptor.js")
               .Include("~/app/angular/data/data.js")
               .Include("~/app/angular/loader/loader.js")
               .Include("~/app/angular/loader/loader.directivesjs")
               .Include("~/app/angular/services/services.js"));

            bundles.Add(new ScriptBundle("~/app/sampleApplicationTests")
               .Include("~/app/app.spec.js")
               .Include("~/app/common/common.spec.js")
               .Include("~/app/angular/caching/cacheInterceptor.spec.js")
               .Include("~/app/angular/data/data.spec.js")
               .Include("~/app/angular/loader/loader.spec.js")
               .Include("~/app/angular/loader/loader.directive.spec.js"));

            bundles.Add(new StyleBundle("~/css/common")
                .Include("~/content/bootstrap.css")
                .Include("~/content/bootstrap-theme.css")
                .Include("~/content/font-awesome.css")
                .Include("~/content/themes/base/jquery-ui.css")
                .Include("~/content/app.css"));
        }
    }
}