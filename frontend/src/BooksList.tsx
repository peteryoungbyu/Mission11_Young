// Peter Young 1-9
// This is the component I created to show all books. It uses backend pagination to show only
// a certain number per page. It allows the user to sort alphabetically or reverse alphabetically and to
// choose how many books to display on each page. Shows the correct information for each book.
import { useEffect, useState, type ChangeEvent } from 'react';
import type { Book } from './types/Book';

function BooksList() {
  // Initializing State for books, pagination, and sorting.
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState<'none' | 'asc' | 'desc'>(
    'none'
  );

  // New state variables to track totals coming from the backend
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooksCount, setTotalBooksCount] = useState(0);

  // Gets the paginated and sorted books from the backend API
  useEffect(() => {
    const fetchBooks = async () => {
      // Passing state variables as query parameters to the backend
      const response = await fetch(
        `https://localhost:5000/Books/AllBooks?pageHowMany=${booksPerPage}&pageNum=${currentPage}&sortDirection=${sortDirection}`
      );
      const data = await response.json();

      // Setting state using the new object structure returned by the API
      setBooks(data.books);
      setTotalBooksCount(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / booksPerPage));
    };

    fetchBooks();
  }, [currentPage, booksPerPage, sortDirection]); // Re-runs whenever these change

  // Going to the page before it
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Going to the next page
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // When the user changes the number of books listed per page, it goes back to the first page
  const handleBooksPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBooksPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Toggles the sort direction, triggering a re-fetch via useEffect
  const toggleSortByTitle = () => {
    setSortDirection((prev) => {
      if (prev === 'none' || prev === 'desc') return 'asc';
      return 'desc';
    });
    setCurrentPage(1);
  };

  // The data displayed
  return (
    <main className="container py-5 books-page" data-bs-theme="dark">
      <div className="text-center mb-4 mb-md-5">
        <p className="text-uppercase fw-semibold small tracking-wide text-secondary mb-2">
          Book Catalog
        </p>
        <h1 className="display-5 fw-bold mb-2">Books</h1>
        <p className="text-secondary mb-0">
          Browse, sort, and paginate the available titles.
        </p>
      </div>

      <section className="card border-0 shadow-sm mb-4 books-controls-card">
        <div className="card-body d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <label
              htmlFor="booksPerPage"
              className="form-label mb-0 fw-semibold"
            >
              Books per page:
            </label>
            {/* Where the user gets to select how many books per page */}
            <select
              id="booksPerPage"
              className="form-select w-auto"
              value={booksPerPage}
              onChange={handleBooksPerPageChange}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              {/* Uses the total count from the API for the "All" option */}
              <option value={totalBooksCount > 0 ? totalBooksCount : 100}>
                All
              </option>
            </select>
          </div>
          {/* Button for the user to sort alphabetically or reverse */}
          <button
            className="btn btn-outline-light px-3"
            onClick={toggleSortByTitle}
          >
            Sort by Title: {sortDirection === 'desc' ? 'A-Z' : 'Z-A'}
          </button>
        </div>
      </section>

      {/* Displays the paginated books directly from state */}
      <section className="row g-4">
        {books.map((b) => (
          <div className="col-12" key={b.bookID}>
            <article
              id="bookCard"
              className="card border-0 shadow-sm h-100 book-card"
            >
              <div className="card-header border-0 bg-transparent pb-0">
                <h3 className="h4 fw-semibold mb-1">{b.title}</h3>
              </div>
              <div className="card-body pt-2">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0 d-flex justify-content-between">
                    <span className="fw-semibold text-secondary">Author</span>
                    <span>{b.author}</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between">
                    <span className="fw-semibold text-secondary">
                      Publisher
                    </span>
                    <span>{b.publisher}</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between">
                    <span className="fw-semibold text-secondary">ISBN</span>
                    <span>{b.isbn}</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between">
                    <span className="fw-semibold text-secondary">
                      Classification
                    </span>
                    <span>{b.classification}</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between">
                    <span className="fw-semibold text-secondary">Category</span>
                    <span>{b.category}</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between">
                    <span className="fw-semibold text-secondary">Pages</span>
                    <span>{b.pageCount}</span>
                  </li>
                  <li className="list-group-item px-0 d-flex justify-content-between border-bottom-0">
                    <span className="fw-semibold text-secondary">Price</span>
                    <span className="fw-bold text-success">${b.price}</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        ))}
      </section>

      {/* The page change buttons and display */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center align-items-center gap-3 mt-5 mb-2">
          <button
            className="btn btn-outline-primary"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="fw-semibold text-secondary">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      )}
    </main>
  );
}

export default BooksList;
