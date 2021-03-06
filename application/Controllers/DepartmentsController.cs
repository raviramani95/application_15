using application.Data;
using application.DTOs;
using application.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly EmployeeContex _context;
        private readonly IMapper _mapper;

        public DepartmentsController(EmployeeContex context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentDto>>> GetDepartments()
        {
            var departments =  await _context.Department
                .ProjectTo<DepartmentDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            /*var ds = _mapper.Map<IEnumerable<DepartmentDto>>(departments);*/
            return Ok(departments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentDto>> GetDepartment(int id)
        {
            var department = await _context.Department
                .ProjectTo<DepartmentDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(w => w.DepartmentId == id);

            if (department == null) return NotFound();

            return Ok(department);
        }

        [HttpPost]
        public async Task<ActionResult> AddDepartment(Department department)
        {
           /* var departmentName = department.DepartmentName;*/
           
            _context.Department.Add(department);
            await _context.SaveChangesAsync();

            return NoContent();
            /*return CreatedAtAction("GetDepartment", new { id = department.DepartmentId }, department);*/
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDepartment(int id, Department department)
        {
            if (id != department.DepartmentId)
            {
                return BadRequest();
            }
            if (!DepartmentExists(id)) return BadRequest("Department not found");

            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDepartment(int id)
        {
            var department = await _context.Department.FindAsync(id);
            if (department == null) return NotFound("Employee Not found");

            _context.Department.Remove(department);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool DepartmentExists(int id)
        {
            return _context.Department.Any(e => e.DepartmentId == id);
        }


    }
}
