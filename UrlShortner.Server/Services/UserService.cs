using System.Reflection.Metadata;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using UrlShortner.Server.Model;
namespace UrlShortner.Server.Services
{
    public class UserService
    {
        public readonly IMongoCollection<User> _User;

        public UserService(IMongoClient config)
        {
            var database = config.GetDatabase("UrlShortner");
            _User = database.GetCollection<User>("User");
        }




        public async Task<User> Register(UserDto dto)
        {

            var existingUser = await _User.Find(u => u.Email == dto.Email).FirstOrDefaultAsync();
            if (existingUser != null)
            {
                throw new Exception("Email already exists");
            }



            var user = new User
            {
                Id = ObjectId.GenerateNewId().ToString(),
                UserName = dto.Name,
                Email = dto.Email,
                Password = HashPassword(dto.Password),


            };

            await _User.InsertOneAsync(user);
            return user;
        }





        public async Task<User> GetEmailAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(user => user.Email, email);
            return await _User.Find(filter).FirstOrDefaultAsync();
        }




        private string HashPassword(string password)
        {
            //return Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(password));

            return BCrypt.Net.BCrypt.HashPassword(password);

        }
    }


}







