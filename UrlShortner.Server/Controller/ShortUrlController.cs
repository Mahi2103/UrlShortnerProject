using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("")]
public class ShortUrlController : ControllerBase
{
    private readonly IShortUrlService _service;

    public ShortUrlController(IShortUrlService service)
    {
        _service = service;
    }

    [HttpPost("api/shorturl/shorten")]
    public async Task<IActionResult> Create([FromBody] ShortenUrlRequest req)
    {
        if (!Uri.IsWellFormedUriString(req.OriginalUrl, UriKind.Absolute))
            return BadRequest("Invalid URL");
        try
        {
            var result = await _service.CreateShortUrlAsync(req);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> RedirectTo(string code)
    {
        var mapping = await _service.GetByShortCodeAsync(code);
        if (mapping == null) return NotFound();

        Console.WriteLine($"[DEBUG] Checking ExpiresAt: {mapping.ExpiresAt}, Now: {DateTime.UtcNow}");

        if (mapping.ExpiresAt.HasValue && mapping.ExpiresAt.Value != default && mapping.ExpiresAt < DateTime.UtcNow)
            return BadRequest("Link expired");

        mapping.Clicks++;
        mapping.AccessLogs.Add(new AccessLog
        {
            IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),
            Browser = Request.Headers["User-Agent"],
            Device = ParseDevice(Request.Headers["User-Agent"])
        });

        await _service.UpdateUrlMappingAsync(mapping.Id, mapping);
        return Redirect(mapping.OriginalUrl);
    }

    private string ParseDevice(string userAgent)
    {
        if (userAgent.Contains("Mobile")) return "Mobile";
        if (userAgent.Contains("Windows")) return "Windows";
        if (userAgent.Contains("Mac")) return "Mac";
        return "Unknown";
    }
}
