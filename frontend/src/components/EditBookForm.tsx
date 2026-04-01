import { useState } from 'react';
import type { Book } from '../types/Book';
import { updateBook } from '../api/BooksAPI';

interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<Book>({ ...book });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(formData.bookID, formData);
    onSuccess();
  };

  return (
    <section className="card border-0 shadow-sm mb-4 book-form-card">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <h2 className="h4 mb-0 fw-semibold">Edit Book</h2>
          {/* <span className="badge rounded-pill text-bg-primary px-3 py-2">
            Update
          </span> */}
        </div>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12 col-lg-6">
            <label
              htmlFor="edit-title"
              className="form-label fw-semibold text-secondary"
            >
              Book Title
            </label>
            <input
              id="edit-title"
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
              htmlFor="edit-author"
              className="form-label fw-semibold text-secondary"
            >
              Author
            </label>
            <input
              id="edit-author"
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
              htmlFor="edit-publisher"
              className="form-label fw-semibold text-secondary"
            >
              Publisher
            </label>
            <input
              id="edit-publisher"
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
              htmlFor="edit-isbn"
              className="form-label fw-semibold text-secondary"
            >
              ISBN
            </label>
            <input
              id="edit-isbn"
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
              htmlFor="edit-classification"
              className="form-label fw-semibold text-secondary"
            >
              Classification
            </label>
            <input
              id="edit-classification"
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
              htmlFor="edit-category"
              className="form-label fw-semibold text-secondary"
            >
              Category
            </label>
            <input
              id="edit-category"
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
              htmlFor="edit-pageCount"
              className="form-label fw-semibold text-secondary"
            >
              Page Count
            </label>
            <input
              id="edit-pageCount"
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
              htmlFor="edit-price"
              className="form-label fw-semibold text-secondary"
            >
              Price
            </label>
            <div className="input-group">
              <span className="input-group-text book-form-addon">$</span>
              <input
                id="edit-price"
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
            <button type="submit" className="btn btn-primary px-4">
              Update Book
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

export default EditBookForm;
