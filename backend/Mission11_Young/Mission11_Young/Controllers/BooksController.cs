using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Young.Data;
// Controls the requests that come from the frontend
namespace Mission11_Young.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private BookDbContext _bookContext;
        //Initializes _bookContext from the DB in the constructor

        public BooksController(BookDbContext temp) => _bookContext = temp;

        // The get request we use on the frontend to retrieve the books
        [HttpGet("AllBooks")]
        public IEnumerable<Book> Get()
        {
            var books = _bookContext.Books.ToList();
            return books;
        }

    }
}
