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
      <main className="container py-5 books-page" data-bs-theme="dark">
        <div className="row">
          <div className="col-md-12">
            <Header />
          </div>

          <div className="col-md-3">
            <CartSummary />
            <div className="filter">
              <CategoryFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
          </div>

          <div className="col-md-6">
            <BooksList selectedCategories={selectedCategories} />
          </div>

          <div className="col-md-3"></div>
        </div>
      </main>
    </>
  );
}

export default BooksPage;
