using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers;

[ApiController]
[Route("api/audit")]
public class AuditLogController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AuditLog>>> GetAll([FromQuery] string? action, [FromQuery] string? performedBy, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
    {
        var query = db.AuditLogs.AsQueryable();
        if (!string.IsNullOrWhiteSpace(action)) query = query.Where(a => a.ActionTaken.Contains(action));
        if (!string.IsNullOrWhiteSpace(performedBy)) query = query.Where(a => a.PerformedBy == performedBy);
        if (startDate.HasValue) query = query.Where(a => a.Timestamp >= startDate.Value);
        if (endDate.HasValue) query = query.Where(a => a.Timestamp <= endDate.Value);
        return Ok(await query.OrderByDescending(a => a.Timestamp).ToListAsync());
    }

    [HttpGet("decision/{decisionId}")]
    public async Task<ActionResult<IEnumerable<AuditLog>>> ByDecision(string decisionId)
    {
        return Ok(await db.AuditLogs.Where(a => a.DecisionId == decisionId).OrderByDescending(a => a.Timestamp).ToListAsync());
    }

    [HttpPost]
    public async Task<ActionResult<AuditLog>> Create(AuditLog log)
    {
        log.Timestamp = log.Timestamp == default ? DateTime.UtcNow : log.Timestamp;
        db.AuditLogs.Add(log);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(ByDecision), new { decisionId = log.DecisionId }, log);
    }

    [HttpGet("export")]
    public async Task<ActionResult<object>> Export()
    {
        var data = await db.AuditLogs.OrderByDescending(a => a.Timestamp).ToListAsync();
        return Ok(new
        {
            exportedAt = DateTime.UtcNow,
            count = data.Count,
            entries = data
        });
    }
}
