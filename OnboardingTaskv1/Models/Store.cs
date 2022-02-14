using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace OnboardingTaskv1.Models
{
    public partial class Store
    {
        public Store()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
