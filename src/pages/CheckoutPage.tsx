import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/useAuth';
import { useCartStore } from '../store/useCartStore';
import { supabase } from '../lib/supabase';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';

export default function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = items.reduce((acc, item) => acc + ((item.product?.price || 0) * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-24 px-4 text-center">
        <h1 className="text-3xl font-light mb-6">Checkout</h1>
        <p className="text-text-secondary mb-8">Your cart is empty.</p>
        <Button onClick={() => navigate('/catalog')}>Continue Shopping</Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const address = {
      line1: formData.get('line1'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip: formData.get('zip'),
      country: formData.get('country'),
    };

    // Calculate total on server natively via Postgres function, but for MVP we compute and verify.
    // Insert Order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        status: 'pending',
        total_amount: subtotal,
        shipping_address: address
      })
      .select('id')
      .single();

    if (orderError || !order) {
      setError(orderError?.message || "Failed to create order");
      setLoading(false);
      return;
    }

    // Insert Order Items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.product?.price || 0
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
    
    if (itemsError) {
      setError(itemsError.message);
      setLoading(false);
      return;
    }

    // Clear cart in DB
    await supabase.from('cart_items').delete().eq('user_id', user.id);
    clearCart();

    navigate('/orders');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-light tracking-wide mb-12">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <div className="bg-surface rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-light mb-6">Shipping Information</h2>
            {error && <div className="mb-4 text-error bg-error/10 p-4 rounded-xl">{error}</div>}
            
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input name="full_name" required defaultValue={user?.user_metadata?.full_name || ''} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input type="email" readOnly disabled defaultValue={user?.email || ''} className="opacity-70" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Address Line 1</label>
                  <Input name="line1" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <Input name="city" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State / Province</label>
                  <Input name="state" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Zip / Postal Code</label>
                  <Input name="zip" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <Input name="country" required defaultValue="United States" />
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-5">
          <div className="bg-surface rounded-2xl p-8 sticky top-24">
            <h2 className="text-2xl font-light mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary truncate pr-4">
                    {item.quantity} × {item.product?.name}
                  </span>
                  <span className="font-medium whitespace-nowrap">
                    {formatPrice((item.product?.price || 0) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border pt-4 mb-8">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Button 
              type="submit" 
              form="checkout-form" 
              disabled={loading} 
              size="lg" 
              className="w-full"
            >
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
