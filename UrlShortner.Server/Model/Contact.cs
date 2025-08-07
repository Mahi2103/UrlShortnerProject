using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace UrlShortner.Server.Models
{
    public class Contact
    {

        [BsonIgnoreIfDefault, BsonIgnoreIfNull]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        //[BsonId]
        public ObjectId Id { get; set; }

        [BsonIgnoreIfDefault, BsonIgnoreIfNull]

        public string? Name { get; set; }

        [BsonIgnoreIfDefault, BsonIgnoreIfNull]

        public string? Email { get; set; }

        [BsonIgnoreIfDefault, BsonIgnoreIfNull]

        public string? Message { get; set; }


    }
}
