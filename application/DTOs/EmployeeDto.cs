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
        public int Gender { get; set; }
/*
        [ForeignKey("Department")]*/
        public int Department { get; set; }

        [ForeignKey("Designation")]
        public int Designation { get; set; }
    }
}
