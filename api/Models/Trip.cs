namespace AccountabilityBridge.Models;

public class Trip
{
    public required string TripId { get; set; }
    public required string UserId { get; set; }
    public required string DriverId { get; set; }
    public required string PickupLocation { get; set; }
    public required string DropoffLocation { get; set; }
    public decimal Price { get; set; }
    public decimal DriverEarnings { get; set; }
    public bool SurgeApplied { get; set; }
    public decimal SurgeMultiplier { get; set; }
    public required string Status { get; set; }
    public DateTime CreatedAt { get; set; }
}
