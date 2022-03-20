using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace application.Models
{
    public class Designation
    {
        public int DesignationId { get; set; }

        [Required]
        public string DesignationName { get; set; }
    }
}