using System.ComponentModel.DataAnnotations;

namespace application.Entities
{
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }

    }
}