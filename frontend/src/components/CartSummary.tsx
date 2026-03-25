// The cart icon with the total that shows up on the bookslist page
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);
  return (
    <div className="cart-summary-chip" onClick={() => navigate('/cart')}>
      🛒 <strong>{totalAmount.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;
