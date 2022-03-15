using System.ComponentModel.DataAnnotations;

namespace application.Entities
{
    public class Gender
    {
        [Key]
        public int GenderId { get; set; }
        public string GenderName { get; set; }
    }
}