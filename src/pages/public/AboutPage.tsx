import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Wrench, TrendingUp, Award } from 'lucide-react';
import { useGsapReveal, useGsapCounter } from '@/animations/gsap';
import { staggerContainer, fadeUp } from '@/animations/variants';

export function AboutPage() {
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });
  const counter1 = useGsapCounter(10000, { suffix: '+' });
  const counter2 = useGsapCounter(500, { suffix: '+' });
  const counter3 = useGsapCounter(50, { suffix: 'K+' });
  const counter4 = useGsapCounter(4, { suffix: '.8★' });

  const values = [
    { icon: Heart, title: 'Customer First', desc: 'Every decision starts with what\'s best for our customers.' },
    { icon: Award, title: 'Quality Excellence', desc: 'We never compromise on the quality of our professionals.' },
    { icon: Users, title: 'Community Driven', desc: 'We empower local professionals to grow their businesses.' },
    { icon: TrendingUp, title: 'Continuous Growth', desc: 'We constantly evolve to serve you better.' },
  ];

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen">
      <div className="container-page">
        {/* Hero */}
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-16">
          <span data-reveal className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold uppercase tracking-wider mb-4">
            About ServiGo
          </span>
          <h1 data-reveal className="font-sans font-extrabold text-4xl lg:text-5xl text-ink-900 leading-tight text-balance">
            Connecting communities with <span className="gradient-text">trusted professionals</span>
          </h1>
          <p data-reveal className="mt-5 text-lg text-ink-500 leading-relaxed">
            ServiGo was born from a simple idea: finding reliable home and personal services shouldn't be hard.
            We're building India's most trusted service marketplace, one booking at a time.
          </p>
        </div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { ref: counter1, label: 'Bookings Completed' },
            { ref: counter2, label: 'Verified Pros' },
            { ref: counter3, label: 'Happy Customers' },
            { ref: counter4, label: 'Avg Rating' },
          ].map((s, i) => (
            <div key={i} data-reveal className="bg-white rounded-2xl shadow-card border border-ink-100 p-6 text-center">
              <p ref={s.ref} className="font-sans font-extrabold text-3xl text-primary-600">0</p>
              <p className="text-sm text-ink-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission / Vision */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div data-reveal variants={fadeUp} initial="hidden" animate="visible" className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-8">
            <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-sans font-bold text-xl text-ink-900 mb-2">Our Mission</h3>
            <p className="text-ink-600 leading-relaxed">
              To make quality home and personal services accessible, affordable, and reliable for every household in India — while empowering skilled professionals to build sustainable livelihoods.
            </p>
          </motion.div>
          <motion.div data-reveal variants={fadeUp} initial="hidden" animate="visible" className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 p-8">
            <div className="w-12 h-12 rounded-xl bg-accent-600 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-sans font-bold text-xl text-ink-900 mb-2">Our Vision</h3>
            <p className="text-ink-600 leading-relaxed">
              To become India's most trusted platform for local services, where every customer finds the right professional in minutes, and every professional finds meaningful work.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div ref={ref} className="mb-16">
          <h2 data-reveal className="font-sans font-extrabold text-3xl text-ink-900 text-center mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <motion.div key={v.title} data-reveal variants={fadeUp} initial="hidden" animate="visible" whileHover={{ y: -6 }} className="bg-white rounded-2xl shadow-card border border-ink-100 p-6">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-sans font-bold text-ink-900 mb-1.5">{v.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Story */}
        <div ref={ref} className="max-w-3xl mx-auto">
          <h2 data-reveal className="font-sans font-extrabold text-3xl text-ink-900 text-center mb-6">Our Story</h2>
          <div className="space-y-4 text-ink-600 leading-relaxed">
            <p data-reveal>
              ServiGo started in 2024 when our founders struggled to find a reliable electrician for a simple repair. After days of asking friends, waiting for callbacks, and dealing with no-shows, they knew there had to be a better way.
            </p>
            <p data-reveal>
              Today, ServiGo connects thousands of customers with verified professionals across India. From AC repair to salon services, plumbing to tutoring, we're making quality services accessible to everyone — right at their doorstep.
            </p>
            <p data-reveal>
              But we're just getting started. Our goal is to be in every city, every neighborhood, serving every household with the same level of trust and quality we started with.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
