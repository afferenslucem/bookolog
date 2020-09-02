using System;
using System.Collections.Generic;
using System.Text;

namespace Storage.Models
{
    public interface IStorageBook
    {
        public string Guid { get; set; }
        public string Name { get; set; }
        public string[] Authors { get; set; }
        public int? Year { get; set; }
        public int? Status { get; set; }
        public string[] Tags { get; set; }
        public int? DoneUnits { get; set; }
        public int? TotalUnits { get; set; }
        public string Genge { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ModifyDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? Type { get; set; }
        public string Note { get; set; }
        public long UserId { get; set; }
    }

    class Book : IStorageBook
    {
        public string Guid { get; set; }
        public string Name { get; set; }
        public string[] Authors { get; set; }
        public int? Year { get; set; }
        public int? Status { get; set; }
        public string[] Tags { get; set; }
        public int? DoneUnits { get; set; }
        public int? TotalUnits { get; set; }
        public string Genge { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ModifyDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? Type { get; set; }
        public string Note { get; set; }
        public long UserId { get; set; }

        public Book()
        {
        }

        public Book(IStorageBook book)
        {
            this.Guid = book.Guid;
            this.Name = book.Name;

            this.Authors = new string[book.Authors.Length];
            Array.Copy(book.Authors, this.Authors, book.Authors.Length);

            this.Year = book.Year;
            this.Status = book.Status;

            this.Tags = new string[book.Tags.Length];
            Array.Copy(book.Tags, this.Tags, book.Tags.Length);

            this.DoneUnits = book.DoneUnits;
            this.TotalUnits = book.TotalUnits;
            this.Genge = book.Genge;
            this.StartDate = book.StartDate;
            this.ModifyDate = book.ModifyDate;
            this.EndDate = book.EndDate;
            this.Type = book.Type;
            this.Note = book.Note;
            this.UserId = book.UserId;
        }
    }
}
