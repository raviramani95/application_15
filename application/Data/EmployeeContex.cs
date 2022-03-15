using application.Models;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee");

                entity.HasOne(d => d.Gender)
                .WithMany(d => d.Employees);
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.ToTable("Department");

                entity.HasMany(d => d.DEmployees)
                .WithOne(d => d.Department);
            });



            modelBuilder.Entity<Department>()
             .HasData(
                new Department{ DepartmentId = 1, DepartmentName = "HR"},
                new Department { DepartmentId = 2, DepartmentName = "Administrator" },
                new Department { DepartmentId = 3, DepartmentName = "Account" },
                new Department { DepartmentId = 4, DepartmentName = "Research & Development" }
              );

            modelBuilder.Entity<Designation>()
                .HasData(
                    new Designation { DesignationId = 1, DesignationName = "HPEL" },
                    new Designation { DesignationId = 2, DesignationName = "Associate Developer" },
                    new Designation { DesignationId = 3, DesignationName = "Software Developer " },
                    new Designation { DesignationId = 4, DesignationName = "Senior Developer" },
                    new Designation { DesignationId = 5, DesignationName = "Tech Lead" },
                    new Designation { DesignationId = 6, DesignationName = "Delivery Manager" },
                    new Designation { DesignationId = 7, DesignationName = "HR" },
                    new Designation { DesignationId = 8, DesignationName = "Technical Research" },
                    new Designation { DesignationId = 9, DesignationName = "Administrator" }
                );

            modelBuilder.Entity<Gender>()
                .HasData(
                    new Gender { GenderId = 1, GenderName = "Male"},
                    new Gender { GenderId = 2, GenderName = "Female" }
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}
