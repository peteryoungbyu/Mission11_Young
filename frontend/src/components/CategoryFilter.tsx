// Category Filter component. It shows up on the bookslist page to let the user limit by category

import { useEffect, useState } from 'react';
import './CategoryFilter.css';
import { fetchBookCategories } from '../api/BooksAPI';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchBookCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h5 className="category-filter-title">Book Categories</h5>
      <p className="category-filter-subtitle">Filter by one or more genres.</p>
      <div className="category-list">
        {categories.map((c) => (
          <div key={c} className="category-item">
            <input
              className="category-checkbox form-check-input"
              type="checkbox"
              id={c}
              value={c}
              checked={selectedCategories.includes(c)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c} className="badge bg-secondary">
              {c}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CategoryFilter;
