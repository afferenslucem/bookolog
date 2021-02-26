namespace backend.v2.Services {
    public interface IConfigService
    {
        StorageConfig FileStorage { get; }
    }

    public class ConfigService : IConfigService
    {
        public StorageConfig FileStorage => Config.FileStorage;
    }
}
