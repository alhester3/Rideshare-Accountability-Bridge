using AccountabilityBridge.Data;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Services.Admin;

public class AdminReportService(AppDbContext db)
{
    public async Task<object> GetSummaryAsync()
    {
        var users = await db.Users.CountAsync();
        var appeals = await db.Appeals.CountAsync();
        var flags = await db.Decisions.CountAsync(d => d.IsFlagged);
        return new { users, appeals, flags };
    }
}
