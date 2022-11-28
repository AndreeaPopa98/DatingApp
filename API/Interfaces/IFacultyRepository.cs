using API.Entities;

namespace API.Interfaces
{
    public interface IFacultyRepository
    {
        Task<IEnumerable<Faculty>> GetFacultiesAsync();
        Task<Faculty> GetFacultyByIdAsync(int id);
        Task<IEnumerable<Specialization>> GetSpecializationsByFacultyAndCycleAsync(int idFaculty, int idCycle);
        Task<IEnumerable<FacultyCycle>> GetCycles();
    }
}
