namespace API.Entities
{
    public class Specialization
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public FacultyCycle Cycle { get; set; }

        public Faculty Faculty { get; set; }

    }
}
