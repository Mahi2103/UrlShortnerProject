public class UrlMappingDto
{
    public string? Id { get; set; }
    public string? OriginalUrl { get; set; }
    public string? ShortCode { get; set; }
    public int Clicks { get; set; }
    public DateTime? ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? QrCodeUrl { get; set; }

   public string? Browser { get; set; }
    public string? Device { get; set; }
    public string? IpAddress { get; set; }
    public List<AccessLog>? AccessLogs { get; set; } = new();
}
