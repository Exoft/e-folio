using eFolio.API.Models;
using eFolio.BL;
using eFolio.BL.Services;
using eFolio.DTO;
using eFolio.DTO.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace eFolio.API.Controllers
{ 
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        public class EmailData
        {
            public string Email { get; set; }
            public string Name { get; set; }
            public string Message { get; set; }
        }
        public async Task<IActionResult> SendMessage([FromBody] EmailData emailData)
        {
            EmailService emailService = new EmailService();
            await emailService.SendEmailAsync(emailData.Email, emailData.Name, emailData.Message);
            return Ok();
        }
       
    }
}
