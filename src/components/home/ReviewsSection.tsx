import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import type { Review } from '@/types';
import { useGsapReveal } from '@/animations/gsap';

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const ref = useGsapReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setActive((p) => (p + 1) % (reviews.length || 1));
  }, [reviews.length]);

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, reviews.length]);

  if (reviews.length === 0) return null;

  const review = reviews[active];

  return (
    <section className="py-10 lg:py-16">
      <div className="container-page">
        <div ref={ref} className="text-center mb-12">
          <span data-reveal className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider mb-3">
            Customer Stories
          </span>
          <h2 data-reveal className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">
            Loved by thousands
          </h2>
        </div>

        <div ref={ref} data-reveal className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-elevated border border-ink-100 p-8 lg:p-12 overflow-hidden">
            <Quote className="absolute top-6 right-8 w-20 h-20 text-primary-100" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={review.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-lg lg:text-xl text-ink-700 leading-relaxed font-medium">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-ink-100">
                  <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full object-cover ring-2 ring-ink-100" />
                  <div>
                    <p className="font-sans font-bold text-ink-900">{review.author}</p>
                    <p className="text-sm text-ink-500">{review.serviceUsed} • {review.date}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-primary-600' : 'w-2 bg-ink-300 hover:bg-ink-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
