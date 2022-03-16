using application.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace application.DTOs
{
    public class EmployeeDto
    {
        public int EmployeeId { get; set; }
        public string EmployeeFirstName { get; set; }
        public string EmployeeLastName { get; set; }
/*
        [ForeignKey("Gender")]*/
        public string Gender { get; set; }
/*
        [ForeignKey("Department")]*/
        public string Department { get; set; }

        [ForeignKey("Designation")]
        public string Designation { get; set; }
    }
}
