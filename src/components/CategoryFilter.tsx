import { useSearchParams } from 'react-router-dom';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'beds', label: 'Beds' },
  { id: 'mattresses', label: 'Mattresses' },
  { id: 'pillows', label: 'Pillows' },
];

export default function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleCategoryClick = (id: string) => {
    if (id === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', id);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar border-b border-border">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryClick(cat.id)}
          className={`px-6 py-2 rounded-full whitespace-nowrap text-xs font-bold uppercase tracking-widest transition-colors ${
            currentCategory === cat.id 
              ? 'bg-accent text-white' 
              : 'bg-surface text-text-secondary hover:bg-border hover:text-text-primary'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
