﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using application.Data;

namespace application.Migrations
{
    [DbContext(typeof(EmployeeContex))]
    [Migration("20220315105402_seed_data")]
    partial class seed_data
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("application.Entities.Department", b =>
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

            modelBuilder.Entity("application.Entities.Designation", b =>
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

            modelBuilder.Entity("application.Entities.Employee", b =>
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
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmployeeLastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GenderId")
                        .HasColumnType("int");

                    b.HasKey("EmployeeId");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("DesignationId");

                    b.HasIndex("GenderId");

                    b.ToTable("Employee");
                });

            modelBuilder.Entity("application.Entities.Gender", b =>
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

            modelBuilder.Entity("application.Entities.Employee", b =>
                {
                    b.HasOne("application.Entities.Department", "Department")
                        .WithMany()
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("application.Entities.Designation", "Designation")
                        .WithMany()
                        .HasForeignKey("DesignationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("application.Entities.Gender", "Gender")
                        .WithMany()
                        .HasForeignKey("GenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");

                    b.Navigation("Designation");

                    b.Navigation("Gender");
                });
#pragma warning restore 612, 618
        }
    }
}
