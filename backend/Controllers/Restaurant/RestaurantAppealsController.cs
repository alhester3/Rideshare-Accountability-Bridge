using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers.Restaurant;

/*
 * ROLE: Restaurant
 * FILE: RestaurantAppealsController.cs
 * PURPOSE: Handles restaurant review requests and appeal status tracking.
 *          Restaurant partner recourse flows use this controller.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/restaurant/appeals/{restaurantId} — Get restaurant appeals
 *   POST   /api/restaurant/appeals               — Submit restaurant appeal
 */
[ApiController]
[Route("api/restaurant/appeals")]
public class RestaurantAppealsController(AppDbContext db) : ControllerBase
{
    [HttpGet("{restaurantId}")]
    public async Task<ActionResult<IEnumerable<Appeal>>> ByRestaurant(string restaurantId)
        => Ok(await db.Appeals.Where(a => a.UserId == restaurantId).OrderByDescending(a => a.SubmittedAt).ToListAsync());

    [HttpPost]
    public async Task<ActionResult<Appeal>> Submit(Appeal appeal)
    {
        appeal.UserType = "Restaurant";
        appeal.Status = "Pending";
        appeal.SubmittedAt = DateTime.UtcNow;
        db.Appeals.Add(appeal);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(ByRestaurant), new { restaurantId = appeal.UserId }, appeal);
    }
}
