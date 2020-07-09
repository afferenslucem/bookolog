using Storage.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public enum Status
    {
        ToRead = 0,
        InProgress = 1,
        Done = 2
    }

    public class Book
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string[] Authors { get; set; }
        public Status Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? PagesRead { get; set; }
        public int? TotalPages { get; set; }

        public Book()
        {
        }

        public Book(Book book)
        {
            this.Id = book.Id;
            this.Name = book.Name;
            
            this.Authors = new string[book.Authors.Length];
            Array.Copy(this.Authors, book.Authors, book.Authors.Length);

            this.Status = book.Status;
            this.StartDate = book.StartDate;
            this.EndDate = book.EndDate;
            this.PagesRead = book.PagesRead;
            this.TotalPages = book.TotalPages;
        }

        public Book(IStorageBook book)
        {
            this.Id = book.Id;
            this.Name = book.Name;

            this.Authors = new string[book.Authors.Length];
            Array.Copy(book.Authors, this.Authors, book.Authors.Length);

            this.Status = (Status)book.Status;
            this.StartDate = book.StartDate;
            this.EndDate = book.EndDate;
            this.PagesRead = book.PagesRead;
            this.TotalPages = book.TotalPages;
        }
    }

    public class BookStorageAdapter : IStorageBook
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string[] Authors { get; set; }
        public int Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? PagesRead { get; set; }
        public int? TotalPages { get; set; }

        public BookStorageAdapter(Book book)
        {
            this.Id = book.Id;
            this.Name = book.Name;
            this.Authors = book.Authors;
            this.Status = (int)book.Status;
            this.StartDate = book.StartDate;
            this.EndDate = book.EndDate;
            this.PagesRead = book.PagesRead;
            this.TotalPages = book.TotalPages;
        }
    }
}
