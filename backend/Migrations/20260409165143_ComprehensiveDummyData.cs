using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ComprehensiveDummyData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminLevel",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "AverageOrderValue",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "CompletionRate",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CuisineType",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "MemberSince",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PlatformAverageEarnings",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Rating",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalOrders",
                table: "Users",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalRides",
                table: "Users",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalTrips",
                table: "Users",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "WeeklyEarnings",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Zone",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DriverId",
                table: "Trips",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<decimal>(
                name: "DriverEarnings",
                table: "Trips",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AddColumn<decimal>(
                name: "BaseFare",
                table: "Trips",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "DemandLevel",
                table: "Trips",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Distance",
                table: "Trips",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "DriverAvailability",
                table: "Trips",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LinkedDecisionId",
                table: "Trips",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SurgeReason",
                table: "Trips",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DisparityText",
                table: "FairnessMetrics",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PlatformAverage",
                table: "FairnessMetrics",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SecondaryValue",
                table: "FairnessMetrics",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlainLanguageSummary",
                table: "Decisions",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TripId",
                table: "Decisions",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppealId",
                table: "AuditLogs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssignedAdmin",
                table: "Appeals",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EstimatedResolution",
                table: "Appeals",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminLevel",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AverageOrderValue",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CompletionRate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CuisineType",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MemberSince",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PlatformAverageEarnings",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TotalOrders",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TotalRides",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TotalTrips",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "WeeklyEarnings",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Zone",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BaseFare",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "DemandLevel",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "Distance",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "DriverAvailability",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "LinkedDecisionId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "SurgeReason",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "DisparityText",
                table: "FairnessMetrics");

            migrationBuilder.DropColumn(
                name: "PlatformAverage",
                table: "FairnessMetrics");

            migrationBuilder.DropColumn(
                name: "SecondaryValue",
                table: "FairnessMetrics");

            migrationBuilder.DropColumn(
                name: "PlainLanguageSummary",
                table: "Decisions");

            migrationBuilder.DropColumn(
                name: "TripId",
                table: "Decisions");

            migrationBuilder.DropColumn(
                name: "AppealId",
                table: "AuditLogs");

            migrationBuilder.DropColumn(
                name: "AssignedAdmin",
                table: "Appeals");

            migrationBuilder.DropColumn(
                name: "EstimatedResolution",
                table: "Appeals");

            migrationBuilder.AlterColumn<string>(
                name: "DriverId",
                table: "Trips",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "DriverEarnings",
                table: "Trips",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
