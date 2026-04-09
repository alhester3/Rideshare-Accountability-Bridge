using AccountabilityBridge.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers.Restaurant;

/*
 * ROLE: Restaurant
 * FILE: RestaurantOrdersController.cs
 * PURPOSE: Provides restaurant order/trip queues and order-level operational visibility.
 *          Restaurant kanban and order review contexts use this controller.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/restaurant/orders/{restaurantId} — Get restaurant order-like records
 */
[ApiController]
[Route("api/restaurant/orders")]
public class RestaurantOrdersController(AppDbContext db) : ControllerBase
{
    [HttpGet("{restaurantId}")]
    public async Task<ActionResult<object>> GetOrders(string restaurantId)
    {
        var restaurant = await db.Users.FirstOrDefaultAsync(u => u.UserId == restaurantId && u.Role == "Restaurant");
        if (restaurant is null) return NotFound();
        var decisions = await db.Decisions.Where(d => d.UserId == restaurantId).OrderByDescending(d => d.CreatedAt).ToListAsync();
        return Ok(new { restaurant, decisions });
    }
}
