using eFolio.API.Models;
using eFolio.BL;
using eFolio.DTO;
using eFolio.DTO.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;
using eFolio.Attibutes;
using System.Linq;
using System.Threading.Tasks;

namespace eFolio.Api.Controllers
{
    public class RequestBody<T>
    {
        public T Item { get; set; }
    }

    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private static readonly string[] haveExtraPermissions = new string[] { "admin", "sales" };
        private static string default_options = "screenshots,developers";
        private IProjectService _projectService;
        private ILogger _logger;

        public ProjectController(
            IProjectService projectService,
            ILogger<ProjectController> logger)
        {
            _projectService = projectService;
            _logger = logger;
        }

        private DescriptionKind GetDescriptionKindForRequest()
        {
            return User != null && User.Claims.Any() && haveExtraPermissions.Contains(User.Claims.First().Value) ?
                DescriptionKind.Internal :
                DescriptionKind.External;
        }

        [HttpGet] 
        public async Task<IActionResult> GetProjects()
        {
            try
            {
                return Ok(await _projectService.GetItemsListAsync(GetDescriptionKindForRequest()));
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }

        [HttpGet("size")]
        public async Task<IActionResult> GetProjectSize()
        {
            try
            {
                return Ok(await _projectService.GetSizeAsync());
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }

        [HttpGet("search/{request}")] 
        public async Task<IActionResult> SearchProjects(string request, [FromQuery] int from, [FromQuery] int size)
        {
            try
            {
                return Ok(
                    await _projectService.SearchAsync(
                        request, new Paging(from, size), GetDescriptionKindForRequest()
                    )
                );
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }

        [HttpGet("{id}")]   
        public async Task<IActionResult> GetProject(int id, string options)
        {
            try
            {
                var project = await _projectService.GetItemAsync(
                    id, GetDescriptionKindForRequest(), (options ?? default_options).Split(',')
                );
                if (project == null)
                {
                    return NotFound(id);
                }
                return Ok(project);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }

        [HttpDelete("{id}")]  
        [HasClaim("role", "admin", "sales")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            try
            {
                await _projectService.DeleteAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }

        [HttpPost] 
        [HasClaim("role", "admin", "sales")]
        public async Task<IActionResult> MakeNewProject([FromBody] Project project)
        {
            try
            {
                await _projectService.AddAsync(project);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);

                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }     
        }

        [HttpPut("{project}/details")] 
        [HasClaim("role", "admin", "sales")]
        public async Task<IActionResult> EditDetails(int project, [FromBody] Context details)
        {
            try
            {
                await _projectService.UpdateDetailsAsync(project, details);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }

        [HttpDelete("{project}/screenshots")]  
        [HasClaim("role", "admin", "sales") ]
        public async Task<IActionResult> DeleteScreenshots(int project, [FromBody] RequestBody<int[]> deleted)
        {
            try
            {
                await _projectService.DeleteScreeenshotsAsync(project, deleted.Item);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }

        [HttpPut("{project}/screenshots")] 
        [HasClaim("role", "admin", "sales")]
        public async Task<IActionResult> UpdateScreenshots(int project, [FromBody] Dictionary<int, FolioFile> files)
        {
            try
            {
                await _projectService.UpdateScreenshotsAsync(project, files);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }

        [HttpPut] 
        [HasClaim("role", "admin", "sales")]
        public async Task<IActionResult> Edit([FromBody] Project project)
        {
            try
            {
                await _projectService.UpdateAsync(project);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }
    }
}