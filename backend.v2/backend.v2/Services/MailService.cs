using System.Threading.Tasks;
using backend.v2.Models;
using MailKit.Net.Smtp;
using MimeKit;

namespace backend.v2.Services
{
    public interface IMailService
    {
        Task SendFreeMessage(User user, string subject, string content);
        Task SendPasswordRecover(User user, string newPassword);
    }

    public class MailService : IMailService
    {
        public async Task SendPasswordRecover(User user, string newPassword)
        {
            var body = "<div>Вы запросили сброс пароля.</div>" +
                      $"<div>Ваш новый пароль: <b>{newPassword}</b></div>";

            await this.SendFreeMessage(user, "Восстановление доступа к аккаунту", body);
        }

        public async Task SendFreeMessage(User user, string subject, string content)
        {
            var message = new MimeMessage();

            var from = new MailboxAddress(Config.SMTP.User, Config.SMTP.From);
            message.From.Add(from);

            var to = new MailboxAddress(user.Login, user.Email);
            message.To.Add(to);

            message.Subject = subject;

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = content;

            message.Body = bodyBuilder.ToMessageBody();

            await SendMessage(message);
        }

        private async Task SendMessage(MimeMessage message) {
            using var client = new SmtpClient();

            await client.ConnectAsync(Config.SMTP.Host, Config.SMTP.Port);

            await client.SendAsync(message);

            await client.DisconnectAsync(true);
        }
    }
}
