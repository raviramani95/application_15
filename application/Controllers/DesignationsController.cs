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
    public class DesignationsController : ControllerBase
    {
        private readonly EmployeeContex _context;
        private readonly IMapper _mapper;

        public DesignationsController(EmployeeContex context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DesignationDto>>> GetDesignations()
        {
            var designations = await _context.Designation
                .ProjectTo<DesignationDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            /*var ds = _mapper.Map<IEnumerable<DepartmentDto>>(departments);*/
            return Ok(designations);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DesignationDto>> GetDesignation(int id)
        {
            var designation = await _context.Designation
                .ProjectTo<DesignationDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(w => w.DesignationId == id);

            if (designation == null) return NotFound();

            return Ok(designation);
        }

        [HttpPost]
        public async Task<ActionResult> AddDesignation(Designation designation)
        {
            /* var departmentName = department.DepartmentName;*/

            _context.Designation.Add(designation);
            await _context.SaveChangesAsync();

            return NoContent();
            /*return CreatedAtAction("GetDepartment", new { id = department.DepartmentId }, department);*/
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDesignation(int id, Designation designation)
        {
            if (id != designation.DesignationId)
            {
                return BadRequest();
            }
            if (!DesignationExists(id)) return BadRequest("Designation not found");

            _context.Entry(designation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DesignationExists(id))
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
        public async Task<IActionResult> DeleteDesignation(int id)
        {
            var designation = await _context.Designation.FindAsync(id);
            if (designation == null) return NotFound("Employee Not found");

            _context.Designation.Remove(designation);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool DesignationExists(int id)
        {
            return _context.Designation.Any(e => e.DesignationId == id);
        }
    }
}
