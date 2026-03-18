import { useEffect, useState, type ChangeEvent } from 'react';
import type { Book } from './types/Book';

function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState<'none' | 'asc' | 'desc'>(
    'none'
  );

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://localhost:5000/Books/AllBooks');
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  const sortedBooks =
    sortDirection === 'none'
      ? books
      : [...books].sort((a, b) => {
          const comparison = a.title.localeCompare(b.title);
          return sortDirection === 'asc' ? comparison : -comparison;
        });

  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = sortedBooks.slice(startIndex, startIndex + booksPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleBooksPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBooksPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const toggleSortByTitle = () => {
    setSortDirection((prev) => {
      if (prev === 'none' || prev === 'desc') return 'asc';
      return 'desc';
    });
    setCurrentPage(1);
  };

  return (
    <>
      <h1>Books</h1>
      <div className="d-flex align-items-center gap-2 mb-3">
        <label htmlFor="booksPerPage" className="form-label mb-0">
          Books per page:
        </label>
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
          <option value={books.length}>All</option>
        </select>
        <button
          className="btn btn-outline-secondary"
          onClick={toggleSortByTitle}
        >
          Sort by Title: {sortDirection === 'desc' ? 'A-Z' : 'Z-A'}
        </button>
      </div>
      <br />
      {currentBooks.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>Number of pages: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>${b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4 mb-4">
          <button
            className="btn btn-outline-primary"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
export default BooksList;
