using AccountabilityBridge.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers.Rider;

/*
 * ROLE: Rider
 * FILE: RiderDashboardController.cs
 * PURPOSE: Provides rider dashboard data including recent trips and alert summaries.
 *          Frontend rider home experience consumes this controller.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/rider/dashboard/{userId} — Get rider dashboard payload
 */
[ApiController]
[Route("api/rider/dashboard")]
public class RiderDashboardController(AppDbContext db) : ControllerBase
{
    [HttpGet("{userId}")]
    public async Task<ActionResult<object>> GetDashboard(string userId)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.UserId == userId && !u.IsDeleted);
        if (user is null) return NotFound();
        var trips = await db.Trips.Where(t => t.UserId == userId).OrderByDescending(t => t.CreatedAt).Take(10).ToListAsync();
        var latestDecision = await db.Decisions.Where(d => d.UserId == userId).OrderByDescending(d => d.CreatedAt).FirstOrDefaultAsync();
        return Ok(new { user, trips, latestDecision, trustScore = 82 });
    }
}
