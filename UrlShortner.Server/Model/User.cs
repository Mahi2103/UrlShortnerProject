using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace UrlShortner.Server.Model
{
    // For Signup / Storing Users in MongoDB
    public class User
    {
        [BsonId] // Marks this as the primary key
        [BsonRepresentation(BsonType.ObjectId)] // Allows MongoDB to handle as ObjectId
        public string? Id { get; set; }

        public required string UserName { get; set; }  // Display / login name

        public required string Email { get; set; }     // Used for login

        public required string Password { get; set; }  // Store hashed password (not plain text!)
    }

    // For Login request (DTO)
    public class Login
    {
        public required string Email { get; set; }

        public required string Password { get; set; }
    }
}
