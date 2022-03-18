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
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeContex _context;
        private readonly IMapper _mapper;

        public EmployeeController(EmployeeContex context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
        {
            var employees = await _context.Employee
                .ToListAsync();
            var emps = _mapper.Map<IEnumerable<EmployeeDto>>(employees);

            return Ok(emps);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(int id)
        {
            EmployeeDto employee = await _context.Employee
                .Include(i => i.Gender)
                .Include(i => i.Department)
                .Include(i => i.Designation)
                .Select(
                   b => new EmployeeDto()
                   {
                       EmployeeId = b.EmployeeId,
                       EmployeeFirstName = b.EmployeeFirstName,
                       EmployeeLastName = b.EmployeeLastName,
                       Gender = b.Gender.GenderName,
                       Department = b.Department.DepartmentName,
                       Designation = b.Designation.DesignationName
                   }).SingleOrDefaultAsync(c => c.EmployeeId == id);

            /*var employee = await _context.Employee
                *//*.AsNoTracking()
                .Include(i => i.Gender)
                .Include(i => i.Department)
                .Include(i => i.Designation)*//*
                .ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(w => w.EmployeeId == id);

            if (employee == null) return NotFound();*/

            /*employee.Gender = _context.Gender.SingleOrDefaultAsync(w => w.GenderId == int.Parse(employee.Gender));*/

            /*var emp = _mapper.Map<IEnumerable<EmployeeDto>>(employee);*/

            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult> AddEmployee(Employee employee)
        {
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();

            return NoContent();
            /*return CreatedAtAction("GetEmployee", new { id = employee.EmployeeId }, employee);*/
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEmployee(int id, Employee employee)
        {
            if(id != employee.EmployeeId)
            {
                return BadRequest();
            }
            if (!EmployeeExists(id))
            {
                return BadRequest("Employee Alredy exists");
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (!EmployeeExists(id))
            {
                return BadRequest("Employee Not Found");
            }
            var employee = await _context.Employee.FindAsync(id);
            if (employee == null) return NotFound("Employee Not found");

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool EmployeeExists(int id)
        {
            return _context.Employee.Any(e => e.EmployeeId == id);
        }
    }
}
