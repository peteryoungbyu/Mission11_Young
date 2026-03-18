using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Young.Data;

namespace Mission11_Young.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BooksController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
        public IEnumerable<Book> Get()
        {
            var books = _bookContext.Books.ToList();
            return books;
        }

    }
}
