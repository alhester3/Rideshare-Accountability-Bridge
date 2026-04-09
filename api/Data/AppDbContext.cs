using AccountabilityBridge.Models;
using Microsoft.EntityFrameworkCore;

namespace AccountabilityBridge.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Trip> Trips { get; set; }
    public DbSet<Decision> Decisions { get; set; }
    public DbSet<Appeal> Appeals { get; set; }
    public DbSet<FairnessMetric> FairnessMetrics { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasKey(u => u.UserId);
        modelBuilder.Entity<Trip>().HasKey(t => t.TripId);
        modelBuilder.Entity<Decision>().HasKey(d => d.DecisionId);
        modelBuilder.Entity<Appeal>().HasKey(a => a.AppealId);
        modelBuilder.Entity<FairnessMetric>().HasKey(f => f.MetricId);
        modelBuilder.Entity<AuditLog>().HasKey(a => a.LogId);

        modelBuilder.Entity<Trip>()
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Decision>()
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(d => d.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Appeal>()
            .HasOne<Decision>()
            .WithMany()
            .HasForeignKey(a => a.DecisionId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<AuditLog>()
            .HasOne<Decision>()
            .WithMany()
            .HasForeignKey(al => al.DecisionId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
