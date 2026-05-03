import { Navigate } from 'react-router-dom';

export default function CartPage() {
  // We use a drawer for the cart, so /cart just opens the drawer or redirects to checkout if they somehow typed it
  // In a real app we might have a full page cart as well. 
  // Let's just redirect to checkout if they navigate here manually.
  return <Navigate to="/checkout" replace />;
}
