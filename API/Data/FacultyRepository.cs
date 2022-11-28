using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FacultyRepository : IFacultyRepository
    {
        private readonly DataContext _context;

        public FacultyRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FacultyCycle>> GetCycles()
        {
            return await _context.FacultyCycles.ToListAsync();
        }

        public async Task<IEnumerable<Faculty>> GetFacultiesAsync()
        {
            return await _context.Faculties.ToListAsync();
        }

        public async Task<Faculty> GetFacultyByIdAsync(int id)
        {
            return await _context.Faculties.FindAsync(id);
        }

        public async Task<IEnumerable<Specialization>> GetSpecializationsByFacultyAndCycleAsync(int idFaculty, int idCycle)
        {
            return await _context.Specializations
                .Where(x => x.Faculty.Id == idFaculty && x.Cycle.Id == idCycle)
                .ToListAsync();
        }
    }
}
