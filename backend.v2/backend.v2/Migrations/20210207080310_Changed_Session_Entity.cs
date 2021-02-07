using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.v2.Migrations
{
    public partial class Changed_Session_Entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Sessions",
                table: "Sessions");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_Guid",
                table: "Sessions",
                column: "Guid");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_ValidityExpired",
                table: "Sessions",
                column: "ValidityExpired");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Sessions_Guid",
                table: "Sessions");

            migrationBuilder.DropIndex(
                name: "IX_Sessions_ValidityExpired",
                table: "Sessions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sessions",
                table: "Sessions",
                column: "Guid");
        }
    }
}
