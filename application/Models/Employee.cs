using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace application.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string EmployeeFirstName { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string EmployeeLastName { get; set; }

        [ForeignKey("GenderId")]
        public int GenderId { get; set; }
        public virtual Gender Gender { get; set; }

        [ForeignKey("DepartmentId")]
        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; }

        [ForeignKey("DesignationId")]
        public int DesignationId { get; set; }
        public virtual Designation Designation { get; set; }
    }
}
