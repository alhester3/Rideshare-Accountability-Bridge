using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAll()
    {
        return Ok(await db.Users.Where(u => !u.IsDeleted).ToListAsync());
    }

    [HttpGet("{id}")]
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
    public async Task<ActionResult<User>> Create(User user)
    {
        user.CreatedAt = user.CreatedAt == default ? DateTime.UtcNow : user.CreatedAt;
        user.LastActivity = DateTime.UtcNow;
        db.Users.Add(user);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = user.UserId }, user);
    }

    [HttpPut("{id}")]
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
    public async Task<ActionResult<IEnumerable<User>>> ByRole(string role)
    {
        var users = await db.Users.Where(u => !u.IsDeleted && u.Role.ToLower() == role.ToLower()).ToListAsync();
        return Ok(users);
    }
}
