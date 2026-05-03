import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../lib/types';
import { formatPrice } from '../lib/utils';
import { Button } from './ui/Button';
import { useCartStore } from '../store/useCartStore';
import { useAuth } from '../lib/useAuth';
import { useNavigate } from 'react-router-dom';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    await addToCart(user.id, product.id, 1);
  };

  return (
    <Link to={`/catalog/${product.slug}`} className="group block bg-surface lg:bg-white rounded-2xl p-4 transition-transform hover:scale-[1.01] shadow-sm hover:shadow-md flex flex-col h-full">
      <div className="aspect-square overflow-hidden rounded-xl bg-background mb-4 relative">
        {product.images && product.images[0] ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-border flex items-center justify-center text-text-secondary text-sm">No Image</div>
        )}
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-xs font-bold uppercase tracking-tighter text-text-primary mb-1 truncate">{product.name}</h3>
        <div className="flex items-center text-xs mb-2">
          <Star className="w-3 h-3 text-accent fill-accent mr-1" />
          <span className="text-text-primary font-medium">{product.rating}</span>
          <span className="text-text-secondary ml-1">({product.review_count})</span>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-accent font-semibold text-sm">{formatPrice(product.price)}</span>
          {product.compare_price && (
            <span className="text-text-secondary line-through text-xs font-medium">{formatPrice(product.compare_price)}</span>
          )}
        </div>
        <Button size="sm" className="w-full mt-auto rounded-full text-[10px] font-bold uppercase tracking-widest" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </Link>
  );
};
export default ProductCard;
