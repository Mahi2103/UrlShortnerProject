public class ShortenUrlRequest
{
    public required string OriginalUrl { get; set; }
    public string? CustomAlias { get; set; }
    public string? Password { get; set; }
    public DateTime? ExpirationDate { get; set; }
}