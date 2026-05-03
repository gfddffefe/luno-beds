import { X, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Button } from './ui/Button';
import { formatPrice } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, item) => acc + ((item.product?.price || 0) * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" 
        onClick={() => setIsOpen(false)}
      />
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-medium tracking-wide">Your Cart</h2>
          <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-text-primary cursor-pointer p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-text-secondary mt-12">
              <p>Your cart is empty.</p>
              <Button variant="secondary" className="mt-6" onClick={() => { setIsOpen(false); navigate('/catalog'); }}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img 
                  src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&q=80'} 
                  alt={item.product?.name} 
                  className="w-24 h-24 object-cover rounded-xl bg-surface"
                />
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-text-primary line-clamp-1">{item.product?.name}</h4>
                      <p className="text-sm text-text-secondary mt-1">{formatPrice(item.product?.price || 0)}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-text-secondary hover:text-error">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-text-secondary hover:bg-surface"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-text-secondary hover:bg-surface"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-surface">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold text-lg">{formatPrice(subtotal)}</span>
            </div>
            <Button 
              className="w-full" 
              onClick={() => {
                setIsOpen(false);
                navigate('/checkout');
              }}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
