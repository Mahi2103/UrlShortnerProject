public interface IShortUrlService
{
    Task<ShortenUrlResponse> CreateShortUrlAsync(ShortenUrlRequest request);
    Task<UrlMapping?> GetByShortCodeAsync(string shortCode); 
    Task UpdateUrlMappingAsync(string id, UrlMapping updated);
    Task<List<UrlMappingDto>> GetAllLinksAsync(); 
    Task DeleteUrlAsync(string id);
}
