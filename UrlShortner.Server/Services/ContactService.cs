
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using UrlShortner.Server.Models;


namespace UrlShortner.Server.Services
{
    public class ContactService
    {
        public readonly IMongoCollection<Contact> _contact;

        public ContactService(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("UrlShortner");
            _contact = database.GetCollection<Contact>("Contact");
        }


            
        public async Task<IActionResult> AddContact(Contact contact)
        {
            try
            {
                await _contact.InsertOneAsync(contact);
                return new OkObjectResult("Contact added successfully.");
            }   
            catch (Exception ex)
            {
                return new StatusCodeResult(500);
            }
        }



    }
}
