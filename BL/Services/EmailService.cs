//using System;
//using System.Collections.Generic;
//using System.Text;
//using MimeKit;
//using MailKit.Net.Smtp;
//using System.Threading.Tasks;


//namespace eFolio.BL.Services
//{
//   public class EmailService
//    {

//        public async Task SendEmailAsync(string email, string name, string message)
//        {
//            var emailMessage = new MimeMessage();

//            emailMessage.From.Add(new MailboxAddress(name, email));
//            emailMessage.To.Add(new MailboxAddress("Efolio", "torautowaidu@gmail.com"));
//            emailMessage.Subject = "Customer support";
//            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
//            {
//                Text = message
//            };

//            using (var client = new SmtpClient())
//            {
//                await client.ConnectAsync("smtp.gmail.com", 25, false);
//                //await client.AuthenticateAsync("torautowaidu@gmail.com", "password");
//                await client.SendAsync(emailMessage);

//                await client.DisconnectAsync(true);
//            }
//        }
//    }
//}
