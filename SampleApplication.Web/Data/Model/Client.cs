using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SampleApplication.Web.Data.Models
{
    public class Client
    {
        public Guid Id { get; set; }

        public DateTime? RegistrationDate { get; set; }

        public string Company { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [MaxLength(2, ErrorMessage = "Please choose 2 recommandations at maximum")]
        public Recommandation[] Recommandations { get; set; }
    }
}