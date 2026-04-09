using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers;

[ApiController]
[Route("api/fairness")]
public class FairnessMetricsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<FairnessMetric>>> GetAll() => Ok(await db.FairnessMetrics.OrderByDescending(f => f.RecordedAt).ToListAsync());

    [HttpGet("zone/{zone}")]
    public async Task<ActionResult<IEnumerable<FairnessMetric>>> ByZone(string zone) => Ok(await db.FairnessMetrics.Where(f => f.Zone.ToLower() == zone.ToLower()).ToListAsync());

    [HttpGet("type/{type}")]
    public async Task<ActionResult<IEnumerable<FairnessMetric>>> ByType(string type) => Ok(await db.FairnessMetrics.Where(f => f.MetricType.ToLower() == type.ToLower()).ToListAsync());

    [HttpPost]
    public async Task<ActionResult<FairnessMetric>> Create(FairnessMetric metric)
    {
        metric.RecordedAt = metric.RecordedAt == default ? DateTime.UtcNow : metric.RecordedAt;
        db.FairnessMetrics.Add(metric);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = metric.MetricId }, metric);
    }

    [HttpGet("summary")]
    public async Task<ActionResult<object>> Summary()
    {
        var metrics = await db.FairnessMetrics.ToListAsync();
        var summary = new
        {
            total = metrics.Count,
            flagged = metrics.Count(m => m.Status == "Flagged"),
            warning = metrics.Count(m => m.Status == "Warning"),
            byType = metrics.GroupBy(m => m.MetricType).Select(g => new { type = g.Key, avg = g.Average(x => x.Value) }),
            byZone = metrics.GroupBy(m => m.Zone).Select(g => new { zone = g.Key, count = g.Count() })
        };
        return Ok(summary);
    }
}
