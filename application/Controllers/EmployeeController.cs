using application.Data;
using application.Models;
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

        public EmployeeController(EmployeeContex context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employee
                .AsNoTracking()
                .Include(i => i.Gender)
                .Include(i => i.Department)
                .Include(i => i.Designation)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employee
                .AsNoTracking()
                .Include(i => i.Gender)
                .Include(i => i.Department)
                .Include(i => i.Designation)
                .SingleOrDefaultAsync(w => w.EmployeeId == id);

            if (employee == null) return NotFound();

            return employee;
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> Edit(Employee employee)
        {
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetEmployee", new { id = employee.EmployeeId }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEmployee(int id, Employee employee)
        {
            if(id != employee.EmployeeId)
            {
                return BadRequest();
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
