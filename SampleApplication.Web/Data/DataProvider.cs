using Cogimator.SampleDataGenerator;
using SampleApplication.Web.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SampleApplication.Web.Data
{
    public class DataProvider : IDataProvider
    {
        private static readonly object Locker = new object();
        private static IEnumerable<Client> clients;
        private static IEnumerable<Recommandation> recommandations;

        public IEnumerable<Recommandation> GetRecommandations()
        {
            if (recommandations == null)
            {
                lock (Locker)
                {
                    if (recommandations == null)
                    {
                        recommandations = Generator.For<Recommandation>()
                            .For(x => x.Id)
                                .CreateUsing(() => Guid.NewGuid())
                            .For(x => x.Title)
                                .ChooseFrom("Cars", "Bikes", "Boats")
                            .Generate(3)
                            .ToList();
                    }
                }
            }

            return recommandations;
        }

        public IEnumerable<Client> GetClients()
        {
            if (clients == null)
            {
                clients = Generator.For<Client>()
                    .For(x => x.Id)
                        .CreateUsing(() => Guid.NewGuid())
                    .For(x => x.FirstName)
                        .ChooseFrom(StaticData.FirstNames)
                    .For(x => x.LastName)
                        .ChooseFrom(StaticData.LastNames)
                    .For(x => x.Company)
                        .ChooseFrom(StaticData.Companies)
                    .For(x => x.RegistrationDate)
                        .CreateUsing(() => DateTime.Now)
                    .For(x => x.Recommandations)
                        .CreateUsing(() => this.GetRecommandations().OrderBy(x => Guid.NewGuid()).Take(2).ToArray())
                    .Generate(20)

                .ToList();
            }

            return clients;
        }

        public IEnumerable<string> GetFirstNames()
        {
            return StaticData.FirstNames;
        }

        public Client Save(Client client)
        {
            var existing = this.GetClients().Single(x => x.Id == client.Id);

            existing.FirstName = client.FirstName;
            existing.LastName = client.LastName;
            existing.Company = client.Company;
            existing.RegistrationDate = client.RegistrationDate;
            existing.Recommandations = client.Recommandations;

            return existing;
        }
    }
}
