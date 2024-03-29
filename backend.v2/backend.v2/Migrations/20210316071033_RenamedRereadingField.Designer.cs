﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend.v2.Storages;

namespace backend.v2.Migrations
{
    [DbContext(typeof(BookologContext))]
    [Migration("20210316071033_RenamedRereadingField")]
    partial class RenamedRereadingField
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("backend.v2.Models.Authentication.Session", b =>
                {
                    b.Property<Guid>("Guid")
                        .HasColumnType("uuid");

                    b.Property<string>("StateJson")
                        .HasColumnType("text");

                    b.Property<DateTime>("ValidityExpired")
                        .HasColumnType("timestamp without time zone");

                    b.HasIndex("Guid");

                    b.HasIndex("ValidityExpired");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("backend.v2.Models.Book", b =>
                {
                    b.Property<Guid?>("Guid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string[]>("Authors")
                        .HasColumnType("varchar(512)[]");

                    b.Property<Guid?>("CollectionGuid")
                        .HasColumnType("uuid");

                    b.Property<short?>("CollectionOrder")
                        .HasColumnType("smallint");

                    b.Property<DateTime?>("CreateDate")
                        .HasColumnType("timestamptz");

                    b.Property<DateTime?>("DeleteDate")
                        .HasColumnType("timestamptz");

                    b.Property<short?>("DoneUnits")
                        .HasColumnType("smallint");

                    b.Property<short?>("EndDateDay")
                        .HasColumnType("smallint");

                    b.Property<short?>("EndDateMonth")
                        .HasColumnType("smallint");

                    b.Property<short?>("EndDateYear")
                        .HasColumnType("smallint");

                    b.Property<string>("Genre")
                        .HasColumnType("varchar(256)");

                    b.Property<DateTime?>("ModifyDate")
                        .HasColumnType("timestamptz");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(512)");

                    b.Property<string>("Note")
                        .HasColumnType("text");

                    b.Property<string>("ProgressType")
                        .HasColumnType("varchar(16)");

                    b.Property<Guid?>("RereadingBookGuid")
                        .HasColumnType("uuid");

                    b.Property<short?>("StartDateDay")
                        .HasColumnType("smallint");

                    b.Property<short?>("StartDateMonth")
                        .HasColumnType("smallint");

                    b.Property<short?>("StartDateYear")
                        .HasColumnType("smallint");

                    b.Property<int?>("Status")
                        .HasColumnType("integer");

                    b.Property<string[]>("Tags")
                        .HasColumnType("varchar(256)[]");

                    b.Property<short?>("TotalUnits")
                        .HasColumnType("smallint");

                    b.Property<int?>("Type")
                        .HasColumnType("integer");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<short?>("Year")
                        .HasColumnType("smallint");

                    b.HasKey("Guid");

                    b.HasIndex("CollectionGuid");

                    b.HasIndex("RereadingBookGuid");

                    b.HasIndex("UserId");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("backend.v2.Models.Collection", b =>
                {
                    b.Property<Guid?>("Guid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<long?>("CoverId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("CreateDate")
                        .HasColumnType("timestamptz");

                    b.Property<DateTime?>("DeleteDate")
                        .HasColumnType("timestamptz");

                    b.Property<string>("Description")
                        .HasColumnType("varchar(2048)");

                    b.Property<DateTime?>("ModifyDate")
                        .HasColumnType("timestamptz");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(512)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Guid");

                    b.HasIndex("CoverId");

                    b.HasIndex("UserId");

                    b.ToTable("Collections");
                });

            modelBuilder.Entity("backend.v2.Models.File", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Path")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("backend.v2.Models.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long?>("AvatarId")
                        .HasColumnType("bigint");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(128)");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("varchar(128)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("varchar(256)");

                    b.Property<string>("Salt")
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("AvatarId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Login")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend.v2.Models.Book", b =>
                {
                    b.HasOne("backend.v2.Models.Collection", "Collection")
                        .WithMany("Books")
                        .HasForeignKey("CollectionGuid")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("backend.v2.Models.Book", "RereadingBook")
                        .WithMany("RereadedByBooks")
                        .HasForeignKey("RereadingBookGuid")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("backend.v2.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.v2.Models.Collection", b =>
                {
                    b.HasOne("backend.v2.Models.File", "Cover")
                        .WithMany()
                        .HasForeignKey("CoverId");

                    b.HasOne("backend.v2.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.v2.Models.User", b =>
                {
                    b.HasOne("backend.v2.Models.File", "Avatar")
                        .WithMany()
                        .HasForeignKey("AvatarId");
                });
#pragma warning restore 612, 618
        }
    }
}
