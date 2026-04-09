using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers.Rider;

/*
 * ROLE: Rider
 * FILE: RiderAppealsController.cs
 * PURPOSE: Handles rider-originated appeal submission and rider appeal tracking.
 *          Rider recourse UI writes and reads through this controller.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/rider/appeals/{userId} — Get rider appeals
 *   POST   /api/rider/appeals          — Submit rider appeal
 */
[ApiController]
[Route("api/rider/appeals")]
public class RiderAppealsController(AppDbContext db) : ControllerBase
{
    [HttpGet("{userId}")]
    public async Task<ActionResult<object>> ByUser(string userId)
        => Ok(await db.Appeals.Where(a => a.UserId == userId).OrderByDescending(a => a.SubmittedAt).ToListAsync());

    [HttpPost]
    public async Task<ActionResult<Appeal>> Submit(Appeal appeal)
    {
        appeal.UserType = "Rider";
        appeal.Status = "Pending";
        appeal.SubmittedAt = DateTime.UtcNow;
        db.Appeals.Add(appeal);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(ByUser), new { userId = appeal.UserId }, appeal);
    }
}
