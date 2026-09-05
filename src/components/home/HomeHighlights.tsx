import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Professional, Service } from '@/types';

interface HomeHighlightsProps {
  services: Service[];
  professionals: Professional[];
}

export function HomeHighlights({ services, professionals }: HomeHighlightsProps) {
  const onlineProfessionals = professionals.filter((professional) => professional.online).length;
  const stats = [
    { value: services.length ? `${services.length}+` : '10+', label: 'Services ready', icon: Sparkles },
    { value: professionals.length ? `${professionals.length}+` : '100+', label: 'Verified experts', icon: Users },
    { value: '4.8/5', label: 'Average rating', icon: BadgeCheck },
    { value: '30 min', label: 'Fast response', icon: Clock3 },
  ];

  return (
    <section className="relative z-10 -mt-2 pb-5 lg:-mt-4 lg:pb-8">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-ink-100 bg-white px-5 py-6 shadow-elevated sm:px-8 lg:px-10 lg:py-8">
          <div className="absolute -right-24 -top-28 h-64 w-64 rounded-full bg-primary-100/70 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-accent-100/70 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-sm">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
                <ShieldCheck className="h-3.5 w-3.5 text-accent-600" />
                Trusted by local communities
              </div>
              <h2 className="font-sans text-2xl font-extrabold leading-tight text-ink-900 lg:text-3xl">
                Everything you need, one reliable tap away.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Compare skilled professionals, transparent pricing, and convenient doorstep service.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[560px]">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-ink-100 bg-ink-50/70 p-4 backdrop-blur-sm"
                >
                  <stat.icon className="mb-4 h-5 w-5 text-primary-600" />
                  <p className="font-sans text-xl font-extrabold text-ink-900">{stat.value}</p>
                  <p className="mt-1 text-xs text-ink-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative mt-5 flex flex-col gap-3 border-t border-ink-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm text-ink-500">
              <div className="flex -space-x-2">
                {professionals.slice(0, 4).map((professional) => (
                  <img
                    key={professional.id}
                    src={professional.avatar}
                    alt={professional.name}
                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <span>
                <strong className="text-ink-900">{onlineProfessionals || 4} experts</strong> online near you
              </span>
              <MapPin className="hidden h-4 w-4 text-accent-600 sm:block" />
            </div>

            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-primary-700"
            >
              Explore services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
