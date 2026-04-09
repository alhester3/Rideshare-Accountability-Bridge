namespace AccountabilityBridge.Models;

public class Appeal
{
    public required string AppealId { get; set; }
    public required string UserId { get; set; }
    public required string DecisionId { get; set; }
    public required string UserType { get; set; }
    public required string Reason { get; set; }
    public required string Description { get; set; }
    public required string Status { get; set; }
    public string? AdminNotes { get; set; }
    public string? Resolution { get; set; }
    public DateTime SubmittedAt { get; set; }
    public DateTime? ResolvedAt { get; set; }
}
