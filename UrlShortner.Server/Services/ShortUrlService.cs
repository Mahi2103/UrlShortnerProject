using MongoDB.Driver;

public class ShortUrlService : IShortUrlService
{
    private readonly IMongoCollection<UrlMapping> _urlCollection;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ShortUrlService(IMongoClient config, IHttpContextAccessor httpContextAccessor)
    {
        var database = config.GetDatabase("UrlShortner");
        _urlCollection = database.GetCollection<UrlMapping>("Urlmapping");
        _httpContextAccessor = httpContextAccessor;


        var indexKeys = Builders<UrlMapping>.IndexKeys.Ascending(x => x.ExpiresAt);
        var indexOptions = new CreateIndexOptions
        {
            ExpireAfter = TimeSpan.Zero 
        };
        var indexModel = new CreateIndexModel<UrlMapping>(indexKeys, indexOptions);

        _urlCollection.Indexes.CreateOne(indexModel);
    }

    public async Task<ShortenUrlResponse> CreateShortUrlAsync(ShortenUrlRequest request)
    {
        string shortCode = string.IsNullOrEmpty(request.CustomAlias)
            ? GenerateRandomCode() : request.CustomAlias;

        var exists = await _urlCollection.Find(x => x.ShortCode == shortCode).FirstOrDefaultAsync();
        if (exists != null)
            throw new Exception("Short code already used.");

        string? hash = null;
        if (!string.IsNullOrEmpty(request.Password))
            hash = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(request.Password));

        if (request.ExpirationDate == default || request.ExpirationDate <= DateTime.UtcNow)
            request.ExpirationDate = null;

        string shortUrl = GetBaseUrl() + "/" + shortCode;

        var mapping = new UrlMapping
        {
            OriginalUrl = request.OriginalUrl,
            ShortCode = shortCode,
            ExpiresAt = request.ExpirationDate,
            IsPasswordProtected = !string.IsNullOrEmpty(request.Password),
            PasswordHash = hash,
            QrCodeUrl = GenerateQr(shortUrl)
        };

        await _urlCollection.InsertOneAsync(mapping);

        return new ShortenUrlResponse
        {
            ShortUrl = shortUrl,
            QrCodeUrl = mapping.QrCodeUrl,
            CreatedAt = mapping.CreatedAt,
            ExpirationDate = mapping.ExpiresAt
        };
    }

    public async Task<UrlMapping> GetByShortCodeAsync(string shortCode)
    {
        return await _urlCollection.Find(x => x.ShortCode == shortCode).FirstOrDefaultAsync();
    }

    public async Task UpdateUrlMappingAsync(string id, UrlMapping updated)
    {
        await _urlCollection.ReplaceOneAsync(x => x.Id == id, updated);
    }

    private string GenerateRandomCode(int length = 6)
    {
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var random = new Random();
        return new string(Enumerable.Repeat(chars, length).Select(x => x[random.Next(x.Length)]).ToArray());
    }

    private string GetBaseUrl()
    {
        var req = _httpContextAccessor.HttpContext?.Request;
        return $"{req?.Scheme}://{req?.Host}";
    }

    private string GenerateQr(string url)
    {
        return $"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={url}";
    }
}
  