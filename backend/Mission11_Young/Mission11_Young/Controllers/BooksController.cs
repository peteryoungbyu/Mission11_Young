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
        public IActionResult Get(int pageHowMany, int pageNum, [FromQuery] string sortDirection = "asc", [FromQuery] List<string>? bookCategories = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(b => bookCategories.Contains(b.Category));
            }

            // Handle sorting on the backend so pagination remains accurate across all data
            if (sortDirection == "asc")
            {
                query = query.OrderBy(b => b.Title.ToLower());
            }
            else if (sortDirection == "desc")
            {
                query = query.OrderByDescending(b => b.Title.ToLower());
            }

            var totalNumBooks = query.Count();

            var paginatedBooks = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            return Ok(new
            {
                Books = paginatedBooks,
                TotalNumBooks = totalNumBooks
            });
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(bookCategories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookId);
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);

        }
        
        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook (int bookId)
        {
            var book = _bookContext.Books.Find(bookId);
            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }
                _bookContext.Books.Remove(book);
                _bookContext.SaveChanges();

                return NoContent();
            
        }

    }
}
