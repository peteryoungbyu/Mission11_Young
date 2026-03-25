//App typescript file. Adds the "BooksList" component I created

import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import BooksPage from './pages/BooksPage';
import PurchasePage from './pages/PurchasePage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/purchase/:title/:bookID/:price"
              element={<PurchasePage />}
            />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
