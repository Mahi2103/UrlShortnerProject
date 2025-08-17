using Microsoft.AspNetCore.Mvc;
using UrlShortner.Server.Services;
using UrlShortner.Server.Model;

namespace UrlShortner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly AuthService _authService;

        public UserController(UserService userService, AuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto dto)
        {
            try
            {
                var user = await _userService.Register(dto);
                return Ok(new { user.Id, user.UserName, user.Email });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            if (string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
                return BadRequest("Email and password are required.");

            var existing = await _userService.GetEmailAsync(login.Email);
            if (existing == null) return Unauthorized("Invalid email or password");

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(login.Password, existing.Password);
            if (!isPasswordValid) return Unauthorized("Invalid email or password");

            var token = _authService.GenerateJwtToken(existing.Email, existing.Id);

            return Ok(new
            {
                jwttoken = token,
                userid = existing.Id,
                message = "Login successful"
            });
        }
    }
}
