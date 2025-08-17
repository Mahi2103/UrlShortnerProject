public class AccessLog
{
 public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string? IpAddress { get; set; }
    public string? Device { get; set; }
    public string? Browser { get; set; }
}
