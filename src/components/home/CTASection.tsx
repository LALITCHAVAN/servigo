import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench } from 'lucide-react';
import { useGsapReveal } from '@/animations/gsap';

export function CTASection() {
  const ref = useGsapReveal<HTMLDivElement>();

  return (
    <section className="py-10 lg:py-16">
      <div className="container-page">
        <div ref={ref} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 px-6 py-12 lg:px-16 lg:py-16">
          {/* Decorative */}
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent-400/20 blur-3xl" />

          <div className="relative max-w-2xl mx-auto text-center">
            <motion.div data-reveal className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-xs font-semibold mb-5">
              <Wrench className="w-3.5 h-3.5" /> ServiGo Marketplace
            </motion.div>

            <h2 data-reveal className="font-sans font-extrabold text-3xl lg:text-5xl text-white leading-tight text-balance">
              Need a service? We've got you covered.
            </h2>
            <p data-reveal className="mt-4 text-lg text-primary-100 max-w-xl mx-auto">
              Join thousands of happy customers who trust ServiGo for their home and personal service needs.
            </p>

            <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
                Find a Service <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur text-white font-bold border border-white/20 hover:bg-white/20 transition-all duration-300">
                Become a Professional
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
