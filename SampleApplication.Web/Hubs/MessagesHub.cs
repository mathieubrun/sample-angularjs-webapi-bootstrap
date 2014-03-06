using Microsoft.AspNet.SignalR;
using SampleApplication.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SampleApplication.Web.Hubs
{
    public class MessagesHub : Hub
    {
        public void Send(string name, string message)
        {
            Clients.All.addNewMessageToPage(name, message);
        }
    }
}