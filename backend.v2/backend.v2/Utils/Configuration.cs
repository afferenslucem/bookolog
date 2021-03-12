using Microsoft.OpenApi.Models;

public class SMTPConfig
{
    public string Host { get; set; }
    public int Port { get; set; }
    public string From { get; set; }
    public string User { get; set; }
}

public class StorageConfig
{
    public string StoragePath { get; set; }
    public string[] AllowedExtensions { get; set; }
}

public class SessionChiperConfig
{
    public string Key { get; set; }
    public string Salt { get; set; }
}

public class CookieConfig
{
    public long AcceptTimeSeconds { get; set; }
    public long RefrashTimeSeconds { get; set; }
}

public static class Config
{
    
    
    public static string ConnectionString { get; set; }

    public static string[] AllowedOrigins { get; set; }

    public static SMTPConfig SMTP { get; set; } = new SMTPConfig();

    public static StorageConfig FileStorage { get; set; } = new StorageConfig();
    public static SessionChiperConfig SessionChiper { get; set; } = new SessionChiperConfig();
    public static CookieConfig Cookie { get; set; } = new CookieConfig();
}

public static class Version
{
    public static readonly string BuildVersion = "v0.4.10";

    public static readonly OpenApiInfo Info = new OpenApiInfo
    {
        Version = "v0.4",
        Title = "Bookolog API"
    };
}