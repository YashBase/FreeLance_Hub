using admin_panel.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


// add cors confiuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React dev server
                   .AllowAnyHeader()
                   .AllowAnyMethod();
    });
});
//mysql configuration
builder.Services.AddDbContext<P12MeetYourNeedContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 21)
)));



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
