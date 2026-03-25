import BooksList from '../components/BooksList';
import '../App.css';
import CategoryFilter from '../components/CategoryFilter';
import { useState } from 'react';
import Header from '../components/Header';
import CartSummary from '../components/CartSummary';
function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <>
      <main
        className="container py-5 books-page gx-4 gy-1"
        data-bs-theme="dark"
      >
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <div className="books-sidebar books-sidebar-sticky">
              <CartSummary />
              <div className="category-box">
                <CategoryFilter
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <Header />
            <BooksList selectedCategories={selectedCategories} />
          </div>

          <div className="d-none d-md-block col-md-3"></div>
        </div>
      </main>
    </>
  );
}

export default BooksPage;
