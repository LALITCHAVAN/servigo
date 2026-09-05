import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BadgeCheck, MapPin, Star, Clock, Briefcase, Award, ArrowRight,
  Calendar, CheckCircle, MessageSquare,
} from 'lucide-react';
import { useProfessional, useReviews } from '@/hooks/useData';
import { RatingStars } from '@/components/common/RatingStars';
import { LoadingState } from '@/components/common/States';
import { useAuth } from '@/context/AuthContext';
import { fadeUp, staggerContainer } from '@/animations/variants';

const tabs = ['About', 'Services', 'Reviews', 'Portfolio'] as const;
type Tab = typeof tabs[number];

export function ProfessionalProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: pro, isLoading } = useProfessional(id);
  const { data: allReviews } = useReviews();
  const [activeTab, setActiveTab] = useState<Tab>('About');

  if (isLoading) {
    return <div className="pt-32"><LoadingState message="Loading profile..." /></div>;
  }

  if (!pro) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold text-ink-900">Professional not found</h1>
        <Link to="/professionals" className="btn-primary mt-4">Back to Professionals</Link>
      </div>
    );
  }

  const proReviews = (allReviews || []).filter(r => r.professional === pro.name);

  const handleBook = () => {
    if (!user) { navigate('/login'); return; }
    navigate(`/book?professional=${pro.id}`);
  };

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen bg-ink-50">
      <div className="container-page">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/professionals" className="hover:text-primary-600">Professionals</Link>
          <span>/</span>
          <span className="text-ink-900 font-medium">{pro.name}</span>
        </nav>

        {/* Profile header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden mb-6"
        >
          <div className="h-24 bg-gradient-to-r from-primary-500 to-primary-700" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 -mt-12">
              <div className="relative">
                <img src={pro.avatar} alt={pro.name} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg" />
                {pro.online && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full ring-2 ring-white flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full" />
                  </span>
                )}
              </div>
              <div className="flex-1 sm:mt-12">
                <div className="flex items-center gap-2">
                  <h1 className="font-sans font-extrabold text-2xl text-ink-900">{pro.name}</h1>
                  {pro.verified && <BadgeCheck className="w-5 h-5 text-primary-500" />}
                </div>
                <p className="text-ink-500">{pro.profession}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-ink-900">{pro.rating}</span>
                    <span className="text-ink-500">({pro.reviewCount} reviews)</span>
                  </div>
                  <span className="text-ink-300">|</span>
                  <div className="flex items-center gap-1 text-ink-600">
                    <MapPin className="w-4 h-4 text-ink-400" /> {pro.location}
                  </div>
                </div>
              </div>
              <div className="sm:mt-12 flex flex-col items-start gap-2">
                <button onClick={handleBook} className="btn-primary">
                  Book Now <ArrowRight className="w-4 h-4" />
                </button>
                <button className="btn-secondary text-sm">
                  <MessageSquare className="w-4 h-4" /> Message
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-ink-100">
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-2">
                  <Briefcase className="w-5 h-5 text-primary-600" />
                </div>
                <p className="font-bold text-lg text-ink-900">{pro.completedJobs}</p>
                <p className="text-xs text-ink-500">Jobs Done</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center mx-auto mb-2">
                  <Award className="w-5 h-5 text-accent-600" />
                </div>
                <p className="font-bold text-lg text-ink-900">{pro.experience} yrs</p>
                <p className="text-xs text-ink-500">Experience</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-2">
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <p className="font-bold text-lg text-ink-900">{pro.rating}</p>
                <p className="text-xs text-ink-500">Rating</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-5 h-5 text-primary-600" />
                </div>
                <p className="font-bold text-lg text-ink-900">{pro.verified ? 'Yes' : 'No'}</p>
                <p className="text-xs text-ink-500">Verified</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tabs + content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden">
              {/* Tab bar */}
              <div className="flex border-b border-ink-100 overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                      activeTab === tab ? 'text-primary-600' : 'text-ink-500 hover:text-ink-700'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {activeTab === 'About' && (
                      <div>
                        <h3 className="font-sans font-bold text-lg text-ink-900 mb-3">About</h3>
                        <p className="text-ink-600 leading-relaxed">{pro.bio}</p>

                        <h4 className="font-sans font-bold text-sm text-ink-900 mt-6 mb-3">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {pro.skills.map(skill => (
                            <span key={skill} className="badge bg-primary-50 text-primary-700">{skill}</span>
                          ))}
                        </div>

                        <h4 className="font-sans font-bold text-sm text-ink-900 mt-6 mb-3">Availability</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {pro.availability.map(day => (
                            <div key={day.day} className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${day.off ? 'bg-error-50 text-error-600' : 'bg-ink-50 text-ink-700'}`}>
                              <span className="font-medium">{day.day}</span>
                              <span>{day.hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'Services' && (
                      <div className="space-y-3">
                        {pro.services.map(s => (
                          <div key={s.name} className="flex items-center justify-between p-4 rounded-xl border border-ink-100 hover:border-primary-200 transition-colors">
                            <div>
                              <p className="font-semibold text-ink-900">{s.name}</p>
                              <p className="text-sm text-ink-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.duration}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-ink-900">₹{s.price}</p>
                              <button onClick={handleBook} className="text-xs text-primary-600 font-semibold hover:underline mt-1">Book this</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'Reviews' && (
                      <div>
                        {proReviews.length > 0 ? (
                          <div className="space-y-4">
                            {proReviews.map(review => (
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
                        ) : (
                          <p className="text-ink-500 text-sm">No reviews yet.</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'Portfolio' && (
                      <div className="grid grid-cols-2 gap-4">
                        {pro.portfolio.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group rounded-xl overflow-hidden"
                          >
                            <img src={item.image} alt={item.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent flex items-end p-3">
                              <p className="text-white text-sm font-semibold">{item.title}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Sidebar - booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl shadow-elevated border border-ink-100 p-6">
                <p className="text-sm text-ink-500">Starting from</p>
                <p className="font-sans font-extrabold text-3xl text-ink-900">₹{pro.startingPrice}</p>
                <button onClick={handleBook} className="btn-primary w-full mt-4">
                  <Calendar className="w-4 h-4" /> Book Now
                </button>
                <p className="text-xs text-center text-ink-400 mt-3">
                  {user ? 'Free cancellation up to 2 hours before' : 'Login required to book'}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-card border border-ink-100 p-5">
                <h4 className="font-sans font-bold text-sm text-ink-900 mb-3">Quick Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-ink-600">
                    <MapPin className="w-4 h-4 text-ink-400" /> {pro.location}
                  </div>
                  <div className="flex items-center gap-2 text-ink-600">
                    <Clock className="w-4 h-4 text-ink-400" /> {pro.online ? 'Online now' : 'Offline'}
                  </div>
                  <div className="flex items-center gap-2 text-ink-600">
                    <Briefcase className="w-4 h-4 text-ink-400" /> {pro.experience} years experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
