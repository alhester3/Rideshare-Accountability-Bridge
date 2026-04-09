using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers.Shared;

/*
 * ROLE: Shared
 * FILE: DecisionsController.cs
 * PURPOSE: Handles decision retrieval and decision-level actions shared across roles.
 *          Used by rider, driver, restaurant, and admin experiences for explanation data.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/decisions              — Get all decisions with filters
 *   GET    /api/decisions/{id}         — Get decision with audit trail
 *   GET    /api/decisions/user/{userId}— Get decisions for a user
 *   POST   /api/decisions              — Create decision
 *   PUT    /api/decisions/{id}/flag    — Toggle decision flag
 *   PUT    /api/decisions/{id}/overturn— Overturn decision
 */
[ApiController]
[Route("api/decisions")]
public class DecisionsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Decision>>> GetAll([FromQuery] string? type, [FromQuery] string? status, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
    {
        var query = db.Decisions.AsQueryable();
        if (!string.IsNullOrWhiteSpace(type)) query = query.Where(d => d.DecisionType == type);
        if (!string.IsNullOrWhiteSpace(status)) query = query.Where(d => d.Status == status);
        if (startDate.HasValue) query = query.Where(d => d.CreatedAt >= startDate.Value);
        if (endDate.HasValue) query = query.Where(d => d.CreatedAt <= endDate.Value);
        return Ok(await query.OrderByDescending(d => d.CreatedAt).ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetById(string id)
    {
        var decision = await db.Decisions.FirstOrDefaultAsync(d => d.DecisionId == id);
        if (decision is null) return NotFound();
        var auditTrail = await db.AuditLogs.Where(a => a.DecisionId == id).OrderByDescending(a => a.Timestamp).ToListAsync();
        return Ok(new { decision, auditTrail });
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<Decision>>> ByUser(string userId)
        => Ok(await db.Decisions.Where(d => d.UserId == userId).ToListAsync());

    [HttpPost]
    public async Task<ActionResult<Decision>> Create(Decision decision)
    {
        decision.CreatedAt = decision.CreatedAt == default ? DateTime.UtcNow : decision.CreatedAt;
        db.Decisions.Add(decision);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = decision.DecisionId }, decision);
    }

    [HttpPut("{id}/flag")]
    public async Task<ActionResult<Decision>> ToggleFlag(string id)
    {
        var decision = await db.Decisions.FirstOrDefaultAsync(d => d.DecisionId == id);
        if (decision is null) return NotFound();
        decision.IsFlagged = !decision.IsFlagged;
        await db.SaveChangesAsync();
        return Ok(decision);
    }

    [HttpPut("{id}/overturn")]
    public async Task<ActionResult<Decision>> Overturn(string id)
    {
        var decision = await db.Decisions.FirstOrDefaultAsync(d => d.DecisionId == id);
        if (decision is null) return NotFound();
        decision.Outcome = "Overturned";
        decision.Status = "Overturned";
        await db.SaveChangesAsync();
        return Ok(decision);
    }
}
