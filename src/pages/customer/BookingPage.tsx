import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, ArrowRight, ArrowLeft, Calendar, Clock, MapPin, CreditCard,
  ShieldCheck, PartyPopper, Home,
} from 'lucide-react';
import { useServices, useProfessionals, useCreateBooking } from '@/hooks/useData';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { RatingStars } from '@/components/common/RatingStars';
import { useAuth } from '@/context/AuthContext';

const steps = ['Service', 'Professional', 'Schedule', 'Payment'] as const;
const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];
const dates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  return d;
});

export function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: services } = useServices();
  const { data: professionals } = useProfessionals();
  const createBooking = useCreateBooking();

  const servicesList = services || [];
  const prosList = professionals || [];

  const initialService = servicesList.find(s => s.slug === searchParams.get('service')) || servicesList[0];
  const initialPro = prosList.find(p => p.id === searchParams.get('professional'));

  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState(initialService);
  const [selectedPro, setSelectedPro] = useState(initialPro || prosList[0]);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [address, setAddress] = useState(user?.location || 'Flat 201, Sunrise Apartments, Koregaon Park, Pune');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [confirmed, setConfirmed] = useState(false);

  if (!user) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold text-ink-900">Please log in to book</h1>
        <Link to="/login" className="btn-primary mt-4">Login</Link>
      </div>
    );
  }

  const handleConfirm = () => {
    createBooking.mutate({
      service_id: selectedService?.id || null,
      professional_id: selectedPro?.id || null,
      service_name: selectedService.name,
      service_icon: selectedService.icon,
      professional_name: selectedPro.name,
      professional_avatar: selectedPro.avatar,
      date: selectedDate.toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: selectedTime,
      address,
      price: selectedService.startingPrice,
      status: 'confirmed',
      payment_status: paymentMethod === 'cod' ? 'pending' : 'paid',
    }, {
      onSuccess: () => setConfirmed(true),
    });
  };

  const availablePros = prosList.filter(p =>
    p.profession.toLowerCase().includes(selectedService.name.toLowerCase().split(' ')[0]) ||
    p.skills.some(s => s.toLowerCase().includes(selectedService.name.toLowerCase().split(' ')[0]))
  );

  return (
    <div className="pt-24 lg:pt-28 pb-16 min-h-screen bg-ink-50">
      <div className="container-page max-w-4xl">
        <h1 className="font-sans font-extrabold text-3xl text-ink-900 mb-2">Book a Service</h1>
        <p className="text-ink-500 mb-8">Complete the steps below to book your service.</p>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 max-w-2xl mx-auto">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  i < step ? 'bg-accent-500 text-white' :
                  i === step ? 'bg-primary-600 text-white ring-4 ring-primary-100' :
                  'bg-ink-100 text-ink-400'
                }`}>
                  {i < step ? <Check className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-xs font-semibold ${i <= step ? 'text-ink-900' : 'text-ink-400'}`}>{label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded transition-all duration-300 ${i < step ? 'bg-accent-500' : 'bg-ink-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {!confirmed ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-card border border-ink-100 p-6 lg:p-8"
            >
              {/* Step 1: Service */}
              {step === 0 && (
                <div>
                  <h2 className="font-sans font-bold text-xl text-ink-900 mb-4">Choose a Service</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesList.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedService(s)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          selectedService.id === s.id ? 'border-primary-500 bg-primary-50' : 'border-ink-200 hover:border-ink-300'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                          <ServiceIcon name={s.icon} className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-ink-900">{s.name}</p>
                          <p className="text-xs text-ink-500">From ₹{s.startingPrice}</p>
                        </div>
                        {selectedService.id === s.id && (
                          <Check className="w-5 h-5 text-primary-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Professional */}
              {step === 1 && (
                <div>
                  <h2 className="font-sans font-bold text-xl text-ink-900 mb-4">Select a Professional</h2>
                  <div className="space-y-3">
                    {(availablePros.length > 0 ? availablePros : prosList.slice(0, 4)).map(pro => (
                      <button
                        key={pro.id}
                        onClick={() => setSelectedPro(pro)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                          selectedPro.id === pro.id ? 'border-primary-500 bg-primary-50' : 'border-ink-200 hover:border-ink-300'
                        }`}
                      >
                        <img src={pro.avatar} alt={pro.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-ink-900">{pro.name}</p>
                          <p className="text-xs text-ink-500">{pro.profession} • {pro.experience} yrs exp</p>
                          <div className="flex items-center gap-1 mt-1">
                            <RatingStars rating={pro.rating} size={12} />
                            <span className="text-xs text-ink-500">({pro.reviewCount})</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-sm text-ink-900">₹{pro.startingPrice}</p>
                          {selectedPro.id === pro.id && <Check className="w-5 h-5 text-primary-600 ml-auto mt-1" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Schedule */}
              {step === 2 && (
                <div>
                  <h2 className="font-sans font-bold text-xl text-ink-900 mb-4">Choose Date & Time</h2>

                  {/* Date selection */}
                  <div className="mb-6">
                    <label className="text-sm font-semibold text-ink-700 mb-2 block">Select Date</label>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {dates.map(d => {
                        const isSelected = selectedDate.toDateString() === d.toDateString();
                        return (
                          <button
                            key={d.toISOString()}
                            onClick={() => setSelectedDate(d)}
                            className={`shrink-0 w-16 py-3 rounded-xl border-2 text-center transition-all ${
                              isSelected ? 'border-primary-500 bg-primary-50' : 'border-ink-200 hover:border-ink-300'
                            }`}
                          >
                            <p className="text-xs text-ink-500">{d.toLocaleDateString('en', { weekday: 'short' })}</p>
                            <p className="font-bold text-lg text-ink-900">{d.getDate()}</p>
                            <p className="text-xs text-ink-500">{d.toLocaleDateString('en', { month: 'short' })}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time selection */}
                  <div className="mb-6">
                    <label className="text-sm font-semibold text-ink-700 mb-2 block">Select Time</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                            selectedTime === time ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-ink-200 text-ink-600 hover:border-ink-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="text-sm font-semibold text-ink-700 mb-2 block">Service Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-ink-400" />
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={2}
                        className="input-base pl-11 resize-none"
                        placeholder="Enter your full address"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {step === 3 && (
                <div>
                  <h2 className="font-sans font-bold text-xl text-ink-900 mb-4">Payment</h2>

                  {/* Summary */}
                  <div className="bg-ink-50 rounded-xl p-4 mb-6 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-500">Service</span>
                      <span className="font-semibold text-ink-900">{selectedService.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-500">Professional</span>
                      <span className="font-semibold text-ink-900">{selectedPro.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-500">Date & Time</span>
                      <span className="font-semibold text-ink-900">{selectedDate.toLocaleDateString('en', { day: 'numeric', month: 'short' })} • {selectedTime}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-ink-200">
                      <span className="font-bold text-ink-900">Total</span>
                      <span className="font-extrabold text-xl text-primary-600">₹{selectedService.startingPrice}</span>
                    </div>
                  </div>

                  {/* Payment method */}
                  <label className="text-sm font-semibold text-ink-700 mb-2 block">Payment Method</label>
                  <div className="space-y-2">
                    {[
                      { id: 'upi', label: 'UPI Payment', desc: 'Pay via GPay, PhonePe, Paytm' },
                      { id: 'card', label: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay' },
                      { id: 'cod', label: 'Cash on Service', desc: 'Pay after service completion' },
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          paymentMethod === method.id ? 'border-primary-500 bg-primary-50' : 'border-ink-200 hover:border-ink-300'
                        }`}
                      >
                        <CreditCard className={`w-5 h-5 ${paymentMethod === method.id ? 'text-primary-600' : 'text-ink-400'}`} />
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-ink-900">{method.label}</p>
                          <p className="text-xs text-ink-500">{method.desc}</p>
                        </div>
                        {paymentMethod === method.id && <Check className="w-5 h-5 text-primary-600" />}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-sm text-ink-500">
                    <ShieldCheck className="w-4 h-4 text-accent-500" />
                    Your payment is secured with bank-grade encryption
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* Confirmation */
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl shadow-elevated border border-ink-100 p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-6"
              >
                <PartyPopper className="w-10 h-10 text-accent-600" />
              </motion.div>
              <h2 className="font-sans font-extrabold text-2xl text-ink-900">Booking Confirmed!</h2>
              <p className="mt-2 text-ink-500">Your service has been booked successfully. We'll send you a confirmation shortly.</p>

              <div className="bg-ink-50 rounded-xl p-5 mt-6 text-left max-w-md mx-auto space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">Booking ID</span>
                  <span className="font-mono font-semibold text-ink-900">#SG{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">Service</span>
                  <span className="font-semibold text-ink-900">{selectedService.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">Professional</span>
                  <span className="font-semibold text-ink-900">{selectedPro.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">Date & Time</span>
                  <span className="font-semibold text-ink-900">{selectedDate.toLocaleDateString('en', { day: 'numeric', month: 'short' })} • {selectedTime}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-ink-200">
                  <span className="font-bold text-ink-900">Amount Paid</span>
                  <span className="font-extrabold text-lg text-primary-600">₹{selectedService.startingPrice}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 mt-6">
                <Link to="/my-bookings" className="btn-primary">View My Bookings</Link>
                <Link to="/dashboard" className="btn-secondary">Go to Dashboard</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        {!confirmed && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)}
              className="btn-secondary"
            >
              <ArrowLeft className="w-4 h-4" /> {step > 0 ? 'Back' : 'Cancel'}
            </button>
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="btn-primary">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleConfirm} disabled={createBooking.isPending} className="btn-primary disabled:opacity-60">
                <ShieldCheck className="w-4 h-4" /> {createBooking.isPending ? 'Processing...' : `Confirm & Pay ₹${selectedService.startingPrice}`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
