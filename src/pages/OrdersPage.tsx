import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
import { Order } from '../lib/types';
import { formatPrice } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<(Order & { order_items: any[] })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      supabase.from('orders')
        .select('*, order_items(*, product:products(*))')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          if (data) setOrders(data);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <div className="py-24 text-center">Loading orders...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-light tracking-wide mb-8">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="bg-surface rounded-2xl p-8 text-center text-text-secondary">
          <p className="mb-4">You have no orders yet.</p>
          <Link to="/catalog" className="text-accent hover:underline">Start shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-surface rounded-2xl overflow-hidden">
              <div className="bg-border/50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-sm border-b border-border">
                <div>
                  <span className="text-text-secondary block mb-1">Order Placed</span>
                  <span className="font-medium">{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-text-secondary block mb-1">Total</span>
                  <span className="font-medium">{formatPrice(order.total_amount)}</span>
                </div>
                <div>
                  <span className="text-text-secondary block mb-1">Status</span>
                  <span className="inline-block px-3 py-1 rounded-full bg-background border border-border capitalize font-medium">
                    {order.status}
                  </span>
                </div>
                <div className="text-right flex-grow">
                  <span className="text-text-secondary block mb-1">Order #</span>
                  <span className="font-medium text-xs tracking-wider">{order.id.split('-')[0]}</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {order.order_items.map(item => (
                    <li key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-background rounded-lg overflow-hidden">
                         <img src={item.product?.images?.[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <Link to={`/catalog/${item.product?.slug}`} className="font-medium hover:text-accent transition-colors">
                          {item.product?.name}
                        </Link>
                        <p className="text-sm text-text-secondary">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-medium">
                        {formatPrice(item.unit_price * item.quantity)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
