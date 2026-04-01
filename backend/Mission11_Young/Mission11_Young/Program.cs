// Peter Young 1-9
// The backend API program for the Bookstore
// Passes in JSON data from the Bookstore.Sqlite database
using Microsoft.EntityFrameworkCore;
using Mission11_Young.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
//Connects to the database
builder.Services.AddDbContext<BookDbContext>(options =>
options.UseSqlite(builder.Configuration.GetConnectionString("BookstoreConnection")));

//Adds cors to allow requests
builder.Services.AddCors(options => 
    options.AddPolicy("AllowReactAppBlah",
    policy => {
        policy.WithOrigins("http://localhost:3000", "https://bookapppeterbackend-ggeyhpakh2fgcdf4.francecentral-01.azurewebsites.net")
        .AllowAnyMethod()
        .AllowAnyHeader();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//Sets where to allow requests from
app.UseCors("AllowReactAppBlah");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
