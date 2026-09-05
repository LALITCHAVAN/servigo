import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, Briefcase, Calendar, DollarSign, AlertCircle, XCircle,
  TrendingUp, Activity, Star, CheckCircle, ArrowRight,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useServices, useProfessionals, useBookings } from '@/hooks/useData';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { fadeUp } from '@/animations/variants';
import { useGsapReveal } from '@/animations/gsap';
import { useAuth } from '@/context/AuthContext';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 68000 },
  { month: 'Apr', revenue: 75000 },
  { month: 'May', revenue: 82000 },
  { month: 'Jun', revenue: 95000 },
  { month: 'Jul', revenue: 110000 },
  { month: 'Aug', revenue: 125000 },
];

const bookingStatusData = [
  { name: 'Completed', value: 320, color: '#10b981' },
  { name: 'Confirmed', value: 85, color: '#33a0ff' },
  { name: 'Pending', value: 42, color: '#f59e0b' },
  { name: 'Cancelled', value: 28, color: '#ef4444' },
];

const topServices = [
  { name: 'AC Repair', bookings: 3200 },
  { name: 'Salon', bookings: 2800 },
  { name: 'Cleaning', bookings: 2100 },
  { name: 'Electrician', bookings: 1800 },
  { name: 'Plumbing', bookings: 1500 },
];

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  pending: { color: 'text-amber-700', bg: 'bg-amber-100', label: 'Pending' },
  confirmed: { color: 'text-primary-700', bg: 'bg-primary-100', label: 'Confirmed' },
  completed: { color: 'text-accent-700', bg: 'bg-accent-100', label: 'Completed' },
  cancelled: { color: 'text-error-700', bg: 'bg-error-100', label: 'Cancelled' },
};

export function AdminDashboardPage() {
  const { user } = useAuth();
  const { data: services } = useServices();
  const { data: professionals } = useProfessionals();
  const { data: bookings } = useBookings(user?.id);
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.08 });

  if (!user) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold text-ink-900">Admin access required</h1>
        <Link to="/login" className="btn-primary mt-4">Login</Link>
      </div>
    );
  }

  const userBookings = bookings || [];
  const completedRevenue = userBookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0);

  const statCards = [
    { label: 'Total Users', value: '1,240', icon: Users, color: 'primary' },
    { label: 'Total Professionals', value: (professionals || []).length, icon: Briefcase, color: 'accent' },
    { label: 'Total Bookings', value: userBookings.length, icon: Calendar, color: 'amber' },
    { label: 'Total Revenue', value: `₹${completedRevenue.toLocaleString()}`, icon: DollarSign, color: 'accent' },
    { label: 'Pending Verification', value: '8', icon: AlertCircle, color: 'amber' },
    { label: 'Cancelled Bookings', value: userBookings.filter(b => b.status === 'cancelled').length, icon: XCircle, color: 'error' },
  ];

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen bg-ink-50">
      <div className="container-page">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
          <h1 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">Admin Dashboard</h1>
          <p className="mt-2 text-ink-500">Platform overview and analytics.</p>
        </motion.div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div key={i} data-reveal className="bg-white rounded-2xl shadow-card border border-ink-100 p-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${
                s.color === 'primary' ? 'bg-primary-50' :
                s.color === 'accent' ? 'bg-accent-50' :
                s.color === 'amber' ? 'bg-amber-50' : 'bg-error-50'
              }`}>
                <s.icon className={`w-4 h-4 ${
                  s.color === 'primary' ? 'text-primary-600' :
                  s.color === 'accent' ? 'text-accent-600' :
                  s.color === 'amber' ? 'text-amber-600' : 'text-error-600'
                }`} />
              </div>
              <p className="font-sans font-extrabold text-xl text-ink-900">{s.value}</p>
              <p className="text-xs text-ink-500 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue Chart */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-card border border-ink-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <h2 className="font-sans font-bold text-lg text-ink-900">Revenue Growth</h2>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#33a0ff" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#33a0ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <Area type="monotone" dataKey="revenue" stroke="#33a0ff" strokeWidth={3} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Booking Status */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-card border border-ink-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-accent-600" />
              <h2 className="font-sans font-bold text-lg text-ink-900">Booking Status</h2>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={bookingStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {bookingStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-3 mt-2 flex-wrap">
              {bookingStatusData.map(r => (
                <div key={r.name} className="flex items-center gap-1.5 text-xs">
                  <span className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                  {r.name}: {r.value}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Services */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-card border border-ink-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="font-sans font-bold text-lg text-ink-900">Top Services</h2>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topServices} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} width={80} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                <Bar dataKey="bookings" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Bookings Table */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-card border border-ink-100 p-6">
          <h2 className="font-sans font-bold text-lg text-ink-900 mb-4">Recent Bookings</h2>
          {userBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-100">
                    <th className="text-left py-3 px-2 font-semibold text-ink-700">Service</th>
                    <th className="text-left py-3 px-2 font-semibold text-ink-700">Professional</th>
                    <th className="text-left py-3 px-2 font-semibold text-ink-700">Date</th>
                    <th className="text-left py-3 px-2 font-semibold text-ink-700">Price</th>
                    <th className="text-left py-3 px-2 font-semibold text-ink-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userBookings.slice(0, 8).map(booking => {
                    const st = statusConfig[booking.status] || statusConfig.pending;
                    return (
                      <tr key={booking.id} className="border-b border-ink-50 hover:bg-ink-50 transition-colors">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                              <ServiceIcon name={booking.serviceIcon} className="w-4 h-4 text-primary-600" />
                            </div>
                            <span className="font-medium text-ink-900">{booking.serviceName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-ink-600">{booking.professionalName}</td>
                        <td className="py-3 px-2 text-ink-600">{booking.date}</td>
                        <td className="py-3 px-2 font-semibold text-ink-900">₹{booking.price}</td>
                        <td className="py-3 px-2"><span className={`badge ${st.bg} ${st.color}`}>{st.label}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <CheckCircle className="w-12 h-12 text-ink-300 mx-auto mb-3" />
              <p className="text-ink-500">No bookings to display</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
