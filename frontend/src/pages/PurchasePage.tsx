import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';
import { useState } from 'react';
function PurchasePage() {
  const navigate = useNavigate();
  const { title, bookID } = useParams();
  const { addToCart } = useCart();
  const [price, setprice] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Project Found',
      price,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <Header />
      <h2>Purchase {title}</h2>

      <div>
        <input
          type="number"
          placeholder="Enter Donation Amount"
          value={price}
          onChange={(x) => setprice(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}
export default PurchasePage;
