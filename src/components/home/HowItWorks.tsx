import { Search, UserCheck, CalendarClock, CheckCircle } from 'lucide-react';
import { useGsapReveal } from '@/animations/gsap';

const steps = [
  { num: '01', title: 'Choose a Service', desc: 'Browse from our wide range of home and personal services.', icon: Search },
  { num: '02', title: 'Select a Professional', desc: 'Compare verified professionals by ratings, price, and availability.', icon: UserCheck },
  { num: '03', title: 'Choose Date & Time', desc: 'Pick a slot that works for you — we come to your doorstep.', icon: CalendarClock },
  { num: '04', title: 'Book Your Service', desc: 'Confirm your booking with secure payment and relax.', icon: CheckCircle },
];

export function HowItWorks() {
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.15 });

  return (
    <section className="py-10 lg:py-16 bg-gradient-to-b from-ink-50 to-white">
      <div className="container-page">
        <div ref={ref} className="text-center mb-9">
          <span data-reveal className="inline-block px-3 py-1 rounded-full bg-accent-50 text-accent-600 text-xs font-bold uppercase tracking-wider mb-3">
            How It Works
          </span>
          <h2 data-reveal className="font-sans font-extrabold text-3xl lg:text-4xl text-ink-900">
            Book in 4 simple steps
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200" />

          {steps.map((step) => (
            <div key={step.num} data-reveal className="relative">
              <div className="bg-white rounded-2xl shadow-card border border-ink-100 p-6 text-center hover:shadow-elevated transition-shadow duration-300">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 mb-4 mx-auto">
                  <step.icon className="w-7 h-7 text-white" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-400 text-amber-950 text-xs font-bold flex items-center justify-center ring-2 ring-white">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-sans font-bold text-ink-900 mb-2">{step.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
