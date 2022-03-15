using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace application.Models
{
    public class Department
    {
        public Department()
        {
            DEmployees = new HashSet<Employee>();
        }
        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }

        public ICollection<Employee> DEmployees { get; set; }

    }
}