using System;
using System.Collections.Generic;
using System.Text;

namespace Storage.Models
{
    public interface IStorageBook
    {
        long Id { get; set; }
        string Name { get; set; }
        string[] Authors { get; set; }
        int Status { get; set; }
        short? StartYear { get; set; }
        short? StartMonth { get; set; }
        short? StartDay { get; set; }
        short? EndYear { get; set; }
        short? EndMonth { get; set; }
        short? EndDay { get; set; }
        int? PagesRead { get; set; }
        int? TotalPages { get; set; }
        public long UserId { get; set; }
    }

    class Book : IStorageBook
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string[] Authors { get; set; }
        public int Status { get; set; }
        public short? StartYear { get; set; }
        public short? StartMonth { get; set; }
        public short? StartDay { get; set; }
        public short? EndYear { get; set; }
        public short? EndMonth { get; set; }
        public short? EndDay { get; set; }
        public int? PagesRead { get; set; }
        public int? TotalPages { get; set; }
        public long UserId { get; set; }

        public Book()
        {
        }

        public Book(IStorageBook book)
        {
            this.Id = book.Id;
            this.Name = book.Name;

            this.Authors = new string[book.Authors.Length];
            Array.Copy(book.Authors, this.Authors, book.Authors.Length);

            this.Status = book.Status;
            this.StartYear = book.StartYear;
            this.StartMonth = book.StartMonth;
            this.StartDay = book.StartDay;
            this.EndYear = book.EndYear;
            this.EndMonth = book.EndMonth;
            this.EndDay = book.EndDay;
            this.PagesRead = book.PagesRead;
            this.TotalPages = book.TotalPages;
            this.UserId = book.UserId;
        }
    }
}
