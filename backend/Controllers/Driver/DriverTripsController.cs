using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers.Driver;

/*
 * ROLE: Driver
 * FILE: DriverTripsController.cs
 * PURPOSE: Handles driver trip retrieval and trip updates used by driver operations screens.
 *          Driver trip history, status updates, and assignment detail use this controller.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/driver/trips/{driverId} — Get trips for driver
 *   GET    /api/trips                    — Shared trip list
 *   GET    /api/trips/{id}               — Shared single trip
 *   GET    /api/trips/user/{userId}      — Shared trips by user
 *   GET    /api/trips/driver/{driverId}  — Shared trips by driver
 *   POST   /api/trips                    — Create trip
 *   PUT    /api/trips/{id}               — Update trip status
 */
[ApiController]
[Route("api")]
public class DriverTripsController(AppDbContext db) : ControllerBase
{
    [HttpGet("driver/trips/{driverId}")]
    public async Task<ActionResult<IEnumerable<Trip>>> DriverTrips(string driverId)
        => Ok(await db.Trips.Where(t => t.DriverId == driverId).ToListAsync());

    [HttpGet("trips")]
    public async Task<ActionResult<IEnumerable<Trip>>> GetAll() => Ok(await db.Trips.ToListAsync());

    [HttpGet("trips/{id}")]
    public async Task<ActionResult<Trip>> GetById(string id)
    {
        var trip = await db.Trips.FirstOrDefaultAsync(t => t.TripId == id);
        return trip is null ? NotFound() : Ok(trip);
    }

    [HttpGet("trips/user/{userId}")]
    public async Task<ActionResult<IEnumerable<Trip>>> ByUser(string userId) => Ok(await db.Trips.Where(t => t.UserId == userId).ToListAsync());

    [HttpGet("trips/driver/{driverId}")]
    public async Task<ActionResult<IEnumerable<Trip>>> ByDriver(string driverId) => Ok(await db.Trips.Where(t => t.DriverId == driverId).ToListAsync());

    [HttpPost("trips")]
    public async Task<ActionResult<Trip>> Create(Trip trip)
    {
        trip.CreatedAt = trip.CreatedAt == default ? DateTime.UtcNow : trip.CreatedAt;
        db.Trips.Add(trip);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = trip.TripId }, trip);
    }

    public record TripStatusUpdate(string Status);

    [HttpPut("trips/{id}")]
    public async Task<ActionResult<Trip>> UpdateStatus(string id, [FromBody] TripStatusUpdate body)
    {
        var trip = await db.Trips.FirstOrDefaultAsync(t => t.TripId == id);
        if (trip is null) return NotFound();
        trip.Status = body.Status;
        await db.SaveChangesAsync();
        return Ok(trip);
    }
}
