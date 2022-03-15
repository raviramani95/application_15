using application.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace application.Data
{
    public class EmployeeContex : DbContext
    {
        public EmployeeContex(DbContextOptions<EmployeeContex> options): base(options)
        {

        }

        public DbSet<Employee> Employee { get; set; }
        public DbSet<Gender> Gender { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<Designation> Designation { get; set; }
    }
}
