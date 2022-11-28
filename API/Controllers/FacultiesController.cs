using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class FacultiesController : Controller
    {
        private readonly IUnitOfWork _uow;
        public FacultiesController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Faculty>>> GetFaculties()
        {
            var faculties = await _uow.FacultyRepository.GetFacultiesAsync();

            return Ok(faculties);

        }

        [HttpGet("cycles")]
        public async Task<ActionResult<IEnumerable<FacultyCycle>>> GetCycles()
        {
            var cycles = await _uow.FacultyRepository.GetCycles();

            return Ok(cycles);
        }

        [HttpGet("specializations")]
        public async Task<ActionResult<IEnumerable<Specialization>>> GetSpecializations(int idFaculty, int idCycle)
        {
            var faculties = await _uow.FacultyRepository.GetSpecializationsByFacultyAndCycleAsync(idFaculty, idCycle);

            return Ok(faculties);
        }


    }
}
