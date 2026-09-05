import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Menu, X, ChevronDown, User, Bell, LogOut, LayoutDashboard,
  Calendar, Home, Info, Mail, Wrench, Sparkles, Zap, Wind, Refrigerator,
  Scissors, GraduationCap, Dumbbell, Camera, Hammer, PaintRoller,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { notifications as mockNotifications } from '@/data/mockData';
import { gsap } from '@/animations/gsap';

function ProfileAvatar({ name, avatar, size = 'sm' }: { name: string; avatar?: string; size?: 'sm' | 'lg' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'U';
  const sizeClass = size === 'lg' ? 'w-12 h-12 rounded-xl text-base' : 'w-8 h-8 rounded-lg text-xs';

  if (!avatar || imageFailed) {
    return (
      <span className={`${sizeClass} inline-flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold`}>
        {initials}
      </span>
    );
  }

  return (
    <img
      src={avatar}
      alt={name}
      onError={() => setImageFailed(true)}
      className={`${sizeClass} object-cover`}
    />
  );
}

const megaMenu = {
  home: [
    { name: 'AC Repair', slug: 'ac-repair', icon: Wind, desc: 'Cooling, gas refill, servicing' },
    { name: 'Plumbing', slug: 'plumbing', icon: Wrench, desc: 'Leaks, fittings, installations' },
    { name: 'Electrician', slug: 'electrician', icon: Zap, desc: 'Wiring, repairs, safety' },
    { name: 'Home Cleaning', slug: 'home-cleaning', icon: Sparkles, desc: 'Deep & regular cleaning' },
    { name: 'Appliance Repair', slug: 'appliance-repair', icon: Refrigerator, desc: 'Fridge, washer, microwave' },
  ],
  personal: [
    { name: 'Salon', slug: 'salon', icon: Scissors, desc: 'Hair, skin, beauty at home' },
    { name: 'Tutor', slug: 'tutor', icon: GraduationCap, desc: 'Academic & skill tutoring' },
    { name: 'Fitness', slug: 'fitness', icon: Dumbbell, desc: 'Personal training at home' },
    { name: 'Photography', slug: 'photography', icon: Camera, desc: 'Events, portraits, products' },
    { name: 'Carpentry', slug: 'carpentry', icon: Hammer, desc: 'Furniture repair & assembly' },
    { name: 'Painting', slug: 'painting', icon: PaintRoller, desc: 'Interior & exterior painting' },
  ],
};

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services', hasMega: true },
  { label: 'Professionals', path: '/professionals' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const navRef = useRef<HTMLElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setNotifOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  const handleMegaEnter = () => {
    clearTimeout(megaTimeout.current!);
    setMegaOpen(true);
  };
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) navigate(`/services?q=${encodeURIComponent(searchValue)}`);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-soft' : 'bg-transparent'
        }`}
      >
        <div className="container-page">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-soft">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="font-sans font-extrabold text-xl tracking-tight text-ink-900">
                Servi<span className="text-primary-600">Go</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  onMouseEnter={link.hasMega ? handleMegaEnter : undefined}
                  onMouseLeave={link.hasMega ? handleMegaLeave : undefined}
                  className="relative"
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                      isActive(link.path)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
                    }`}
                  >
                    {link.label}
                    {link.hasMega && <ChevronDown className="w-3.5 h-3.5" />}
                  </Link>
                </div>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search (desktop) */}
              <form onSubmit={handleSearch} className="hidden md:flex relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search services..."
                  className="w-44 lg:w-56 pl-9 pr-3 py-2 text-sm rounded-lg bg-ink-100 border border-transparent focus:bg-white focus:border-primary-300 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
              </form>

              {user ? (
                <>
                  {/* Notifications */}
                  <div className="relative">
                    <button
                      onClick={() => setNotifOpen(!notifOpen)}
                      className="relative p-2 rounded-lg text-ink-600 hover:bg-ink-100 transition-colors"
                    >
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full ring-2 ring-white" />
                    </button>
                    <AnimatePresence>
                      {notifOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-elevated border border-ink-100 z-50 overflow-hidden"
                          >
                            <div className="px-4 py-3 border-b border-ink-100">
                              <h3 className="font-sans font-bold text-ink-900">Notifications</h3>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                              {mockNotifications.map((n) => (
                                <div
                                  key={n.id}
                                  className={`px-4 py-3 border-b border-ink-50 hover:bg-ink-50 cursor-pointer transition-colors ${
                                    !n.read ? 'bg-primary-50/40' : ''
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    {!n.read && <span className="w-2 h-2 bg-primary-500 rounded-full mt-1.5 shrink-0" />}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-semibold text-ink-900">{n.title}</p>
                                      <p className="text-xs text-ink-500 mt-0.5">{n.message}</p>
                                      <p className="text-xs text-ink-400 mt-1">{n.createdAt}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Profile */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 p-1 rounded-lg hover:bg-ink-100 transition-colors"
                    >
                      <ProfileAvatar name={user.name} avatar={user.avatar} />
                      <span className="hidden sm:block text-sm font-semibold text-ink-700">{user.name.split(' ')[0]}</span>
                    </button>
                    <AnimatePresence>
                      {profileOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-elevated border border-ink-100 z-50 overflow-hidden"
                          >
                            <div className="px-4 py-3 border-b border-ink-100">
                              <div className="flex items-center gap-3">
                                <ProfileAvatar name={user.name} avatar={user.avatar} size="lg" />
                                <div className="min-w-0">
                                  <p className="text-sm font-bold text-ink-900 truncate">{user.name}</p>
                                  <p className="text-xs text-ink-500 truncate">{user.email}</p>
                                </div>
                              </div>
                            </div>
                            <div className="py-1">
                              <Link to="/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-700 hover:bg-ink-50 transition-colors">
                                <LayoutDashboard className="w-4 h-4 text-ink-400" /> Dashboard
                              </Link>
                              <Link to="/my-bookings" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-700 hover:bg-ink-50 transition-colors">
                                <Calendar className="w-4 h-4 text-ink-400" /> My Bookings
                              </Link>
                              <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-error-600 hover:bg-error-50 transition-colors">
                                <LogOut className="w-4 h-4" /> Logout
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login" className="btn-ghost text-sm">Login</Link>
                  <Link to="/register" className="btn-primary text-sm">Get Started</Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-ink-600 hover:bg-ink-100 transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              ref={megaRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleMegaLeave}
              className="hidden lg:block absolute top-full left-0 right-0 glass shadow-elevated border-t border-ink-100"
            >
              <div className="container-page py-8">
                <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-4">Home Services</h4>
                    <div className="space-y-1">
                      {megaMenu.home.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/services?category=${item.slug}`}
                          className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/60 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
                            <item.icon className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-ink-900">{item.name}</p>
                            <p className="text-xs text-ink-500">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-4">Personal Services</h4>
                    <div className="space-y-1">
                      {megaMenu.personal.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/services?category=${item.slug}`}
                          className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/60 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center shrink-0 group-hover:bg-accent-100 transition-colors">
                            <item.icon className="w-5 h-5 text-accent-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-ink-900">{item.name}</p>
                            <p className="text-xs text-ink-500">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-elevated overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-sans font-extrabold text-lg">Menu</span>
                  <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-ink-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSearch} className="relative mb-4">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search services..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg bg-ink-100 focus:bg-white focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                </form>

                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                        isActive(link.path) ? 'text-primary-600 bg-primary-50' : 'text-ink-700 hover:bg-ink-100'
                      }`}
                    >
                      {link.path === '/' && <Home className="w-4 h-4" />}
                      {link.path === '/services' && <Sparkles className="w-4 h-4" />}
                      {link.path === '/professionals' && <User className="w-4 h-4" />}
                      {link.path === '/about' && <Info className="w-4 h-4" />}
                      {link.path === '/contact' && <Mail className="w-4 h-4" />}
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-ink-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-3">Categories</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[...megaMenu.home, ...megaMenu.personal].map((item) => (
                      <Link
                        key={item.slug}
                        to={`/services?category=${item.slug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-700 hover:bg-ink-100 transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-primary-500" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-ink-100">
                  {user ? (
                    <>
                      <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-ink-700 hover:bg-ink-100">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link to="/my-bookings" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-ink-700 hover:bg-ink-100">
                        <Calendar className="w-4 h-4" /> My Bookings
                      </Link>
                      <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-error-600 hover:bg-error-50">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link to="/login" className="btn-secondary w-full">Login</Link>
                      <Link to="/register" className="btn-primary w-full">Get Started</Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
