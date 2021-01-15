using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.v2.Migrations
{
    public partial class Added_Collection_Model : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Collections",
                columns: table => new
                {
                    Guid = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "varchar(512)", nullable: true),
                    Description = table.Column<string>(type: "varchar(2048)", nullable: true),
                    Type = table.Column<int>(nullable: false),
                    ModifyDate = table.Column<DateTime>(type: "timestamptz", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamptz", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "timestamptz", nullable: true),
                    CoverId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Collections", x => x.Guid);
                    table.ForeignKey(
                        name: "FK_Collections_Files_CoverId",
                        column: x => x.CoverId,
                        principalTable: "Files",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Collections_CoverId",
                table: "Collections",
                column: "CoverId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Collections");
        }
    }
}
