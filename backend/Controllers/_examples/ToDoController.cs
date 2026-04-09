using Microsoft.AspNetCore.Mvc;

namespace AccountabilityBridge.Controllers._examples;

/*
 * ROLE: Example
 * FILE: ToDoController.cs
 * PURPOSE: Preserved template example controller for onboarding reference only.
 *          This file is not part of live API routes and should not be used in production.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/examples/todo          — Sample endpoint
 */
[ApiController]
[Route("api/examples/todo")]
public class ToDoController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new[] { "example" });
}
