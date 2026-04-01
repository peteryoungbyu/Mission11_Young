// Peter Young 1-9
// This is the component I created to show all books. It uses backend pagination to show only
// a certain number per page. It allows the user to sort alphabetically or reverse alphabetically and to
// choose how many books to display on each page. Shows the correct information for each book.
import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';
import NewBookForm from './NewBookForm';
import EditBookForm from './EditBookForm';

function BooksList({ selectedCategories }: { selectedCategories: string[] }) {
  // Initializing State for books, pagination, and sorting.
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  // New state variables to track totals coming from the backend
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Gets the paginated and sorted books from the backend API
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortDirection,
          selectedCategories
        );
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories, sortDirection]);

  const handleDelete = async (bookID: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (!confirmDelete) return;
    try {
      await deleteBook(bookID);
      setBooks(books.filter((b) => b.bookID !== bookID));
    } catch (error) {
      alert('Failed to delete book. Please try again.');
      throw error;
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Toggles the sort direction, triggering a re-fetch via useEffect
  const toggleSortByTitle = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setPageNum(1);
  };

  // The data displayed
  return (
    <>
      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Book
        </button>
      )}

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            fetchBooks(pageSize, pageNum, sortDirection, []).then((data) =>
              setBooks(data.books)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            fetchBooks(pageSize, pageNum, sortDirection, []).then((data) =>
              setBooks(data.books)
            );
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

      <section className="card border-0 shadow-sm mb-4 books-controls-card">
        <div className="card-body d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
          {/* Button for the user to sort alphabetically or reverse */}
          <button
            className="btn btn-outline-light px-3"
            onClick={toggleSortByTitle}
          >
            Sort by Title: {sortDirection === 'asc' ? 'A-Z' : 'Z-A'}
          </button>
        </div>
      </section>

      {/* Displays the paginated books directly from state */}
      <section className="row g-4">
        {error && (
          <div className="col-12">
            <div className="alert alert-warning" role="alert">
              {error}
            </div>
          </div>
        )}
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

                <div className="book-card-actions mt-3">
                  <button
                    className="btn btn-success btn-lg w-100"
                    onClick={() =>
                      navigate(`/purchase/${b.title}/${b.bookID}/${b.price}`)
                    }
                  >
                    Purchase
                  </button>

                  <div className="row g-2 mt-0">
                    <div className="col-6">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => setEditingBook(b)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => handleDelete(b.bookID)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </section>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BooksList;
