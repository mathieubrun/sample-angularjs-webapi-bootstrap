<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Jasmine Spec Runner v2.0.0</title>

    <link rel="shortcut icon" type="image/png" href="lib/jasmine/jasmine_favicon.png">
    <link rel="stylesheet" type="text/css" href="lib/jasmine/jasmine.css">

    <script type="text/javascript" src="lib/jasmine/jasmine.js"></script>
    <script type="text/javascript" src="lib/jasmine/jasmine-html.js"></script>
    <script type="text/javascript" src="lib/jasmine/boot.js"></script>

    <script type="text/javascript" src="lib/blanket/blanket.js"> </script>
    <script type="text/javascript" src="lib/blanket/jasmine-blanket.js"></script>
    <script type="text/javascript" src="lib/blanket/console_runner.js"></script>

    <!-- include source files here... -->
    <%: Scripts.Render("~/app/common")%>
    <%: Scripts.RenderFormat("<script type='text/javascript' src='{0}' data-cover></script>", "~/app/sampleApplication")%>

    <!-- include spec files here... -->
    <%: Scripts.Render("~/app/commonTests") %>
    <%: Scripts.Render("~/app/sampleApplicationTests")%>
</head>

<body>
</body>
</html>
