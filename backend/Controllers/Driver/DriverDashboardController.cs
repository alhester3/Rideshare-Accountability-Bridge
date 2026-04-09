using AccountabilityBridge.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers.Driver;

/*
 * ROLE: Driver
 * FILE: DriverDashboardController.cs
 * PURPOSE: Provides driver dashboard metrics, performance summaries, and earnings snapshots.
 *          Driver overview and KPI cards consume this controller.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/driver/dashboard/{driverId} — Get driver dashboard payload
 */
[ApiController]
[Route("api/driver/dashboard")]
public class DriverDashboardController(AppDbContext db) : ControllerBase
{
    [HttpGet("{driverId}")]
    public async Task<ActionResult<object>> GetDashboard(string driverId)
    {
        var driver = await db.Users.FirstOrDefaultAsync(u => u.UserId == driverId && u.Role == "Driver");
        if (driver is null) return NotFound();
        var trips = await db.Trips.Where(t => t.DriverId == driverId).OrderByDescending(t => t.CreatedAt).Take(20).ToListAsync();
        var totalEarnings = trips.Sum(t => t.DriverEarnings);
        return Ok(new { driver, trips, totalEarnings, fairnessScore = 88 });
    }
}
