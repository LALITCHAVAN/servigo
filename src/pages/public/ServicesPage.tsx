import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Star, ArrowUpDown } from 'lucide-react';
import { useServices } from '@/hooks/useData';
import { categories } from '@/data/mockData';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { RatingStars } from '@/components/common/RatingStars';
import { ServiceCardSkeleton, ErrorState } from '@/components/common/States';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeUp } from '@/animations/variants';

const priceRanges = [
  { label: 'Under ₹300', min: 0, max: 300 },
  { label: '₹300 - ₹500', min: 300, max: 500 },
  { label: '₹500 - ₹1000', min: 500, max: 1000 },
  { label: 'Above ₹1000', min: 1000, max: 99999 },
];

const sortOptions = [
  { value: 'popular', label: 'Most Booked' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('q');
    if (q) setSearch(q);
  }, [searchParams]);

  const { data: services, isLoading, isError, refetch } = useServices();

  const filtered = useMemo(() => {
    let result = [...(services || [])];

    if (search) {
      result = result.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') {
      result = result.filter(s => s.category === selectedCategory);
    }
    if (priceRange) {
      const range = priceRanges.find(r => r.label === priceRange);
      if (range) result = result.filter(s => s.startingPrice >= range.min && s.startingPrice < range.max);
    }
    if (minRating > 0) {
      result = result.filter(s => s.rating >= minRating);
    }

    switch (sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'price-low': result.sort((a, b) => a.startingPrice - b.startingPrice); break;
      case 'price-high': result.sort((a, b) => b.startingPrice - a.startingPrice); break;
      case 'popular': result.sort((a, b) => b.bookedCount - a.bookedCount); break;
    }
    return result;
  }, [services, search, selectedCategory, priceRange, minRating, sortBy]);

  const paginated = filtered.slice(0, page * perPage);
  const hasMore = filtered.length > paginated.length;

  const updateCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'all') setSearchParams({});
    else setSearchParams({ category: cat });
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange(null);
    setMinRating(0);
    setSearch('');
    setSearchParams({});
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-sans font-bold text-sm text-ink-900 mb-3">Category</h3>
        <div className="space-y-1">
          <button
            onClick={() => updateCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'all' ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:bg-ink-100'
            }`}
          >
            All Services
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateCategory(cat.slug)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat.slug ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:bg-ink-100'
              }`}
            >
              <ServiceIcon name={cat.icon} className="w-4 h-4" />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-sans font-bold text-sm text-ink-900 mb-3">Price Range</h3>
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setPriceRange(priceRange === range.label ? null : range.label)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                priceRange === range.label ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:bg-ink-100'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-sans font-bold text-sm text-ink-900 mb-3">Minimum Rating</h3>
        <div className="space-y-1">
          {[4.5, 4.0, 3.5, 0].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                minRating === r ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:bg-ink-100'
              }`}
            >
              {r > 0 ? (
                <>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {r}+ Stars
                </>
              ) : (
                'All Ratings'
              )}
            </button>
          ))}
        </div>
      </div>

      <button onClick={clearFilters} className="w-full btn-secondary text-sm">
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen bg-ink-50">
      <div className="container-page">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">All Services</h1>
          <p className="mt-2 text-ink-500">Browse our complete catalog of home and personal services.</p>
        </div>

        {/* Search bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border border-ink-200 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 text-sm bg-white rounded-xl border border-ink-200 focus:outline-none focus:ring-2 focus:ring-primary-300 cursor-pointer"
          >
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden btn-secondary px-4"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-card border border-ink-100 p-5">
              <FilterPanel />
            </div>
          </aside>

          {/* Services grid */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-ink-500 mb-4">{filtered.length} services found</p>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <ServiceCardSkeleton key={i} />)}
              </div>
            ) : isError ? (
              <ErrorState onRetry={() => refetch()} />
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-ink-100">
                <p className="text-ink-400 text-lg mb-2">No services found</p>
                <p className="text-sm text-ink-500 mb-4">Try adjusting your filters</p>
                <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer(0.06)}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {paginated.map((service) => (
                    <motion.div
                      key={service.id}
                      variants={fadeUp}
                      layout
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Link to={`/services/${service.slug}`} className="block bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden hover:shadow-elevated hover:border-primary-200 transition-all duration-300 group">
                        <div className="relative h-40 overflow-hidden">
                          <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
                          <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center">
                            <ServiceIcon name={service.icon} className="w-5 h-5 text-primary-600" />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-sans font-bold text-ink-900 group-hover:text-primary-600 transition-colors">{service.name}</h3>
                          <p className="text-sm text-ink-500 mt-1 line-clamp-2">{service.shortDescription}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <RatingStars rating={service.rating} size={14} />
                            <span className="text-xs text-ink-400">({service.reviewCount})</span>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-100">
                            <p className="font-bold text-ink-900">₹{service.startingPrice}<span className="text-xs font-normal text-ink-400"> onwards</span></p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {hasMore && (
              <div className="text-center mt-8">
                <button onClick={() => setPage(p => p + 1)} className="btn-secondary">
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-elevated overflow-y-auto p-5"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-sans font-bold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-2 rounded-lg hover:bg-ink-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterPanel />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
