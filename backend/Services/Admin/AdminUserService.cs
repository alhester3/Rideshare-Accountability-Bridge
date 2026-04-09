using AccountabilityBridge.Data;
using AccountabilityBridge.Models;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Services.Admin;

public class AdminUserService(AppDbContext db)
{
    public Task<List<User>> GetAllUsersAsync() => db.Users.Where(u => !u.IsDeleted).ToListAsync();
}
