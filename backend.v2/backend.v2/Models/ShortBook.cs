using System;

namespace backend.v2.Models
{
    public class ShortBook
    {
        public Guid? Guid { get; set; }
        public string Name { get; set; }
        public string[] Authors { get; set; }
        public Status? Status { get; set; }
        public short? EndDateYear { get; set; }
        public short? EndDateMonth { get; set; }
        public short? EndDateDay { get; set; }
        public DateTime? ModifyDate { get; set; }
        public DateTime? CreateDate { get; set; }

        public string Note { get; set; }
        public DateTime? EndDate
        {
            get
            {
                if (!this.EndDateYear.HasValue) return null;

                return new DateTime(this.EndDateYear ?? 1, this.EndDateMonth ?? 1, this.EndDateDay ?? 1);
            }
        }
    }
}
