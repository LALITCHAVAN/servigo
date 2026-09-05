import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, IndianRupee, Lock, CalendarCheck, Radio, HeadphonesIcon } from 'lucide-react';
import { useGsapReveal } from '@/animations/gsap';

const features = [
  { icon: ShieldCheck, title: 'Verified Professionals', desc: 'Every professional is background-checked and skill-verified.', color: 'primary' },
  { icon: IndianRupee, title: 'Transparent Pricing', desc: 'Know the price upfront. No hidden charges, ever.', color: 'accent' },
  { icon: Lock, title: 'Secure Payments', desc: 'Bank-grade encryption keeps your payments safe.', color: 'primary' },
  { icon: CalendarCheck, title: 'Easy Booking', desc: 'Book in minutes with our simple 4-step process.', color: 'accent' },
  { icon: Radio, title: 'Real-Time Updates', desc: 'Track your booking status live from request to completion.', color: 'primary' },
  { icon: HeadphonesIcon, title: 'Customer Support', desc: 'Our support team is available 7 days a week to help.', color: 'accent' },
];

export function WhyChooseUs() {
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <section className="py-10 lg:py-16">
      <div className="container-page">
        <div ref={ref} className="text-center mb-9">
          <span data-reveal className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold uppercase tracking-wider mb-3">
            Why ServiGo
          </span>
          <h2 data-reveal className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">
            Why customers choose us
          </h2>
          <p data-reveal className="mt-3 text-ink-400 max-w-xl mx-auto">
            We're committed to making service booking effortless, reliable, and transparent.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <motion.div
              key={f.title}
              data-reveal
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group bg-white rounded-2xl shadow-card border border-ink-100 p-6 hover:shadow-elevated transition-shadow duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                f.color === 'primary' ? 'bg-primary-50 group-hover:bg-primary-100' : 'bg-accent-50 group-hover:bg-accent-100'
              } transition-colors duration-300`}>
                <f.icon className={`w-7 h-7 ${f.color === 'primary' ? 'text-primary-600' : 'text-accent-600'}`} />
              </div>
              <h3 className="font-sans font-bold text-ink-900 mb-1.5">{f.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/about" className="btn-secondary">
            Learn more about ServiGo
          </Link>
        </div>
      </div>
    </section>
  );
}
