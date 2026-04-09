using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers.Admin;

/*
 * ROLE: Admin
 * FILE: AdminUsersController.cs
 * PURPOSE: Handles admin user management and account-level oversight actions.
 *          Admin can browse all users, drill into full histories, and update statuses.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/admin/users            — Get all users
 *   GET    /api/admin/users/{id}       — Get user with trip/decision/appeal history
 *   POST   /api/admin/users            — Create user
 *   PUT    /api/admin/users/{id}       — Update user
 *   DELETE /api/admin/users/{id}       — Soft delete user
 *   GET    /api/admin/users/role/{role}— Get users by role
 */
[ApiController]
[Route("api/admin/users")]
public class AdminUsersController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    [HttpGet("/api/users")]
    public async Task<ActionResult<IEnumerable<User>>> GetAll() => Ok(await db.Users.Where(u => !u.IsDeleted).ToListAsync());

    [HttpGet("{id}")]
    [HttpGet("/api/users/{id}")]
    public async Task<ActionResult<object>> GetById(string id)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.UserId == id && !u.IsDeleted);
        if (user is null) return NotFound();

        var trips = await db.Trips.Where(t => t.UserId == id || t.DriverId == id).ToListAsync();
        var decisions = await db.Decisions.Where(d => d.UserId == id).ToListAsync();
        var appeals = await db.Appeals.Where(a => a.UserId == id).ToListAsync();

        return Ok(new { user, trips, decisions, appeals });
    }

    [HttpPost]
    [HttpPost("/api/users")]
    public async Task<ActionResult<User>> Create(User user)
    {
        user.CreatedAt = user.CreatedAt == default ? DateTime.UtcNow : user.CreatedAt;
        user.LastActivity = DateTime.UtcNow;
        db.Users.Add(user);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = user.UserId }, user);
    }

    [HttpPut("{id}")]
    [HttpPut("/api/users/{id}")]
    public async Task<ActionResult<User>> Update(string id, User update)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.UserId == id);
        if (user is null) return NotFound();

        user.Name = update.Name;
        user.Email = update.Email;
        user.Role = update.Role;
        user.AccountStatus = update.AccountStatus;
        user.LastActivity = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return Ok(user);
    }

    [HttpDelete("{id}")]
    [HttpDelete("/api/users/{id}")]
    public async Task<IActionResult> SoftDelete(string id)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.UserId == id);
        if (user is null) return NotFound();
        user.IsDeleted = true;
        user.AccountStatus = "Suspended";
        user.LastActivity = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("role/{role}")]
    [HttpGet("/api/users/role/{role}")]
    public async Task<ActionResult<IEnumerable<User>>> ByRole(string role)
        => Ok(await db.Users.Where(u => !u.IsDeleted && u.Role.ToLower() == role.ToLower()).ToListAsync());
}
