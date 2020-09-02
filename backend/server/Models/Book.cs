using Server.Models;
using Storage.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
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
    public enum Type
    {
        Paper = 0,
        Electronic = 1,
        Audio = 2
    }

    public class Book
    {
        public string Guid { get; set; }
        public string Name { get; set; }
        public string[] Authors { get; set; }
        public int? Year { get; set; }
        public Status? Status { get; set; }
        public string[] Tags { get; set; }
        public int? DoneUnits { get; set; }
        public int? TotalUnits { get; set; }
        public string Genge { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ModifyDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Type? Type { get; set; }
        public string Note { get; set; }
        public long UserId { get; set; }

        public Book()
        {
        }

        public Book(Book book)
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

        public Book(IStorageBook book)
        {
            this.Guid = book.Guid;
            this.Name = book.Name;

            this.Authors = new string[book.Authors.Length];
            Array.Copy(book.Authors, this.Authors, book.Authors.Length);

            this.Year = book.Year;
            this.Status = (Status?)book.Status;

            this.Tags = new string[book.Tags.Length];
            Array.Copy(book.Tags, this.Tags, book.Tags.Length);
            
            this.DoneUnits = book.DoneUnits;
            this.TotalUnits = book.TotalUnits;
            this.Genge = book.Genge;
            this.StartDate = book.StartDate;
            this.ModifyDate = book.ModifyDate;
            this.EndDate = book.EndDate;
            this.Type = (Type?)book.Type;
            this.Note = book.Note;
            this.UserId = book.UserId;
        }
    }

    public class BookStorageAdapter : IStorageBook
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

        public BookStorageAdapter(Book book)
        {
            this.Guid = book.Guid;
            this.Name = book.Name;

            this.Authors = new string[book.Authors.Length];
            Array.Copy(book.Authors, this.Authors, book.Authors.Length);

            this.Year = book.Year;
            this.Status = (int?)book.Status;

            this.Tags = new string[book.Tags.Length];
            Array.Copy(book.Tags, this.Tags, book.Tags.Length);
            
            this.DoneUnits = book.DoneUnits;
            this.TotalUnits = book.TotalUnits;
            this.Genge = book.Genge;
            this.StartDate = book.StartDate;
            this.ModifyDate = book.ModifyDate;
            this.EndDate = book.EndDate;
            this.Type = (int?)book.Type;
            this.Note = book.Note;
            this.UserId = book.UserId;
        }

        public BookStorageAdapter()
        {
        }
    }
}
