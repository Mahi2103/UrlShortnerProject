public class ShortenUrlResponse
{
    public string? ShortUrl { get; set; }
    public string? QrCodeUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ExpirationDate { get; set; }
}
