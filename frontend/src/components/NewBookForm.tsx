import { useState } from 'react';
import type { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <section className="card border-0 shadow-sm mb-4 book-form-card">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <h2 className="h4 mb-0 fw-semibold">Add New Book</h2>
          {/* <span className="badge rounded-pill text-bg-success px-3 py-2">
            Create
          </span> */}
        </div>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12 col-lg-6">
            <label
              htmlFor="new-title"
              className="form-label fw-semibold text-secondary"
            >
              Book Title
            </label>
            <input
              id="new-title"
              type="text"
              name="title"
              className="form-control form-control-lg book-form-input"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-lg-6">
            <label
              htmlFor="new-author"
              className="form-label fw-semibold text-secondary"
            >
              Author
            </label>
            <input
              id="new-author"
              type="text"
              name="author"
              className="form-control form-control-lg book-form-input"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-lg-6">
            <label
              htmlFor="new-publisher"
              className="form-label fw-semibold text-secondary"
            >
              Publisher
            </label>
            <input
              id="new-publisher"
              type="text"
              name="publisher"
              className="form-control book-form-input"
              value={formData.publisher}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-lg-6">
            <label
              htmlFor="new-isbn"
              className="form-label fw-semibold text-secondary"
            >
              ISBN
            </label>
            <input
              id="new-isbn"
              type="text"
              name="isbn"
              className="form-control book-form-input"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-lg-6">
            <label
              htmlFor="new-classification"
              className="form-label fw-semibold text-secondary"
            >
              Classification
            </label>
            <input
              id="new-classification"
              type="text"
              name="classification"
              className="form-control book-form-input"
              value={formData.classification}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-lg-6">
            <label
              htmlFor="new-category"
              className="form-label fw-semibold text-secondary"
            >
              Category
            </label>
            <input
              id="new-category"
              type="text"
              name="category"
              className="form-control book-form-input"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-md-6 col-lg-6">
            <label
              htmlFor="new-pageCount"
              className="form-label fw-semibold text-secondary"
            >
              Page Count
            </label>
            <input
              id="new-pageCount"
              type="number"
              min="1"
              name="pageCount"
              className="form-control book-form-input"
              value={formData.pageCount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-md-6 col-lg-6">
            <label
              htmlFor="new-price"
              className="form-label fw-semibold text-secondary"
            >
              Price
            </label>
            <div className="input-group">
              <span className="input-group-text book-form-addon">$</span>
              <input
                id="new-price"
                type="number"
                min="0"
                step="0.01"
                name="price"
                className="form-control book-form-input"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-12 d-flex flex-wrap gap-2 mt-2">
            <button type="submit" className="btn btn-success px-4">
              Add Book
            </button>
            <button
              type="button"
              className="btn btn-outline-light px-4"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewBookForm;
