public class SMTPConfig {
    public string Host {get; set;}
    public int Port {get; set;}
    public string From {get; set;}
    public string User {get; set;}
}

public static class Config {
    public static string ConnectionString { get; set; }

    public static string[] AllowedOrigins { get; set; }

    public static SMTPConfig SMTP {get; set;} = new SMTPConfig();
}