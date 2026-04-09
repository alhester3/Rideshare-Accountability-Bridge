using AccountabilityBridge.Data;
using AccountabilityBridge.Models;

namespace AccountabilityBridge.Services.Shared;

public class AppealService(AppDbContext db)
{
    public async Task<Appeal> CreatePendingAsync(Appeal appeal)
    {
        appeal.Status = "Pending";
        appeal.SubmittedAt = DateTime.UtcNow;
        db.Appeals.Add(appeal);
        await db.SaveChangesAsync();
        return appeal;
    }
}
