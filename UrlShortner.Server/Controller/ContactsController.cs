
using Microsoft.AspNetCore.Mvc;
using UrlShortner.Server.Models;
using UrlShortner.Server.Services;



namespace ReactApp1.Server.Controllers
{

    [ApiController]
    [Route("[controller]")]
        
    public class ContactsController : Controller
    {

        private readonly ContactService _contactService;

        public ContactsController(ContactService contactService)
        {
            _contactService = contactService;
        }
            
        [HttpPost]
        public async Task<IActionResult> AddContact([FromForm] Contact contact)
        {
            return await _contactService.AddContact(contact);
        }

          
      


    }
}

