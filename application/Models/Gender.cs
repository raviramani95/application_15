using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace application.Models
{
    public class Gender
    {
        public Gender()
        {
            Employees = new HashSet<Employee>();
        }
        public int GenderId { get; set; }

        [Required]
        public string GenderName { get; set; }

        public ICollection<Employee> Employees { get; set; }
    }
}