using Microsoft.EntityFrameworkCore;
namespace Mission11_Young.Data
{
    //Initializes the DbContext for the bookstore database
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {

        }

    public DbSet<Book> Books { get; set; }

    }
}