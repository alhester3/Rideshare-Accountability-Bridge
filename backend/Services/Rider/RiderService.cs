using AccountabilityBridge.Data;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Services.Rider;

public class RiderService(AppDbContext db)
{
    public Task<int> GetRiderTripCountAsync(string userId) => db.Trips.CountAsync(t => t.UserId == userId);
}
