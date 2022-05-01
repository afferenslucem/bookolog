using Microsoft.EntityFrameworkCore;
using System;
using backend.v2.Models;
using backend.v2.Models.Authentication;
using Microsoft.Extensions.Logging;

namespace backend.v2.Storages
{
    public class BookologContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Collection> Collections { get; set; }

        private ILoggerFactory loggerFactory = LoggerFactory.Create(builder => { builder.AddConsole(); });

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex("Login").IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex("Email").IsUnique();

            modelBuilder.Entity<Book>()
                .HasQueryFilter(item => item.DeleteDate == null);

            modelBuilder.Entity<Collection>()
                .HasQueryFilter(item => item.DeleteDate == null);

            modelBuilder.Entity<Book>()
            .HasOne(item => item.Collection)
            .WithMany(item => item.Books)
            .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Book>()
                .HasOne(b => b.RereadingBook)
                .WithMany(b => b.RereadedByBooks)
                .OnDelete(DeleteBehavior.SetNull);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(Config.ConnectionString);

            if (!Config.IsProduction)
            {
                optionsBuilder.UseLoggerFactory(this.loggerFactory);
            }
        }
    }
}
