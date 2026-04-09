namespace AccountabilityBridge.Models;

public class User
{
    public required string UserId { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public string? Phone { get; set; }
    public required string Role { get; set; }
    public required string AccountStatus { get; set; }
    public DateTime? MemberSince { get; set; }

    public int? TotalRides { get; set; }
    public int? TotalTrips { get; set; }
    public int? TotalOrders { get; set; }

    public decimal? Rating { get; set; }
    public decimal? CompletionRate { get; set; }
    public string? Zone { get; set; }
    public decimal? WeeklyEarnings { get; set; }
    public decimal? PlatformAverageEarnings { get; set; }

    public string? CuisineType { get; set; }
    public decimal? AverageOrderValue { get; set; }

    public string? AdminLevel { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime LastActivity { get; set; }
}
