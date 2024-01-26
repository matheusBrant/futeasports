using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/players")]
public class PlayersController : ControllerBase
{
    private readonly EAFc24ApiClient _eaFc24ApiClient;

    public PlayersController(EAFc24ApiClient eaFc24ApiClient)
    {
        _eaFc24ApiClient = eaFc24ApiClient;
    }

    [HttpGet]
    public async Task<IActionResult> GetPlayers()
    {
        var players = await _eaFc24ApiClient.GetPlayers();

        if (players != null)
        {
            return Ok(players);
        }

        return StatusCode(500, "Erro ao obter jogadores da API da EA FC 24");
    }
}
