using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers.Driver;

/*
 * ROLE: Driver
 * FILE: DriverAppealsController.cs
 * PURPOSE: Handles driver-submitted appeals and driver appeal status tracking.
 *          Driver recourse flows submit and monitor through this controller.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/driver/appeals/{driverId} — Get driver appeals
 *   POST   /api/driver/appeals            — Submit driver appeal
 */
[ApiController]
[Route("api/driver/appeals")]
public class DriverAppealsController(AppDbContext db) : ControllerBase
{
    [HttpGet("{driverId}")]
    public async Task<ActionResult<IEnumerable<Appeal>>> ByDriver(string driverId)
        => Ok(await db.Appeals.Where(a => a.UserId == driverId).OrderByDescending(a => a.SubmittedAt).ToListAsync());

    [HttpPost]
    public async Task<ActionResult<Appeal>> Submit(Appeal appeal)
    {
        appeal.UserType = "Driver";
        appeal.Status = "Pending";
        appeal.SubmittedAt = DateTime.UtcNow;
        db.Appeals.Add(appeal);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(ByDriver), new { driverId = appeal.UserId }, appeal);
    }
}
