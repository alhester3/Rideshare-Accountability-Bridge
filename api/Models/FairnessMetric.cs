namespace AccountabilityBridge.Models;

public class FairnessMetric
{
    public required string MetricId { get; set; }
    public required string MetricType { get; set; }
    public required string Zone { get; set; }
    public decimal Value { get; set; }
    public required string Status { get; set; }
    public DateTime RecordedAt { get; set; }
}
