
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SampleApplication.Web.Default" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <%: Styles.Render("~/css/common") %>
</head>
<body ng-app="SampleApplication">
    <div ng-view>
    </div>

    <%: Scripts.Render("~/app/common") %>
    <%: Scripts.Render("~/app/sampleApplication") %>

    <script type="text/javascript">
        angular.module('SampleApplication.Config', [])
            .constant('SampleApplicationVersion', '<%: Version %>');
    </script>
</body>
</html>
