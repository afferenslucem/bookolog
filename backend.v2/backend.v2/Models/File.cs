using backend.v2.Configuration.Attributes;

namespace backend.v2.Models
{
    [SwaggerIgnore]
    public class File
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
    }
}
