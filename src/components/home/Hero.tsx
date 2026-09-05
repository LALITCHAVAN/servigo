import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, Sparkles, ShieldCheck, Star } from 'lucide-react';
import { gsap } from '@/animations/gsap';
import { services } from '@/data/mockData';
import { ServiceIcon } from '@/components/common/ServiceIcon';

export function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.5 })
        .from('.hero-title-line', { opacity: 0, y: 40, duration: 0.7, stagger: 0.12 }, '-=0.2')
        .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from('.hero-search', { opacity: 0, scale: 0.95, duration: 0.5 }, '-=0.2')
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.4, stagger: 0.1 }, '-=0.2')
        .from('.hero-stats', { opacity: 0, y: 20, duration: 0.4, stagger: 0.08 }, '-=0.1')
        .from('.hero-service-chip', { opacity: 0, y: 20, duration: 0.3, stagger: 0.06 }, '-=0.2')
        .from('.hero-floating', { opacity: 0, scale: 0.8, duration: 0.6, stagger: 0.1 }, '-=0.3');

      // Parallax floating elements
      gsap.to('.hero-float-1', { y: -15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-float-2', { y: 15, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (location.trim()) params.set('location', location.trim());
    navigate(`/services${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-24 lg:pt-32 pb-12 lg:pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 via-white to-white" />
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />

      {/* Floating decorative elements */}
      <div className="hero-float-1 hero-floating absolute top-32 right-[8%] w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-600 opacity-20 blur-2xl" />
      <div className="hero-float-2 hero-floating absolute bottom-20 left-[5%] w-32 h-32 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 opacity-15 blur-2xl" />

      <div className="container-page relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-primary-200 shadow-soft mb-6">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-semibold text-ink-700">India's trusted service marketplace</span>
          </motion.div>

          {/* Title */}
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-ink-900 leading-[1.1] tracking-tight">
            <span className="hero-title-line block">Trusted Services,</span>
            <span className="hero-title-line block">Right at Your <span className="gradient-text">Doorstep</span></span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle mt-5 text-lg text-ink-500 max-w-2xl mx-auto leading-relaxed text-balance">
            Find verified professionals, compare prices, and book reliable services in just a few clicks.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="hero-search mt-8 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white rounded-2xl shadow-elevated border border-ink-100">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What service do you need?"
                  className="w-full pl-11 pr-3 py-3 text-sm bg-ink-50 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="w-full pl-11 pr-3 py-3 text-sm bg-ink-50 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all"
                />
              </div>
              <button type="submit" className="btn-primary shrink-0">
                <Search className="w-4 h-4" /> Search Services
              </button>
            </div>
          </form>

          {/* CTAs */}
          <div className="hero-cta flex items-center justify-center gap-3 mt-6">
            <button onClick={() => navigate('/services')} className="btn-primary">
              Book a Service <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('/professionals')} className="btn-secondary">
              Explore Professionals
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats grid grid-cols-3 gap-4 max-w-lg mx-auto mt-9">
            {[
              { value: '10K+', label: 'Bookings' },
              { value: '500+', label: 'Professionals' },
              { value: '4.8★', label: 'Avg Rating' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-sans font-extrabold text-2xl text-ink-900">{s.value}</p>
                <p className="text-xs text-ink-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service chips */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
          {services.slice(0, 8).map((s) => (
            <button
              key={s.id}
              onClick={() => navigate(`/services/${s.slug}`)}
              className="hero-service-chip group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-ink-200 shadow-soft hover:border-primary-300 hover:shadow-glow transition-all duration-200"
            >
              <ServiceIcon name={s.icon} className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-ink-700 group-hover:text-primary-600">{s.name}</span>
            </button>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-5 text-sm text-ink-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent-500" />
            <span>Verified Professionals</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Quality Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary-500" />
            <span>Secure Payments</span>
          </div>
        </div>
      </div>
    </section>
  );
}
