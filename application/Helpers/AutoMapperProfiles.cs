using application.DTOs;
using application.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace application.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Employee, EmployeeDto>()
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.GenderId))
                .ForMember(dest => dest.Department, opt => opt.MapFrom(src => src.DepartmentId))
                .ForMember(dest => dest.Designation, opt => opt.MapFrom(src => src.DesignationId));
            CreateMap<Gender, GenderDto>();
            CreateMap<Department, DepartmentDto>()
                .ForMember(dest => dest.DepartmentId, opt => opt.MapFrom(src => src.DepartmentId))
                .ForMember(dest => dest.DepartmentName, opt => opt.MapFrom(src => src.DepartmentName));
            CreateMap<Designation, DesignationDto>();
        }
    }
}
