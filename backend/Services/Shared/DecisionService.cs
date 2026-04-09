using AccountabilityBridge.Data;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Services.Shared;

public class DecisionService(AppDbContext db)
{
    public Task<int> GetFlaggedCountAsync() => db.Decisions.CountAsync(d => d.IsFlagged);
}
