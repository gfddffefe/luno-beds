import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product } from '../lib/types';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let query = supabase.from('products').select('*').order('created_at', { ascending: false });
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (data && !error) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-4">
          <span className="font-serif italic">Shop</span> Collection
        </h1>
        <p className="text-text-secondary text-lg">Discover our thoughtfully designed pieces for your bedroom.</p>
      </div>

      <CategoryFilter />

      {loading ? (
        <div className="py-24 text-center text-text-secondary">Loading collection...</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
