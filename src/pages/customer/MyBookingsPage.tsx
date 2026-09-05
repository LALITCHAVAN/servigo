import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, X, Eye, Star, ArrowRight, Inbox } from 'lucide-react';
import { useBookings, useUpdateBookingStatus } from '@/hooks/useData';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { useAuth } from '@/context/AuthContext';
import { staggerContainer, fadeUp } from '@/animations/variants';
import type { BookingStatus } from '@/types';

const statusConfig: Record<BookingStatus, { color: string; bg: string; label: string }> = {
  pending: { color: 'text-amber-700', bg: 'bg-amber-100', label: 'Pending' },
  confirmed: { color: 'text-primary-700', bg: 'bg-primary-100', label: 'Confirmed' },
  on_the_way: { color: 'text-indigo-700', bg: 'bg-indigo-100', label: 'On The Way' },
  in_progress: { color: 'text-blue-700', bg: 'bg-blue-100', label: 'In Progress' },
  completed: { color: 'text-accent-700', bg: 'bg-accent-100', label: 'Completed' },
  cancelled: { color: 'text-error-700', bg: 'bg-error-100', label: 'Cancelled' },
};

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
] as const;

type TabKey = typeof tabs[number]['key'];

export function MyBookingsPage() {
  const { user } = useAuth();
  const { data: bookings } = useBookings(user?.id);
  const updateStatus = useUpdateBookingStatus();
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [selectedBooking, setSelectedBooking] = useState<typeof bookingsData[0] | null>(null);

  const bookingsData = bookings || [];

  if (!user) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold text-ink-900">Please log in</h1>
        <Link to="/login" className="btn-primary mt-4">Login</Link>
      </div>
    );
  }

  const filtered = bookingsData.filter(b => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return b.status === 'confirmed' || b.status === 'pending';
    if (activeTab === 'completed') return b.status === 'completed';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen bg-ink-50">
      <div className="container-page">
        <div className="mb-8">
          <h1 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">My Bookings</h1>
          <p className="mt-2 text-ink-500">Manage and track all your service bookings.</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.key ? 'bg-primary-600 text-white' : 'bg-white text-ink-600 hover:bg-ink-100 border border-ink-200'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-xs ${activeTab === tab.key ? 'text-primary-200' : 'text-ink-400'}`}>
                {tab.key === 'all' ? bookingsData.length : tab.key === 'upcoming' ? bookingsData.filter(b => b.status === 'confirmed' || b.status === 'pending').length : bookingsData.filter(b => b.status === tab.key).length}
              </span>
            </button>
          ))}
        </div>

        {/* Bookings */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-ink-100">
            <Inbox className="w-14 h-14 text-ink-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-ink-700 mb-1">No bookings yet</p>
            <p className="text-sm text-ink-500 mb-4">Find your first service and get started.</p>
            <Link to="/services" className="btn-primary">Explore Services <ArrowRight className="w-4 h-4" /></Link>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(booking => {
                const st = statusConfig[booking.status];
                return (
                  <motion.div
                    key={booking.id}
                    variants={fadeUp}
                    layout
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl shadow-card border border-ink-100 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                        <ServiceIcon name={booking.serviceIcon} className="w-7 h-7 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-sans font-bold text-ink-900 truncate">{booking.serviceName}</h3>
                          <span className={`badge ${st.bg} ${st.color} shrink-0`}>{st.label}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <img src={booking.professionalAvatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                          <span className="text-sm text-ink-600">{booking.professionalName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                      <div className="flex items-center gap-1.5 text-ink-600">
                        <Calendar className="w-4 h-4 text-ink-400" /> {booking.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-ink-600">
                        <Clock className="w-4 h-4 text-ink-400" /> {booking.time}
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5 text-sm text-ink-600 mt-2">
                      <MapPin className="w-4 h-4 text-ink-400 mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{booking.address}</span>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink-100">
                      <div>
                        <p className="font-bold text-ink-900">₹{booking.price}</p>
                        <p className={`text-xs ${booking.paymentStatus === 'paid' ? 'text-accent-600' : booking.paymentStatus === 'refunded' ? 'text-error-600' : 'text-amber-600'}`}>
                          {booking.paymentStatus === 'paid' ? 'Paid' : booking.paymentStatus === 'refunded' ? 'Refunded' : 'Payment pending'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {booking.status === 'completed' && (
                          <button className="btn-secondary text-sm px-3 py-2">
                            <Star className="w-3.5 h-3.5" /> Rate
                          </button>
                        )}
                        {(booking.status === 'confirmed' || booking.status === 'pending') && (
                          <button onClick={() => { updateStatus.mutate({ id: booking.id, status: 'cancelled' }); }} className="btn-secondary text-sm px-3 py-2 text-error-600 hover:bg-error-50 hover:border-error-200">
                            <X className="w-3.5 h-3.5" /> Cancel
                          </button>
                        )}
                        <button onClick={() => setSelectedBooking(booking)} className="btn-primary text-sm px-3 py-2">
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Booking details modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" onClick={() => setSelectedBooking(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-3xl shadow-elevated max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setSelectedBooking(null)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-ink-100">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center">
                  <ServiceIcon name={selectedBooking.serviceIcon} className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-xl text-ink-900">{selectedBooking.serviceName}</h3>
                  <p className="text-sm text-ink-500">Booking #{selectedBooking.id.toUpperCase()}</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Professional', value: selectedBooking.professionalName },
                  { label: 'Date', value: selectedBooking.date },
                  { label: 'Time', value: selectedBooking.time },
                  { label: 'Address', value: selectedBooking.address },
                  { label: 'Price', value: `₹${selectedBooking.price}` },
                  { label: 'Payment', value: selectedBooking.paymentStatus === 'paid' ? 'Paid' : selectedBooking.paymentStatus === 'refunded' ? 'Refunded' : 'Pending' },
                  { label: 'Status', value: statusConfig[selectedBooking.status].label },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-ink-100 last:border-0">
                    <span className="text-sm text-ink-500">{item.label}</span>
                    <span className="text-sm font-semibold text-ink-900">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Status timeline */}
              <div className="mt-6">
                <h4 className="font-sans font-bold text-sm text-ink-900 mb-3">Status Timeline</h4>
                <div className="space-y-3">
                  {['pending', 'confirmed', 'on_the_way', 'in_progress', 'completed'].map((step, i) => {
                    const stepStatus = step as BookingStatus;
                    const currentIndex = ['pending', 'confirmed', 'on_the_way', 'in_progress', 'completed'].indexOf(selectedBooking.status);
                    const isDone = i <= currentIndex && selectedBooking.status !== 'cancelled';
                    return (
                      <div key={step} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isDone ? 'bg-accent-500 text-white' : 'bg-ink-100 text-ink-400'}`}>
                          {isDone ? '✓' : i + 1}
                        </div>
                        <span className={`text-sm ${isDone ? 'text-ink-900 font-medium' : 'text-ink-400'}`}>
                          {statusConfig[stepStatus].label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
