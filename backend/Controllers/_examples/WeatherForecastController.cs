using Microsoft.AspNetCore.Mvc;

namespace AccountabilityBridge.Controllers._examples;

/*
 * ROLE: Example
 * FILE: WeatherForecastController.cs
 * PURPOSE: Preserved Microsoft template controller for development reference.
 *          Not part of active platform API.
 * TEAM MEMBER WORKING ON THIS: [Name]
 * ENDPOINTS:
 *   GET    /api/examples/weatherforecast — Sample weather payload
 */
[ApiController]
[Route("api/examples/weatherforecast")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var data = Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = "Example"
        });

        return Ok(data);
    }
}
