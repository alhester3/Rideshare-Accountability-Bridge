using AccountabilityBridge.Models;

namespace AccountabilityBridge.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext db)
    {
        if (db.Users.Any())
        {
            return;
        }

        var now = DateTime.UtcNow;

        var users = new List<User>
        {
            new() { UserId = "r1", Name = "Emily", Email = "emily@example.com", Role = "Rider", AccountStatus = "Flagged", CreatedAt = now.AddMonths(-4), LastActivity = now.AddDays(-1) },
            new() { UserId = "r2", Name = "David", Email = "david@example.com", Role = "Rider", AccountStatus = "Active", CreatedAt = now.AddMonths(-3), LastActivity = now.AddDays(-1) },
            new() { UserId = "r3", Name = "Sarah", Email = "sarah@example.com", Role = "Rider", AccountStatus = "Active", CreatedAt = now.AddMonths(-2), LastActivity = now.AddDays(-2) },
            new() { UserId = "r4", Name = "Noah", Email = "noah@example.com", Role = "Rider", AccountStatus = "Active", CreatedAt = now.AddMonths(-2), LastActivity = now.AddDays(-3) },
            new() { UserId = "r5", Name = "Mia", Email = "mia@example.com", Role = "Rider", AccountStatus = "Active", CreatedAt = now.AddMonths(-2), LastActivity = now.AddDays(-4) },
            new() { UserId = "r6", Name = "Liam", Email = "liam@example.com", Role = "Rider", AccountStatus = "Active", CreatedAt = now.AddMonths(-2), LastActivity = now.AddDays(-5) },
            new() { UserId = "r7", Name = "Olivia", Email = "olivia@example.com", Role = "Rider", AccountStatus = "Active", CreatedAt = now.AddMonths(-1), LastActivity = now.AddDays(-6) },
            new() { UserId = "r8", Name = "Ethan", Email = "ethan@example.com", Role = "Rider", AccountStatus = "Active", CreatedAt = now.AddMonths(-1), LastActivity = now.AddDays(-6) },
            new() { UserId = "r9", Name = "Ava", Email = "ava@example.com", Role = "Rider", AccountStatus = "Suspended", CreatedAt = now.AddMonths(-1), LastActivity = now.AddDays(-8) },
            new() { UserId = "r10", Name = "Lucas", Email = "lucas@example.com", Role = "Rider", AccountStatus = "Active", CreatedAt = now.AddMonths(-1), LastActivity = now.AddDays(-9) },

            new() { UserId = "d1", Name = "Alex", Email = "alex@example.com", Role = "Driver", AccountStatus = "Active", CreatedAt = now.AddMonths(-8), LastActivity = now.AddDays(-1) },
            new() { UserId = "d2", Name = "Maria", Email = "maria@example.com", Role = "Driver", AccountStatus = "Active", CreatedAt = now.AddMonths(-7), LastActivity = now.AddDays(-1) },
            new() { UserId = "d3", Name = "James", Email = "james@example.com", Role = "Driver", AccountStatus = "Active", CreatedAt = now.AddMonths(-6), LastActivity = now.AddDays(-2) },
            new() { UserId = "d4", Name = "Priya", Email = "priya@example.com", Role = "Driver", AccountStatus = "Flagged", CreatedAt = now.AddMonths(-5), LastActivity = now.AddDays(-3) },
            new() { UserId = "d5", Name = "Ken", Email = "ken@example.com", Role = "Driver", AccountStatus = "Active", CreatedAt = now.AddMonths(-4), LastActivity = now.AddDays(-3) },
            new() { UserId = "d6", Name = "Ivy", Email = "ivy@example.com", Role = "Driver", AccountStatus = "Active", CreatedAt = now.AddMonths(-4), LastActivity = now.AddDays(-4) },
            new() { UserId = "d7", Name = "Mateo", Email = "mateo@example.com", Role = "Driver", AccountStatus = "Active", CreatedAt = now.AddMonths(-4), LastActivity = now.AddDays(-4) },
            new() { UserId = "d8", Name = "Fatima", Email = "fatima@example.com", Role = "Driver", AccountStatus = "Active", CreatedAt = now.AddMonths(-4), LastActivity = now.AddDays(-5) },

            new() { UserId = "p1", Name = "Noodle House", Email = "ops@noodlehouse.com", Role = "Restaurant", AccountStatus = "Active", CreatedAt = now.AddMonths(-6), LastActivity = now.AddDays(-1) },
            new() { UserId = "p2", Name = "Burger Lab", Email = "ops@burgerlab.com", Role = "Restaurant", AccountStatus = "Active", CreatedAt = now.AddMonths(-5), LastActivity = now.AddDays(-2) },
            new() { UserId = "p3", Name = "Green Bowl", Email = "ops@greenbowl.com", Role = "Restaurant", AccountStatus = "Flagged", CreatedAt = now.AddMonths(-4), LastActivity = now.AddDays(-3) },

            new() { UserId = "admin1", Name = "Anne", Email = "anne@accountabilitybridge.com", Role = "Admin", AccountStatus = "Active", CreatedAt = now.AddYears(-1), LastActivity = now }
        };
        db.Users.AddRange(users);

        var trips = new List<Trip>
        {
            new() { TripId = "trip-1042", UserId = "r2", DriverId = "d1", PickupLocation = "Downtown", DropoffLocation = "Midtown", Price = 32.40m, DriverEarnings = 20.00m, SurgeApplied = true, SurgeMultiplier = 1.6m, Status = "Completed", CreatedAt = new DateTime(2026, 3, 30, 18, 5, 0, DateTimeKind.Utc) },
            new() { TripId = "trip-1043", UserId = "r3", DriverId = "d2", PickupLocation = "Campus", DropoffLocation = "Uptown", Price = 14.20m, DriverEarnings = 9.60m, SurgeApplied = false, SurgeMultiplier = 1.0m, Status = "Completed", CreatedAt = new DateTime(2026, 4, 1, 12, 10, 0, DateTimeKind.Utc) },
            new() { TripId = "trip-1044", UserId = "r1", DriverId = "d3", PickupLocation = "Station", DropoffLocation = "Downtown", Price = 18.80m, DriverEarnings = 12.30m, SurgeApplied = false, SurgeMultiplier = 1.0m, Status = "Pending", CreatedAt = new DateTime(2026, 4, 2, 8, 5, 0, DateTimeKind.Utc) },
            new() { TripId = "trip-1045", UserId = "r1", DriverId = "d1", PickupLocation = "Campus", DropoffLocation = "Airport", Price = 11.90m, DriverEarnings = 7.90m, SurgeApplied = false, SurgeMultiplier = 1.0m, Status = "Completed", CreatedAt = new DateTime(2026, 4, 3, 15, 14, 0, DateTimeKind.Utc) },
            new() { TripId = "trip-1046", UserId = "r4", DriverId = "d4", PickupLocation = "Mall", DropoffLocation = "Suburban", Price = 26.80m, DriverEarnings = 17.20m, SurgeApplied = true, SurgeMultiplier = 1.3m, Status = "Completed", CreatedAt = now.AddDays(-3) },
            new() { TripId = "trip-1047", UserId = "r5", DriverId = "d5", PickupLocation = "Uptown", DropoffLocation = "Downtown", Price = 22.00m, DriverEarnings = 14.00m, SurgeApplied = false, SurgeMultiplier = 1.0m, Status = "Completed", CreatedAt = now.AddDays(-2) },
            new() { TripId = "trip-1048", UserId = "r6", DriverId = "d6", PickupLocation = "Airport", DropoffLocation = "Campus", Price = 19.70m, DriverEarnings = 13.20m, SurgeApplied = false, SurgeMultiplier = 1.0m, Status = "Completed", CreatedAt = now.AddDays(-2) },
            new() { TripId = "trip-1049", UserId = "r7", DriverId = "d7", PickupLocation = "West", DropoffLocation = "East", Price = 24.40m, DriverEarnings = 15.80m, SurgeApplied = true, SurgeMultiplier = 1.4m, Status = "Completed", CreatedAt = now.AddDays(-1) },
            new() { TripId = "trip-1050", UserId = "r8", DriverId = "d8", PickupLocation = "South", DropoffLocation = "North", Price = 20.10m, DriverEarnings = 13.40m, SurgeApplied = false, SurgeMultiplier = 1.0m, Status = "Cancelled", CreatedAt = now.AddDays(-1) },
            new() { TripId = "trip-1051", UserId = "r10", DriverId = "d1", PickupLocation = "Center", DropoffLocation = "Campus", Price = 17.10m, DriverEarnings = 11.20m, SurgeApplied = false, SurgeMultiplier = 1.0m, Status = "Completed", CreatedAt = now }
        };
        db.Trips.AddRange(trips);

        var decisionTypes = new[] { "SurgePricing", "DriverMatch", "AccountFlag", "EarningsAdjustment" };
        var decisions = new List<Decision>
        {
            new() { DecisionId = "dec-1001", UserId = "r1", DecisionType = "AccountFlag", Outcome = "Flagged", FactorsConsidered = "[\"Account activity pattern\",\"Verification mismatch\"]", FactorsExcluded = "[\"Race\",\"Gender\",\"Age\"]", IsFlagged = true, Status = "UnderReview", SystemVersion = "v2.4.1", CreatedAt = new DateTime(2026, 3, 28, 10, 20, 0, DateTimeKind.Utc) },
            new() { DecisionId = "dec-1002", UserId = "r2", DecisionType = "SurgePricing", Outcome = "Price Increased", FactorsConsidered = "[\"Demand Level\",\"Driver Availability\",\"Time of Day\",\"Location Density\"]", FactorsExcluded = "[\"Race\",\"Gender\",\"Age\"]", IsFlagged = false, Status = "Active", SystemVersion = "v2.4.1", CreatedAt = new DateTime(2026, 3, 30, 18, 5, 0, DateTimeKind.Utc) },
            new() { DecisionId = "dec-1003", UserId = "r3", DecisionType = "SurgePricing", Outcome = "Standard Price", FactorsConsidered = "[\"Demand\",\"Availability\"]", FactorsExcluded = "[\"Race\",\"Gender\",\"Age\"]", IsFlagged = false, Status = "Active", SystemVersion = "v2.4.1", CreatedAt = new DateTime(2026, 4, 1, 12, 10, 0, DateTimeKind.Utc) },
            new() { DecisionId = "dec-1004", UserId = "d1", DecisionType = "DriverMatch", Outcome = "Missed Trip", FactorsConsidered = "[\"Proximity\",\"Rating\",\"Availability\",\"Demand\"]", FactorsExcluded = "[\"Race\",\"Gender\",\"Age\"]", IsFlagged = false, Status = "Active", SystemVersion = "v2.4.1", CreatedAt = now.AddDays(-3) },
            new() { DecisionId = "dec-1005", UserId = "d1", DecisionType = "EarningsAdjustment", Outcome = "Applied", FactorsConsidered = "[\"Completion\",\"Distance\",\"Time Window\"]", FactorsExcluded = "[\"Race\",\"Gender\",\"Age\"]", IsFlagged = false, Status = "Active", SystemVersion = "v2.4.1", CreatedAt = now.AddDays(-4) }
        };
        for (var i = 6; i <= 25; i++)
        {
            var user = users[(i - 1) % users.Count];
            decisions.Add(
                new Decision
                {
                    DecisionId = $"dec-{1000 + i}",
                    UserId = user.UserId,
                    DecisionType = decisionTypes[i % decisionTypes.Length],
                    Outcome = i % 4 == 0 ? "Flagged" : i % 4 == 1 ? "Assigned" : i % 4 == 2 ? "Price Increased" : "Applied",
                    FactorsConsidered = "[\"Demand\",\"Availability\",\"Location\"]",
                    FactorsExcluded = "[\"Race\",\"Gender\",\"Age\"]",
                    IsFlagged = i % 5 == 0,
                    Status = i % 6 == 0 ? "UnderReview" : "Active",
                    SystemVersion = "v2.4.1",
                    CreatedAt = now.AddDays(-i)
                }
            );
        }
        db.Decisions.AddRange(decisions);

        var appeals = new List<Appeal>
        {
            new() { AppealId = "201", UserId = "r1", DecisionId = "dec-1001", UserType = "Rider", Reason = "Price Too High", Description = "Unexpected account impact and fare spike.", Status = "Pending", SubmittedAt = now.AddDays(-7) },
            new() { AppealId = "202", UserId = "d1", DecisionId = "dec-1004", UserType = "Driver", Reason = "Earnings Dispute", Description = "Missed high-value trip repeatedly.", Status = "UnderReview", SubmittedAt = now.AddDays(-6), AdminNotes = "Investigating dispatch logs." },
            new() { AppealId = "203", UserId = "r2", DecisionId = "dec-1002", UserType = "Rider", Reason = "Account Flag", Description = "Surge question resolved.", Status = "Approved", SubmittedAt = now.AddDays(-8), ResolvedAt = now.AddDays(-4), Resolution = "Charge adjusted" },
            new() { AppealId = "204", UserId = "r3", DecisionId = "dec-1003", UserType = "Rider", Reason = "Other", Description = "Need clarification", Status = "Pending", SubmittedAt = now.AddDays(-2) },
            new() { AppealId = "205", UserId = "d2", DecisionId = "dec-1006", UserType = "Driver", Reason = "Incorrect Match", Description = "Assignment issue", Status = "Escalated", SubmittedAt = now.AddDays(-3), AdminNotes = "Escalated to ops" },
            new() { AppealId = "206", UserId = "p1", DecisionId = "dec-1008", UserType = "Restaurant", Reason = "Earnings Dispute", Description = "Order deprioritized", Status = "UnderReview", SubmittedAt = now.AddDays(-2) },
            new() { AppealId = "207", UserId = "r4", DecisionId = "dec-1009", UserType = "Rider", Reason = "Price Too High", Description = "Unexpected pricing", Status = "Denied", SubmittedAt = now.AddDays(-9), ResolvedAt = now.AddDays(-5), Resolution = "Within policy" },
            new() { AppealId = "208", UserId = "d3", DecisionId = "dec-1010", UserType = "Driver", Reason = "Other", Description = "General challenge", Status = "Pending", SubmittedAt = now.AddDays(-1) },
            new() { AppealId = "209", UserId = "p2", DecisionId = "dec-1011", UserType = "Restaurant", Reason = "Incorrect Match", Description = "Courier mismatch", Status = "Approved", SubmittedAt = now.AddDays(-10), ResolvedAt = now.AddDays(-6), Resolution = "Priority corrected" },
            new() { AppealId = "210", UserId = "r5", DecisionId = "dec-1012", UserType = "Rider", Reason = "Account Flag", Description = "False flag concern", Status = "UnderReview", SubmittedAt = now.AddDays(-1) }
        };
        db.Appeals.AddRange(appeals);

        var auditLogs = Enumerable.Range(1, 15).Select(i => new AuditLog
        {
            LogId = $"log-{i}",
            DecisionId = decisions[(i - 1) % decisions.Count].DecisionId,
            ActionTaken = i % 3 == 0 ? "Flagged for Review" : i % 3 == 1 ? "Reviewed" : "Appeal Updated",
            PerformedBy = i % 4 == 0 ? "admin1" : "System",
            Notes = "Audit event recorded for compliance trace.",
            Timestamp = now.AddDays(-i)
        }).ToList();
        db.AuditLogs.AddRange(auditLogs);

        var metricTypes = new[] { "EarningsDisparity", "TripDistribution", "SurgeFrequency", "GeographicFairness" };
        var zones = new[] { "Downtown", "Airport", "Campus", "Suburban", "Midtown" };
        var fairness = new List<FairnessMetric>();
        for (var i = 1; i <= 20; i++)
        {
            fairness.Add(
                new FairnessMetric
                {
                    MetricId = $"m-{i}",
                    MetricType = metricTypes[i % metricTypes.Length],
                    Zone = zones[i % zones.Length],
                    Value = Math.Round(0.5m + (i * 0.17m), 2),
                    Status = i % 6 == 0 ? "Flagged" : i % 4 == 0 ? "Warning" : "Normal",
                    RecordedAt = now.AddDays(-i)
                }
            );
        }
        db.FairnessMetrics.AddRange(fairness);

        db.SaveChanges();
    }
}
