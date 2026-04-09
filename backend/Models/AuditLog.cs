namespace AccountabilityBridge.Models;

public class AuditLog
{
    public required string LogId { get; set; }
    public required string DecisionId { get; set; }
    public string? AppealId { get; set; }
    public required string ActionTaken { get; set; }
    public required string PerformedBy { get; set; }
    public required string Notes { get; set; }
    public DateTime Timestamp { get; set; }
}
