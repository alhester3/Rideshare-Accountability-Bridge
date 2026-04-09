using AccountabilityBridge.Data;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Services.Driver;

public class DriverService(AppDbContext db)
{
    public async Task<decimal> GetDriverEarningsAsync(string driverId)
        => await db.Trips.Where(t => t.DriverId == driverId).SumAsync(t => t.DriverEarnings ?? 0m);
}
