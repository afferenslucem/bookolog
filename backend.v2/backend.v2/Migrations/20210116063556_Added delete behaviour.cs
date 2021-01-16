using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.v2.Migrations
{
    public partial class Addeddeletebehaviour : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Collections_CollectionGuid",
                table: "Books");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Collections_CollectionGuid",
                table: "Books",
                column: "CollectionGuid",
                principalTable: "Collections",
                principalColumn: "Guid",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Collections_CollectionGuid",
                table: "Books");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Collections_CollectionGuid",
                table: "Books",
                column: "CollectionGuid",
                principalTable: "Collections",
                principalColumn: "Guid",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
