import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, MapPin, Star } from 'lucide-react';
import { useProfessionals } from '@/hooks/useData';
import { ProfessionalCard } from '@/components/common/ProfessionalCard';
import { ProfessionalCardSkeleton, ErrorState } from '@/components/common/States';
import { staggerContainer } from '@/animations/variants';

const locations = ['All', 'Pune', 'Mumbai', 'Delhi', 'Bangalore'];
const expRanges = [
  { label: 'All', min: 0, max: 99 },
  { label: '1-5 years', min: 1, max: 5 },
  { label: '5-10 years', min: 5, max: 10 },
  { label: '10+ years', min: 10, max: 99 },
];

export function ProfessionalsPage() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [expRange, setExpRange] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { data: professionals, isLoading, isError, refetch } = useProfessionals();

  const filtered = useMemo(() => {
    let result = [...(professionals || [])];
    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.profession.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (location !== 'All') result = result.filter(p => p.location === location);
    if (minRating > 0) result = result.filter(p => p.rating >= minRating);
    const exp = expRanges[expRange];
    result = result.filter(p => p.experience >= exp.min && p.experience <= exp.max);
    if (verifiedOnly) result = result.filter(p => p.verified);
    return result;
  }, [professionals, search, location, minRating, expRange, verifiedOnly]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-sans font-bold text-sm text-ink-900 mb-3">Location</h3>
        <div className="space-y-1">
          {locations.map(loc => (
            <button
              key={loc}
              onClick={() => setLocation(loc)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location === loc ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:bg-ink-100'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" /> {loc}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-sans font-bold text-sm text-ink-900 mb-3">Minimum Rating</h3>
        <div className="space-y-1">
          {[0, 4.0, 4.5, 4.8].map(r => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                minRating === r ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:bg-ink-100'
              }`}
            >
              {r > 0 ? (<><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {r}+ Stars</>) : 'All Ratings'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-sans font-bold text-sm text-ink-900 mb-3">Experience</h3>
        <div className="space-y-1">
          {expRanges.map((range, i) => (
            <button
              key={i}
              onClick={() => setExpRange(i)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                expRange === i ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:bg-ink-100'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-sans font-bold text-sm text-ink-900 mb-3">Verification</h3>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="w-4 h-4 rounded accent-primary-600"
          />
          <span className="text-sm text-ink-700">Verified only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen bg-ink-50">
      <div className="container-page">
        <div className="mb-8">
          <h1 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">Our Professionals</h1>
          <p className="mt-2 text-ink-500">Find the right expert for your needs.</p>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or profession..."
              className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border border-ink-200 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
            />
          </div>
          <button onClick={() => setShowFilters(true)} className="lg:hidden btn-secondary px-4">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-card border border-ink-100 p-5">
              <FilterPanel />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-ink-500 mb-4">{filtered.length} professionals found</p>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <ProfessionalCardSkeleton key={i} />)}
              </div>
            ) : isError ? (
              <ErrorState onRetry={() => refetch()} />
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-ink-100">
                <p className="text-ink-400 text-lg mb-2">No professionals found</p>
                <p className="text-sm text-ink-500">Try adjusting your filters</p>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer(0.06)}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {filtered.map((pro, i) => (
                  <ProfessionalCard key={pro.id} pro={pro} index={i} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

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
    </div>
  );
}
