using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace backend.v2.Migrations
{
    public partial class AddedFileModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastAction",
                table: "Users");

            migrationBuilder.AddColumn<long>(
                name: "AvatarId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true),
                    Path = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_AvatarId",
                table: "Users",
                column: "AvatarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Files_AvatarId",
                table: "Users",
                column: "AvatarId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Files_AvatarId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Users_AvatarId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AvatarId",
                table: "Users");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastAction",
                table: "Users",
                type: "timestamp without time zone",
                nullable: true);
        }
    }
}
