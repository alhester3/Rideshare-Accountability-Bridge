using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers.Admin;

/*
 * ROLE: Admin
 * FILE: AdminFairnessController.cs
 * PURPOSE: Handles fairness metrics ingestion, retrieval, and administrative summaries.
 *          Admin fairness dashboards and monitoring workflows use this controller.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/admin/fairness         — Get all metrics
 *   GET    /api/admin/fairness/zone/{zone} — Get metrics by zone
 *   GET    /api/admin/fairness/type/{type} — Get metrics by type
 *   POST   /api/admin/fairness         — Create metric record
 *   GET    /api/admin/fairness/summary — Get aggregate summary
 */
[ApiController]
[Route("api/admin/fairness")]
public class AdminFairnessController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    [HttpGet("/api/fairness")]
    public async Task<ActionResult<IEnumerable<FairnessMetric>>> GetAll()
        => Ok(await db.FairnessMetrics.OrderByDescending(f => f.RecordedAt).ToListAsync());

    [HttpGet("zone/{zone}")]
    [HttpGet("/api/fairness/zone/{zone}")]
    public async Task<ActionResult<IEnumerable<FairnessMetric>>> ByZone(string zone)
        => Ok(await db.FairnessMetrics.Where(f => f.Zone.ToLower() == zone.ToLower()).ToListAsync());

    [HttpGet("type/{type}")]
    [HttpGet("/api/fairness/type/{type}")]
    public async Task<ActionResult<IEnumerable<FairnessMetric>>> ByType(string type)
        => Ok(await db.FairnessMetrics.Where(f => f.MetricType.ToLower() == type.ToLower()).ToListAsync());

    [HttpPost]
    [HttpPost("/api/fairness")]
    public async Task<ActionResult<FairnessMetric>> Create(FairnessMetric metric)
    {
        metric.RecordedAt = metric.RecordedAt == default ? DateTime.UtcNow : metric.RecordedAt;
        db.FairnessMetrics.Add(metric);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = metric.MetricId }, metric);
    }

    [HttpGet("summary")]
    [HttpGet("/api/fairness/summary")]
    public async Task<ActionResult<object>> Summary()
    {
        var metrics = await db.FairnessMetrics.ToListAsync();
        return Ok(new
        {
            total = metrics.Count,
            flagged = metrics.Count(m => m.Status == "Flagged"),
            warning = metrics.Count(m => m.Status == "Warning"),
            byType = metrics.GroupBy(m => m.MetricType).Select(g => new { type = g.Key, avg = g.Average(x => x.Value) }),
            byZone = metrics.GroupBy(m => m.Zone).Select(g => new { zone = g.Key, count = g.Count() })
        });
    }
}
