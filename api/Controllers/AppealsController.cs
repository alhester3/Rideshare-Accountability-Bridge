using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppealsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Appeal>>> GetAll([FromQuery] string? status, [FromQuery] string? userType, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
    {
        var query = db.Appeals.AsQueryable();
        if (!string.IsNullOrWhiteSpace(status)) query = query.Where(a => a.Status == status);
        if (!string.IsNullOrWhiteSpace(userType)) query = query.Where(a => a.UserType == userType);
        if (startDate.HasValue) query = query.Where(a => a.SubmittedAt >= startDate.Value);
        if (endDate.HasValue) query = query.Where(a => a.SubmittedAt <= endDate.Value);
        return Ok(await query.OrderByDescending(a => a.SubmittedAt).ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetById(string id)
    {
        var appeal = await db.Appeals.FirstOrDefaultAsync(a => a.AppealId == id);
        if (appeal is null) return NotFound();
        var decision = await db.Decisions.FirstOrDefaultAsync(d => d.DecisionId == appeal.DecisionId);
        var user = await db.Users.FirstOrDefaultAsync(u => u.UserId == appeal.UserId);
        return Ok(new { appeal, decision, user });
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<Appeal>>> ByUser(string userId) => Ok(await db.Appeals.Where(a => a.UserId == userId).ToListAsync());

    [HttpPost]
    public async Task<ActionResult<Appeal>> Create(Appeal appeal)
    {
        appeal.Status = "Pending";
        appeal.SubmittedAt = DateTime.UtcNow;
        db.Appeals.Add(appeal);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = appeal.AppealId }, appeal);
    }

    public record AppealStatusUpdate(string Status, string? Notes);

    [HttpPut("{id}/status")]
    public async Task<ActionResult<Appeal>> UpdateStatus(string id, [FromBody] AppealStatusUpdate body)
    {
        var appeal = await db.Appeals.FirstOrDefaultAsync(a => a.AppealId == id);
        if (appeal is null) return NotFound();
        appeal.Status = body.Status;
        appeal.AdminNotes = body.Notes;
        if (body.Status is "Approved" or "Denied") appeal.ResolvedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return Ok(appeal);
    }

    public record AppealResolveRequest(string Status, string? Resolution, string? AdminNotes);

    [HttpPut("{id}/resolve")]
    public async Task<ActionResult<Appeal>> Resolve(string id, [FromBody] AppealResolveRequest body)
    {
        var appeal = await db.Appeals.FirstOrDefaultAsync(a => a.AppealId == id);
        if (appeal is null) return NotFound();

        appeal.Status = body.Status;
        appeal.AdminNotes = body.AdminNotes;
        appeal.Resolution = body.Resolution;
        appeal.ResolvedAt = DateTime.UtcNow;

        if (body.Status == "Approved")
        {
            var decision = await db.Decisions.FirstOrDefaultAsync(d => d.DecisionId == appeal.DecisionId);
            if (decision is not null)
            {
                decision.Outcome = "Overturned";
                decision.Status = "Overturned";
            }
        }

        await db.SaveChangesAsync();
        return Ok(appeal);
    }
}
