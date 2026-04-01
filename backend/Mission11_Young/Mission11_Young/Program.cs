// Peter Young 1-9
// The backend API program for the Bookstore
// Passes in JSON data from the Bookstore.Sqlite database
using Microsoft.EntityFrameworkCore;
using Mission11_Young.Data;

var builder = WebApplication.CreateBuilder(args);
const string CorsPolicy = "AllowFrontend";

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
//Connects to the database
builder.Services.AddDbContext<BookDbContext>(options =>
options.UseSqlite(builder.Configuration.GetConnectionString("BookstoreConnection")));

// Adds CORS for known frontend origins.
builder.Services.AddCors(options =>
    options.AddPolicy(CorsPolicy,
    policy =>
    {
        policy.WithOrigins(
            "https://zealous-dune-00e9af703.2.azurestaticapps.net",
            "http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseRouting();

// Sets where to allow cross-origin requests from.
app.UseCors(CorsPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
