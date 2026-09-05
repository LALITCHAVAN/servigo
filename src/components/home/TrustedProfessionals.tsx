import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Professional } from '@/types';
import { ProfessionalCard } from '@/components/common/ProfessionalCard';
import { ProfessionalCardSkeleton } from '@/components/common/States';
import { useGsapReveal } from '@/animations/gsap';

export function TrustedProfessionals({ professionals }: { professionals: Professional[] }) {
  const ref = useGsapReveal<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  return (
    <section className="py-10 lg:py-16 bg-gradient-to-b from-white to-ink-50">
      <div className="container-page">
        <div ref={ref} className="flex items-end justify-between mb-8">
          <div>
            <span data-reveal className="inline-block px-3 py-1 rounded-full bg-accent-50 text-accent-600 text-xs font-bold uppercase tracking-wider mb-3">
              Trusted Professionals
            </span>
            <h2 data-reveal className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">
              Meet our top-rated pros
            </h2>
          </div>
          <div data-reveal className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canLeft}
              className="w-10 h-10 rounded-full bg-white border border-ink-200 flex items-center justify-center text-ink-600 hover:bg-ink-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canRight}
              className="w-10 h-10 rounded-full bg-white border border-ink-200 flex items-center justify-center text-ink-600 hover:bg-ink-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={updateScroll}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {professionals.length === 0
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="shrink-0 w-80 snap-start">
                  <ProfessionalCardSkeleton />
                </div>
              ))
            : professionals.map((pro, i) => (
            <div key={pro.id} className="shrink-0 w-80 snap-start">
              <ProfessionalCard pro={pro} index={i} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/professionals" className="btn-secondary">
            View All Professionals
          </Link>
        </div>
      </div>
    </section>
  );
}
