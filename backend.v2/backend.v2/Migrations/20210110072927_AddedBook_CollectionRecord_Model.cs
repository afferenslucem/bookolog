using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.v2.Migrations
{
    public partial class AddedBook_CollectionRecord_Model : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookCollectionRecords",
                columns: table => new
                {
                    Guid = table.Column<Guid>(type: "uuid", nullable: false),
                    CollectionId = table.Column<Guid>(type: "uuid", nullable: true),
                    BookId = table.Column<Guid>(type: "uuid", nullable: true),
                    Order = table.Column<short>(nullable: false),
                    ModifyDate = table.Column<DateTime>(type: "timestamptz", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamptz", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "timestamptz", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookCollectionRecords", x => x.Guid);
                    table.ForeignKey(
                        name: "FK_BookCollectionRecords_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Guid",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BookCollectionRecords_Collections_CollectionId",
                        column: x => x.CollectionId,
                        principalTable: "Collections",
                        principalColumn: "Guid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookCollectionRecords_BookId_CollectionId",
                table: "BookCollectionRecords",
                columns: new[] { "BookId", "CollectionId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BookCollectionRecords_CollectionId_Order",
                table: "BookCollectionRecords",
                columns: new[] { "CollectionId", "Order" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookCollectionRecords");
        }
    }
}
