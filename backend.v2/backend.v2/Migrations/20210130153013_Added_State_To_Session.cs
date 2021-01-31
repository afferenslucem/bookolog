using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.v2.Migrations
{
    public partial class Added_State_To_Session : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BrowserData",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "ModifyDate",
                table: "Sessions");

            migrationBuilder.AddColumn<string>(
                name: "StateJson",
                table: "Sessions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StateJson",
                table: "Sessions");

            migrationBuilder.AddColumn<string>(
                name: "BrowserData",
                table: "Sessions",
                type: "varchar(512)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "Sessions",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "Sessions",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifyDate",
                table: "Sessions",
                type: "timestamp without time zone",
                nullable: true);
        }
    }
}
