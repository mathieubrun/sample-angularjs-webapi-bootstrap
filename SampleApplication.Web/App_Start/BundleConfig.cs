using System;
using System.IO;
using System.Web.Hosting;
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
                .Include("~/Scripts/checklistModel.directive.js")
                .Include("~/Scripts/ui-date.js")
                .Include("~/Scripts/ui-bootstrap-{version}.js"));

            bundles.Add(new ScriptBundle("~/app/commonTests")
                .Include("~/Scripts/angular-mocks.js"));

            bundles.Add(new ScriptBundle("~/app/sampleApplication")
               .IncludeDirectory("~/app/", "*.js", true));

            bundles.Add(new ScriptBundle("~/app/sampleApplicationTests")
               .Include("~/app/app.spec.js")
               .Include("~/app/common/common.spec.js")
               .Include("~/app/angular/caching/cacheInterceptor.spec.js")
               .Include("~/app/angular/data/data.spec.js")
               .Include("~/app/angular/directives/directives.spec.js")
               .Include("~/app/angular/loader/loader.spec.js")
               .Include("~/app/angular/loader/loader.directive.spec.js")
               .Include("~/app/angular/services/services.spec.js"));

            bundles.Add(new StyleBundle("~/css/common")
                .Include("~/content/bootstrap.css")
                .Include("~/content/bootstrap-theme.css")
                .Include("~/content/font-awesome.css")
                .Include("~/content/themes/base/jquery-ui.css")
                .Include("~/content/app.css"));
        }
    }
}