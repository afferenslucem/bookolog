﻿using Microsoft.EntityFrameworkCore;
using System;
using backend.v2.Models;
using backend.v2.Models.Authentication;

namespace backend.v2.Storages
{
    public class BookologContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Collection> Collections { get; set; }

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

            modelBuilder.Entity<Session>().HasQueryFilter(item => item.ValidityExpired > DateTime.Now);

            modelBuilder.Entity<Session>()
                .HasNoKey()
                .HasIndex("ValidityExpired");

            modelBuilder.Entity<Session>()
                .HasIndex("Guid");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(Config.ConnectionString);
    }
}
