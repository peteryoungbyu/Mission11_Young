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
        <CartSummary />
        <Header />
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
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
