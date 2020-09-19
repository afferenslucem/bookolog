using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.v2.Migrations
{
    public partial class Addednewdatefields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "Books",
                type: "timestamptz",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "EndDateDay",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "EndDateMonth",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "EndDateYear",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "StartDateDay",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "StartDateMonth",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "StartDateYear",
                table: "Books",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "EndDateDay",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "EndDateMonth",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "EndDateYear",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "StartDateDay",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "StartDateMonth",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "StartDateYear",
                table: "Books");
        }
    }
}
