using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class UrlMapping
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string? OriginalUrl { get; set; }

    public string? ShortCode { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

   public List<AccessLog> AccessLogs { get; set; } = new List<AccessLog>();
    public DateTime? ExpiresAt { get; set; }           

    public int Clicks { get; set; } = 0;


    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; } = string.Empty;

    public bool IsPasswordProtected { get; set; } = false;

    public string? PasswordHash { get; set; }

    public string? QrCodeUrl { get; set; }
}
