import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, DollarSign, Star, Briefcase, TrendingUp, Clock,
  CheckCircle, ArrowRight, Activity,
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { useBookings } from '@/hooks/useData';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { fadeUp, staggerContainer } from '@/animations/variants';
import { useGsapReveal } from '@/animations/gsap';

const weeklyEarnings = [
  { day: 'Mon', earnings: 2400 },
  { day: 'Tue', earnings: 1800 },
  { day: 'Wed', earnings: 3200 },
  { day: 'Thu', earnings: 2800 },
  { day: 'Fri', earnings: 3600 },
  { day: 'Sat', earnings: 4200 },
  { day: 'Sun', earnings: 0 },
];

const monthlyBookings = [
  { month: 'Jan', bookings: 12 },
  { month: 'Feb', bookings: 18 },
  { month: 'Mar', bookings: 24 },
  { month: 'Apr', bookings: 30 },
  { month: 'May', bookings: 28 },
  { month: 'Jun', bookings: 35 },
  { month: 'Jul', bookings: 42 },
  { month: 'Aug', bookings: 48 },
];

const ratingDistribution = [
  { name: '5 Star', value: 320, color: '#10b981' },
  { name: '4 Star', value: 45, color: '#33a0ff' },
  { name: '3 Star', value: 12, color: '#f59e0b' },
  { name: '1-2 Star', value: 3, color: '#ef4444' },
];

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  pending: { color: 'text-amber-700', bg: 'bg-amber-100', label: 'Pending' },
  confirmed: { color: 'text-primary-700', bg: 'bg-primary-100', label: 'Confirmed' },
  on_the_way: { color: 'text-indigo-700', bg: 'bg-indigo-100', label: 'On The Way' },
  in_progress: { color: 'text-blue-700', bg: 'bg-blue-100', label: 'In Progress' },
  completed: { color: 'text-accent-700', bg: 'bg-accent-100', label: 'Completed' },
  cancelled: { color: 'text-error-700', bg: 'bg-error-100', label: 'Cancelled' },
};

export function ProfessionalDashboardPage() {
  const { user } = useAuth();
  const { data: bookings } = useBookings(user?.id);
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.08 });

  if (!user) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold text-ink-900">Please log in</h1>
        <Link to="/login" className="btn-primary mt-4">Login</Link>
      </div>
    );
  }

  const userBookings = bookings || [];
  const todayBookings = userBookings.filter(b => b.status === 'confirmed' || b.status === 'in_progress');
  const upcomingJobs = userBookings.filter(b => b.status === 'confirmed');
  const completedJobs = userBookings.filter(b => b.status === 'completed');
  const totalEarnings = completedJobs.reduce((sum, b) => sum + b.price, 0);

  const statCards = [
    { label: "Today's Bookings", value: todayBookings.length, icon: Calendar, color: 'primary' },
    { label: 'Upcoming Jobs', value: upcomingJobs.length, icon: Clock, color: 'amber' },
    { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'accent' },
    { label: 'Completed Jobs', value: completedJobs.length, icon: CheckCircle, color: 'primary' },
  ];

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen bg-ink-50">
      <div className="container-page">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
          <h1 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">
            Professional Dashboard
          </h1>
          <p className="mt-2 text-ink-500">Manage your jobs, earnings, and performance.</p>
        </motion.div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div key={i} data-reveal className="bg-white rounded-2xl shadow-card border border-ink-100 p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                s.color === 'primary' ? 'bg-primary-50' :
                s.color === 'accent' ? 'bg-accent-50' : 'bg-amber-50'
              }`}>
                <s.icon className={`w-5 h-5 ${
                  s.color === 'primary' ? 'text-primary-600' :
                  s.color === 'accent' ? 'text-accent-600' : 'text-amber-600'
                }`} />
              </div>
              <p className="font-sans font-extrabold text-2xl text-ink-900">{s.value}</p>
              <p className="text-sm text-ink-500 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly Earnings */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-card border border-ink-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <h2 className="font-sans font-bold text-lg text-ink-900">Weekly Earnings</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyEarnings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                <Bar dataKey="earnings" fill="#33a0ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly Bookings */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-card border border-ink-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-accent-600" />
              <h2 className="font-sans font-bold text-lg text-ink-900">Monthly Bookings</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyBookings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Rating Distribution + Today's Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-card border border-ink-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="font-sans font-bold text-lg text-ink-900">Customer Ratings</h2>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={ratingDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {ratingDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-3 mt-2 flex-wrap">
              {ratingDistribution.map(r => (
                <div key={r.name} className="flex items-center gap-1.5 text-xs">
                  <span className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                  {r.name}: {r.value}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Today's Bookings */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-ink-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sans font-bold text-lg text-ink-900">Today's Bookings</h2>
              <Link to="/my-bookings" className="text-sm text-primary-600 font-semibold hover:underline">View all</Link>
            </div>
            {todayBookings.length > 0 ? (
              <div className="space-y-3">
                {todayBookings.map(booking => {
                  const st = statusConfig[booking.status];
                  return (
                    <div key={booking.id} className="flex items-center gap-3 p-3 rounded-xl border border-ink-100 hover:border-primary-200 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                        <ServiceIcon name={booking.serviceIcon} className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-ink-900">{booking.serviceName}</p>
                        <p className="text-xs text-ink-500">{booking.date} • {booking.time} • {booking.address.split(',')[0]}</p>
                      </div>
                      <span className={`badge ${st.bg} ${st.color} text-xs`}>{st.label}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10">
                <Briefcase className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <p className="text-ink-500">No bookings scheduled for today</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
