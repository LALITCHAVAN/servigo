import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Send, Clock } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/animations/variants';
import api from '@/services/api';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      await api.post('/contact', form);
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (requestError: any) {
      setError(requestError.response?.data?.message || 'Unable to send your message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'chavanlalit518@gmail.com', color: 'primary' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210', color: 'accent' },
    { icon: MapPin, label: 'Office', value: 'Pune, Maharashtra, India', color: 'primary' },
    { icon: Clock, label: 'Hours', value: 'Mon-Sun: 8AM - 10PM', color: 'accent' },
  ];

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen">
      <div className="container-page">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold uppercase tracking-wider mb-4">
            Contact Us
          </span>
          <h1 className="font-sans font-extrabold text-4xl lg:text-5xl text-ink-900">Get in touch</h1>
          <p className="mt-4 text-lg text-ink-500">Have a question? We're here to help. Reach out and we'll respond within 24 hours.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.label}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl shadow-card border border-ink-100 p-6 flex items-start gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${info.color === 'primary' ? 'bg-primary-50' : 'bg-accent-50'}`}>
                <info.icon className={`w-6 h-6 ${info.color === 'primary' ? 'text-primary-600' : 'text-accent-600'}`} />
              </div>
              <div>
                <p className="text-sm text-ink-500">{info.label}</p>
                <p className="font-semibold text-ink-900">{info.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-card border border-ink-100 p-8">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-primary-600" />
              <h2 className="font-sans font-bold text-xl text-ink-900">Send a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="rounded-xl bg-error-50 px-4 py-3 text-sm text-error-700">{error}</p>}
            {submitted && <p className="rounded-xl bg-accent-50 px-4 py-3 text-sm text-accent-700">Message sent! We will get back to you within 24 hours.</p>}
              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-base"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-base"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="input-base"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-base resize-none"
                  placeholder="Tell us more..."
                />
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
                {sending ? (
                  <span>Sending...</span>
                ) : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </motion.div>

          {/* Map placeholder */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden">
            <div className="h-full min-h-[400px] bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-sans font-bold text-xl text-ink-900 mb-2">Visit Our Office</h3>
                <p className="text-ink-600">ServiGo Headquarters</p>
                <p className="text-sm text-ink-500 mt-1">Koregaon Park, Pune, Maharashtra 411001</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
