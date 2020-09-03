using backend.v2.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.v2.Storage
{
    public class BookologContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex("Login").IsUnique();
            modelBuilder.Entity<User>()
                .HasIndex("Email").IsUnique();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Server=localhost;Port=45432;Database=bookolog;User Id=bookolog;Password=masterkey;");
    }
}
