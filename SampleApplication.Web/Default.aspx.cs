using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SampleApplication.Web
{
    public partial class Default : System.Web.UI.Page
    {
        public string Version
        {
            get
            {
                return File.GetLastWriteTime(typeof(Default).Assembly.ManifestModule.FullyQualifiedName).ToString("yyyyMMddHHmm");
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
        }
    }
}