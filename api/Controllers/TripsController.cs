using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TripsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Trip>>> GetAll() => Ok(await db.Trips.ToListAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Trip>> GetById(string id)
    {
        var trip = await db.Trips.FirstOrDefaultAsync(t => t.TripId == id);
        return trip is null ? NotFound() : Ok(trip);
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<Trip>>> ByUser(string userId) => Ok(await db.Trips.Where(t => t.UserId == userId).ToListAsync());

    [HttpGet("driver/{driverId}")]
    public async Task<ActionResult<IEnumerable<Trip>>> ByDriver(string driverId) => Ok(await db.Trips.Where(t => t.DriverId == driverId).ToListAsync());

    [HttpPost]
    public async Task<ActionResult<Trip>> Create(Trip trip)
    {
        trip.CreatedAt = trip.CreatedAt == default ? DateTime.UtcNow : trip.CreatedAt;
        db.Trips.Add(trip);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = trip.TripId }, trip);
    }

    public record TripStatusUpdate(string Status);

    [HttpPut("{id}")]
    public async Task<ActionResult<Trip>> UpdateStatus(string id, [FromBody] TripStatusUpdate body)
    {
        var trip = await db.Trips.FirstOrDefaultAsync(t => t.TripId == id);
        if (trip is null) return NotFound();
        trip.Status = body.Status;
        await db.SaveChangesAsync();
        return Ok(trip);
    }
}
