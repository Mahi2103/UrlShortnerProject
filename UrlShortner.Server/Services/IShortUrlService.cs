public interface IShortUrlService
{
    Task<ShortenUrlResponse> CreateShortUrlAsync(ShortenUrlRequest request);
    Task<UrlMapping?> GetByShortCodeAsync(string shortCode); // nullable
    Task UpdateUrlMappingAsync(string id, UrlMapping updated);
    Task<List<UrlMappingDto>> GetAllLinksAsync(); // For table
    Task<UrlMapping?> GetUrlDetailsAsync(string id); // For card
    Task<AnalyticsSummary> GetAnalyticsSummaryAsync(); // For dashboard cards
    Task<List<ClicksOverTime>> GetClicksOverTimeAsync(string id); // For chart
    Task DeleteUrlAsync(string id);
}
