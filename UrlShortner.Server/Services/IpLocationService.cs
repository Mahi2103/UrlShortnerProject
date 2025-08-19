using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

public class IpLocationService
{
    private readonly HttpClient _http;

    public IpLocationService(HttpClient http)
    {
        _http = http;
    }

    public async Task<string> GetLocationFromIp(string ip)
    {
        if (string.IsNullOrEmpty(ip)) return "Unknown";

        try
        {
            var url = $"http://ip-api.com/json/{ip}";
            var response = await _http.GetStringAsync(url);
            var result = JsonSerializer.Deserialize<IpApiResponse>(response);
            return result != null ? $"{result.City}, {result.RegionName}, {result.Country}" : "Unknown";
        }
        catch
        {
            return "Unknown";
        }
    }
}

public class IpApiResponse
{
    public string Country { get; set; } = "";
    public string RegionName { get; set; } = "";
    public string City { get; set; } = "";
}
