// This page shows what is in the cart. It allows the user to delete what is in the cart or continue shopping

import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';
import '../App.css';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <main className="container py-5 books-page cart-page" data-bs-theme="dark">
      <div className="row">
        <div className="text-center mb-4 mb-md-5">
          <p className="text-uppercase fw-semibold small tracking-wide text-secondary mb-2">
            Checkout
          </p>
          <h2 className="display-6 fw-bold mb-2">Your Cart</h2>
          <p className="text-secondary mb-0">
            Review your selected books before checkout.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {cart.length === 0 ? (
          <div className="col-12">
            <section className="card border-0 shadow-sm book-card">
              <div className="card-body">
                <p className="mb-0 text-secondary">Your cart is empty.</p>
              </div>
            </section>
          </div>
        ) : (
          <>
            {cart.map((item: CartItem) => (
              <div className="col-12" key={item.bookID}>
                <article className="card border-0 shadow-sm h-100 book-card">
                  <div className="card-header border-0 bg-transparent pb-0 d-flex justify-content-between align-items-start gap-3">
                    <h3 className="h4 fw-semibold mb-1">{item.title}</h3>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item.bookID)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="card-body pt-2">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item px-0 d-flex justify-content-between">
                        <span className="fw-semibold text-secondary">
                          Price
                        </span>
                        <span>${item.price.toFixed(2)}</span>
                      </li>
                      <li className="list-group-item px-0 d-flex justify-content-between">
                        <span className="fw-semibold text-secondary">
                          Quantity
                        </span>
                        <span>{item.quantity}</span>
                      </li>
                      <li className="list-group-item px-0 d-flex justify-content-between border-bottom-0">
                        <span className="fw-semibold text-secondary">
                          Total
                        </span>
                        <span className="fw-bold text-success">
                          ${item.total.toFixed(2)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </article>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="row">
        <section className="card border-0 shadow-sm mt-4 books-controls-card cart-total-card">
          <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <h3 className="h5 mb-0 text-secondary">
              Cart Total:{' '}
              <strong className="text-success">
                ${totalAmount.toFixed(2)}
              </strong>
            </h3>
            <div className="d-flex gap-2">
              <button className="btn btn-primary">Checkout</button>
              <button
                className="btn btn-outline-light"
                onClick={() => navigate('/')}
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CartPage;
