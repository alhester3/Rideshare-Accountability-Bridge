namespace AccountabilityBridge.Models;

public class Decision
{
    public required string DecisionId { get; set; }
    public required string UserId { get; set; }
    public required string DecisionType { get; set; }
    public required string Outcome { get; set; }
    public required string FactorsConsidered { get; set; }
    public required string FactorsExcluded { get; set; }
    public bool IsFlagged { get; set; }
    public required string Status { get; set; }
    public required string SystemVersion { get; set; }
    public DateTime CreatedAt { get; set; }
}
