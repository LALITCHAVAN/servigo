import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import type { Service } from '@/types';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { ServiceCardSkeleton } from '@/components/common/States';
import { useGsapReveal } from '@/animations/gsap';

export function PopularServices({ services, loading }: { services: Service[]; loading?: boolean }) {
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.08 });

  return (
    <section className="py-10 lg:py-16">
      <div className="container-page">
        <div ref={ref} className="text-center mb-8">
          <span data-reveal className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold uppercase tracking-wider mb-3">
            Popular Services
          </span>
          <h2 data-reveal className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">
            What can we help you with?
          </h2>
          <p data-reveal className="mt-3 text-ink-500 max-w-xl mx-auto">
            Explore our most-booked services, trusted by thousands of customers across India.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <ServiceCardSkeleton key={i} />)
          ) : services.map((service) => (
            <motion.div
              key={service.id}
              data-reveal
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <Link to={`/services/${service.slug}`}                             className="block bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden hover:shadow-elevated hover:border-primary-200 transition-all duration-300">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
                  {service.popular && (
                    <span className="absolute top-3 left-3 badge bg-amber-400 text-amber-950">
                      <TrendingUp className="w-3 h-3" /> Popular
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center">
                    <ServiceIcon name={service.icon} className="w-5 h-5 text-primary-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-sans font-bold text-ink-900 group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-ink-500 mt-1 line-clamp-2">{service.shortDescription}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-ink-700">{service.rating}</span>
                    </div>
                    <span className="text-xs text-ink-400">({service.reviewCount} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-100">
                    <div>
                      <span className="text-xs text-ink-400">Starting at</span>
                      <p className="font-bold text-ink-900">₹{service.startingPrice}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-ink-100 group-hover:bg-primary-600 flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-ink-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
