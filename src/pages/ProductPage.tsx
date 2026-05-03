import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../lib/types';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { useCartStore } from '../store/useCartStore';
import { useAuth } from '../lib/useAuth';
import ProductGrid from '../components/ProductGrid';

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const addToCart = useCartStore(state => state.addToCart);

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
      if (data) {
        setProduct(data);
        const { data: relatedData } = await supabase
          .from('products')
          .select('*')
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(4);
        if (relatedData) setRelated(relatedData);
      }
      setLoading(false);
    }
    if (slug) fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (product) {
      await addToCart(user.id, product.id, quantity);
    }
  };

  if (loading) return <div className="py-24 text-center">Loading...</div>;
  if (!product) return <div className="py-24 text-center">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-surface rounded-2xl overflow-hidden">
            <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className="aspect-square bg-surface rounded-xl overflow-hidden cursor-pointer">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col pt-8 md:pt-0">
          <div className="mb-2 text-sm text-text-secondary uppercase tracking-widest">{product.category}</div>
          <h1 className="text-4xl font-light text-text-primary mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-6">
            <Star className="w-5 h-5 text-accent fill-accent mr-2" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-text-secondary ml-2">({product.review_count} reviews)</span>
          </div>

          <div className="flex flex-wrap items-end gap-4 mb-8">
            <span className="text-3xl font-semibold">{formatPrice(product.price)}</span>
            {product.compare_price && (
              <span className="text-xl text-text-secondary line-through mb-1">{formatPrice(product.compare_price)}</span>
            )}
          </div>

          <p className="text-text-secondary text-lg leading-relaxed mb-10">{product.description}</p>

          <div className="mt-auto space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center border border-border rounded-full p-1 bg-surface">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-background text-text-secondary"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-background text-text-secondary"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              Add to Cart - {formatPrice(product.price * quantity)}
            </Button>
            <p className="text-center text-sm text-text-secondary mt-4">
              {product.stock_quantity > 0 ? (
                <span className="text-success">In Stock. Ships in 1-2 days.</span>
              ) : (
                <span className="text-error">Out of stock</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-32">
          <h2 className="text-2xl font-light mb-8">You might also like</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
