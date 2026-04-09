using Microsoft.AspNetCore.Mvc;

namespace AccountabilityBridge.Controllers._examples;

/*
 * ROLE: Example
 * FILE: HealthController.cs
 * PURPOSE: Preserved legacy health-check reference from earlier scaffold.
 *          Not part of active role-based controller architecture.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/examples/health        — Sample health endpoint
 */
[ApiController]
[Route("api/examples/health")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new { status = "healthy" });
}
