namespace AccountabilityBridge.Models;

public class Trip
{
    public required string TripId { get; set; }
    public required string UserId { get; set; } // Rider ID
    public string? DriverId { get; set; }
    public required string PickupLocation { get; set; }
    public required string DropoffLocation { get; set; }

    public decimal Distance { get; set; }
    public decimal BaseFare { get; set; }
    public decimal Price { get; set; } // Final price
    public decimal? DriverEarnings { get; set; }

    public bool SurgeApplied { get; set; }
    public decimal SurgeMultiplier { get; set; }
    public string? SurgeReason { get; set; }
    public string? DemandLevel { get; set; }
    public string? DriverAvailability { get; set; }

    public required string Status { get; set; }
    public string? LinkedDecisionId { get; set; }
    public DateTime CreatedAt { get; set; }
}
