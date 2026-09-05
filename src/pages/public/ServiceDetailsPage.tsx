import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Check, X, ChevronDown, MapPin, ArrowRight, ShieldCheck, Clock, Users,
} from 'lucide-react';
import { useService, useProfessionals, useReviews } from '@/hooks/useData';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { RatingStars } from '@/components/common/RatingStars';
import { ProfessionalCard } from '@/components/common/ProfessionalCard';
import { LoadingState } from '@/components/common/States';
import { useAuth } from '@/context/AuthContext';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function ServiceDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: service, isLoading } = useService(slug);
  const { data: professionals } = useProfessionals();
  const { data: allReviews } = useReviews();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (isLoading) {
    return <div className="pt-32"><LoadingState message="Loading service..." /></div>;
  }

  if (!service) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold text-ink-900">Service not found</h1>
        <Link to="/services" className="btn-primary mt-4">Back to Services</Link>
      </div>
    );
  }

  const serviceReviews = (allReviews || []).filter(r => r.serviceUsed === service.name);
  const relatedPros = (professionals || []).filter(p =>
    p.profession.toLowerCase().includes(service.name.toLowerCase()) ||
    p.skills.some(s => s.toLowerCase().includes(service.name.toLowerCase().split(' ')[0]))
  ).slice(0, 3);

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/book?service=${service.slug}`);
  };

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen bg-ink-50">
      <div className="container-page">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
          <Link to="/services" className="hover:text-primary-600">Services</Link>
          <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
          <span className="text-ink-900 font-medium">{service.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden"
            >
              <div className="relative h-64 lg:h-80">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center">
                      <ServiceIcon name={service.icon} className="w-6 h-6 text-primary-600" />
                    </div>
                    {service.popular && (
                      <span className="badge bg-amber-400 text-amber-950">
                        <Star className="w-3 h-3 fill-amber-950" /> Popular
                      </span>
                    )}
                  </div>
                  <h1 className="font-sans font-extrabold text-3xl lg:text-4xl text-white">{service.name}</h1>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <RatingStars rating={service.rating} size={16} />
                    <span className="font-bold text-ink-900">{service.rating}</span>
                    <span className="text-ink-500">({service.reviewCount} reviews)</span>
                  </div>
                  <span className="text-ink-300">|</span>
                  <div className="flex items-center gap-1.5 text-ink-600">
                    <Users className="w-4 h-4 text-ink-400" />
                    {service.bookedCount.toLocaleString()} booked
                  </div>
                </div>
                <p className="mt-4 text-ink-600 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>

            {/* What's included */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-card border border-ink-100 p-6"
            >
              <h2 className="font-sans font-bold text-xl text-ink-900 mb-4">What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.whatsIncluded.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-accent-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent-600" />
                    </div>
                    <span className="text-sm text-ink-700">{item}</span>
                  </div>
                ))}
              </div>
              <h3 className="font-sans font-bold text-sm text-ink-900 mt-6 mb-3">What's Not Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.whatsNotIncluded.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-error-100 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-error-600" />
                    </div>
                    <span className="text-sm text-ink-500">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Available professionals */}
            {relatedPros.length > 0 && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl shadow-card border border-ink-100 p-6"
              >
                <h2 className="font-sans font-bold text-xl text-ink-900 mb-4">Available Professionals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPros.map((pro, i) => (
                    <ProfessionalCard key={pro.id} pro={pro} index={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* FAQs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-card border border-ink-100 p-6"
            >
              <h2 className="font-sans font-bold text-xl text-ink-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="border border-ink-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-ink-50 transition-colors"
                    >
                      <span className="font-semibold text-sm text-ink-900">{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-ink-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-sm text-ink-600 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            {serviceReviews.length > 0 && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl shadow-card border border-ink-100 p-6"
              >
                <h2 className="font-sans font-bold text-xl text-ink-900 mb-4">Customer Reviews</h2>
                <div className="space-y-4">
                  {serviceReviews.map((review) => (
                    <div key={review.id} className="flex gap-3 pb-4 border-b border-ink-100 last:border-0">
                      <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm text-ink-900">{review.author}</p>
                          <span className="text-xs text-ink-400">{review.date}</span>
                        </div>
                        <RatingStars rating={review.rating} size={12} />
                        <p className="text-sm text-ink-600 mt-2 leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sticky booking panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl shadow-elevated border border-ink-100 p-6"
              >
                <div className="text-center pb-4 border-b border-ink-100">
                  <p className="text-sm text-ink-500">Starting from</p>
                  <p className="font-sans font-extrabold text-4xl text-ink-900">₹{service.startingPrice}</p>
                  <p className="text-xs text-ink-400 mt-1">Prices vary based on scope</p>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2.5 text-sm text-ink-600">
                    <ShieldCheck className="w-4 h-4 text-accent-500" /> Verified Professionals
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-ink-600">
                    <Clock className="w-4 h-4 text-primary-500" /> Flexible Scheduling
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-ink-600">
                    <MapPin className="w-4 h-4 text-primary-500" /> Service at Your Doorstep
                  </div>
                </div>

                <button onClick={handleBookNow} className="btn-primary w-full mt-6">
                  Book Now <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-center text-ink-400 mt-3">
                  {user ? 'Free cancellation up to 2 hours before' : 'Login required to book'}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
