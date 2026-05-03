export default function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-light tracking-[0.3em] uppercase">LUNO</span>
            <p className="mt-4 text-text-secondary text-sm max-w-sm font-serif italic">
              Sleep better. Live better. Premium beds, mattresses, and pillows crafted for rest.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-[#6B6860] mb-4">Shop</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-tighter text-text-primary">
              <li><a href="/catalog?category=beds" className="hover:text-accent transition-colors">Beds</a></li>
              <li><a href="/catalog?category=mattresses" className="hover:text-accent transition-colors">Mattresses</a></li>
              <li><a href="/catalog?category=pillows" className="hover:text-accent transition-colors">Pillows</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-[#6B6860] mb-4">Support</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-tighter text-text-primary">
              <li><a href="/account" className="hover:text-accent transition-colors">Account</a></li>
              <li><a href="/orders" className="hover:text-accent transition-colors">Orders</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center bg-background text-[10px] uppercase tracking-[0.2em] text-text-secondary">
          <div className="flex space-x-12 mb-4 md:mb-0">
            <span>Free Shipping Over $500</span>
            <span>100-Night Trial</span>
            <span>10 Year Warranty</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} LUNO HOUSEHOLD CO.
          </div>
        </div>
      </div>
    </footer>
  );
}
