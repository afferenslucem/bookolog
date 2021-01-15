using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.v2.Migrations
{
    public partial class DeletedManyToMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Collections_CollectionGuid",
                table: "Books");

            migrationBuilder.DropTable(
                name: "BookCollectionRecords");

            migrationBuilder.DropIndex(
                name: "IX_Books_CollectionGuid",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "CollectionGuid",
                table: "Books");

            migrationBuilder.AddColumn<Guid>(
                name: "CollectionId",
                table: "Books",
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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Collections",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "CollectionGuid",
                table: "Books",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BookCollectionRecords",
                columns: table => new
                {
                    Guid = table.Column<Guid>(type: "uuid", nullable: false),
                    BookId = table.Column<Guid>(type: "uuid", nullable: false),
                    CollectionId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "timestamptz", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "timestamptz", nullable: true),
                    ModifyDate = table.Column<DateTime>(type: "timestamptz", nullable: true),
                    Order = table.Column<short>(type: "smallint", nullable: true),
                    UserId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookCollectionRecords", x => x.Guid);
                    table.ForeignKey(
                        name: "FK_BookCollectionRecords_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Guid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookCollectionRecords_Collections_CollectionId",
                        column: x => x.CollectionId,
                        principalTable: "Collections",
                        principalColumn: "Guid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Books_CollectionGuid",
                table: "Books",
                column: "CollectionGuid");

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
