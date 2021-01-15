using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.v2.Migrations
{
    public partial class Changed_Key_Types : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookCollectionRecords_Books_BookId",
                table: "BookCollectionRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_BookCollectionRecords_Collections_CollectionId",
                table: "BookCollectionRecords");

            migrationBuilder.AddColumn<Guid>(
                name: "CollectionGuid",
                table: "Books",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CollectionId",
                table: "BookCollectionRecords",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "BookId",
                table: "BookCollectionRecords",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Books_CollectionGuid",
                table: "Books",
                column: "CollectionGuid");

            migrationBuilder.AddForeignKey(
                name: "FK_BookCollectionRecords_Books_BookId",
                table: "BookCollectionRecords",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Guid",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookCollectionRecords_Collections_CollectionId",
                table: "BookCollectionRecords",
                column: "CollectionId",
                principalTable: "Collections",
                principalColumn: "Guid",
                onDelete: ReferentialAction.Cascade);

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
                name: "FK_BookCollectionRecords_Books_BookId",
                table: "BookCollectionRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_BookCollectionRecords_Collections_CollectionId",
                table: "BookCollectionRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_Books_Collections_CollectionGuid",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_CollectionGuid",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "CollectionGuid",
                table: "Books");

            migrationBuilder.AlterColumn<Guid>(
                name: "CollectionId",
                table: "BookCollectionRecords",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<Guid>(
                name: "BookId",
                table: "BookCollectionRecords",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_BookCollectionRecords_Books_BookId",
                table: "BookCollectionRecords",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Guid",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BookCollectionRecords_Collections_CollectionId",
                table: "BookCollectionRecords",
                column: "CollectionId",
                principalTable: "Collections",
                principalColumn: "Guid",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
