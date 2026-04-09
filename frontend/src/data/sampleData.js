export const roles = ["Rider/Customer", "Driver/Courier", "Restaurant Partner", "Corporate/Admin"];

const now = new Date();
const daysAgo = (n) => new Date(now.getTime() - n * 24 * 60 * 60 * 1000).toISOString();

export const users = [
  { id: "r1", name: "Emily", role: "Rider/Customer", status: "Flagged", lastActivity: "2026-04-07", zone: "Downtown", accountFlaggedDate: "2026-03-28" },
  { id: "r2", name: "David", role: "Rider/Customer", status: "Active", lastActivity: "2026-04-07", zone: "Midtown" },
  { id: "r3", name: "Sarah", role: "Rider/Customer", status: "Active", lastActivity: "2026-04-06", zone: "Uptown" },
  { id: "r4", name: "Noah", role: "Rider/Customer", status: "Active", lastActivity: "2026-04-05", zone: "Campus" },
  { id: "r5", name: "Mia", role: "Rider/Customer", status: "Active", lastActivity: "2026-04-05", zone: "Suburban" },
  { id: "r6", name: "Liam", role: "Rider/Customer", status: "Active", lastActivity: "2026-04-04", zone: "Downtown" },
  { id: "r7", name: "Olivia", role: "Rider/Customer", status: "Active", lastActivity: "2026-04-03", zone: "Airport" },
  { id: "r8", name: "Ethan", role: "Rider/Customer", status: "Active", lastActivity: "2026-04-02", zone: "West Side" },
  { id: "r9", name: "Ava", role: "Rider/Customer", status: "Suspended", lastActivity: "2026-04-01", zone: "East Side" },
  { id: "r10", name: "Lucas", role: "Rider/Customer", status: "Active", lastActivity: "2026-03-31", zone: "Campus" },
  { id: "d1", name: "Alex Rivera", role: "Driver/Courier", status: "Active", rating: 4.8, zone: "Downtown", lastActivity: "2026-04-07", weeklyEarnings: 748, platformAverageEarnings: 710, completionRate: 91, fairnessScore: 88 },
  { id: "d2", name: "Maria", role: "Driver/Courier", status: "Active", rating: 4.6, zone: "Suburban", lastActivity: "2026-04-07", weeklyEarnings: 692, platformAverageEarnings: 710, completionRate: 89, fairnessScore: 85 },
  { id: "d3", name: "James", role: "Driver/Courier", status: "Active", rating: 4.9, zone: "Airport", lastActivity: "2026-04-06", weeklyEarnings: 821, platformAverageEarnings: 710, completionRate: 94, fairnessScore: 91 },
  { id: "d4", name: "Priya", role: "Driver/Courier", status: "Flagged", rating: 4.5, zone: "Midtown", lastActivity: "2026-04-05", weeklyEarnings: 655, platformAverageEarnings: 710, completionRate: 84, fairnessScore: 76 },
  { id: "d5", name: "Ken", role: "Driver/Courier", status: "Active", rating: 4.7, zone: "Campus", lastActivity: "2026-04-05", weeklyEarnings: 703, platformAverageEarnings: 710, completionRate: 90, fairnessScore: 87 },
  { id: "d6", name: "Ivy", role: "Driver/Courier", status: "Active", rating: 4.4, zone: "Uptown", lastActivity: "2026-04-04", weeklyEarnings: 634, platformAverageEarnings: 710, completionRate: 86, fairnessScore: 82 },
  { id: "d7", name: "Mateo", role: "Driver/Courier", status: "Active", rating: 4.8, zone: "West Side", lastActivity: "2026-04-03", weeklyEarnings: 718, platformAverageEarnings: 710, completionRate: 92, fairnessScore: 89 },
  { id: "d8", name: "Fatima", role: "Driver/Courier", status: "Active", rating: 4.7, zone: "East Side", lastActivity: "2026-04-03", weeklyEarnings: 699, platformAverageEarnings: 710, completionRate: 88, fairnessScore: 86 },
  { id: "p1", name: "Noodle House", role: "Restaurant Partner", status: "Active", lastActivity: "2026-04-07" },
  { id: "p2", name: "Burger Lab", role: "Restaurant Partner", status: "Active", lastActivity: "2026-04-06" },
  { id: "p3", name: "Green Bowl", role: "Restaurant Partner", status: "Flagged", lastActivity: "2026-04-05" }
];

export const decisions = [
  { id: "dec-1001", userId: "r1", type: "Account Flag", outcome: "Flagged", timestamp: "2026-03-28T10:20:00Z", status: "Open", factors: ["Account activity pattern", "Verification mismatch"], excluded: ["Race", "Gender", "Age"], summary: "Account was temporarily flagged for unusual verification pattern." },
  { id: "dec-1002", userId: "r2", type: "Surge Pricing", outcome: "Price Increased", timestamp: "2026-03-30T18:05:00Z", status: "Closed", factors: ["Demand Level", "Driver Availability", "Time of Day", "Location Density"], excluded: ["Race", "Gender", "Age"], summary: "Surge pricing applied during peak dinner demand." },
  { id: "dec-1003", userId: "r3", type: "Surge Pricing", outcome: "Standard Price", timestamp: "2026-04-01T12:10:00Z", status: "Closed", factors: ["Demand Level", "Driver Availability"], excluded: ["Race", "Gender", "Age"], summary: "No surge adjustment needed in low-demand period." },
  { id: "dec-1004", userId: "d1", type: "Driver Match", outcome: "Missed Trip", timestamp: "2026-04-06T08:25:00Z", status: "UnderReview", factors: ["Proximity to Pickup", "Driver Rating", "Current Availability", "Area Demand"], excluded: ["Race", "Gender", "Age"], summary: "Trip offered to a closer active driver." },
  { id: "dec-1005", userId: "d1", type: "Earnings Adjustment", outcome: "Applied", timestamp: "2026-04-05T21:35:00Z", status: "Closed", factors: ["Trip Completion", "Distance", "Time Window"], excluded: ["Race", "Gender", "Age"], summary: "Adjusted payout due to late-night zone bonus." },
  { id: "dec-1006", userId: "d2", type: "Driver Match", outcome: "Assigned", timestamp: "2026-04-07T09:10:00Z", status: "Closed", factors: ["Proximity to Pickup", "Current Availability"], excluded: ["Race", "Gender", "Age"], summary: "Trip assigned based on proximity and active status." },
  { id: "dec-1007", userId: "d3", type: "Driver Match", outcome: "Assigned", timestamp: "2026-04-07T10:10:00Z", status: "Closed", factors: ["Proximity to Pickup", "Driver Rating"], excluded: ["Race", "Gender", "Age"], summary: "Airport dispatch assignment." },
  { id: "dec-1008", userId: "p1", type: "Order Priority", outcome: "Deprioritized", timestamp: "2026-04-07T11:15:00Z", status: "Open", factors: ["Prep Time", "Courier Load", "Demand"], excluded: ["Race", "Gender", "Age"], summary: "Order queue deprioritized due to high prep-time estimate." },
  { id: "dec-1009", userId: "p2", type: "Order Priority", outcome: "Standard", timestamp: "2026-04-06T14:20:00Z", status: "Closed", factors: ["Prep Time", "Courier Load"], excluded: ["Race", "Gender", "Age"], summary: "Order remained in standard priority queue." },
  { id: "dec-1010", userId: "r4", type: "Surge Pricing", outcome: "Price Increased", timestamp: daysAgo(2), status: "Closed", factors: ["Demand Level", "Driver Availability"], excluded: ["Race", "Gender", "Age"], summary: "Short-term surge due to event traffic." },
  ...Array.from({ length: 16 }).map((_, i) => ({
    id: `dec-20${i + 11}`,
    userId: users[(i % users.length)].id,
    type: ["Surge Pricing", "Driver Match", "Account Flag", "Earnings Adjustment"][i % 4],
    outcome: ["Price Increased", "Assigned", "Flagged", "Applied"][i % 4],
    timestamp: daysAgo((i % 10) + 1),
    status: i % 3 === 0 ? "Open" : "Closed",
    factors: ["Demand", "Availability", "Location"],
    excluded: ["Race", "Gender", "Age"],
    summary: "Sample decision used for fairness and audit demonstrations."
  }))
];

export const ridesAndTrips = [
  { id: "ride-1042", userId: "r2", decisionId: "dec-1002", date: "2026-03-30", price: 32.4, status: "Completed", surge: true, location: "Downtown" },
  { id: "ride-1043", userId: "r3", decisionId: "dec-1003", date: "2026-04-01", price: 14.2, status: "Completed", surge: false, location: "Uptown" },
  { id: "ride-1044", userId: "r1", decisionId: "dec-1001", date: "2026-04-02", price: 18.8, status: "Flagged", surge: false, location: "Campus" },
  { id: "ride-1045", userId: "r1", decisionId: "dec-1001", date: "2026-04-03", price: 11.9, status: "Appeal Submitted", surge: false, location: "Midtown" },
  { id: "ride-1046", userId: "r2", decisionId: "dec-1010", date: "2026-04-06", price: 26.8, status: "Completed", surge: true, location: "Airport" },
  { id: "trip-7001", userId: "d1", driverId: "d1", decisionId: "dec-1004", date: "2026-04-06", earnings: 19.4, distance: 5.2, status: "Missed", demand: "High" },
  { id: "trip-7002", userId: "d1", driverId: "d1", decisionId: "dec-1005", date: "2026-04-05", earnings: 34.1, distance: 11.2, status: "Completed", demand: "Medium" },
  { id: "trip-7003", userId: "d2", driverId: "d2", decisionId: "dec-1006", date: "2026-04-07", earnings: 24.4, distance: 7.2, status: "Completed", demand: "High" },
  { id: "trip-7004", userId: "d3", driverId: "d3", decisionId: "dec-1007", date: "2026-04-07", earnings: 27.4, distance: 6.4, status: "Completed", demand: "High" },
  { id: "trip-7005", userId: "d1", driverId: "d1", decisionId: "dec-1004", date: "2026-04-07", earnings: 0, distance: 0, status: "Missed", demand: "High" },
  { id: "ord-1042", userId: "p1", decisionId: "dec-1008", date: "2026-04-07", priority: "Deprioritized", eta: "37 min", status: "Queue Delay" },
  { id: "ord-1043", userId: "p2", decisionId: "dec-1009", date: "2026-04-06", priority: "Standard", eta: "22 min", status: "On Track" },
  { id: "ord-1044", userId: "p1", decisionId: "dec-1008", date: "2026-04-06", priority: "Surge", eta: "31 min", status: "Dispatch Busy" },
  { id: "ord-1045", userId: "p3", decisionId: "dec-2013", date: "2026-04-05", priority: "Standard", eta: "24 min", status: "Appeal Submitted" }
];

export const appeals = [
  { id: "app-201", userId: "r1", decisionId: "dec-1001", reason: "Price Too High", context: "Unexpected account impact and fare spike.", status: "Pending", submittedDate: "2026-04-01", type: "Rider/Customer", timeline: ["Submitted"] },
  { id: "app-202", userId: "d1", decisionId: "dec-1004", reason: "Earnings Dispute", context: "Missed high-value trip repeatedly.", status: "Under Review", submittedDate: "2026-04-02", type: "Driver/Courier", timeline: ["Submitted", "Under Review"] },
  { id: "app-203", userId: "r2", decisionId: "dec-1002", reason: "Account Flag", context: "Surge question resolved.", status: "Resolved", submittedDate: "2026-03-31", type: "Rider/Customer", timeline: ["Submitted", "Under Review", "Decision Made", "Resolved"] },
  ...Array.from({ length: 7 }).map((_, i) => ({
    id: `app-30${i + 1}`,
    userId: users[(i + 4) % users.length].id,
    decisionId: decisions[(i + 5) % decisions.length].id,
    reason: ["Incorrect Match", "Other", "Price Too High", "Earnings Dispute"][i % 4],
    context: "Sample appeal for demo workflow.",
    status: ["Pending", "Under Review", "Resolved"][i % 3],
    submittedDate: `2026-04-0${(i % 7) + 1}`,
    type: users[(i + 4) % users.length].role,
    timeline: ["Submitted", ...(i % 3 > 0 ? ["Under Review"] : []), ...(i % 3 === 2 ? ["Decision Made", "Resolved"] : [])]
  }))
];

export const auditLog = Array.from({ length: 15 }).map((_, i) => ({
  id: `audit-${i + 1}`,
  decisionId: decisions[i].id,
  userId: decisions[i].userId,
  timestamp: decisions[i].timestamp,
  decisionType: decisions[i].type,
  userType: users.find((u) => u.id === decisions[i].userId)?.role ?? "Rider/Customer",
  outcome: decisions[i].outcome,
  status: i % 4 === 0 ? "Flagged" : "Reviewed",
  detail: decisions[i].summary
}));

/** Zone-level metrics for Analytics, Admin KPIs, and What-If zone picker (matches prior API shape). */
export const fairnessDynamicMetrics = [
  { id: "dyn-e1", type: "EarningsDisparity", zone: "Downtown", value: 12.4, platformAverage: 11, secondaryValue: 0, disparity: "Within expected band", status: "Normal" },
  { id: "dyn-e2", type: "EarningsDisparity", zone: "Airport", value: 15.1, platformAverage: 11, secondaryValue: 0, disparity: "Elevated airport premiums", status: "Warning" },
  { id: "dyn-e3", type: "EarningsDisparity", zone: "Campus", value: 9.8, platformAverage: 11, secondaryValue: 0, disparity: "Below regional average", status: "Normal" },
  { id: "dyn-e4", type: "EarningsDisparity", zone: "Suburban", value: 8.2, platformAverage: 11, secondaryValue: 0, disparity: "Longer deadhead segments", status: "Normal" },
  { id: "dyn-t1", type: "TripDistribution", zone: "Downtown", value: 34, platformAverage: 0, secondaryValue: 0, disparity: null, status: "Normal" },
  { id: "dyn-t2", type: "TripDistribution", zone: "Airport", value: 22, platformAverage: 0, secondaryValue: 0, disparity: null, status: "Normal" },
  { id: "dyn-t3", type: "TripDistribution", zone: "Campus", value: 18, platformAverage: 0, secondaryValue: 0, disparity: null, status: "Warning" },
  { id: "dyn-t4", type: "TripDistribution", zone: "Suburban", value: 14, platformAverage: 0, secondaryValue: 0, disparity: null, status: "Normal" },
  { id: "dyn-s1", type: "SurgeFrequency", zone: "Downtown", value: 14, platformAverage: 10, secondaryValue: 0, disparity: "Peak dinner + events", status: "Warning" },
  { id: "dyn-s2", type: "SurgeFrequency", zone: "Airport", value: 11, platformAverage: 10, secondaryValue: 0, disparity: "Flight banks", status: "Normal" },
  { id: "dyn-s3", type: "SurgeFrequency", zone: "Campus", value: 7, platformAverage: 10, secondaryValue: 0, disparity: "Weekend nightlife", status: "Normal" },
  { id: "dyn-s4", type: "SurgeFrequency", zone: "Suburban", value: 5, platformAverage: 10, secondaryValue: 0, disparity: "Low volatility", status: "Normal" },
  { id: "dyn-g1", type: "GeographicFairness", zone: "Downtown", value: 2.1, platformAverage: 0, secondaryValue: 0, disparity: "2.1 pp vs platform", status: "Normal" },
  { id: "dyn-g2", type: "GeographicFairness", zone: "Midtown", value: 1.6, platformAverage: 0, secondaryValue: 0, disparity: "1.6 pp vs platform", status: "Normal" },
  { id: "dyn-g3", type: "GeographicFairness", zone: "Uptown", value: 2.8, platformAverage: 0, secondaryValue: 0, disparity: "2.8 pp vs platform", status: "Warning" },
  { id: "dyn-g4", type: "GeographicFairness", zone: "West Side", value: 3.4, platformAverage: 0, secondaryValue: 0, disparity: "3.4 pp vs platform", status: "Flagged" }
];

export const fairnessMetrics = {
  dynamic: fairnessDynamicMetrics,
  earningsComparison: [
    { name: "Driver A", value: 980 },
    { name: "Driver B", value: 860 },
    { name: "Driver C", value: 920 },
    { name: "Platform Avg", value: 905 }
  ],
  tripDistribution: [
    { name: "Alex", value: 34 },
    { name: "Maria", value: 28 },
    { name: "James", value: 31 },
    { name: "Others", value: 72 }
  ],
  surgeFrequency: [
    { name: "Downtown", value: 14 },
    { name: "Airport", value: 11 },
    { name: "Campus", value: 7 },
    { name: "Suburban", value: 5 }
  ],
  demographicDisparity: [
    { name: "Zone A", value: 2.1 },
    { name: "Zone B", value: 1.4 },
    { name: "Zone C", value: 0.9 }
  ]
};
