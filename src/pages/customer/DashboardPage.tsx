import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, CheckCircle, XCircle, Clock, ArrowRight, Bell, Heart,
  Bookmark, LayoutDashboard, CalendarCheck, TrendingUp,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useBookings, useNotifications, useServices, useProfessionals } from '@/hooks/useData';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { staggerContainer, fadeUp } from '@/animations/variants';
import { useGsapReveal, useGsapCounter } from '@/animations/gsap';

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  pending: { color: 'text-amber-700', bg: 'bg-amber-100', label: 'Pending' },
  confirmed: { color: 'text-primary-700', bg: 'bg-primary-100', label: 'Confirmed' },
  on_the_way: { color: 'text-indigo-700', bg: 'bg-indigo-100', label: 'On The Way' },
  in_progress: { color: 'text-blue-700', bg: 'bg-blue-100', label: 'In Progress' },
  completed: { color: 'text-accent-700', bg: 'bg-accent-100', label: 'Completed' },
  cancelled: { color: 'text-error-700', bg: 'bg-error-100', label: 'Cancelled' },
};

export function DashboardPage() {
  const { user } = useAuth();
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.08 });
  const { data: bookings } = useBookings(user?.id);
  const { data: notifications } = useNotifications(user?.id);
  const { data: services } = useServices();
  const { data: professionals } = useProfessionals();

  const userBookings = bookings || [];
  const stats = {
    totalBookings: userBookings.length,
    completed: userBookings.filter(b => b.status === 'completed').length,
    upcoming: userBookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length,
    cancelled: userBookings.filter(b => b.status === 'cancelled').length,
  };

  const c1 = useGsapCounter(stats.totalBookings);
  const c2 = useGsapCounter(stats.completed);
  const c3 = useGsapCounter(stats.upcoming);
  const c4 = useGsapCounter(stats.cancelled);

  const upcomingBookings = userBookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const recentBookings = userBookings.slice(0, 3);
  const savedServices = (services || []).slice(0, 2);
  const favPros = (professionals || []).slice(0, 2);

  if (!user) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold text-ink-900">Please log in</h1>
        <Link to="/login" className="btn-primary mt-4">Login</Link>
      </div>
    );
  }

  const statCards = [
    { ref: c1, label: 'Total Bookings', icon: Calendar, color: 'primary' },
    { ref: c2, label: 'Completed', icon: CheckCircle, color: 'accent' },
    { ref: c3, label: 'Upcoming', icon: Clock, color: 'amber' },
    { ref: c4, label: 'Cancelled', icon: XCircle, color: 'error' },
  ];

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen bg-ink-50">
      <div className="container-page">
        {/* Welcome */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">
            Welcome back, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="mt-2 text-ink-500">Here's what's happening with your account.</p>
        </motion.div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div key={i} data-reveal className="bg-white rounded-2xl shadow-card border border-ink-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  s.color === 'primary' ? 'bg-primary-50' :
                  s.color === 'accent' ? 'bg-accent-50' :
                  s.color === 'amber' ? 'bg-amber-50' : 'bg-error-50'
                }`}>
                  <s.icon className={`w-5 h-5 ${
                    s.color === 'primary' ? 'text-primary-600' :
                    s.color === 'accent' ? 'text-accent-600' :
                    s.color === 'amber' ? 'text-amber-600' : 'text-error-600'
                  }`} />
                </div>
              </div>
              <p ref={s.ref} className="font-sans font-extrabold text-3xl text-ink-900">0</p>
              <p className="text-sm text-ink-500 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming booking */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-ink-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sans font-bold text-lg text-ink-900">Upcoming Booking</h2>
              <Link to="/my-bookings" className="text-sm text-primary-600 font-semibold hover:underline">View all</Link>
            </div>

            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map(booking => {
                  const st = statusConfig[booking.status];
                  return (
                    <motion.div
                      key={booking.id}
                      whileHover={{ y: -4 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-ink-100 hover:border-primary-200 hover:shadow-soft transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                        <ServiceIcon name={booking.serviceIcon} className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-ink-900">{booking.serviceName}</h3>
                        <p className="text-sm text-ink-500">{booking.professionalName} • {booking.date} at {booking.time}</p>
                      </div>
                      <div className="text-right">
                        <span className={`badge ${st.bg} ${st.color}`}>{st.label}</span>
                        <p className="text-sm font-bold text-ink-900 mt-1">₹{booking.price}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <CalendarCheck className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <p className="text-ink-500">No upcoming bookings</p>
                <Link to="/services" className="btn-primary mt-4">Book a Service</Link>
              </div>
            )}
          </motion.div>

          {/* Notifications */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-card border border-ink-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-primary-600" />
              <h2 className="font-sans font-bold text-lg text-ink-900">Notifications</h2>
            </div>
            <div className="space-y-3">
              {(notifications || []).slice(0, 4).map(n => (
                <div key={n.id} className={`p-3 rounded-xl ${!n.read ? 'bg-primary-50/60' : 'bg-ink-50'}`}>
                  <p className="text-sm font-semibold text-ink-900">{n.title}</p>
                  <p className="text-xs text-ink-500 mt-0.5">{n.message}</p>
                  <p className="text-xs text-ink-400 mt-1">{n.createdAt}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent bookings */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-ink-100 p-6">
            <h2 className="font-sans font-bold text-lg text-ink-900 mb-4">Recent Bookings</h2>
            <div className="space-y-3">
              {recentBookings.map(booking => {
                const st = statusConfig[booking.status];
                return (
                  <div key={booking.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-ink-50 transition-colors">
                    <img src={booking.professionalAvatar} alt={booking.professionalName} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-ink-900">{booking.serviceName}</p>
                      <p className="text-xs text-ink-500">{booking.date} • {booking.professionalName}</p>
                    </div>
                    <span className={`badge ${st.bg} ${st.color} text-xs`}>{st.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Favorites */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-card border border-ink-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-error-500" />
              <h2 className="font-sans font-bold text-lg text-ink-900">Favorites</h2>
            </div>
            <div className="space-y-3">
              {favPros.map(pro => (
                <Link key={pro.id} to={`/professionals/${pro.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-50 transition-colors">
                  <img src={pro.avatar} alt={pro.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-ink-900 truncate">{pro.name}</p>
                    <p className="text-xs text-ink-500">{pro.profession}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Saved services */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-3 bg-white rounded-2xl shadow-card border border-ink-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bookmark className="w-5 h-5 text-primary-600" />
              <h2 className="font-sans font-bold text-lg text-ink-900">Saved Services</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedServices.map(service => (
                <Link key={service.id} to={`/services/${service.slug}`} className="flex items-center gap-3 p-3 rounded-xl border border-ink-100 hover:border-primary-200 hover:shadow-soft transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <ServiceIcon name={service.icon} className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-ink-900">{service.name}</p>
                    <p className="text-xs text-ink-500">From ₹{service.startingPrice}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ink-400" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
