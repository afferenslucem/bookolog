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
        DateTime? StartDate { get; set; }
        DateTime? EndDate { get; set; }
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
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
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
            this.StartDate = book.StartDate;
            this.EndDate = book.EndDate;
            this.PagesRead = book.PagesRead;
            this.TotalPages = book.TotalPages;
            this.UserId = book.UserId;
        }
    }
}
