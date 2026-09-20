import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
} from 'lucide-react';

import { useServices } from '@/hooks/useData';
import { categories } from '@/data/mockData';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { RatingStars } from '@/components/common/RatingStars';
import {
  ServiceCardSkeleton,
  ErrorState,
} from '@/components/common/States';

// ======================================================
// PRICE RANGES
// ======================================================

const priceRanges = [
  {
    label: 'Under ₹300',
    min: 0,
    max: 300,
  },
  {
    label: '₹300 - ₹500',
    min: 300,
    max: 500,
  },
  {
    label: '₹500 - ₹1000',
    min: 500,
    max: 1000,
  },
  {
    label: 'Above ₹1000',
    min: 1000,
    max: 99999,
  },
];

// ======================================================
// SORT OPTIONS
// ======================================================

const sortOptions = [
  {
    value: 'popular',
    label: 'Most Booked',
  },
  {
    value: 'rating',
    label: 'Highest Rated',
  },
  {
    value: 'price-low',
    label: 'Price: Low to High',
  },
  {
    value: 'price-high',
    label: 'Price: High to Low',
  },
];

// ======================================================
// NORMALIZE TEXT
// ======================================================

function normalizeText(value: unknown): string {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-');
}

// ======================================================
// CATEGORY MATCHING
//
// IMPORTANT:
// Database categories are broad:
//
// AC Repair          -> repair
// Plumbing Service   -> repair
// Electrician        -> electrical
// Home Cleaning      -> cleaning
//
// UI categories are specific.
//
// So we match using SERVICE NAME.
// ======================================================

function serviceMatchesCategory(
  service: any,
  selectedCategory: string
): boolean {
  const category = normalizeText(selectedCategory);

  const serviceName = String(
    service.name || ''
  )
    .trim()
    .toLowerCase();

  const serviceCategory = normalizeText(
    service.category
  );

  // ----------------------------------------------------
  // AC REPAIR
  // ----------------------------------------------------

  if (category === 'ac-repair') {
    return serviceName.includes('ac repair');
  }

  // ----------------------------------------------------
  // APPLIANCE REPAIR
  // ----------------------------------------------------

  if (category === 'appliance-repair') {
    return serviceName.includes('appliance repair');
  }

  // ----------------------------------------------------
  // PLUMBING
  // ----------------------------------------------------

  if (category === 'plumbing') {
    return (
      serviceName.includes('plumbing') ||
      serviceName.includes('plumbing service')
    );
  }

  // ----------------------------------------------------
  // ELECTRICIAN
  // ----------------------------------------------------

  if (category === 'electrician') {
    return serviceName.includes('electrician');
  }

  // ----------------------------------------------------
  // HOME CLEANING
  // ----------------------------------------------------

  if (category === 'home-cleaning') {
    return serviceName.includes('home cleaning');
  }

  // ----------------------------------------------------
  // PEST CONTROL
  // ----------------------------------------------------

  if (category === 'pest-control') {
    return serviceName.includes('pest control');
  }

  // ----------------------------------------------------
  // CARPENTRY
  // ----------------------------------------------------

  if (category === 'carpentry') {
    return serviceName.includes('carpentry');
  }

  // ----------------------------------------------------
  // BEAUTY / SALON
  // ----------------------------------------------------

  if (
    category === 'salon' ||
    category === 'beauty' ||
    category === 'beauty-salon'
  ) {
    return (
      serviceName.includes('beauty') ||
      serviceName.includes('salon')
    );
  }

  // ----------------------------------------------------
  // TUTOR
  // ----------------------------------------------------

  if (
    category === 'tutor' ||
    category === 'tutoring' ||
    category === 'home-tutoring'
  ) {
    return (
      serviceName.includes('tutor') ||
      serviceName.includes('education')
    );
  }

  // ----------------------------------------------------
  // MOVING
  // ----------------------------------------------------

  if (
    category === 'moving' ||
    category === 'moving-service'
  ) {
    return serviceName.includes('moving');
  }

  // ----------------------------------------------------
  // PAINTING
  // ----------------------------------------------------

  if (
    category === 'painting' ||
    category === 'painting-service' ||
    category === 'home-improvement'
  ) {
    return serviceName.includes('painting');
  }

  // ----------------------------------------------------
  // CCTV / SECURITY
  // ----------------------------------------------------

  if (
    category === 'security' ||
    category === 'cctv' ||
    category === 'cctv-installation'
  ) {
    return (
      serviceName.includes('cctv') ||
      serviceName.includes('security')
    );
  }

  // ----------------------------------------------------
  // COMPUTER REPAIR
  // ----------------------------------------------------

  if (category === 'computer-repair') {
    return (
      serviceName.includes('computer repair') ||
      serviceName.includes('computer')
    );
  }

  // ----------------------------------------------------
  // GARDENING
  // ----------------------------------------------------

  if (
    category === 'gardening' ||
    category === 'gardening-service'
  ) {
    return serviceName.includes('gardening');
  }

  // ----------------------------------------------------
  // WATER PURIFIER
  // ----------------------------------------------------

  if (
    category === 'water-purifier' ||
    category === 'water-purifier-service'
  ) {
    return (
      serviceName.includes('water purifier') ||
      serviceName.includes('purifier')
    );
  }

  // ----------------------------------------------------
  // FALLBACK
  // ----------------------------------------------------

  return serviceCategory === category;
}

// ======================================================
// SERVICES PAGE
// ======================================================

export function ServicesPage() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  // ======================================================
  // STATE
  // ======================================================

  const [search, setSearch] = useState(
    searchParams.get('q') || ''
  );

  const [selectedCategory, setSelectedCategory] =
    useState(
      searchParams.get('category') || 'all'
    );

  const [priceRange, setPriceRange] =
    useState<string | null>(null);

  const [minRating, setMinRating] =
    useState(0);

  const [sortBy, setSortBy] =
    useState('popular');

  const [showFilters, setShowFilters] =
    useState(false);

  const [page, setPage] = useState(1);

  const perPage = 6;

  // ======================================================
  // URL SYNC
  // ======================================================

  useEffect(() => {
    const category =
      searchParams.get('category');

    const query =
      searchParams.get('q');

    setSelectedCategory(
      category || 'all'
    );

    setSearch(
      query || ''
    );

    setPage(1);
  }, [searchParams]);

  // ======================================================
  // FETCH SERVICES
  // ======================================================

  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useServices();

  // ======================================================
  // DEBUG
  // ======================================================

  console.log(
    'SERVICES FROM API:',
    services
  );

  console.log(
    'SELECTED CATEGORY:',
    selectedCategory
  );

  console.log(
    'SERVICE CATEGORIES:',
    services.map(
      (service) => ({
        name: service.name,
        category: service.category,
        normalized: normalizeText(
          service.category
        ),
      })
    )
  );

  // ======================================================
  // FILTER + SORT
  // ======================================================

  const filtered = useMemo(() => {
    let result = [...services];

    // ====================================================
    // SEARCH
    // ====================================================

    if (search.trim()) {
      const searchText =
        search
          .toLowerCase()
          .trim();

      result = result.filter(
        (service) => {
          const name =
            String(
              service.name || ''
            ).toLowerCase();

          const description =
            String(
              service.shortDescription || ''
            ).toLowerCase();

          return (
            name.includes(searchText) ||
            description.includes(searchText)
          );
        }
      );
    }

    // ====================================================
    // CATEGORY
    // ====================================================

    if (
      selectedCategory &&
      selectedCategory !== 'all'
    ) {
      result = result.filter(
        (service) =>
          serviceMatchesCategory(
            service,
            selectedCategory
          )
      );
    }

    // ====================================================
    // PRICE
    // ====================================================

    if (priceRange) {
      const range =
        priceRanges.find(
          (item) =>
            item.label === priceRange
        );

      if (range) {
        result = result.filter(
          (service) =>
            service.startingPrice >=
              range.min &&
            service.startingPrice <
              range.max
        );
      }
    }

    // ====================================================
    // RATING
    // ====================================================

    if (minRating > 0) {
      result = result.filter(
        (service) =>
          service.rating >=
          minRating
      );
    }

    // ====================================================
    // SORT
    // ====================================================

    switch (sortBy) {
      case 'rating':
        result.sort(
          (a, b) =>
            b.rating - a.rating
        );
        break;

      case 'price-low':
        result.sort(
          (a, b) =>
            a.startingPrice -
            b.startingPrice
        );
        break;

      case 'price-high':
        result.sort(
          (a, b) =>
            b.startingPrice -
            a.startingPrice
        );
        break;

      case 'popular':
      default:
        result.sort(
          (a, b) =>
            b.bookedCount -
            a.bookedCount
        );
        break;
    }

    console.log(
      'FILTERED SERVICES:',
      result.length
    );

    console.log(
      'FILTERED SERVICE NAMES:',
      result.map(
        (service) => service.name
      )
    );

    return result;
  }, [
    services,
    search,
    selectedCategory,
    priceRange,
    minRating,
    sortBy,
  ]);

  // ======================================================
  // PAGINATION
  // ======================================================

  const paginated =
    filtered.slice(
      0,
      page * perPage
    );

  const hasMore =
    filtered.length >
    paginated.length;

  // ======================================================
  // UPDATE CATEGORY
  // ======================================================

  const updateCategory = (
    category: string
  ) => {
    const normalizedCategory =
      normalizeText(category);

    console.log(
      'CATEGORY CLICKED:',
      category
    );

    console.log(
      'NORMALIZED CATEGORY:',
      normalizedCategory
    );

    setSelectedCategory(
      normalizedCategory
    );

    setPage(1);

    if (
      normalizedCategory === 'all'
    ) {
      setSearchParams({});
    } else {
      setSearchParams({
        category:
          normalizedCategory,
      });
    }

    setShowFilters(false);
  };

  // ======================================================
  // CLEAR FILTERS
  // ======================================================

  const clearFilters = () => {
    setSelectedCategory('all');

    setPriceRange(null);

    setMinRating(0);

    setSearch('');

    setPage(1);

    setSearchParams({});
  };

  // ======================================================
  // FILTER PANEL
  // ======================================================

  const FilterPanel = () => (
    <div className="space-y-6">

      {/* CATEGORY */}

      <div>
        <h3 className="font-sans font-bold text-sm text-ink-900 mb-3">
          Category
        </h3>

        <div className="space-y-1">

          {/* ALL */}

          <button
            onClick={() =>
              updateCategory('all')
            }
            className={`
              w-full
              text-left
              px-3
              py-2
              rounded-lg
              text-sm
              font-medium
              transition-colors
              ${
                selectedCategory ===
                'all'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-ink-600 hover:bg-ink-100'
              }
            `}
          >
            All Services
          </button>

          {/* CATEGORIES */}

          {categories.map(
            (category) => {
              const categorySlug =
                normalizeText(
                  category.slug
                );

              return (
                <button
                  key={category.id}
                  onClick={() =>
                    updateCategory(
                      categorySlug
                    )
                  }
                  className={`
                    w-full
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                    transition-colors
                    ${
                      selectedCategory ===
                      categorySlug
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-ink-600 hover:bg-ink-100'
                    }
                  `}
                >
                  <ServiceIcon
                    name={
                      category.icon
                    }
                    className="w-4 h-4"
                  />

                  {category.name}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* PRICE */}

      <div>
        <h3 className="font-sans font-bold text-sm text-ink-900 mb-3">
          Price Range
        </h3>

        <div className="space-y-1">
          {priceRanges.map(
            (range) => (
              <button
                key={
                  range.label
                }
                onClick={() =>
                  setPriceRange(
                    priceRange ===
                      range.label
                      ? null
                      : range.label
                  )
                }
                className={`
                  w-full
                  text-left
                  px-3
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  transition-colors
                  ${
                    priceRange ===
                    range.label
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-ink-600 hover:bg-ink-100'
                  }
                `}
              >
                {range.label}
              </button>
            )
          )}
        </div>
      </div>

      {/* RATING */}

      <div>
        <h3 className="font-sans font-bold text-sm text-ink-900 mb-3">
          Minimum Rating
        </h3>

        <div className="space-y-1">
          {[4.5, 4.0, 3.5, 0].map(
            (rating) => (
              <button
                key={rating}
                onClick={() =>
                  setMinRating(
                    rating
                  )
                }
                className={`
                  w-full
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  transition-colors
                  ${
                    minRating ===
                    rating
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-ink-600 hover:bg-ink-100'
                  }
                `}
              >
                {rating > 0 ? (
                  <>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />

                    {rating}+
                    Stars
                  </>
                ) : (
                  'All Ratings'
                )}
              </button>
            )
          )}
        </div>
      </div>

      {/* CLEAR */}

      <button
        onClick={
          clearFilters
        }
        className="w-full btn-secondary text-sm"
      >
        Clear All Filters
      </button>

    </div>
  );

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen bg-ink-50">

      <div className="container-page">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">
            All Services
          </h1>

          <p className="mt-2 text-ink-500">
            Browse our complete catalog of
            home and personal services.
          </p>

        </div>

        {/* SEARCH + SORT */}

        <div className="flex gap-3 mb-6">

          {/* SEARCH */}

          <div className="flex-1 relative">

            <Search
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                w-5
                h-5
                text-ink-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(
                  event.target.value
                );

                setPage(1);

                const value =
                  event.target.value.trim();

                const params =
                  new URLSearchParams(
                    searchParams
                  );

                if (value) {
                  params.set(
                    'q',
                    value
                  );
                } else {
                  params.delete('q');
                }

                setSearchParams(
                  params
                );
              }}
              placeholder="Search services..."
              className="
                w-full
                pl-11
                pr-4
                py-3
                text-sm
                bg-white
                rounded-xl
                border
                border-ink-200
                focus:outline-none
                focus:ring-2
                focus:ring-primary-300
                transition-all
              "
            />

          </div>

          {/* SORT */}

          <select
            value={sortBy}
            onChange={(event) => {
              setSortBy(
                event.target.value
              );

              setPage(1);
            }}
            className="
              px-4
              py-3
              text-sm
              bg-white
              rounded-xl
              border
              border-ink-200
              focus:outline-none
              focus:ring-2
              focus:ring-primary-300
              cursor-pointer
            "
          >
            {sortOptions.map(
              (option) => (
                <option
                  key={
                    option.value
                  }
                  value={
                    option.value
                  }
                >
                  {option.label}
                </option>
              )
            )}
          </select>

          {/* MOBILE FILTER */}

          <button
            onClick={() =>
              setShowFilters(
                true
              )
            }
            className="
              lg:hidden
              btn-secondary
              px-4
            "
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

        </div>

        {/* MAIN CONTENT */}

        <div className="flex gap-8">

          {/* DESKTOP FILTERS */}

          <aside className="hidden lg:block w-64 shrink-0">

            <div
              className="
                sticky
                top-24
                bg-white
                rounded-2xl
                shadow-card
                border
                border-ink-100
                p-5
              "
            >
              <FilterPanel />
            </div>

          </aside>

          {/* SERVICES */}

          <div className="flex-1 min-w-0">

            {/* COUNT */}

            <p className="text-sm text-ink-500 mb-4">
              {filtered.length}{' '}
              services found
            </p>

            {/* LOADING */}

            {isLoading && (
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  xl:grid-cols-3
                  gap-5
                "
              >
                {Array.from({
                  length: 6,
                }).map(
                  (_, index) => (
                    <ServiceCardSkeleton
                      key={index}
                    />
                  )
                )}
              </div>
            )}

            {/* ERROR */}

            {!isLoading &&
              isError && (
                <ErrorState
                  onRetry={() =>
                    refetch()
                  }
                />
              )}

            {/* EMPTY */}

            {!isLoading &&
              !isError &&
              filtered.length ===
                0 && (
                <div
                  className="
                    text-center
                    py-20
                    bg-white
                    rounded-2xl
                    border
                    border-ink-100
                  "
                >
                  <p className="text-ink-400 text-lg mb-2">
                    No services found
                  </p>

                  <p className="text-sm text-ink-500 mb-4">
                    Try adjusting your
                    filters
                  </p>

                  <button
                    onClick={
                      clearFilters
                    }
                    className="btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

            {/* GRID */}

            {!isLoading &&
              !isError &&
              filtered.length >
                0 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-3
                    gap-5
                  "
                >
                  {paginated.map(
                    (service) => (
                      <motion.div
                        key={
                          service.id
                        }
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        whileHover={{
                          y: -6,
                        }}
                      >
                        <Link
                          to={`/services/${service.slug}`}
                          className="
                            block
                            bg-white
                            rounded-2xl
                            shadow-card
                            border
                            border-ink-100
                            overflow-hidden
                            hover:shadow-elevated
                            hover:border-primary-200
                            transition-all
                            duration-300
                            group
                          "
                        >
                          {/* IMAGE */}

                          <div className="relative h-40 overflow-hidden">

                            {service.image ? (
                              <img
                                src={
                                  service.image
                                }
                                alt={
                                  service.name
                                }
                                loading="lazy"
                                className="
                                  w-full
                                  h-full
                                  object-cover
                                  group-hover:scale-110
                                  transition-transform
                                  duration-500
                                "
                              />
                            ) : (
                              <div
                                className="
                                  w-full
                                  h-full
                                  bg-ink-100
                                  flex
                                  items-center
                                  justify-center
                                "
                              >
                                <ServiceIcon
                                  name={
                                    service.icon
                                  }
                                  className="
                                    w-12
                                    h-12
                                    text-primary-500
                                  "
                                />
                              </div>
                            )}

                            <div
                              className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-ink-900/40
                                to-transparent
                              "
                            />

                            <div
                              className="
                                absolute
                                bottom-3
                                left-3
                                w-10
                                h-10
                                rounded-xl
                                bg-white/90
                                backdrop-blur
                                flex
                                items-center
                                justify-center
                              "
                            >
                              <ServiceIcon
                                name={
                                  service.icon
                                }
                                className="
                                  w-5
                                  h-5
                                  text-primary-600
                                "
                              />
                            </div>

                          </div>

                          {/* CONTENT */}

                          <div className="p-4">

                            <h3
                              className="
                                font-sans
                                font-bold
                                text-ink-900
                                group-hover:text-primary-600
                                transition-colors
                              "
                            >
                              {
                                service.name
                              }
                            </h3>

                            <p
                              className="
                                text-sm
                                text-ink-500
                                mt-1
                                line-clamp-2
                              "
                            >
                              {
                                service.shortDescription
                              }
                            </p>

                            <div className="flex items-center gap-2 mt-3">

                              <RatingStars
                                rating={
                                  service.rating
                                }
                                size={14}
                              />

                              <span className="text-xs text-ink-400">
                                (
                                {
                                  service.reviewCount
                                }
                                )
                              </span>

                            </div>

                            <div
                              className="
                                flex
                                items-center
                                justify-between
                                mt-3
                                pt-3
                                border-t
                                border-ink-100
                              "
                            >
                              <p className="font-bold text-ink-900">
                                ₹
                                {
                                  service.startingPrice
                                }

                                <span
                                  className="
                                    text-xs
                                    font-normal
                                    text-ink-400
                                  "
                                >
                                  {' '}
                                  onwards
                                </span>
                              </p>
                            </div>

                          </div>

                        </Link>
                      </motion.div>
                    )
                  )}
                </motion.div>
              )}

            {/* LOAD MORE */}

            {hasMore && (
              <div className="text-center mt-8">

                <button
                  onClick={() =>
                    setPage(
                      (currentPage) =>
                        currentPage +
                        1
                    )
                  }
                  className="btn-secondary"
                >
                  Load More
                </button>

              </div>
            )}

          </div>
        </div>
      </div>

      {/* MOBILE FILTER */}

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-50
              lg:hidden
            "
          >

            {/* BACKDROP */}

            <div
              className="
                absolute
                inset-0
                bg-ink-900/40
                backdrop-blur-sm
              "
              onClick={() =>
                setShowFilters(
                  false
                )
              }
            />

            {/* DRAWER */}

            <motion.div
              initial={{
                x: '-100%',
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: '-100%',
              }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300,
              }}
              className="
                absolute
                left-0
                top-0
                bottom-0
                w-80
                max-w-[85vw]
                bg-white
                shadow-elevated
                overflow-y-auto
                p-5
              "
            >

              {/* DRAWER HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-6
                "
              >
                <h3 className="font-sans font-bold text-lg">
                  Filters
                </h3>

                <button
                  onClick={() =>
                    setShowFilters(
                      false
                    )
                  }
                  className="
                    p-2
                    rounded-lg
                    hover:bg-ink-100
                  "
                >
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