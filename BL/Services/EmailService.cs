using System;
using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace eFolio.BL.Services
{
    public class EmailService : IEmailSender
    {

        public async Task SendEmailAsync(string email, string name, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(name, "yelyzaveta.brednieva.pz.2016@lpnu.ua"));
            emailMessage.To.Add(new MailboxAddress("Efolio", "torautowaidu@gmail.com"));
            emailMessage.Subject = "eFolio support";
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = email + " " + message 
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 465, true);
                try
                {
                    await client.AuthenticateAsync("yelyzaveta.brednieva.pz.2016@lpnu.ua", "03.02.1999");

                }
                catch (Exception e)
                {
                    var ee = e; 
                    throw;
                }
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }
    }
}
