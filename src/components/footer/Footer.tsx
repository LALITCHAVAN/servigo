import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wrench, Instagram, Linkedin, Twitter, Github, Mail, Phone, MapPin,
  ArrowRight,
} from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About', path: '/about' },
    { label: 'Careers', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Blog', path: '/about' },
  ],
  Services: [
    { label: 'AC Repair', path: '/services?category=ac-repair' },
    { label: 'Plumbing', path: '/services?category=plumbing' },
    { label: 'Electrician', path: '/services?category=electrician' },
    { label: 'Cleaning', path: '/services?category=home-cleaning' },
    { label: 'Appliance Repair', path: '/services?category=appliance-repair' },
  ],
  Support: [
    { label: 'Help Center', path: '/contact' },
    { label: 'FAQs', path: '/contact' },
    { label: 'Terms', path: '/about' },
    { label: 'Privacy', path: '/about' },
  ],
};

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300 mt-20">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="font-sans font-extrabold text-xl text-white">
                Servi<span className="text-primary-400">Go</span>
              </span>
            </Link>
            <p className="text-sm text-ink-400 max-w-sm leading-relaxed">
              Trusted Services, Right at Your Doorstep. Find verified professionals, compare prices, and book reliable services in just a few clicks.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-ink-400 hover:text-white hover:bg-primary-600 hover:border-primary-600 transition-all duration-300"
                >
                  <s.icon className="w-4.5 h-4.5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-sans font-bold text-white text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="group inline-flex items-center gap-1 text-sm text-ink-400 hover:text-white transition-colors"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2.5 text-sm text-ink-400">
            <Mail className="w-4 h-4 text-primary-400" />
            hello@servigo.com
          </div>
          <div className="flex items-center gap-2.5 text-sm text-ink-400">
            <Phone className="w-4 h-4 text-primary-400" />
            +91 98765 43210
          </div>
          <div className="flex items-center gap-2.5 text-sm text-ink-400">
            <MapPin className="w-4 h-4 text-primary-400" />
            Pune, Maharashtra, India
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-500">© 2026 ServiGo. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-ink-500">
            <Link to="/about" className="hover:text-ink-300 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-ink-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
