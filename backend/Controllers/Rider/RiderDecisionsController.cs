using AccountabilityBridge.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers.Rider;

/*
 * ROLE: Rider
 * FILE: RiderDecisionsController.cs
 * PURPOSE: Exposes rider-focused decision explanation records and factor boundaries.
 *          Rider explanation screens and trust messaging rely on this controller.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/rider/decisions/{userId} — Get rider decisions list
 *   GET    /api/rider/decisions/item/{decisionId} — Get single rider decision detail
 */
[ApiController]
[Route("api/rider/decisions")]
public class RiderDecisionsController(AppDbContext db) : ControllerBase
{
    [HttpGet("{userId}")]
    public async Task<ActionResult<object>> GetByUser(string userId)
        => Ok(await db.Decisions.Where(d => d.UserId == userId).OrderByDescending(d => d.CreatedAt).ToListAsync());

    [HttpGet("item/{decisionId}")]
    public async Task<ActionResult<object>> GetOne(string decisionId)
    {
        var decision = await db.Decisions.FirstOrDefaultAsync(d => d.DecisionId == decisionId);
        return decision is null ? NotFound() : Ok(decision);
    }
}
