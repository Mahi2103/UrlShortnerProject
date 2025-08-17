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

        // TTL Index for expiration
        var indexKeys = Builders<UrlMapping>.IndexKeys.Ascending(x => x.ExpiresAt);
        var indexOptions = new CreateIndexOptions { ExpireAfter = TimeSpan.Zero };
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
            hash = BCrypt.Net.BCrypt.HashPassword(request.Password);

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

    public async Task<UrlMapping?> GetByShortCodeAsync(string shortCode)
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

    public async Task<List<UrlMappingDto>> GetAllLinksAsync()
    {
        var urls = await _urlCollection.Find(_ => true)
            .SortByDescending(x => x.CreatedAt)
            .ToListAsync();

        return urls.Select(u => new UrlMappingDto
        {
            Id = u.Id,
            OriginalUrl = u.OriginalUrl,
            ShortCode = u.ShortCode,
            CreatedAt = u.CreatedAt,
            ExpiresAt = u.ExpiresAt,
            Clicks = u.Clicks,
            QrCodeUrl = u.QrCodeUrl,

        }).ToList();
    }

    public async Task<UrlMapping?> GetUrlDetailsAsync(string id)
    {
        return await _urlCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    }

    public async Task<AnalyticsSummary> GetAnalyticsSummaryAsync()
    {
        var all = await _urlCollection.Find(_ => true).ToListAsync();

        return new AnalyticsSummary
        {
            TotalLinks = all.Count,
            TotalClicks = all.Sum(x => x.Clicks),
            ActiveLinks = all.Count(x => !x.ExpiresAt.HasValue || x.ExpiresAt > DateTime.UtcNow),
            ExpiredLinks = all.Count(x => x.ExpiresAt.HasValue && x.ExpiresAt <= DateTime.UtcNow)
        };
    }

    public async Task<List<ClicksOverTime>> GetClicksOverTimeAsync(string id)
    {
        var mapping = await _urlCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        if (mapping == null) return new List<ClicksOverTime>();

        return mapping.AccessLogs
            .GroupBy(x => x.Timestamp.Date)
            .Select(g => new ClicksOverTime
            {
                Date = g.Key,
                Clicks = g.Count()
            })
            .OrderBy(x => x.Date)
            .ToList();
    }



public async Task DeleteUrlAsync(string id)
{
    var deleteResult = await _urlCollection.DeleteOneAsync(x => x.Id == id);
    if (deleteResult.DeletedCount == 0)
        throw new Exception("URL not found or already deleted.");
}


}
