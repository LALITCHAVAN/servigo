import type {
  ServiceCategory,
  Service,
  Professional,
  Review,
  Booking,
  Notification,
} from '@/types';

export const categories: ServiceCategory[] = [
  // Home Services
  { id: 'c1', name: 'AC Repair', slug: 'ac-repair', icon: 'Wind', group: 'home' },
  { id: 'c2', name: 'Plumbing', slug: 'plumbing', icon: 'Wrench', group: 'home' },
  { id: 'c3', name: 'Electrician', slug: 'electrician', icon: 'Zap', group: 'home' },
  { id: 'c4', name: 'Home Cleaning', slug: 'home-cleaning', icon: 'Sparkles', group: 'home' },
  { id: 'c5', name: 'Appliance Repair', slug: 'appliance-repair', icon: 'Refrigerator', group: 'home' },
  { id: 'c6', name: 'Carpentry', slug: 'carpentry', icon: 'Hammer', group: 'home' },
  { id: 'c7', name: 'Painting', slug: 'painting', icon: 'PaintRoller', group: 'home' },
  // Personal Services
  { id: 'c8', name: 'Salon', slug: 'salon', icon: 'Scissors', group: 'personal' },
  { id: 'c9', name: 'Tutor', slug: 'tutor', icon: 'GraduationCap', group: 'personal' },
  { id: 'c10', name: 'Fitness', slug: 'fitness', icon: 'Dumbbell', group: 'personal' },
  { id: 'c11', name: 'Photography', slug: 'photography', icon: 'Camera', group: 'personal' },
];

const img = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

export const services: Service[] = [
  {
    id: 's1', slug: 'ac-repair', name: 'AC Repair', category: 'ac-repair', icon: 'Wind',
    image: img('5822936'),
    shortDescription: 'Expert AC servicing, gas refill, and complete repairs for all brands.',
    description: 'Our certified technicians provide comprehensive air conditioner repair and maintenance services. From cooling issues to strange noises, we diagnose and fix all AC problems quickly and efficiently. We service all major brands including Daikin, LG, Voltas, Samsung, and more.',
    startingPrice: 399, rating: 4.8, reviewCount: 1240, popular: true, bookedCount: 3200,
    whatsIncluded: ['Complete diagnostic check', 'Gas refill (up to 1 kg)', 'Filter cleaning', 'Coil cleaning', 'Performance test', '30-day service warranty'],
    whatsNotIncluded: ['Compressor replacement', 'PCB board replacement', 'New installation', 'Ductwork modifications'],
    faqs: [
      { question: 'How long does an AC service take?', answer: 'A standard AC service takes 45-90 minutes depending on the condition and type of unit.' },
      { question: 'Do you provide a warranty?', answer: 'Yes, we provide a 30-day service warranty on all repairs.' },
      { question: 'Which AC brands do you service?', answer: 'We service all major brands including Daikin, LG, Voltas, Samsung, Hitachi, and more.' },
    ],
  },
{
  id: 's2',
  slug: 'electrician',
  name: 'Electrician',
  category: 'electrician',
  icon: 'Zap',

  image:
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80',

  shortDescription:
    'Licensed electricians for wiring, repairs, installations, and safety checks.',

  description:
    'Our licensed electricians handle everything from minor repairs to complete electrical installations. We ensure safety compliance and use only certified materials. Available for both residential and commercial properties.',

  startingPrice: 199,
  rating: 4.7,
  reviewCount: 980,
  popular: true,
  bookedCount: 2800,

  whatsIncluded: [
    'Diagnostic visit',
    'Minor repairs included',
    'Safety inspection',
    'Switch/socket repair',
    'Circuit breaker check',
    'Up to 1 hour labor',
  ],

  whatsNotIncluded: [
    'Complete rewiring',
    'New electrical panel',
    'Generator installation',
    'Solar panel installation',
  ],

  faqs: [
    {
      question: 'Are your electricians licensed?',
      answer:
        'Yes, all our electricians are fully licensed and insured with minimum 5 years experience.',
    },
    {
      question: 'Do you handle emergencies?',
      answer:
        'Yes, we offer emergency electrical services with same-day response.',
    },
  ],
},
  {
    id: 's3', slug: 'plumbing', name: 'Plumbing', category: 'plumbing', icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=85',
    shortDescription: 'Professional plumbing services for leaks, installations, and repairs.',
    description: 'From leaky faucets to complete bathroom installations, our expert plumbers handle it all. We use high-quality fixtures and provide lasting solutions to all your plumbing needs.',
    startingPrice: 249, rating: 4.6, reviewCount: 760, popular: true, bookedCount: 2100,
    whatsIncluded: ['Leak detection', 'Faucet repair/replacement', 'Drain cleaning', 'Pipe repair', 'Up to 1 hour labor', 'Basic materials included'],
    whatsNotIncluded: ['Complete bathroom remodeling', 'Sewer line replacement', 'Water tank installation', 'Borewell drilling'],
    faqs: [
      { question: 'Do you bring materials?', answer: 'Our professionals carry common materials. Specialized parts may need to be sourced separately.' },
      { question: 'Is there a visit charge?', answer: 'The visit charge is adjusted against the final bill if you proceed with the service.' },
    ],
  },
  {
    id: 's4', slug: 'home-cleaning', name: 'Home Cleaning', category: 'home-cleaning', icon: 'Sparkles',
    image: img('4108715'),
    shortDescription: 'Deep cleaning, regular cleaning, and specialized cleaning services.',
    description: 'Transform your home with our professional cleaning services. Our trained cleaners use eco-friendly products and modern equipment to leave your space spotless. Choose from deep cleaning, regular maintenance, or specialized services.',
    startingPrice: 499, rating: 4.9, reviewCount: 1560, popular: true, bookedCount: 4100,
    whatsIncluded: ['Deep cleaning all rooms', 'Kitchen degreasing', 'Bathroom sanitization', 'Floor scrubbing', 'Dusting & wiping', 'Eco-friendly products'],
    whatsNotIncluded: ['Exterior window cleaning (above 2nd floor)', 'Carpet shampooing', 'Post-construction cleaning', 'Garden maintenance'],
    faqs: [
      { question: 'How many cleaners come?', answer: 'Typically 2-3 trained cleaners depending on your home size and service selected.' },
      { question: 'Do you bring cleaning supplies?', answer: 'Yes, our team brings all necessary eco-friendly cleaning products and equipment.' },
    ],
  },
  {
    id: 's5', slug: 'carpentry', name: 'Carpentry', category: 'carpentry', icon: 'Hammer',
    image: img('8961064'),
    shortDescription: 'Custom furniture repair, assembly, and woodworking services.',
    description: 'Our skilled carpenters handle furniture repair, assembly, custom woodworking, door installation, and more. Quality craftsmanship guaranteed.',
    startingPrice: 299, rating: 4.5, reviewCount: 420, popular: false, bookedCount: 980,
    whatsIncluded: ['Furniture repair', 'Door alignment', 'Drawer repair', 'Hardware replacement', 'Up to 2 hours labor'],
    whatsNotIncluded: ['Custom furniture making', 'Wooden flooring installation', 'Structural modifications'],
    faqs: [
      { question: 'Can you assemble IKEA furniture?', answer: 'Yes, we assemble all types of ready-to-assemble furniture.' },
    ],
  },
 {
  id: 's6',
  slug: 'painting',
  name: 'Painting',
  category: 'painting',
  icon: 'PaintRoller',

  image: 'https://images.unsplash.com/photo-1562259949-e8e768e3d2b5?auto=format&fit=crop&w=1200&q=85',

  shortDescription: 'Interior and exterior painting with premium quality paints.',

  description: 'Refresh your walls with our professional painting services. We use premium paints, prepare surfaces properly, and deliver a flawless finish. Free color consultation included.',

  startingPrice: 599,
  rating: 4.7,
  reviewCount: 680,
  popular: false,
  bookedCount: 1500,

  whatsIncluded: [
    'Surface preparation',
    'Primer coat',
    '2 coats of paint',
    'Furniture covering',
    'Cleanup after work',
    'Free color consultation'
  ],

  whatsNotIncluded: [
    'Textured finishes',
    'Wallpaper installation',
    'Stencil work',
    'Waterproofing'
  ],

  faqs: [
    {
      question: 'How long does painting take?',
      answer: 'A standard room takes 1-2 days depending on size and condition.'
    }
  ],
},
  {
    id: 's7', slug: 'appliance-repair', name: 'Appliance Repair', category: 'appliance-repair', icon: 'Refrigerator',
    image: img('3998001'),
    shortDescription: 'Repair services for refrigerators, washing machines, microwaves, and more.',
    description: 'Get your home appliances running like new. Our technicians repair all major brands of refrigerators, washing machines, microwaves, and other appliances with genuine parts.',
    startingPrice: 349, rating: 4.6, reviewCount: 890, popular: true, bookedCount: 2200,
    whatsIncluded: ['Diagnostic visit', 'Repair quote', 'Genuine parts', 'Up to 90-day repair warranty', 'All major brands'],
    whatsNotIncluded: ['Parts cost (charged separately)', 'New appliance installation', 'Extended warranty plans'],
    faqs: [
      { question: 'Do you use genuine parts?', answer: 'Yes, we only use genuine OEM parts for all repairs.' },
    ],
  },
  {
    id: 's8', slug: 'salon', name: 'Salon at Home', category: 'salon', icon: 'Scissors',
    image: img('3993449'),
    shortDescription: 'Professional salon services in the comfort of your home.',
    description: 'Pamper yourself with our at-home salon services. From haircuts to facials, manicures to waxing, our beauty professionals bring the salon experience to your doorstep.',
    startingPrice: 299, rating: 4.9, reviewCount: 2100, popular: true, bookedCount: 5600,
    whatsIncluded: ['Professional service', 'Hygienic tools', 'Premium products', 'Home convenience', 'Post-service cleanup'],
    whatsNotIncluded: ['Hair coloring (charged separately)', 'Keratin treatment', 'Permanent makeup'],
    faqs: [
      { question: 'Are the products used safe?', answer: 'We use only premium, skin-friendly, and hypoallergenic products.' },
    ],
  },
];

const avatar = (seed: string) => `https://i.pravatar.cc/300?u=${seed}`;

export const professionals: Professional[] = [
  {
    id: 'p1', name: 'Rahul Sharma', profession: 'Electrician', avatar: avatar('rahul'),
    rating: 4.9, reviewCount: 248, experience: 8, completedJobs: 1240, location: 'Pune',
    startingPrice: 399, verified: true, online: true,
    bio: 'Licensed electrician with 8 years of experience in residential and commercial electrical work. I specialize in troubleshooting, wiring, and safety compliance.',
    skills: ['Wiring', 'Switchboard repair', 'Circuit breaker', 'Lighting', 'Safety audit'],
    services: [
      { name: 'Switch/Socket Repair', price: 199, duration: '30 min' },
      { name: 'Full Home Wiring Inspection', price: 499, duration: '2 hrs' },
      { name: 'Circuit Breaker Replacement', price: 399, duration: '45 min' },
    ],
    availability: [
      { day: 'Monday', hours: '09:00 - 18:00', off: false },
      { day: 'Tuesday', hours: '09:00 - 18:00', off: false },
      { day: 'Wednesday', hours: '09:00 - 18:00', off: false },
      { day: 'Thursday', hours: '09:00 - 18:00', off: false },
      { day: 'Friday', hours: '09:00 - 18:00', off: false },
      { day: 'Saturday', hours: '10:00 - 16:00', off: false },
      { day: 'Sunday', hours: 'OFF', off: true },
    ],
    portfolio: [
      { image: img('6473920'), title: 'Panel Upgrade' },
      { image: img('8961342'), title: 'Commercial Wiring' },
    ],
  },
  {
    id: 'p2', name: 'Priya Patel', profession: 'Salon Professional', avatar: avatar('priya'),
    rating: 4.9, reviewCount: 410, experience: 6, completedJobs: 2100, location: 'Mumbai',
    startingPrice: 299, verified: true, online: true,
    bio: 'Certified beauty professional specializing in at-home salon services. I bring premium products and a relaxing spa experience to your home.',
    skills: ['Haircut', 'Facial', 'Manicure', 'Pedicure', 'Waxing', 'Threading'],
    services: [
      { name: 'Haircut & Styling', price: 299, duration: '45 min' },
      { name: 'Premium Facial', price: 599, duration: '1 hr' },
      { name: 'Manicure + Pedicure', price: 499, duration: '1 hr' },
    ],
    availability: [
      { day: 'Monday', hours: '10:00 - 19:00', off: false },
      { day: 'Tuesday', hours: 'OFF', off: true },
      { day: 'Wednesday', hours: '10:00 - 19:00', off: false },
      { day: 'Thursday', hours: '10:00 - 19:00', off: false },
      { day: 'Friday', hours: '10:00 - 19:00', off: false },
      { day: 'Saturday', hours: '09:00 - 20:00', off: false },
      { day: 'Sunday', hours: '09:00 - 20:00', off: false },
    ],
    portfolio: [
      { image: img('3993449'), title: 'Bridal Makeup' },
      { image: img('3997991'), title: 'Facial Treatment' },
    ],
  },
  {
    id: 'p3', name: 'Amit Kumar', profession: 'AC Repair Technician', avatar: avatar('amit'),
    rating: 4.8, reviewCount: 320, experience: 7, completedJobs: 1800, location: 'Pune',
    startingPrice: 399, verified: true, online: false,
    bio: 'HVAC certified technician with expertise in all types of AC systems. I provide thorough servicing with a 30-day service warranty.',
    skills: ['AC Servicing', 'Gas Refill', 'Installation', 'Compressor Repair', 'Cooling Issues'],
    services: [
      { name: 'AC Service (Split/Window)', price: 399, duration: '1 hr' },
      { name: 'Gas Refill', price: 999, duration: '45 min' },
      { name: 'AC Installation', price: 599, duration: '1.5 hrs' },
    ],
    availability: [
      { day: 'Monday', hours: '08:00 - 20:00', off: false },
      { day: 'Tuesday', hours: '08:00 - 20:00', off: false },
      { day: 'Wednesday', hours: '08:00 - 20:00', off: false },
      { day: 'Thursday', hours: '08:00 - 20:00', off: false },
      { day: 'Friday', hours: '08:00 - 20:00', off: false },
      { day: 'Saturday', hours: '08:00 - 20:00', off: false },
      { day: 'Sunday', hours: 'OFF', off: true },
    ],
    portfolio: [
      { image: img('5822936'), title: 'Split AC Service' },
      { image: img('8961064'), title: 'Commercial HVAC' },
    ],
  },
  {
    id: 'p4', name: 'Sneha Reddy', profession: 'Home Cleaning Expert', avatar: avatar('sneha'),
    rating: 4.9, reviewCount: 560, experience: 5, completedJobs: 2800, location: 'Bangalore',
    startingPrice: 499, verified: true, online: true,
    bio: 'Professional cleaner with 5 years of experience. I use eco-friendly products and modern equipment for a spotless, healthy home.',
    skills: ['Deep Cleaning', 'Kitchen Cleaning', 'Bathroom Sanitization', 'Sofa Cleaning', 'Move-in/Move-out'],
    services: [
      { name: '2BHK Deep Cleaning', price: 1499, duration: '4 hrs' },
      { name: 'Kitchen Deep Clean', price: 699, duration: '2 hrs' },
      { name: 'Bathroom Deep Clean', price: 399, duration: '1 hr' },
    ],
    availability: [
      { day: 'Monday', hours: '07:00 - 18:00', off: false },
      { day: 'Tuesday', hours: '07:00 - 18:00', off: false },
      { day: 'Wednesday', hours: '07:00 - 18:00', off: false },
      { day: 'Thursday', hours: '07:00 - 18:00', off: false },
      { day: 'Friday', hours: '07:00 - 18:00', off: false },
      { day: 'Saturday', hours: '08:00 - 16:00', off: false },
      { day: 'Sunday', hours: 'OFF', off: true },
    ],
    portfolio: [
      { image: img('4108715'), title: 'Deep Clean Result' },
      { image: img('3998001'), title: 'Kitchen Makeover' },
    ],
  },
  {
    id: 'p5', name: 'Vikram Singh', profession: 'Plumber', avatar: avatar('vikram'),
    rating: 4.7, reviewCount: 180, experience: 10, completedJobs: 960, location: 'Delhi',
    startingPrice: 249, verified: true, online: false,
    bio: 'Master plumber with a decade of experience. I handle everything from minor leaks to complete bathroom installations with precision.',
    skills: ['Leak Repair', 'Pipe Fitting', 'Bathroom Installation', 'Drain Cleaning', 'Water Heater'],
    services: [
      { name: 'Leak Detection & Repair', price: 249, duration: '45 min' },
      { name: 'Bathroom Fitting', price: 899, duration: '3 hrs' },
      { name: 'Drain Cleaning', price: 349, duration: '1 hr' },
    ],
    availability: [
      { day: 'Monday', hours: '09:00 - 19:00', off: false },
      { day: 'Tuesday', hours: '09:00 - 19:00', off: false },
      { day: 'Wednesday', hours: 'OFF', off: true },
      { day: 'Thursday', hours: '09:00 - 19:00', off: false },
      { day: 'Friday', hours: '09:00 - 19:00', off: false },
      { day: 'Saturday', hours: '09:00 - 17:00', off: false },
      { day: 'Sunday', hours: 'OFF', off: true },
    ],
    portfolio: [
      { image: img('8961342'), title: 'Bathroom Plumbing' },
      { image: img('8961064'), title: 'Kitchen Sink' },
    ],
  },
  {
    id: 'p6', name: 'Anjali Gupta', profession: 'Tutor', avatar: avatar('anjali'),
    rating: 5.0, reviewCount: 95, experience: 4, completedJobs: 320, location: 'Mumbai',
    startingPrice: 350, verified: true, online: true,
    bio: 'Certified educator specializing in mathematics and science for grades 6-12. I make learning engaging with personalized lesson plans.',
    skills: ['Mathematics', 'Physics', 'Chemistry', 'Test Prep', 'Online Teaching'],
    services: [
      { name: '1-on-1 Math Session', price: 350, duration: '1 hr' },
      { name: 'Science Crash Course', price: 500, duration: '1.5 hrs' },
      { name: 'Exam Prep Session', price: 600, duration: '2 hrs' },
    ],
    availability: [
      { day: 'Monday', hours: '15:00 - 21:00', off: false },
      { day: 'Tuesday', hours: '15:00 - 21:00', off: false },
      { day: 'Wednesday', hours: '15:00 - 21:00', off: false },
      { day: 'Thursday', hours: '15:00 - 21:00', off: false },
      { day: 'Friday', hours: '15:00 - 21:00', off: false },
      { day: 'Saturday', hours: '10:00 - 18:00', off: false },
      { day: 'Sunday', hours: 'OFF', off: true },
    ],
    portfolio: [
      { image: img('3997991'), title: 'Study Session' },
    ],
  },
];

export const reviews: Review[] = [
  { id: 'r1', author: 'Kavya Nair', avatar: avatar('kavya'), rating: 5, text: 'Absolutely amazing service! The electrician arrived on time, diagnosed the issue quickly, and fixed it within an hour. Highly recommend ServiGo!', serviceUsed: 'Electrician', date: '2 days ago', professional: 'Rahul Sharma' },
  { id: 'r2', author: 'Rohan Mehta', avatar: avatar('rohan'), rating: 5, text: 'Booked a home deep cleaning and was blown away by the attention to detail. Every corner was spotless. Will definitely use again!', serviceUsed: 'Home Cleaning', date: '1 week ago', professional: 'Sneha Reddy' },
  { id: 'r3', author: 'Divya Krishnan', avatar: avatar('divya'), rating: 4, text: 'The salon at home service was so convenient. Priya was professional and skilled. The facial was relaxing. Only wish she could bring more product options.', serviceUsed: 'Salon at Home', date: '2 weeks ago', professional: 'Priya Patel' },
  { id: 'r4', author: 'Arjun Rao', avatar: avatar('arjun'), rating: 5, text: 'AC was not cooling at all. Amit diagnosed a gas leak, refilled it, and now it works like new. Very transparent pricing and professional service.', serviceUsed: 'AC Repair', date: '3 weeks ago', professional: 'Amit Kumar' },
  { id: 'r5', author: 'Meera Joshi', avatar: avatar('meera'), rating: 5, text: 'My daughter\'s math scores improved dramatically after just 2 months of tutoring with Anjali. She makes concepts so easy to understand!', serviceUsed: 'Tutor', date: '1 month ago', professional: 'Anjali Gupta' },
];

export const bookings: Booking[] = [
  {
    id: 'b1', serviceId: 's1', serviceName: 'AC Repair', serviceIcon: 'Wind',
    professionalId: 'p3', professionalName: 'Amit Kumar', professionalAvatar: avatar('amit'),
    customerId: 'u1', customerName: 'Demo User',
    date: '2026-09-05', time: '10:00 AM', address: 'Flat 201, Sunrise Apartments, Koregaon Park, Pune',
    price: 399, status: 'confirmed', paymentStatus: 'paid', createdAt: '2026-09-01',
  },
  {
    id: 'b2', serviceId: 's4', serviceName: 'Home Cleaning', serviceIcon: 'Sparkles',
    professionalId: 'p4', professionalName: 'Sneha Reddy', professionalAvatar: avatar('sneha'),
    customerId: 'u1', customerName: 'Demo User',
    date: '2026-08-20', time: '2:00 PM', address: 'Flat 201, Sunrise Apartments, Koregaon Park, Pune',
    price: 1499, status: 'completed', paymentStatus: 'paid', createdAt: '2026-08-18',
  },
  {
    id: 'b3', serviceId: 's2', serviceName: 'Electrician', serviceIcon: 'Zap',
    professionalId: 'p1', professionalName: 'Rahul Sharma', professionalAvatar: avatar('rahul'),
    customerId: 'u1', customerName: 'Demo User',
    date: '2026-08-10', time: '11:00 AM', address: 'Flat 201, Sunrise Apartments, Koregaon Park, Pune',
    price: 199, status: 'completed', paymentStatus: 'paid', createdAt: '2026-08-08',
  },
  {
    id: 'b4', serviceId: 's8', serviceName: 'Salon at Home', serviceIcon: 'Scissors',
    professionalId: 'p2', professionalName: 'Priya Patel', professionalAvatar: avatar('priya'),
    customerId: 'u1', customerName: 'Demo User',
    date: '2026-07-28', time: '4:00 PM', address: 'Flat 201, Sunrise Apartments, Koregaon Park, Pune',
    price: 599, status: 'cancelled', paymentStatus: 'refunded', createdAt: '2026-07-25',
  },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'booking', title: 'Booking Confirmed', message: 'Your AC Repair with Amit Kumar is confirmed for Sep 5, 10:00 AM.', read: false, createdAt: '2 hours ago' },
  { id: 'n2', type: 'review', title: 'New Review', message: 'Please rate your recent Home Cleaning service with Sneha Reddy.', read: false, createdAt: '1 day ago' },
  { id: 'n3', type: 'payment', title: 'Payment Successful', message: '₹399 paid for AC Repair booking.', read: true, createdAt: '2 days ago' },
  { id: 'n4', type: 'booking', title: 'Booking Completed', message: 'Your Electrician service has been completed. Thank you for using ServiGo!', read: true, createdAt: '3 weeks ago' },
];

export const stats = {
  totalBookings: bookings.length,
  completed: bookings.filter(b => b.status === 'completed').length,
  upcoming: bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length,
  cancelled: bookings.filter(b => b.status === 'cancelled').length,
};
