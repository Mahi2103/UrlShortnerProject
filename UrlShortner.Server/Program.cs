using MongoDB.Driver;
using UrlShortner.Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5295); // Listen on all network interfaces
});


// ✅ Add CORS service
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // React dev server
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        });
});

// MongoDB Client
builder.Services.AddSingleton<IMongoClient, MongoClient>(sp =>
    new MongoClient(builder.Configuration.GetConnectionString("MongoDb"))
);

builder.Services.AddSingleton<ContactService>();
builder.Services.AddScoped<IShortUrlService, ShortUrlService>();

var app = builder.Build();

// ✅ Enable Swagger only in Development
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Enable CORS middleware
app.UseCors("AllowReactApp");

app.UseAuthorization();
app.MapControllers();

app.Run();
