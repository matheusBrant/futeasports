using System;
using System.Net.Http;
using System.Numerics;
using System.Threading.Tasks;

public class EAFc24ApiClient
{
    private readonly HttpClient _httpClient;

    public EAFc24ApiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://drop-api.ea.com/api#/Ratings/RatingsController_getRatingsForEntity");
    }

    public async Task<Player> GetPlayers()
    {
        var response = await _httpClient.GetAsync(_httpClient.BaseAddress);
        var responseJson = await response.Content.ReadAsStringAsync();

        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadFromJsonAsync<Player>();
            return content;
        }

        return null;
    }
}
