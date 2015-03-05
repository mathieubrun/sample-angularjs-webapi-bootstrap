using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
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

            bundles.Add(new FilterBundle("~/app/sampleApplication", "spec.js") { Orderer = new UnderscoreOrderer() }
               .IncludeDirectory("~/app/angular", "*.js", true));

            bundles.Add(new ScriptBundle("~/app/sampleApplicationTests")
               .IncludeDirectory("~/app/angular", "*.spec.js", true));

            bundles.Add(new StyleBundle("~/css/common")
                .Include("~/content/bootstrap.css")
                .Include("~/content/bootstrap-theme.css")
                .Include("~/content/font-awesome.css")
                .Include("~/content/themes/base/jquery-ui.css")
                .Include("~/content/app.css"));
        }

        public sealed class UnderscoreOrderer : IBundleOrderer
        {
            public IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
            {
                return files.OrderBy(x => !string.Equals(x.VirtualFile.Name, "_.js"));
            }
        }

        public class FilterBundle : ScriptBundle
        {
            private readonly string filter;

            public FilterBundle(string path, string filter) : base(path) {
                Orderer = new UnderscoreOrderer();

                this.filter = filter;
            }

            public override IEnumerable<BundleFile> EnumerateFiles(BundleContext context)
            {
                var files = base.EnumerateFiles(context);

                return files.Where(x => !x.IncludedVirtualPath.EndsWith(filter, StringComparison.OrdinalIgnoreCase));
            }

        }
    }

    public static class BundleExtentions
    {
        public static Bundle IncludeDirectoryWithExclusion(this Bundle bundle, string directoryVirtualPath, string searchPattern, string excludePattern)
        {
            var folderPath = HostingEnvironment.MapPath(directoryVirtualPath);

            var allFiles = Directory.GetFiles(folderPath, searchPattern, SearchOption.AllDirectories);
            var filesToExclude = Directory.GetFiles(folderPath, excludePattern, SearchOption.AllDirectories);

            var wantedFiles = allFiles.Except(filesToExclude);

            foreach (var file in allFiles)
            {
                bundle.Include(directoryVirtualPath + "/" + file);
            }

            return bundle;
        }
    }
}