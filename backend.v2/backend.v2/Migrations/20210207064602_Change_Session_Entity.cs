using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.v2.Migrations
{
    public partial class Change_Session_Entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Users_UserId",
                table: "Sessions");

            migrationBuilder.DropIndex(
                name: "IX_Sessions_UserId",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "AccessExpired",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "RefreshExpired",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "SessionKey",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "SessionSalt",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Sessions");

            migrationBuilder.AddColumn<DateTime>(
                name: "ValidityExpired",
                table: "Sessions",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValidityExpired",
                table: "Sessions");

            migrationBuilder.AddColumn<DateTime>(
                name: "AccessExpired",
                table: "Sessions",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "RefreshExpired",
                table: "Sessions",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "SessionKey",
                table: "Sessions",
                type: "varchar(256)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SessionSalt",
                table: "Sessions",
                type: "varchar(256)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Sessions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_UserId",
                table: "Sessions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Users_UserId",
                table: "Sessions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
