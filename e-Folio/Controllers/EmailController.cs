//using eFolio.API.Models;
//using eFolio.BL;
//using eFolio.BL.Services;
//using eFolio.DTO;
//using eFolio.DTO.Common;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Logging;
//using System;
//using System.Collections.Generic;
//using System.Net;
//using System.Threading.Tasks;

//namespace eFolio.API.Controllers
//{
//    public class EmailController : ControllerBase
//    {
//        public async Task<IActionResult> SendMessage()
//        {
//            EmailService emailService = new EmailService();
//            await emailService.SendEmailAsync("somemail@gmail.com", "User", "Hello world");
//            return RedirectToAction("Index");
//        }
//        // GET: /<controller>/
//        //public IActionResult Index()
//        //{
//        //    return ViewResult();
//        //}
//    }
//}
