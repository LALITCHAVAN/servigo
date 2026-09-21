import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  DollarSign,
  Star,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
  MapPin,
  Radio,
  Navigation,
  Loader2,
} from 'lucide-react';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { useBookings } from '@/hooks/useData';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { LiveLocationMap } from '@/components/location/LiveLocationMap';
import {
  connectSocket,
  disconnectSocket,
} from '@/services/socket';

import { fadeUp } from '@/animations/variants';
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
  {
    name: '5 Star',
    value: 320,
    color: '#10b981',
  },
  {
    name: '4 Star',
    value: 45,
    color: '#33a0ff',
  },
  {
    name: '3 Star',
    value: 12,
    color: '#f59e0b',
  },
  {
    name: '1-2 Star',
    value: 3,
    color: '#ef4444',
  },
];

const statusConfig: Record<
  string,
  {
    color: string;
    bg: string;
    label: string;
  }
> = {
  pending: {
    color: 'text-amber-700',
    bg: 'bg-amber-100',
    label: 'Pending',
  },

  confirmed: {
    color: 'text-primary-700',
    bg: 'bg-primary-100',
    label: 'Confirmed',
  },

  on_the_way: {
    color: 'text-indigo-700',
    bg: 'bg-indigo-100',
    label: 'On The Way',
  },

  in_progress: {
    color: 'text-blue-700',
    bg: 'bg-blue-100',
    label: 'In Progress',
  },

  completed: {
    color: 'text-accent-700',
    bg: 'bg-accent-100',
    label: 'Completed',
  },

  cancelled: {
    color: 'text-error-700',
    bg: 'bg-error-100',
    label: 'Cancelled',
  },
};

interface LiveLocation {
  bookingId: string;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  lastUpdated: string | Date | null;
}

export function ProfessionalDashboardPage() {
  const { user } = useAuth();

  const { data: bookings } =
    useBookings(user?.id);

  const ref =
    useGsapReveal<HTMLDivElement>({
      stagger: 0.08,
    });

  // ==========================================
  // LIVE LOCATION STATE
  // ==========================================

  const [liveLocations, setLiveLocations] =
    useState<Record<string, LiveLocation>>({});

  const [liveAddresses, setLiveAddresses] =
    useState<Record<string, string>>({});

  const [addressLoading, setAddressLoading] =
    useState<Record<string, boolean>>({});

  const [locationErrors, setLocationErrors] =
    useState<Record<string, string>>({});

  const geocodedLocationsRef =
    useRef<
      Record<
        string,
        {
          latitude: number;
          longitude: number;
        }
      >
    >({});

  // ==========================================
  // AUTH
  // ==========================================

  if (!user) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold text-ink-900">
          Please log in
        </h1>

        <Link
          to="/login"
          className="btn-primary mt-4"
        >
          Login
        </Link>
      </div>
    );
  }

  // ==========================================
  // BOOKINGS
  // ==========================================

  const userBookings = bookings || [];

  const todayBookings =
    userBookings.filter(
      (b) =>
        b.status === 'confirmed' ||
        b.status === 'in_progress' ||
        b.status === 'on_the_way'
    );

  const upcomingJobs =
    userBookings.filter(
      (b) => b.status === 'confirmed'
    );

  const completedJobs =
    userBookings.filter(
      (b) => b.status === 'completed'
    );

  const totalEarnings =
    completedJobs.reduce(
      (sum, b) => sum + b.price,
      0
    );

  // ==========================================
  // REVERSE GEOCODING
  // ==========================================

  const getAddressFromCoordinates = async (
    bookingId: string,
    latitude: number,
    longitude: number
  ) => {
    const previous =
      geocodedLocationsRef.current[
        bookingId
      ];

    if (previous) {
      const latDifference = Math.abs(
        previous.latitude - latitude
      );

      const lngDifference = Math.abs(
        previous.longitude - longitude
      );

      // Avoid unnecessary API calls for tiny movement.
      if (
        latDifference < 0.0005 &&
        lngDifference < 0.0005
      ) {
        return;
      }
    }

    geocodedLocationsRef.current[
      bookingId
    ] = {
      latitude,
      longitude,
    };

    setAddressLoading((prev) => ({
      ...prev,
      [bookingId]: true,
    }));

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          'Unable to get address'
        );
      }

      const data =
        await response.json();

      if (data?.display_name) {
        setLiveAddresses((prev) => ({
          ...prev,
          [bookingId]:
            data.display_name,
        }));
      } else {
        setLiveAddresses((prev) => ({
          ...prev,
          [bookingId]:
            'Address not available',
        }));
      }
    } catch (error) {
      console.error(
        'PROFESSIONAL REVERSE GEOCODING ERROR:',
        error
      );

      setLiveAddresses((prev) => ({
        ...prev,
        [bookingId]:
          'Unable to determine current address',
      }));
    } finally {
      setAddressLoading((prev) => ({
        ...prev,
        [bookingId]: false,
      }));
    }
  };

  // ==========================================
  // SOCKET LISTENER
  // ==========================================

  useEffect(() => {
    if (!user) {
      return;
    }

    const liveBookings =
      todayBookings.filter(
        (booking) =>
          booking.status ===
            'confirmed' ||
          booking.status ===
            'on_the_way' ||
          booking.status ===
            'in_progress'
      );

    if (liveBookings.length === 0) {
      return;
    }

    let socket;

    try {
      socket = connectSocket();
    } catch (error) {
      console.error(
        'PROFESSIONAL SOCKET ERROR:',
        error
      );

      return;
    }

    const handleLocationUpdated = (
      data: LiveLocation
    ) => {
      if (
        !data?.bookingId ||
        !Number.isFinite(
          Number(data.latitude)
        ) ||
        !Number.isFinite(
          Number(data.longitude)
        )
      ) {
        return;
      }

      const bookingExists =
        liveBookings.some(
          (booking) =>
            String(booking.id) ===
            String(data.bookingId)
        );

      if (!bookingExists) {
        return;
      }

      const location: LiveLocation = {
        bookingId:
          String(data.bookingId),

        latitude:
          Number(data.latitude),

        longitude:
          Number(data.longitude),

        accuracy:
          data.accuracy != null
            ? Number(data.accuracy)
            : null,

        lastUpdated:
          data.lastUpdated || null,
      };

      setLiveLocations((prev) => ({
        ...prev,
        [String(data.bookingId)]:
          location,
      }));

      setLocationErrors((prev) => {
        const updated = {
          ...prev,
        };

        delete updated[
          String(data.bookingId)
        ];

        return updated;
      });

      getAddressFromCoordinates(
        String(data.bookingId),
        Number(data.latitude),
        Number(data.longitude)
      );
    };

    const handleLocationStopped = (data: {
      bookingId: string;
    }) => {
      if (!data?.bookingId) {
        return;
      }

      setLiveLocations((prev) => {
        const updated = {
          ...prev,
        };

        delete updated[
          String(data.bookingId)
        ];

        return updated;
      });

      setLiveAddresses((prev) => {
        const updated = {
          ...prev,
        };

        delete updated[
          String(data.bookingId)
        ];

        return updated;
      });

      delete geocodedLocationsRef.current[
        String(data.bookingId)
      ];
    };

    const handleLocationError = (data: {
      message?: string;
    }) => {
      console.error(
        'LOCATION SOCKET ERROR:',
        data?.message
      );
    };

    socket.on(
      'location:updated',
      handleLocationUpdated
    );

    socket.on(
      'location:stopped',
      handleLocationStopped
    );

    socket.on(
      'location:error',
      handleLocationError
    );

    // ==========================================
    // JOIN EVERY ASSIGNED BOOKING
    // ==========================================

    liveBookings.forEach((booking) => {
      socket.emit(
        'booking:join',
        booking.id
      );
    });

    return () => {
      socket.off(
        'location:updated',
        handleLocationUpdated
      );

      socket.off(
        'location:stopped',
        handleLocationStopped
      );

      socket.off(
        'location:error',
        handleLocationError
      );

      // Don't disconnect the global socket here.
      // It can be reused by other ServiGo pages.
    };
  }, [
    user,
    bookings,
  ]);

  // ==========================================
  // STAT CARDS
  // ==========================================

  const statCards = [
    {
      label: "Today's Bookings",
      value: todayBookings.length,
      icon: Calendar,
      color: 'primary',
    },

    {
      label: 'Upcoming Jobs',
      value: upcomingJobs.length,
      icon: Clock,
      color: 'amber',
    },

    {
      label: 'Total Earnings',
      value: `₹${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'accent',
    },

    {
      label: 'Completed Jobs',
      value: completedJobs.length,
      icon: CheckCircle,
      color: 'primary',
    },
  ];

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen bg-ink-50">

      <div className="container-page">

        {/* ==========================================
            HEADER
        ========================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">
            Professional Dashboard
          </h1>

          <p className="mt-2 text-ink-500">
            Manage your jobs, earnings, and performance.
          </p>
        </motion.div>

        {/* ==========================================
            STATS
        ========================================== */}

        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {statCards.map((s, i) => (
            <motion.div
              key={i}
              data-reveal
              className="bg-white rounded-2xl shadow-card border border-ink-100 p-5"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  s.color === 'primary'
                    ? 'bg-primary-50'
                    : s.color === 'accent'
                    ? 'bg-accent-50'
                    : 'bg-amber-50'
                }`}
              >
                <s.icon
                  className={`w-5 h-5 ${
                    s.color === 'primary'
                      ? 'text-primary-600'
                      : s.color === 'accent'
                      ? 'text-accent-600'
                      : 'text-amber-600'
                  }`}
                />
              </div>

              <p className="font-sans font-extrabold text-2xl text-ink-900">
                {s.value}
              </p>

              <p className="text-sm text-ink-500 mt-0.5">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ==========================================
            LIVE CUSTOMER LOCATIONS
        ========================================== */}

        {todayBookings.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">

              <div>
                <div className="flex items-center gap-2">

                  <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-primary-600" />
                  </div>

                  <h2 className="font-sans font-bold text-xl text-ink-900">
                    Customer Live Locations
                  </h2>

                </div>

                <p className="text-sm text-ink-500 mt-2">
                  Track the live location of customers
                  assigned to your bookings.
                </p>
              </div>

            </div>

            <div className="space-y-6">

              {todayBookings.map((booking) => {

                const liveLocation =
                  liveLocations[
                    booking.id
                  ];

                const liveAddress =
                  liveAddresses[
                    booking.id
                  ];

                const isAddressLoading =
                  addressLoading[
                    booking.id
                  ];

                return (
                  <div
                    key={`live-${booking.id}`}
                    className="bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden"
                  >

                    {/* BOOKING HEADER */}

                    <div className="p-5 border-b border-ink-100">

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">

                            <ServiceIcon
                              name={
                                booking.serviceIcon
                              }
                              className="w-5 h-5 text-primary-600"
                            />

                          </div>

                          <div>

                            <p className="font-bold text-ink-900">
                              {booking.serviceName}
                            </p>

                            <p className="text-sm text-ink-500">
                              Customer:{' '}
                              {booking.customerName ||
                                'Customer'}
                            </p>

                          </div>

                        </div>

                        <div className="flex items-center gap-2">

                          <span
                            className={`badge ${
                              statusConfig[
                                booking.status
                              ]?.bg ||
                              'bg-ink-100'
                            } ${
                              statusConfig[
                                booking.status
                              ]?.color ||
                              'text-ink-700'
                            } text-xs`}
                          >
                            {statusConfig[
                              booking.status
                            ]?.label ||
                              booking.status}
                          </span>

                          {liveLocation && (
                            <span className="flex items-center gap-1.5 text-xs font-semibold text-accent-600">

                              <span className="relative flex h-2.5 w-2.5">

                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />

                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-500" />

                              </span>

                              Live

                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                    {/* ==========================================
                        MAP
                    ========================================== */}

                    {liveLocation ? (

                      <div>

                        <LiveLocationMap
                          latitude={
                            liveLocation.latitude
                          }
                          longitude={
                            liveLocation.longitude
                          }
                          accuracy={
                            liveLocation.accuracy
                          }
                          customerName={
                            booking.customerName ||
                            'Customer'
                          }
                        />

                        {/* ==========================================
                            LOCATION INFORMATION
                        ========================================== */}

                        <div className="p-5">

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* ADDRESS */}

                            <div className="rounded-xl bg-ink-50 p-4">

                              <div className="flex items-start gap-3">

                                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">

                                  <MapPin className="w-4 h-4 text-primary-600" />

                                </div>

                                <div className="min-w-0">

                                  <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide">
                                    Current Address
                                  </p>

                                  {isAddressLoading ? (

                                    <div className="flex items-center gap-2 mt-1">

                                      <Loader2 className="w-3.5 h-3.5 animate-spin text-primary-600" />

                                      <p className="text-sm text-ink-500">
                                        Finding current address...
                                      </p>

                                    </div>

                                  ) : (

                                    <p className="text-sm font-semibold text-ink-900 mt-1 leading-relaxed">
                                      {liveAddress ||
                                        'Address not available'}
                                    </p>

                                  )}

                                </div>

                              </div>

                            </div>

                            {/* GPS */}

                            <div className="rounded-xl bg-ink-50 p-4">

                              <div className="flex items-start gap-3">

                                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">

                                  <Radio className="w-4 h-4 text-accent-600" />

                                </div>

                                <div className="min-w-0 flex-1">

                                  <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide">
                                    GPS Location
                                  </p>

                                  <div className="mt-1 space-y-1">

                                    <div className="flex justify-between gap-3 text-xs">

                                      <span className="text-ink-500">
                                        Latitude
                                      </span>

                                      <span className="font-mono font-semibold text-ink-900">
                                        {liveLocation.latitude.toFixed(
                                          6
                                        )}
                                      </span>

                                    </div>

                                    <div className="flex justify-between gap-3 text-xs">

                                      <span className="text-ink-500">
                                        Longitude
                                      </span>

                                      <span className="font-mono font-semibold text-ink-900">
                                        {liveLocation.longitude.toFixed(
                                          6
                                        )}
                                      </span>

                                    </div>

                                    <div className="flex justify-between gap-3 text-xs">

                                      <span className="text-ink-500">
                                        Accuracy
                                      </span>

                                      <span className="font-mono font-semibold text-ink-900">

                                        {liveLocation.accuracy !=
                                        null
                                          ? `±${Math.round(
                                              liveLocation.accuracy
                                            )}m`
                                          : 'N/A'}

                                      </span>

                                    </div>

                                  </div>

                                </div>

                              </div>

                            </div>

                          </div>

                          {/* SERVICE ADDRESS */}

                          <div className="mt-4 rounded-xl border border-ink-100 p-4">

                            <div className="flex items-start gap-3">

                              <MapPin className="w-4 h-4 text-ink-400 mt-0.5 shrink-0" />

                              <div>

                                <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide">
                                  Service Address
                                </p>

                                <p className="text-sm text-ink-900 mt-1">
                                  {booking.address ||
                                    'No service address'}
                                </p>

                              </div>

                            </div>

                          </div>

                          {/* LAST UPDATE */}

                          {liveLocation.lastUpdated && (
                            <p className="text-xs text-ink-400 mt-3 text-right">

                              Last location update:{' '}

                              {new Date(
                                liveLocation.lastUpdated
                              ).toLocaleTimeString(
                                [],
                                {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                }
                              )}

                            </p>
                          )}

                        </div>

                      </div>

                    ) : (

                      /* ==========================================
                         WAITING FOR CUSTOMER LOCATION
                      ========================================== */

                      <div className="p-8 text-center">

                        <div className="w-14 h-14 rounded-2xl bg-ink-50 flex items-center justify-center mx-auto mb-4">

                          <MapPin className="w-7 h-7 text-ink-300" />

                        </div>

                        <h3 className="font-semibold text-ink-900">
                          Waiting for customer location
                        </h3>

                        <p className="text-sm text-ink-500 mt-1 max-w-md mx-auto">
                          The customer has not started
                          sharing their live location yet.
                          The map will appear automatically
                          when location sharing starts.
                        </p>

                      </div>

                    )}

                  </div>
                );
              })}

            </div>
          </motion.div>
        )}

        {/* ==========================================
            CHARTS
        ========================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Weekly Earnings */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-card border border-ink-100 p-6"
          >

            <div className="flex items-center gap-2 mb-4">

              <TrendingUp className="w-5 h-5 text-primary-600" />

              <h2 className="font-sans font-bold text-lg text-ink-900">
                Weekly Earnings
              </h2>

            </div>

            <ResponsiveContainer
              width="100%"
              height={250}
            >

              <BarChart data={weeklyEarnings}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="day"
                  tick={{
                    fontSize: 12,
                    fill: '#64748b',
                  }}
                />

                <YAxis
                  tick={{
                    fontSize: 12,
                    fill: '#64748b',
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border:
                      '1px solid #e2e8f0',
                    fontSize: '13px',
                  }}
                />

                <Bar
                  dataKey="earnings"
                  fill="#33a0ff"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </motion.div>

          {/* Monthly Bookings */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-card border border-ink-100 p-6"
          >

            <div className="flex items-center gap-2 mb-4">

              <Activity className="w-5 h-5 text-accent-600" />

              <h2 className="font-sans font-bold text-lg text-ink-900">
                Monthly Bookings
              </h2>

            </div>

            <ResponsiveContainer
              width="100%"
              height={250}
            >

              <LineChart data={monthlyBookings}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 12,
                    fill: '#64748b',
                  }}
                />

                <YAxis
                  tick={{
                    fontSize: 12,
                    fill: '#64748b',
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border:
                      '1px solid #e2e8f0',
                    fontSize: '13px',
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </motion.div>

        </div>

        {/* ==========================================
            RATING + TODAY'S BOOKINGS
        ========================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Ratings */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-card border border-ink-100 p-6"
          >

            <div className="flex items-center gap-2 mb-4">

              <Star className="w-5 h-5 text-amber-500" />

              <h2 className="font-sans font-bold text-lg text-ink-900">
                Customer Ratings
              </h2>

            </div>

            <ResponsiveContainer
              width="100%"
              height={200}
            >

              <PieChart>

                <Pie
                  data={ratingDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >

                  {ratingDistribution.map(
                    (entry, i) => (
                      <Cell
                        key={i}
                        fill={entry.color}
                      />
                    )
                  )}

                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border:
                      '1px solid #e2e8f0',
                    fontSize: '13px',
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

            <div className="flex justify-center gap-3 mt-2 flex-wrap">

              {ratingDistribution.map(
                (r) => (
                  <div
                    key={r.name}
                    className="flex items-center gap-1.5 text-xs"
                  >

                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        background:
                          r.color,
                      }}
                    />

                    {r.name}: {r.value}

                  </div>
                )
              )}

            </div>

          </motion.div>

          {/* Today's Bookings */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-ink-100 p-6"
          >

            <div className="flex items-center justify-between mb-4">

              <h2 className="font-sans font-bold text-lg text-ink-900">
                Today's Bookings
              </h2>

              <Link
                to="/my-bookings"
                className="text-sm text-primary-600 font-semibold hover:underline"
              >
                View all
              </Link>

            </div>

            {todayBookings.length > 0 ? (

              <div className="space-y-3">

                {todayBookings.map(
                  (booking) => {

                    const st =
                      statusConfig[
                        booking.status
                      ];

                    return (
                      <div
                        key={booking.id}
                        className="flex items-center gap-3 p-3 rounded-xl border border-ink-100 hover:border-primary-200 transition-colors"
                      >

                        <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">

                          <ServiceIcon
                            name={
                              booking.serviceIcon
                            }
                            className="w-5 h-5 text-primary-600"
                          />

                        </div>

                        <div className="flex-1 min-w-0">

                          <p className="font-semibold text-sm text-ink-900">
                            {booking.serviceName}
                          </p>

                          <p className="text-xs text-ink-500">

                            {booking.date} •{' '}
                            {booking.time} •{' '}

                            {booking.address
                              ? booking.address.split(
                                  ','
                                )[0]
                              : 'No address'}

                          </p>

                        </div>

                        <span
                          className={`badge ${st?.bg || 'bg-ink-100'} ${st?.color || 'text-ink-700'} text-xs`}
                        >
                          {st?.label ||
                            booking.status}
                        </span>

                      </div>
                    );
                  }
                )}

              </div>

            ) : (

              <div className="text-center py-10">

                <Briefcase className="w-12 h-12 text-ink-300 mx-auto mb-3" />

                <p className="text-ink-500">
                  No bookings scheduled for today
                </p>

              </div>

            )}

          </motion.div>

        </div>

      </div>

    </div>
  );
}