import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuth } from '../lib/useAuth';


export default function Navbar() {
  const { user } = useAuth();
  const { items, setIsOpen } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border py-4 lg:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center space-x-12">
            <Link to="/" className="text-2xl font-light tracking-[0.3em] uppercase block hover:opacity-80 transition-opacity">LUNO</Link>
            
            <div className="hidden md:flex space-x-8 text-xs font-medium uppercase tracking-widest text-text-secondary">
              <Link to="/catalog?category=beds" className="hover:text-accent transition-colors">Beds</Link>
              <Link to="/catalog?category=mattresses" className="hover:text-accent transition-colors">Mattresses</Link>
              <Link to="/catalog?category=pillows" className="hover:text-accent transition-colors">Pillows</Link>
              <a href="/#story" className="hover:text-accent transition-colors">Our Story</a>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to={user ? "/account" : "/login"} className="text-text-secondary hover:text-accent transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <button 
              onClick={() => setIsOpen(true)}
              className="relative text-text-secondary hover:text-accent transition-colors cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
