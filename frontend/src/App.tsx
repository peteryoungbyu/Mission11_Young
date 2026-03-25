//App typescript file. Adds the "BooksList" component I created
import BooksList from './BooksList';
import './App.css';
import CategoryFilter from './CategoryFilter';
import { useState } from 'react';
import Header from './Header';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <>
      <main className="container py-5 books-page" data-bs-theme="dark">
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

export default App;
