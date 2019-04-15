using System;
using System.Net;
using System.Threading.Tasks;
using eFolio.API.Models;
using eFolio.Attibutes;
using eFolio.BL;
using eFolio.EF;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace eFolio.API
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private ILogger _logger;
        private UserManager<UserEntity> _userManager;
        private IAdminService _adminService;
        private AuthDBContext _auth;

        public AdminController(ILogger<AdminController> logger,
                               UserManager<UserEntity> userManager,
                               AuthDBContext auth,
                               IAdminService adminService)
        {
            this._logger = logger;
            this._userManager = userManager;
            this._auth = auth;
            this._adminService = adminService;
        }

        [HttpGet] 
        [HasClaim("role", "admin")]
        public async Task<IActionResult> GetUsersList()
        {
            try
            {
                return Ok(await _adminService.GetUsersListAsync());
            }
            catch(Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("{id}")]  
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _adminService.GetUserAsync(id);
                if(user == null)
                {
                    return NotFound(id);
                }
                return Ok(user);
            }
            catch(Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }

        // POST api/<controller>
        [HttpPost] 
        [HasClaim("role", "admin")]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut]
        [HasClaim("role", "admin")]
        public async Task<IActionResult> Edit(UserEntity user)
        {
            try
            {
                await _adminService.UpdateAsync(user);
                return Ok();
            }
            catch(Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        [HasClaim("role", "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _adminService.DeleteAsync(id);
                return Ok();               
            }
            catch(Exception ex)
            {
                _logger.LogWarning(ex, string.Empty);
                return StatusCode((int)HttpStatusCode.InternalServerError, new ErrorResponse(ex));
            }
        }
    }
}
