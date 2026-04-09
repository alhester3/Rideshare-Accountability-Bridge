using AccountabilityBridge.Models;

namespace AccountabilityBridge.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext db)
    {
        if (db.Users.Any()) return;

        var riders = new List<User>
        {
            new() { UserId = "rider-001", Name = "Emily Carter", Email = "emily.carter@email.com", Phone = "512-445-2891", Role = "Rider", AccountStatus = "Flagged", MemberSince = new DateTime(2024,9,14), TotalRides = 47, CreatedAt = new DateTime(2024,9,14), LastActivity = new DateTime(2026,3,28) },
            new() { UserId = "rider-002", Name = "David Thompson", Email = "david.thompson@email.com", Phone = "205-338-9271", Role = "Rider", AccountStatus = "Active", MemberSince = new DateTime(2023,6,1), TotalRides = 112, CreatedAt = new DateTime(2023,6,1), LastActivity = new DateTime(2026,3,30) },
            new() { UserId = "rider-003", Name = "Sarah Mitchell", Email = "sarah.mitchell@email.com", Phone = "334-229-4410", Role = "Rider", AccountStatus = "Active", MemberSince = new DateTime(2024,1,22), TotalRides = 34, CreatedAt = new DateTime(2024,1,22), LastActivity = new DateTime(2026,4,1) },
            new() { UserId = "rider-004", Name = "Marcus Webb", Email = "marcus.webb@email.com", Phone = "256-771-3302", Role = "Rider", AccountStatus = "Active", MemberSince = new DateTime(2023,11,8), TotalRides = 89, CreatedAt = new DateTime(2023,11,8), LastActivity = new DateTime(2026,4,3) },
            new() { UserId = "rider-005", Name = "Priya Patel", Email = "priya.patel@email.com", Phone = "205-554-8821", Role = "Rider", AccountStatus = "Active", MemberSince = new DateTime(2025,2,14), TotalRides = 21, CreatedAt = new DateTime(2025,2,14), LastActivity = new DateTime(2026,4,5) },
            new() { UserId = "rider-006", Name = "Jordan Lee", Email = "jordan.lee@email.com", Phone = "205-992-3341", Role = "Rider", AccountStatus = "Suspended", MemberSince = new DateTime(2023,4,30), TotalRides = 203, CreatedAt = new DateTime(2023,4,30), LastActivity = new DateTime(2026,2,14) },
            new() { UserId = "rider-007", Name = "Aaliyah Brooks", Email = "aaliyah.brooks@email.com", Phone = "334-448-2210", Role = "Rider", AccountStatus = "Active", MemberSince = new DateTime(2024,7,19), TotalRides = 58, CreatedAt = new DateTime(2024,7,19), LastActivity = new DateTime(2026,4,7) },
            new() { UserId = "rider-008", Name = "Connor Walsh", Email = "connor.walsh@email.com", Phone = "205-110-5543", Role = "Rider", AccountStatus = "Active", MemberSince = new DateTime(2025,1,3), TotalRides = 15, CreatedAt = new DateTime(2025,1,3), LastActivity = new DateTime(2026,4,6) },
            new() { UserId = "rider-009", Name = "Destiny Nguyen", Email = "destiny.nguyen@email.com", Phone = "256-334-7712", Role = "Rider", AccountStatus = "Active", MemberSince = new DateTime(2024,3,28), TotalRides = 76, CreatedAt = new DateTime(2024,3,28), LastActivity = new DateTime(2026,4,4) },
            new() { UserId = "rider-010", Name = "Tyler Reeves", Email = "tyler.reeves@email.com", Phone = "205-887-2290", Role = "Rider", AccountStatus = "Active", MemberSince = new DateTime(2023,8,15), TotalRides = 144, CreatedAt = new DateTime(2023,8,15), LastActivity = new DateTime(2026,4,8) }
        };

        var drivers = new List<User>
        {
            new() { UserId = "driver-001", Name = "Alex Rivera", Email = "alex.rivera@email.com", Phone = "205-441-9932", Role = "Driver", AccountStatus = "Active", MemberSince = new DateTime(2022,11,3), Rating = 4.8m, CompletionRate = 97m, Zone = "Downtown", TotalTrips = 1847, WeeklyEarnings = 842.50m, PlatformAverageEarnings = 710m, CreatedAt = new DateTime(2022,11,3), LastActivity = new DateTime(2026,4,8) },
            new() { UserId = "driver-002", Name = "Maria Gonzalez", Email = "maria.gonzalez@email.com", Phone = "205-773-2241", Role = "Driver", AccountStatus = "Active", MemberSince = new DateTime(2023,3,17), Rating = 4.6m, CompletionRate = 94m, Zone = "Suburban South", TotalTrips = 923, WeeklyEarnings = 631m, PlatformAverageEarnings = 710m, CreatedAt = new DateTime(2023,3,17), LastActivity = new DateTime(2026,4,7) },
            new() { UserId = "driver-003", Name = "James Okafor", Email = "james.okafor@email.com", Phone = "205-229-8871", Role = "Driver", AccountStatus = "Active", MemberSince = new DateTime(2021,8,22), Rating = 4.9m, CompletionRate = 99m, Zone = "Airport Corridor", TotalTrips = 3412, WeeklyEarnings = 1104.75m, PlatformAverageEarnings = 710m, CreatedAt = new DateTime(2021,8,22), LastActivity = new DateTime(2026,4,8) },
            new() { UserId = "driver-004", Name = "Keisha Monroe", Email = "keisha.monroe@email.com", Phone = "334-552-4490", Role = "Driver", AccountStatus = "Active", MemberSince = new DateTime(2023,9,5), Rating = 4.7m, CompletionRate = 95m, Zone = "University District", TotalTrips = 678, WeeklyEarnings = 589.25m, PlatformAverageEarnings = 710m, CreatedAt = new DateTime(2023,9,5), LastActivity = new DateTime(2026,4,6) },
            new() { UserId = "driver-005", Name = "Raj Sharma", Email = "raj.sharma@email.com", Phone = "205-664-3312", Role = "Driver", AccountStatus = "Flagged", MemberSince = new DateTime(2022,5,14), Rating = 4.2m, CompletionRate = 88m, Zone = "Downtown", TotalTrips = 1122, WeeklyEarnings = 490m, PlatformAverageEarnings = 710m, CreatedAt = new DateTime(2022,5,14), LastActivity = new DateTime(2026,4,2) },
            new() { UserId = "driver-006", Name = "Brianna Scott", Email = "brianna.scott@email.com", Phone = "256-334-8821", Role = "Driver", AccountStatus = "Active", MemberSince = new DateTime(2024,1,11), Rating = 4.5m, CompletionRate = 93m, Zone = "Northside", TotalTrips = 412, WeeklyEarnings = 558m, PlatformAverageEarnings = 710m, CreatedAt = new DateTime(2024,1,11), LastActivity = new DateTime(2026,4,7) },
            new() { UserId = "driver-007", Name = "Devon Castillo", Email = "devon.castillo@email.com", Phone = "205-991-2234", Role = "Driver", AccountStatus = "Active", MemberSince = new DateTime(2023,6,28), Rating = 4.8m, CompletionRate = 96m, Zone = "Eastside", TotalTrips = 887, WeeklyEarnings = 775.50m, PlatformAverageEarnings = 710m, CreatedAt = new DateTime(2023,6,28), LastActivity = new DateTime(2026,4,8) },
            new() { UserId = "driver-008", Name = "Fatima Hassan", Email = "fatima.hassan@email.com", Phone = "205-443-7712", Role = "Driver", AccountStatus = "Active", MemberSince = new DateTime(2024,4,2), Rating = 4.6m, CompletionRate = 92m, Zone = "Suburban North", TotalTrips = 334, WeeklyEarnings = 612.25m, PlatformAverageEarnings = 710m, CreatedAt = new DateTime(2024,4,2), LastActivity = new DateTime(2026,4,5) }
        };

        var restaurants = new List<User>
        {
            new() { UserId = "restaurant-001", Name = "Tuscaloosa Tacos", Email = "ops@tuscaloosatacos.com", Phone = "205-441-2290", Role = "Restaurant", AccountStatus = "Active", CuisineType = "Mexican", Zone = "Downtown", AverageOrderValue = 28.50m, TotalOrders = 3841, MemberSince = new DateTime(2022,3,1), CreatedAt = new DateTime(2022,3,1), LastActivity = new DateTime(2026,4,8) },
            new() { UserId = "restaurant-002", Name = "Campus Curry House", Email = "manager@campuscurry.com", Phone = "205-773-5521", Role = "Restaurant", AccountStatus = "Active", CuisineType = "Indian", Zone = "University District", AverageOrderValue = 34.75m, TotalOrders = 2109, MemberSince = new DateTime(2023,1,15), CreatedAt = new DateTime(2023,1,15), LastActivity = new DateTime(2026,4,7) },
            new() { UserId = "restaurant-003", Name = "River City Burgers", Email = "hello@rivercityburgers.com", Phone = "205-229-6643", Role = "Restaurant", AccountStatus = "Flagged", CuisineType = "American", Zone = "Northside", AverageOrderValue = 19.25m, TotalOrders = 1447, MemberSince = new DateTime(2023,7,22), CreatedAt = new DateTime(2023,7,22), LastActivity = new DateTime(2026,4,3) }
        };

        var admins = new List<User>
        {
            new() { UserId = "admin-001", Name = "Morgan Ellis", Email = "morgan.ellis@accountabilitybridge.com", Role = "Admin", AdminLevel = "Super Admin", AccountStatus = "Active", MemberSince = new DateTime(2022,1,1), CreatedAt = new DateTime(2022,1,1), LastActivity = new DateTime(2026,4,9) },
            new() { UserId = "admin-002", Name = "Taylor Kim", Email = "taylor.kim@accountabilitybridge.com", Role = "Admin", AdminLevel = "Compliance Reviewer", AccountStatus = "Active", MemberSince = new DateTime(2023,2,1), CreatedAt = new DateTime(2023,2,1), LastActivity = new DateTime(2026,4,8) }
        };

        var users = riders.Concat(drivers).Concat(restaurants).Concat(admins).ToList();
        db.Users.AddRange(users);

        var trips = new List<Trip>
        {
            new() { TripId = "trip-001", UserId = "rider-001", DriverId = "driver-001", PickupLocation = "University of Alabama, Tuscaloosa AL", DropoffLocation = "Tuscaloosa Regional Airport", Distance = 8.4m, BaseFare = 14.00m, Price = 29.40m, DriverEarnings = 19.11m, SurgeApplied = true, SurgeMultiplier = 2.1m, SurgeReason = "High demand near campus during graduation weekend", DemandLevel = "Very High", DriverAvailability = "Low", Status = "Completed", LinkedDecisionId = "decision-001", CreatedAt = DateTime.Parse("2026-03-28T18:42:00") },
            new() { TripId = "trip-002", UserId = "rider-002", DriverId = "driver-003", PickupLocation = "Downtown Tuscaloosa, 5th Ave", DropoffLocation = "Walmart Supercenter, McFarland Blvd", Distance = 4.2m, BaseFare = 9.50m, Price = 17.10m, DriverEarnings = 11.12m, SurgeApplied = true, SurgeMultiplier = 1.8m, SurgeReason = "Concert event downtown causing high demand", DemandLevel = "High", DriverAvailability = "Low", Status = "Completed", LinkedDecisionId = "decision-002", CreatedAt = DateTime.Parse("2026-03-30T21:15:00") },
            new() { TripId = "trip-003", UserId = "rider-003", DriverId = "driver-002", PickupLocation = "Northport AL, Main Street", DropoffLocation = "DCH Regional Medical Center", Distance = 6.1m, BaseFare = 11.00m, Price = 11.00m, DriverEarnings = 7.15m, SurgeApplied = false, SurgeMultiplier = 1.0m, DemandLevel = "Normal", DriverAvailability = "High", Status = "Completed", LinkedDecisionId = "decision-003", CreatedAt = DateTime.Parse("2026-04-01T09:30:00") },
            new() { TripId = "trip-004", UserId = "rider-001", DriverId = null, PickupLocation = "Bryant-Denny Stadium, Tuscaloosa AL", DropoffLocation = "Embassy Suites, Tuscaloosa AL", Distance = 2.8m, BaseFare = 12.00m, Price = 38.40m, DriverEarnings = null, SurgeApplied = true, SurgeMultiplier = 3.2m, SurgeReason = "Game day surge — extreme demand with very limited driver availability", DemandLevel = "Extreme", DriverAvailability = "Very Low", Status = "Cancelled — No Driver Available", LinkedDecisionId = "decision-004", CreatedAt = DateTime.Parse("2026-03-22T16:05:00") }
        };

        var riderIds = riders.Where(r => r.UserId != "rider-001").Select(r => r.UserId).ToArray();
        var driverIds = drivers.Select(d => d.UserId).ToArray();
        var zones = new[] { "Downtown", "Suburban South", "Airport Corridor", "University District", "Northside", "Eastside" };

        for (var i = 5; i <= 30; i++)
        {
            var rider = riderIds[(i - 1) % riderIds.Length];
            var driver = driverIds[(i - 1) % driverIds.Length];
            var zone = zones[i % zones.Length];
            var surge = i % 3 == 0;
            var multiplier = surge ? 1.1m + ((i % 5) * 0.25m) : 1.0m;
            var baseFare = 8m + (i % 7);
            var final = Math.Round(baseFare * multiplier, 2);
            trips.Add(new Trip
            {
                TripId = $"trip-{i:000}",
                UserId = rider,
                DriverId = i % 11 == 0 ? null : driver,
                PickupLocation = $"{zone} Pickup Point {i}",
                DropoffLocation = $"{zone} Dropoff Point {i}",
                Distance = Math.Round(2.2m + (i % 9) * 0.9m, 1),
                BaseFare = baseFare,
                Price = final,
                DriverEarnings = i % 11 == 0 ? null : Math.Round(final * 0.65m, 2),
                SurgeApplied = surge,
                SurgeMultiplier = multiplier,
                SurgeReason = surge ? $"Demand spike in {zone}" : null,
                DemandLevel = surge ? "High" : "Normal",
                DriverAvailability = surge ? "Low" : "High",
                Status = i % 11 == 0 ? "Cancelled — No Driver Available" : (i % 5 == 0 ? "Pending" : "Completed"),
                LinkedDecisionId = $"decision-{i:000}",
                CreatedAt = new DateTime(2026, 4, 1).AddHours(i * 3)
            });
        }

        db.Trips.AddRange(trips);

        var decisions = new List<Decision>
        {
            new() { DecisionId = "decision-001", UserId = "rider-001", TripId = "trip-001", DecisionType = "SurgePricing", Outcome = "Surge pricing of 2.1x applied to trip", FactorsConsidered = "[\"Demand level in pickup zone: Very High\",\"Available drivers within 1 mile: 2\",\"Time of day: Evening peak\",\"Local event: Graduation weekend\"]", FactorsExcluded = "[\"Rider race or ethnicity\",\"Rider gender\",\"Rider age\",\"Rider account history\",\"Rider payment method\"]", IsFlagged = false, Status = "Active", SystemVersion = "v2.4.1", PlainLanguageSummary = "Your price was higher than usual because there were very few drivers available near the University during graduation weekend, while a large number of riders were requesting trips at the same time.", CreatedAt = DateTime.Parse("2026-03-28T18:42:00") },
            new() { DecisionId = "decision-002", UserId = "rider-002", TripId = "trip-002", DecisionType = "SurgePricing", Outcome = "Surge pricing of 1.8x applied to trip", FactorsConsidered = "[\"Demand level in pickup zone: High\",\"Available drivers within 1 mile: 4\",\"Time of day: Late night\",\"Local event: Downtown concert\"]", FactorsExcluded = "[\"Rider race or ethnicity\",\"Rider gender\",\"Rider age\",\"Rider account history\"]", IsFlagged = false, Status = "Active", SystemVersion = "v2.4.1", PlainLanguageSummary = "Your price increased because a concert downtown created high demand for rides while fewer drivers were available in the area at that time of night.", CreatedAt = DateTime.Parse("2026-03-30T21:15:00") },
            new() { DecisionId = "decision-003", UserId = "driver-005", TripId = null, DecisionType = "AccountFlag", Outcome = "Driver account flagged for review due to below threshold completion rate", FactorsConsidered = "[\"Trip completion rate: 88% (threshold: 90%)\",\"Recent cancellations: 7 in past 30 days\",\"Customer complaint rate: 4.1% (threshold: 3%)\",\"Rating trend: Declining over 60 days\"]", FactorsExcluded = "[\"Driver race or ethnicity\",\"Driver gender\",\"Driver age\",\"Driver zone or neighborhood\"]", IsFlagged = true, Status = "UnderReview", SystemVersion = "v2.4.1", PlainLanguageSummary = "Your account was flagged because your trip completion rate and customer satisfaction scores have fallen below the platform minimum thresholds over the past 30 days. This review is to understand if there are circumstances affecting your ability to complete trips.", CreatedAt = DateTime.Parse("2026-04-02T10:00:00") },
            new() { DecisionId = "decision-004", UserId = "rider-001", TripId = "trip-004", DecisionType = "AccountFlag", Outcome = "Rider account flagged following third-party fraud detection trigger", FactorsConsidered = "[\"Unusual booking pattern detected\",\"Multiple trip requests from different device signatures\",\"Payment method flagged by third-party fraud system\"]", FactorsExcluded = "[\"Rider race or ethnicity\",\"Rider gender\",\"Rider age\",\"Rider location history\"]", IsFlagged = true, Status = "UnderReview", SystemVersion = "v2.4.1", PlainLanguageSummary = "Your account was flagged by our fraud prevention system due to some unusual activity patterns. This does not mean you have done anything wrong. A human reviewer will assess your account and you will be notified within 3 business days.", CreatedAt = DateTime.Parse("2026-03-28T19:00:00") },
            new() { DecisionId = "decision-005", UserId = "driver-001", TripId = "trip-001", DecisionType = "DriverMatch", Outcome = "Driver Alex Rivera matched to trip-001", FactorsConsidered = "[\"Distance to pickup: 0.8 miles (closest available)\",\"Driver rating: 4.8 (above threshold)\",\"Completion rate: 97%\",\"Current trip load: Available\",\"Zone familiarity: Downtown — high\"]", FactorsExcluded = "[\"Driver race or ethnicity\",\"Driver gender\",\"Driver age\",\"Driver income level\"]", IsFlagged = false, Status = "Active", SystemVersion = "v2.4.1", PlainLanguageSummary = "You were matched to this trip because you were the closest available driver with a high rating and strong completion record in this zone.", CreatedAt = DateTime.Parse("2026-03-28T18:40:00") }
        };

        var decisionTypes = new[] { "SurgePricing", "DriverMatch", "AccountFlag", "EarningsAdjustment" };
        for (var i = 6; i <= 25; i++)
        {
            var trip = trips[i - 1];
            var userId = i % 4 == 0 ? trip.UserId : (trip.DriverId ?? trip.UserId);
            decisions.Add(new Decision
            {
                DecisionId = $"decision-{i:000}",
                UserId = userId,
                TripId = trip.TripId,
                DecisionType = decisionTypes[i % decisionTypes.Length],
                Outcome = i % 4 == 0 ? "Adjustment applied" : i % 4 == 1 ? "Trip assigned" : i % 4 == 2 ? "Surge applied" : "Flag under review",
                FactorsConsidered = "[\"Demand\",\"Availability\",\"Distance\",\"Service quality\"]",
                FactorsExcluded = "[\"Race\",\"Gender\",\"Age\",\"Protected attributes\"]",
                IsFlagged = i % 7 == 0,
                Status = i % 7 == 0 ? "UnderReview" : "Active",
                SystemVersion = "v2.4.1",
                PlainLanguageSummary = "This decision was made using demand, availability, and service quality indicators active in your zone at the time.",
                CreatedAt = trip.CreatedAt.AddMinutes(2)
            });
        }

        db.Decisions.AddRange(decisions);

        var appeals = new List<Appeal>
        {
            new() { AppealId = "appeal-001", UserId = "rider-001", DecisionId = "decision-004", UserType = "Rider", Reason = "Account Flag", Description = "I did not do anything unusual. I was booking rides for myself and my family during graduation weekend. I would like my account reviewed and the flag removed.", Status = "UnderReview", AssignedAdmin = "admin-001", AdminNotes = "User provided plausible explanation. Reviewing device log and payment records. Family group booking is consistent with graduation weekend patterns.", SubmittedAt = DateTime.Parse("2026-03-29T10:30:00"), EstimatedResolution = DateTime.Parse("2026-04-01") },
            new() { AppealId = "appeal-002", UserId = "driver-005", DecisionId = "decision-003", UserType = "Driver", Reason = "Account Flag", Description = "My completion rate dropped because I had a family emergency last month and had to cancel several trips. I have documentation from the hospital if needed. I have been driving on this platform for 4 years.", Status = "Approved", AssignedAdmin = "admin-001", AdminNotes = "Driver provided medical documentation. Emergency circumstances verified. Cancellations are concentrated in a 6-day window consistent with stated emergency.", Resolution = "Appeal approved. Emergency circumstances verified and documented. Account flag removed. Cancellations from March 3-8 excluded from completion rate calculation. Account status restored to Active.", SubmittedAt = DateTime.Parse("2026-04-02T14:15:00"), ResolvedAt = DateTime.Parse("2026-04-05T09:00:00") },
            new() { AppealId = "appeal-003", UserId = "rider-002", DecisionId = "decision-002", UserType = "Rider", Reason = "Price Too High", Description = "I understand surge pricing but 1.8x seems excessive for a short ride downtown. I was not notified clearly enough before confirming.", Status = "Resolved", AssignedAdmin = "admin-002", AdminNotes = "Surge notification review confirmed the rider accepted the surge fare at booking. Policy was followed correctly. No refund warranted but pricing transparency improvement noted.", Resolution = "Appeal denied. Surge pricing was correctly applied and disclosed at time of booking. Rider accepted the fare before confirming. As a goodwill gesture a $3.00 credit has been applied to the account.", SubmittedAt = DateTime.Parse("2026-03-31T08:45:00"), ResolvedAt = DateTime.Parse("2026-04-03T14:00:00") },
            new() { AppealId = "appeal-004", UserId = "restaurant-003", DecisionId = "decision-006", UserType = "Restaurant", Reason = "Order Deprioritization", Description = "Our orders have been consistently sent to drivers far away from our restaurant when closer drivers are available. This is increasing our delivery times and hurting our ratings.", Status = "Pending", SubmittedAt = DateTime.Parse("2026-04-04T11:20:00"), EstimatedResolution = DateTime.Parse("2026-04-11") },
            new() { AppealId = "appeal-005", UserId = "driver-001", DecisionId = "decision-007", UserType = "Driver", Reason = "Earnings Dispute", Description = "My earnings for last Tuesday show $47.20 but based on my trip log I calculated I should have earned $54.80. There appears to be a discrepancy of $7.60.", Status = "Escalated", AssignedAdmin = "admin-001", AdminNotes = "Earnings discrepancy confirmed on initial review. Escalated to Finance team for full trip fare reconciliation. Expected resolution 5-7 business days.", SubmittedAt = DateTime.Parse("2026-04-06T16:00:00"), EstimatedResolution = DateTime.Parse("2026-04-14") },
            new() { AppealId = "appeal-006", UserId = "rider-007", DecisionId = "decision-010", UserType = "Rider", Reason = "Incorrect Match", Description = "Driver arrived at wrong pin location.", Status = "Pending", SubmittedAt = DateTime.Parse("2026-04-07T09:00:00"), EstimatedResolution = DateTime.Parse("2026-04-12") },
            new() { AppealId = "appeal-007", UserId = "driver-002", DecisionId = "decision-011", UserType = "Driver", Reason = "Earnings Dispute", Description = "Late night bonus was missing.", Status = "UnderReview", AssignedAdmin = "admin-002", SubmittedAt = DateTime.Parse("2026-04-05T08:10:00"), EstimatedResolution = DateTime.Parse("2026-04-10") },
            new() { AppealId = "appeal-008", UserId = "restaurant-001", DecisionId = "decision-012", UserType = "Restaurant", Reason = "Order Deprioritization", Description = "Dispatch order repeatedly delayed.", Status = "Resolved", AssignedAdmin = "admin-001", Resolution = "Routing weight updated for evening prep windows.", SubmittedAt = DateTime.Parse("2026-03-28T12:00:00"), ResolvedAt = DateTime.Parse("2026-04-02T11:00:00") },
            new() { AppealId = "appeal-009", UserId = "rider-009", DecisionId = "decision-013", UserType = "Rider", Reason = "Price Too High", Description = "Unexpected multiplier in low traffic period.", Status = "Denied", AssignedAdmin = "admin-002", Resolution = "Pricing aligned with zone event surge policy.", SubmittedAt = DateTime.Parse("2026-04-01T18:00:00"), ResolvedAt = DateTime.Parse("2026-04-04T08:30:00") },
            new() { AppealId = "appeal-010", UserId = "driver-007", DecisionId = "decision-014", UserType = "Driver", Reason = "Account Flag", Description = "Need review of quality drop signal.", Status = "Pending", SubmittedAt = DateTime.Parse("2026-04-08T07:45:00"), EstimatedResolution = DateTime.Parse("2026-04-15") }
        };
        db.Appeals.AddRange(appeals);

        var fairness = new List<FairnessMetric>
        {
            new() { MetricId = "fm-001", MetricType = "EarningsDisparity", Zone = "Downtown", Value = 842.50m, PlatformAverage = 710.00m, DisparityText = "+18.7%", Status = "Normal", RecordedAt = new DateTime(2026,4,8) },
            new() { MetricId = "fm-002", MetricType = "EarningsDisparity", Zone = "Suburban South", Value = 631.00m, PlatformAverage = 710.00m, DisparityText = "-11.1%", Status = "Warning", RecordedAt = new DateTime(2026,4,8) },
            new() { MetricId = "fm-003", MetricType = "EarningsDisparity", Zone = "Airport Corridor", Value = 1104.75m, PlatformAverage = 710.00m, DisparityText = "+55.6%", Status = "Flagged", RecordedAt = new DateTime(2026,4,8) },
            new() { MetricId = "fm-004", MetricType = "EarningsDisparity", Zone = "University District", Value = 589.25m, PlatformAverage = 710.00m, DisparityText = "-17.0%", Status = "Warning", RecordedAt = new DateTime(2026,4,8) },
            new() { MetricId = "fm-005", MetricType = "SurgeFrequency", Zone = "Downtown", Value = 47, SecondaryValue = 1.9m, Status = "Warning", RecordedAt = new DateTime(2026,4,8) },
            new() { MetricId = "fm-006", MetricType = "SurgeFrequency", Zone = "Airport Corridor", Value = 31, SecondaryValue = 1.6m, Status = "Normal", RecordedAt = new DateTime(2026,4,8) },
            new() { MetricId = "fm-007", MetricType = "SurgeFrequency", Zone = "University District", Value = 89, SecondaryValue = 2.4m, Status = "Flagged", RecordedAt = new DateTime(2026,4,8) },
            new() { MetricId = "fm-008", MetricType = "TripDistribution", Zone = "Downtown", Value = 1204, SecondaryValue = 34.2m, Status = "Normal", RecordedAt = new DateTime(2026,4,8) },
            new() { MetricId = "fm-009", MetricType = "TripDistribution", Zone = "Suburban South", Value = 412, SecondaryValue = 11.7m, Status = "Normal", RecordedAt = new DateTime(2026,4,8) },
            new() { MetricId = "fm-010", MetricType = "TripDistribution", Zone = "Northside", Value = 287, SecondaryValue = 8.1m, Status = "Warning", RecordedAt = new DateTime(2026,4,8) },
            new() { MetricId = "fm-011", MetricType = "GeographicFairness", Zone = "Suburban South", Value = 9.4m, PlatformAverage = 5.8m, DisparityText = "+62%", Status = "Flagged", RecordedAt = new DateTime(2026,4,8) },
            new() { MetricId = "fm-012", MetricType = "GeographicFairness", Zone = "Downtown", Value = 3.2m, PlatformAverage = 5.8m, DisparityText = "-45%", Status = "Normal", RecordedAt = new DateTime(2026,4,8) }
        };

        for (var i = 13; i <= 20; i++)
        {
            fairness.Add(new FairnessMetric
            {
                MetricId = $"fm-{i:000}",
                MetricType = i % 2 == 0 ? "TripDistribution" : "SurgeFrequency",
                Zone = zones[i % zones.Length],
                Value = 100 + i * 8,
                SecondaryValue = 1.2m + ((i % 4) * 0.2m),
                Status = i % 5 == 0 ? "Flagged" : i % 3 == 0 ? "Warning" : "Normal",
                RecordedAt = new DateTime(2026, 4, 8).AddDays(-(i % 4))
            });
        }
        db.FairnessMetrics.AddRange(fairness);

        var audits = new List<AuditLog>();
        var auditActions = new[]
        {
            ("decision-001", "appeal-003", "Surge decision reviewed", "admin-002", "Reviewed surge event for David Thompson; policy disclosure confirmed."),
            ("decision-002", "appeal-003", "Appeal resolved", "admin-002", "Goodwill credit approved after resolution communication."),
            ("decision-003", "appeal-002", "Account flag reviewed", "admin-001", "Medical documentation verified for driver-005."),
            ("decision-003", "appeal-002", "Flag removed", "admin-001", "Completion rate recalculated excluding emergency window."),
            ("decision-004", "appeal-001", "Fraud alert escalation", "System", "Third-party risk signal escalated for manual investigation."),
            ("decision-004", "appeal-001", "Appeal investigation started", "admin-001", "Emily Carter device and payment records under active review."),
            ("decision-005", null, "Driver match validated", "System", "Closest-driver assignment logic satisfied all criteria."),
            ("decision-006", "appeal-004", "Restaurant complaint logged", "admin-002", "Order deprioritization pattern detected for restaurant-003."),
            ("decision-007", "appeal-005", "Earnings discrepancy escalated", "admin-001", "Forwarded to finance reconciliation workflow."),
            ("decision-008", null, "Surge anomaly check", "System", "High surge multiplier in university zone flagged for review."),
            ("decision-009", null, "Decision audited", "admin-002", "No protected attributes involved in pricing boundary."),
            ("decision-010", "appeal-006", "Rider appeal queued", "System", "New rider appeal routed to admin queue."),
            ("decision-011", "appeal-007", "Driver appeal under review", "admin-002", "Awaiting earnings payout logs."),
            ("decision-012", "appeal-008", "Restaurant routing adjusted", "admin-001", "Dispatch weighting tuned for prep-time window."),
            ("decision-013", "appeal-009", "Appeal denied", "admin-002", "Surge disclosure and acceptance confirmed."),
            ("decision-014", "appeal-010", "Flag rationale requested", "admin-001", "Driver asked for model boundary explanation."),
            ("decision-015", null, "Bias monitor trigger", "System", "Zone disparity exceeded warning threshold."),
            ("decision-016", null, "Audit export generated", "admin-002", "Quarterly compliance packet generated."),
            ("decision-017", null, "Decision overwritten", "admin-001", "Manual override applied after policy exception."),
            ("decision-018", null, "Review completed", "admin-001", "Decision remains active; no fairness violation detected.")
        };

        for (var i = 0; i < auditActions.Length; i++)
        {
            audits.Add(new AuditLog
            {
                LogId = $"audit-{i + 1:000}",
                DecisionId = auditActions[i].Item1,
                AppealId = auditActions[i].Item2,
                ActionTaken = auditActions[i].Item3,
                PerformedBy = auditActions[i].Item4,
                Notes = auditActions[i].Item5,
                Timestamp = new DateTime(2026, 4, 1).AddHours(i * 6)
            });
        }

        db.AuditLogs.AddRange(audits);
        db.SaveChanges();
    }
}
