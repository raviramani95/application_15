﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using application.Data;

namespace application.Migrations
{
    [DbContext(typeof(EmployeeContex))]
    partial class EmployeeContexModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("application.Models.Department", b =>
                {
                    b.Property<int>("DepartmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("DepartmentName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("DepartmentId");

                    b.ToTable("Department");

                    b.HasData(
                        new
                        {
                            DepartmentId = 1,
                            DepartmentName = "HR"
                        },
                        new
                        {
                            DepartmentId = 2,
                            DepartmentName = "Administrator"
                        },
                        new
                        {
                            DepartmentId = 3,
                            DepartmentName = "Account"
                        },
                        new
                        {
                            DepartmentId = 4,
                            DepartmentName = "Research & Development"
                        });
                });

            modelBuilder.Entity("application.Models.Designation", b =>
                {
                    b.Property<int>("DesignationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("DesignationName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("DesignationId");

                    b.ToTable("Designation");

                    b.HasData(
                        new
                        {
                            DesignationId = 1,
                            DesignationName = "HPEL"
                        },
                        new
                        {
                            DesignationId = 2,
                            DesignationName = "Associate Developer"
                        },
                        new
                        {
                            DesignationId = 3,
                            DesignationName = "Software Developer "
                        },
                        new
                        {
                            DesignationId = 4,
                            DesignationName = "Senior Developer"
                        },
                        new
                        {
                            DesignationId = 5,
                            DesignationName = "Tech Lead"
                        },
                        new
                        {
                            DesignationId = 6,
                            DesignationName = "Delivery Manager"
                        },
                        new
                        {
                            DesignationId = 7,
                            DesignationName = "HR"
                        },
                        new
                        {
                            DesignationId = 8,
                            DesignationName = "Technical Research"
                        },
                        new
                        {
                            DesignationId = 9,
                            DesignationName = "Administrator"
                        });
                });

            modelBuilder.Entity("application.Models.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int");

                    b.Property<int>("DesignationId")
                        .HasColumnType("int");

                    b.Property<string>("EmployeeFirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmployeeLastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GenderId")
                        .HasColumnType("int");

                    b.HasKey("EmployeeId");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("DesignationId");

                    b.HasIndex("GenderId");

                    b.ToTable("Employee");
                });

            modelBuilder.Entity("application.Models.Gender", b =>
                {
                    b.Property<int>("GenderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("GenderName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("GenderId");

                    b.ToTable("Gender");

                    b.HasData(
                        new
                        {
                            GenderId = 1,
                            GenderName = "Male"
                        },
                        new
                        {
                            GenderId = 2,
                            GenderName = "Female"
                        });
                });

            modelBuilder.Entity("application.Models.Employee", b =>
                {
                    b.HasOne("application.Models.Department", "Department")
                        .WithMany("DEmployees")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("application.Models.Designation", "Designation")
                        .WithMany()
                        .HasForeignKey("DesignationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("application.Models.Gender", "Gender")
                        .WithMany("Employees")
                        .HasForeignKey("GenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");

                    b.Navigation("Designation");

                    b.Navigation("Gender");
                });

            modelBuilder.Entity("application.Models.Department", b =>
                {
                    b.Navigation("DEmployees");
                });

            modelBuilder.Entity("application.Models.Gender", b =>
                {
                    b.Navigation("Employees");
                });
#pragma warning restore 612, 618
        }
    }
}
