using SampleApplication.Web.Data.Models;
using System.Collections.Generic;

namespace SampleApplication.Web.Data
{
    public interface IDataProvider
    {
        IEnumerable<Recommandation> GetRecommandations();
        IEnumerable<Client> GetClients();
        IEnumerable<string> GetFirstNames();
        Client Save(Client client);
    }
}