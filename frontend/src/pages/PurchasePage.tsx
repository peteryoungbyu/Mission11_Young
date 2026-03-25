// This page shows when the user begins a purchase. It allows them to indicate the quantity and then add them to the cart.
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';
import { useState } from 'react';
import '../App.css';

function PurchasePage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Project Found',
      quantity,
      total,
      price: Number(price),
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <main
      className="container py-5 books-page purchase-page"
      data-bs-theme="dark"
    >
      <div className="row">
        <div className="text-center mb-4 mb-md-5">
          <p className="text-uppercase fw-semibold small tracking-wide text-secondary mb-2">
            Checkout
          </p>
          <h1 className="display-6 fw-bold mb-2">Finalize Purchase</h1>
          <p className="text-secondary mb-0">Buy {title}?</p>
        </div>
      </div>
      <div className="row">
        <section className="card border-0 shadow-sm book-card purchase-card mx-auto">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-secondary fw-semibold">Price per copy</span>
              <span className="fw-bold purchase-price">
                ${Number(price).toFixed(2)}
              </span>
            </div>

            <div className="mb-3">
              <label
                htmlFor="quantity"
                className="form-label fw-semibold text-secondary"
              >
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                min={1}
                className="form-control purchase-input"
                placeholder="Enter quantity"
                value={quantity || ''}
                onChange={(x) => {
                  const qty = Number(x.target.value);
                  setQuantity(qty);
                  setTotal(qty * Number(price));
                }}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="text-secondary fw-semibold">Item total</span>
              <span className="fw-bold text-success">${total.toFixed(2)}</span>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
export default PurchasePage;
