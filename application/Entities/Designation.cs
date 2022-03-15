using System.ComponentModel.DataAnnotations;

namespace application.Entities
{
    public class Designation
    {
        [Key]
        public int DesignationId { get; set; }
        public string DesignationName { get; set; }
    }
}