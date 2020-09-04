using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class Renamebookfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Genge",
                table: "Books",
                newName: "Genre");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Genre",
                table: "Books",
                newName: "Genge");
        }
    }
}
