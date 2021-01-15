using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.v2.Migrations
{
    public partial class RenamedColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Collections_CollectionId",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_CollectionId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "CollectionId",
                table: "Books");

            migrationBuilder.AddColumn<Guid>(
                name: "CollectionGuid",
                table: "Books",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Books_CollectionGuid",
                table: "Books",
                column: "CollectionGuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Collections_CollectionGuid",
                table: "Books",
                column: "CollectionGuid",
                principalTable: "Collections",
                principalColumn: "Guid",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Collections_CollectionGuid",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_CollectionGuid",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "CollectionGuid",
                table: "Books");

            migrationBuilder.AddColumn<Guid>(
                name: "CollectionId",
                table: "Books",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Books_CollectionId",
                table: "Books",
                column: "CollectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Collections_CollectionId",
                table: "Books",
                column: "CollectionId",
                principalTable: "Collections",
                principalColumn: "Guid",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
