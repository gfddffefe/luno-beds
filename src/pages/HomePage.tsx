import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product } from '../lib/types';
import { Button } from '../components/ui/Button';
import ProductGrid from '../components/ProductGrid';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabase.from('products').select('*').eq('is_featured', true).limit(4).then(({ data }) => {
      if (data) setFeaturedProducts(data);
    });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="flex flex-col lg:flex-row min-h-[80vh] border-b border-border">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center space-y-8 bg-background">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-accent mb-4">Collection 2026</h2>
            <h1 className="text-5xl md:text-7xl font-light leading-[1.1] tracking-tight mb-6">
              Sleep better.<br />
              <span className="italic font-serif">Live better.</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-md leading-relaxed">
              Premium beds, mattresses, and pillows crafted for rest. Experience the Luno difference.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/catalog">
              <Button size="lg" className="rounded-full px-10 py-4 text-xs font-bold uppercase tracking-widest">Shop Catalog</Button>
            </Link>
            <a href="#story">
              <Button size="lg" variant="secondary" className="rounded-full px-10 py-4 text-xs font-bold uppercase tracking-widest">Our Story</Button>
            </a>
          </div>
        </div>

        {/* Right Visuals */}
        <div className="w-full lg:w-1/2 relative bg-surface p-8 lg:p-12 flex flex-col space-y-8">
          <div className="flex-1 rounded-t-[120px] rounded-b-2xl overflow-hidden shadow-sm relative group">
            <img 
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2000&auto=format&fit=crop" 
              className="w-full h-full object-cover min-h-[400px]"
              alt="Bedroom interior"
            />
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm p-6 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">Signature Series</p>
                <p className="font-medium text-text-primary">Premium Rest Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-light tracking-wide">Editor's Picks</h2>
          <Link to="/catalog" className="text-sm font-medium text-accent hover:text-text-primary transition-colors uppercase tracking-widest hidden sm:block">View All</Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Categories */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/catalog?category=beds" className="group relative h-[400px] overflow-hidden rounded-2xl block">
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Beds" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="text-white text-3xl font-light">Beds</h3>
              </div>
            </Link>
            <Link to="/catalog?category=mattresses" className="group relative h-[400px] overflow-hidden rounded-2xl block">
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Mattresses" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="text-white text-3xl font-light">Mattresses</h3>
              </div>
            </Link>
            <Link to="/catalog?category=pillows" className="group relative h-[400px] overflow-hidden rounded-2xl block">
              <img src="https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Pillows" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="text-white text-3xl font-light">Pillows</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="story" className="py-32 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-light leading-relaxed mb-8">"At Luno, we believe quality sleep is the foundation of a good life. Every piece is crafted to bring you the rest you deserve."</h2>
        <p className="text-text-secondary uppercase tracking-widest text-sm">— The Luno Team</p>
      </section>
    </div>
  );
}
