using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.v2.Migrations
{
    public partial class Added_Fields_To_Session : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Salt",
                table: "Users",
                type: "varchar(256)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SessionKey",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "SessionSalt",
                table: "Sessions");

            migrationBuilder.AlterColumn<string>(
                name: "Salt",
                table: "Users",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(256)",
                oldNullable: true);
        }
    }
}
