using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.v2.Migrations
{
    public partial class AddedRereadingKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Books",
                type: "varchar(512)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(512)",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RereadingBookGuid",
                table: "Books",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Books_RereadingBookGuid",
                table: "Books",
                column: "RereadingBookGuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Books_RereadingBookGuid",
                table: "Books",
                column: "RereadingBookGuid",
                principalTable: "Books",
                principalColumn: "Guid",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Books_RereadingBookGuid",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_RereadingBookGuid",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "RereadingBookGuid",
                table: "Books");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Books",
                type: "varchar(512)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(512)");
        }
    }
}
