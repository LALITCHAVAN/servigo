import "dotenv/config";
import mongoose from "mongoose";

import Service from "../models/Service.js";
import Professional from "../models/Professional.js";
import Review from "../models/Review.js";

// ======================================================
// IMAGE HELPER
// ======================================================

const image = (url) => url;

// ======================================================
// SERVICES
// EXACTLY 11 CATEGORIES
// ======================================================

const services = [
  // ====================================================
  // AC REPAIR
  // ====================================================

  {
    id: "s1",
    slug: "ac-repair",
    name: "AC Repair",
    category: "ac-repair",
    icon: "Wind",
    image: image(
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Cooling, gas refill, servicing",
    description:
      "Professional AC repair and servicing for split and window ACs from major brands.",
    startingPrice: 399,
    rating: 4.7,
    reviewCount: 720,
    popular: true,
    bookedCount: 1800,
    whatsIncluded: [
      "AC inspection",
      "General servicing",
      "Cooling check",
      "Gas level check",
      "Basic cleaning",
    ],
    whatsNotIncluded: [
      "Major spare parts",
      "New AC installation",
    ],
    faqs: [
      {
        question: "How long does AC servicing take?",
        answer:
          "Regular AC servicing generally takes around 45 to 60 minutes.",
      },
      {
        question: "Do you repair split ACs?",
        answer:
          "Yes, technicians can service and repair most major split AC brands.",
      },
    ],
  },

 

  {
    id: "s3",
    slug: "ac-installation",
    name: "AC Installation",
    category: "ac-repair",
    icon: "Wind",
    image: image(
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Professional split and window AC installation",
    description:
      "Safe and professional installation of split and window air conditioners.",
    startingPrice: 799,
    rating: 4.8,
    reviewCount: 350,
    popular: false,
    bookedCount: 780,
    whatsIncluded: [
      "AC positioning",
      "Indoor unit installation",
      "Outdoor unit installation",
      "Basic testing",
    ],
    whatsNotIncluded: [
      "Extra copper piping",
      "Major electrical work",
    ],
    faqs: [],
  },

  // ====================================================
  // PLUMBING
  // ====================================================

  {
    id: "s4",
    slug: "plumbing",
    name: "Plumbing",
    category: "plumbing",
    icon: "Wrench",
    image: image(
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Leaks, fittings, installations",
    description:
      "Professional plumbing services for leaks, fittings, blocked pipes, and household plumbing problems.",
    startingPrice: 249,
    rating: 4.7,
    reviewCount: 850,
    popular: true,
    bookedCount: 2100,
    whatsIncluded: [
      "Problem inspection",
      "Leak detection",
      "Basic repair",
      "Fitting inspection",
    ],
    whatsNotIncluded: [
      "Major pipeline replacement",
      "Construction work",
    ],
    faqs: [
      {
        question: "Can you fix water leakage?",
        answer:
          "Yes, our plumbers can inspect and repair common household water leakage problems.",
      },
    ],
  },

  {
    id: "s5",
    slug: "tap-faucet-repair",
    name: "Tap & Faucet Repair",
    category: "plumbing",
    icon: "Wrench",
    image: image(
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Tap leakage and faucet repair",
    description:
      "Repair and replacement of leaking taps, faucets, bathroom fittings, and kitchen fittings.",
    startingPrice: 199,
    rating: 4.7,
    reviewCount: 420,
    popular: false,
    bookedCount: 900,
    whatsIncluded: [
      "Inspection",
      "Leak repair",
      "Fitting adjustment",
      "Testing",
    ],
    whatsNotIncluded: [
      "Premium fittings",
      "Major plumbing work",
    ],
    faqs: [],
  },

  {
    id: "s6",
    slug: "drain-pipe-blockage",
    name: "Drain & Pipe Blockage",
    category: "plumbing",
    icon: "Wrench",
    image: image(
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Blocked drain and pipe cleaning",
    description:
      "Professional cleaning and inspection for blocked household drains and pipes.",
    startingPrice: 299,
    rating: 4.6,
    reviewCount: 380,
    popular: false,
    bookedCount: 760,
    whatsIncluded: [
      "Blockage inspection",
      "Basic blockage removal",
      "Drain cleaning",
      "Testing",
    ],
    whatsNotIncluded: [
      "Major pipeline replacement",
      "Civil work",
    ],
    faqs: [],
  },

  // ====================================================
  // ELECTRICIAN
  // ====================================================

  {
    id: "s7",
    slug: "electrician",
    name: "Electrician",
    category: "electrician",
    icon: "Zap",
    image: image(
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Wiring, repairs, safety",
    description:
      "Professional electrical services for wiring, switches, sockets, installations, and electrical repairs.",
    startingPrice: 199,
    rating: 4.7,
    reviewCount: 980,
    popular: true,
    bookedCount: 2800,
    whatsIncluded: [
      "Electrical inspection",
      "Basic repair",
      "Switch replacement",
      "Safety check",
    ],
    whatsNotIncluded: [
      "Major rewiring",
      "Expensive electrical components",
    ],
    faqs: [
      {
        question: "Do you provide emergency electrician services?",
        answer:
          "Emergency services may be available depending on professional availability.",
      },
    ],
  },

  {
    id: "s8",
    slug: "fan-installation-repair",
    name: "Fan Installation & Repair",
    category: "electrician",
    icon: "Zap",
    image: image(
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Ceiling fan installation and repair",
    description:
      "Installation, repair, and replacement of ceiling fans and common fan components.",
    startingPrice: 249,
    rating: 4.7,
    reviewCount: 460,
    popular: false,
    bookedCount: 980,
    whatsIncluded: [
      "Fan inspection",
      "Installation",
      "Basic repair",
      "Testing",
    ],
    whatsNotIncluded: [
      "New fan purchase",
      "Major electrical rewiring",
    ],
    faqs: [],
  },

  {
    id: "s9",
    slug: "switch-socket-repair",
    name: "Switch & Socket Repair",
    category: "electrician",
    icon: "Zap",
    image: image(
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Switch, socket and wiring repair",
    description:
      "Repair and replacement of household switches, sockets, and minor electrical connections.",
    startingPrice: 199,
    rating: 4.8,
    reviewCount: 390,
    popular: false,
    bookedCount: 820,
    whatsIncluded: [
      "Inspection",
      "Switch repair",
      "Socket repair",
      "Basic testing",
    ],
    whatsNotIncluded: [
      "Major rewiring",
      "Electrical panel replacement",
    ],
    faqs: [],
  },

  // ====================================================
  // HOME CLEANING
  // ====================================================

  {
    id: "s10",
    slug: "home-cleaning",
    name: "Home Cleaning",
    category: "home-cleaning",
    icon: "Sparkles",
    image: image(
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Deep & regular cleaning",
    description:
      "Professional home cleaning services for apartments, houses, and individual rooms.",
    startingPrice: 499,
    rating: 4.7,
    reviewCount: 760,
    popular: true,
    bookedCount: 1900,
    whatsIncluded: [
      "Dust removal",
      "Floor cleaning",
      "Kitchen cleaning",
      "Basic bathroom cleaning",
      "Final cleanup",
    ],
    whatsNotIncluded: [
      "Pest control",
      "Major furniture shifting",
    ],
    faqs: [],
  },

  {
    id: "s11",
    slug: "bathroom-cleaning",
    name: "Bathroom Cleaning",
    category: "home-cleaning",
    icon: "Sparkles",
    image: image(
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Deep bathroom cleaning",
    description:
      "Deep cleaning for bathroom floors, tiles, sinks, toilets, and common surfaces.",
    startingPrice: 299,
    rating: 4.7,
    reviewCount: 520,
    popular: true,
    bookedCount: 1250,
    whatsIncluded: [
      "Floor cleaning",
      "Tile cleaning",
      "Sink cleaning",
      "Toilet cleaning",
      "Final cleanup",
    ],
    whatsNotIncluded: [
      "Plumbing repair",
      "Tile replacement",
    ],
    faqs: [],
  },

  {
    id: "s12",
    slug: "sofa-cleaning",
    name: "Sofa Cleaning",
    category: "home-cleaning",
    icon: "Sparkles",
    image: image(
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Deep sofa and upholstery cleaning",
    description:
      "Professional sofa and upholstery cleaning to remove dust, dirt, stains, and common odors.",
    startingPrice: 399,
    rating: 4.7,
    reviewCount: 450,
    popular: false,
    bookedCount: 980,
    whatsIncluded: [
      "Dust removal",
      "Deep cleaning",
      "Basic stain treatment",
      "Surface cleaning",
    ],
    whatsNotIncluded: [
      "Fabric repair",
      "Furniture replacement",
    ],
    faqs: [],
  },

  {
    id: "s13",
    slug: "kitchen-cleaning",
    name: "Kitchen Cleaning",
    category: "home-cleaning",
    icon: "Sparkles",
    image: image(
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Kitchen deep cleaning",
    description:
      "Complete kitchen cleaning including counters, cabinets, tiles, sink, and common surfaces.",
    startingPrice: 399,
    rating: 4.7,
    reviewCount: 430,
    popular: false,
    bookedCount: 860,
    whatsIncluded: [
      "Counter cleaning",
      "Sink cleaning",
      "Tile cleaning",
      "Surface cleaning",
      "Final cleanup",
    ],
    whatsNotIncluded: [
      "Appliance repair",
      "Cabinet replacement",
    ],
    faqs: [],
  },

  // ====================================================
  // APPLIANCE REPAIR
  // ====================================================

  {
    id: "s14",
    slug: "appliance-repair",
    name: "Appliance Repair",
    category: "appliance-repair",
    icon: "Refrigerator",
    image: image(
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Fridge, washer, microwave",
    description:
      "General appliance inspection and repair services for common household appliances.",
    startingPrice: 349,
    rating: 4.7,
    reviewCount: 620,
    popular: true,
    bookedCount: 1300,
    whatsIncluded: [
      "Appliance inspection",
      "Problem diagnosis",
      "Basic repair",
      "Testing",
    ],
    whatsNotIncluded: [
      "Major spare parts",
      "New appliance purchase",
    ],
    faqs: [],
  },

  {
    id: "s15",
    slug: "refrigerator-repair",
    name: "Refrigerator Repair",
    category: "appliance-repair",
    icon: "Refrigerator",
    image: image(
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Refrigerator cooling and repair",
    description:
      "Professional refrigerator inspection and repair for cooling, leakage, noise, and other common issues.",
    startingPrice: 299,
    rating: 4.6,
    reviewCount: 430,
    popular: false,
    bookedCount: 870,
    whatsIncluded: [
      "Inspection",
      "Problem diagnosis",
      "Cooling check",
      "Basic repair",
      "Testing",
    ],
    whatsNotIncluded: [
      "Major spare parts",
      "Complete refrigerator replacement",
    ],
    faqs: [],
  },

  {
    id: "s16",
    slug: "washing-machine-repair",
    name: "Washing Machine Repair",
    category: "appliance-repair",
    icon: "WashingMachine",
    image: image(
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Washing machine repair and servicing",
    description:
      "Repair and servicing for front-load, top-load, and semi-automatic washing machines.",
    startingPrice: 299,
    rating: 4.6,
    reviewCount: 480,
    popular: false,
    bookedCount: 950,
    whatsIncluded: [
      "Machine inspection",
      "Problem diagnosis",
      "Basic repair",
      "Performance testing",
    ],
    whatsNotIncluded: [
      "Major spare parts",
      "Machine replacement",
    ],
    faqs: [],
  },

  {
    id: "s17",
    slug: "microwave-repair",
    name: "Microwave Repair",
    category: "appliance-repair",
    icon: "Microwave",
    image: image(
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Microwave repair and servicing",
    description:
      "Microwave inspection and repair for heating, display, button, and electrical problems.",
    startingPrice: 249,
    rating: 4.6,
    reviewCount: 310,
    popular: false,
    bookedCount: 620,
    whatsIncluded: [
      "Microwave inspection",
      "Problem diagnosis",
      "Basic repair",
      "Testing",
    ],
    whatsNotIncluded: [
      "Major spare parts",
      "New microwave",
    ],
    faqs: [],
  },

  {
    id: "s18",
    slug: "geyser-repair",
    name: "Geyser Repair",
    category: "appliance-repair",
    icon: "Thermometer",
    image: image(
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Geyser heating and leakage repair",
    description:
      "Geyser repair for heating problems, leakage, thermostat issues, and common electrical faults.",
    startingPrice: 299,
    rating: 4.7,
    reviewCount: 390,
    popular: false,
    bookedCount: 780,
    whatsIncluded: [
      "Geyser inspection",
      "Heating check",
      "Leakage inspection",
      "Basic repair",
      "Testing",
    ],
    whatsNotIncluded: [
      "Major spare parts",
      "New geyser",
    ],
    faqs: [],
  },

  {
    id: "s19",
    slug: "tv-repair",
    name: "TV Repair",
    category: "appliance-repair",
    icon: "Tv",
    image: image(
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "LED, LCD and Smart TV repair",
    description:
      "Professional TV repair for display, sound, power, connectivity, and common software issues.",
    startingPrice: 249,
    rating: 4.6,
    reviewCount: 350,
    popular: false,
    bookedCount: 690,
    whatsIncluded: [
      "TV inspection",
      "Problem diagnosis",
      "Basic repair",
      "Testing",
    ],
    whatsNotIncluded: [
      "Major display replacement",
      "New TV",
    ],
    faqs: [],
  },

  // ====================================================
  // SALON
  // ====================================================

  {
    id: "s20",
    slug: "salon",
    name: "Salon",
    category: "salon",
    icon: "Scissors",
    image: image(
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Hair, skin, beauty at home",
    description:
      "Professional salon and beauty services delivered at your home.",
    startingPrice: 299,
    rating: 4.7,
    reviewCount: 710,
    popular: true,
    bookedCount: 1700,
    whatsIncluded: [
      "Professional consultation",
      "Selected salon service",
      "Basic hygiene products",
      "Post-service cleanup",
    ],
    whatsNotIncluded: [
      "Premium products",
      "Specialized treatments",
    ],
    faqs: [],
  },

  {
    id: "s21",
    slug: "haircut-at-home",
    name: "Haircut at Home",
    category: "salon",
    icon: "Scissors",
    image: image(
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Professional haircut at home",
    description:
      "Convenient professional haircut service delivered at your doorstep.",
    startingPrice: 249,
    rating: 4.8,
    reviewCount: 520,
    popular: false,
    bookedCount: 1200,
    whatsIncluded: [
      "Hair consultation",
      "Haircut",
      "Basic styling",
      "Cleanup",
    ],
    whatsNotIncluded: [
      "Premium styling products",
      "Chemical treatments",
    ],
    faqs: [],
  },

  {
    id: "s22",
    slug: "facial-at-home",
    name: "Facial at Home",
    category: "salon",
    icon: "Sparkles",
    image: image(
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Relaxing facial and skincare service",
    description:
      "Professional facial and basic skincare services in the comfort of your home.",
    startingPrice: 499,
    rating: 4.7,
    reviewCount: 390,
    popular: false,
    bookedCount: 820,
    whatsIncluded: [
      "Skin consultation",
      "Face cleansing",
      "Facial treatment",
      "Basic skincare",
    ],
    whatsNotIncluded: [
      "Medical skin treatment",
      "Premium products",
    ],
    faqs: [],
  },

  // ====================================================
  // TUTOR
  // ====================================================

  {
    id: "s23",
    slug: "tutor",
    name: "Tutor",
    category: "tutor",
    icon: "GraduationCap",
    image: image(
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Academic & skill tutoring",
    description:
      "Personalized tutoring for school subjects, college subjects, and skill development.",
    startingPrice: 399,
    rating: 4.8,
    reviewCount: 310,
    popular: true,
    bookedCount: 640,
    whatsIncluded: [
      "Personalized teaching",
      "Doubt solving",
      "Practice exercises",
      "Progress guidance",
    ],
    whatsNotIncluded: [
      "Exam guarantee",
      "Paid study materials",
    ],
    faqs: [],
  },

  {
    id: "s24",
    slug: "school-subject-tutor",
    name: "School Subject Tutor",
    category: "tutor",
    icon: "BookOpen",
    image: image(
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Math, science, English and more",
    description:
      "One-to-one tutoring for school students across common academic subjects.",
    startingPrice: 399,
    rating: 4.8,
    reviewCount: 280,
    popular: false,
    bookedCount: 560,
    whatsIncluded: [
      "Subject teaching",
      "Doubt solving",
      "Homework guidance",
      "Practice",
    ],
    whatsNotIncluded: [
      "School fees",
      "Paid textbooks",
    ],
    faqs: [],
  },

  {
    id: "s25",
    slug: "coding-tutor",
    name: "Coding Tutor",
    category: "tutor",
    icon: "Code",
    image: image(
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Programming and computer science tutoring",
    description:
      "Personalized coding lessons for beginners and students learning programming and computer science.",
    startingPrice: 499,
    rating: 4.9,
    reviewCount: 240,
    popular: false,
    bookedCount: 420,
    whatsIncluded: [
      "Programming lessons",
      "Problem solving",
      "Code practice",
      "Project guidance",
    ],
    whatsNotIncluded: [
      "Academic assignment completion",
      "Exam guarantee",
    ],
    faqs: [],
  },

  // ====================================================
  // FITNESS
  // ====================================================

  {
    id: "s26",
    slug: "fitness",
    name: "Fitness",
    category: "fitness",
    icon: "Dumbbell",
    image: image(
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Personal training at home",
    description:
      "Personal fitness training and workout guidance from experienced trainers.",
    startingPrice: 499,
    rating: 4.8,
    reviewCount: 340,
    popular: true,
    bookedCount: 720,
    whatsIncluded: [
      "Fitness assessment",
      "Workout plan",
      "Personal training",
      "Progress guidance",
    ],
    whatsNotIncluded: [
      "Gym membership",
      "Supplements",
    ],
    faqs: [],
  },

  {
    id: "s27",
    slug: "yoga-at-home",
    name: "Yoga at Home",
    category: "fitness",
    icon: "HeartPulse",
    image: image(
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Personal yoga sessions at home",
    description:
      "Guided yoga sessions focused on flexibility, mobility, relaxation, and general fitness.",
    startingPrice: 399,
    rating: 4.9,
    reviewCount: 290,
    popular: false,
    bookedCount: 610,
    whatsIncluded: [
      "Yoga assessment",
      "Guided session",
      "Breathing exercises",
      "Basic routine",
    ],
    whatsNotIncluded: [
      "Medical treatment",
      "Yoga equipment",
    ],
    faqs: [],
  },

  {
    id: "s28",
    slug: "personal-trainer",
    name: "Personal Trainer",
    category: "fitness",
    icon: "Dumbbell",
    image: image(
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "One-to-one personal fitness training",
    description:
      "Personalized fitness training with workout planning and progress tracking.",
    startingPrice: 599,
    rating: 4.8,
    reviewCount: 250,
    popular: false,
    bookedCount: 480,
    whatsIncluded: [
      "Fitness assessment",
      "Personal training",
      "Workout plan",
      "Progress tracking",
    ],
    whatsNotIncluded: [
      "Supplements",
      "Gym membership",
    ],
    faqs: [],
  },

  // ====================================================
  // PHOTOGRAPHY
  // ====================================================

  {
    id: "s29",
    slug: "photography",
    name: "Photography",
    category: "photography",
    icon: "Camera",
    image: image(
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Events, portraits, products",
    description:
      "Professional photography services for events, portraits, products, and personal occasions.",
    startingPrice: 999,
    rating: 4.8,
    reviewCount: 270,
    popular: true,
    bookedCount: 530,
    whatsIncluded: [
      "Photography session",
      "Professional camera",
      "Basic editing",
      "Digital delivery",
    ],
    whatsNotIncluded: [
      "Large album printing",
      "Drone photography",
    ],
    faqs: [],
  },

  {
    id: "s30",
    slug: "event-photography",
    name: "Event Photography",
    category: "photography",
    icon: "Camera",
    image: image(
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Photography for birthdays and events",
    description:
      "Professional photography coverage for birthdays, small events, parties, and celebrations.",
    startingPrice: 1999,
    rating: 4.8,
    reviewCount: 180,
    popular: false,
    bookedCount: 320,
    whatsIncluded: [
      "Event coverage",
      "Professional photography",
      "Basic editing",
      "Digital photos",
    ],
    whatsNotIncluded: [
      "Large printed album",
      "Video production",
    ],
    faqs: [],
  },

  {
    id: "s31",
    slug: "portrait-photography",
    name: "Portrait Photography",
    category: "photography",
    icon: "Camera",
    image: image(
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Professional personal portraits",
    description:
      "Professional portrait photography for profiles, portfolios, social media, and personal use.",
    startingPrice: 799,
    rating: 4.9,
    reviewCount: 210,
    popular: false,
    bookedCount: 390,
    whatsIncluded: [
      "Portrait session",
      "Professional camera",
      "Basic editing",
      "Digital delivery",
    ],
    whatsNotIncluded: [
      "Studio rental",
      "Printed photos",
    ],
    faqs: [],
  },

  // ====================================================
  // CARPENTRY
  // ====================================================

  {
    id: "s32",
    slug: "carpentry",
    name: "Carpentry",
    category: "carpentry",
    icon: "Hammer",
    image: image(
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Furniture repair & assembly",
    description:
      "Professional carpentry services for furniture repair, assembly, installation, and woodworking.",
    startingPrice: 299,
    rating: 4.7,
    reviewCount: 540,
    popular: true,
    bookedCount: 1100,
    whatsIncluded: [
      "Furniture inspection",
      "Basic repair",
      "Assembly",
      "Installation",
    ],
    whatsNotIncluded: [
      "Raw materials",
      "Large custom furniture projects",
    ],
    faqs: [],
  },

  {
    id: "s33",
    slug: "furniture-assembly",
    name: "Furniture Assembly",
    category: "carpentry",
    icon: "Hammer",
    image: image(
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Bed, table, shelf and cabinet assembly",
    description:
      "Professional assembly service for ready-to-assemble furniture purchased online or from stores.",
    startingPrice: 299,
    rating: 4.8,
    reviewCount: 340,
    popular: false,
    bookedCount: 720,
    whatsIncluded: [
      "Furniture inspection",
      "Assembly",
      "Basic installation",
      "Stability check",
    ],
    whatsNotIncluded: [
      "Furniture purchase",
      "Major carpentry work",
    ],
    faqs: [],
  },

  {
    id: "s34",
    slug: "wooden-furniture-repair",
    name: "Wooden Furniture Repair",
    category: "carpentry",
    icon: "Hammer",
    image: image(
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Repair damaged wooden furniture",
    description:
      "Repair and maintenance services for common wooden furniture problems.",
    startingPrice: 349,
    rating: 4.7,
    reviewCount: 260,
    popular: false,
    bookedCount: 530,
    whatsIncluded: [
      "Furniture inspection",
      "Basic repair",
      "Alignment",
      "Final check",
    ],
    whatsNotIncluded: [
      "Major reconstruction",
      "New furniture",
    ],
    faqs: [],
  },

  // ====================================================
  // PAINTING
  // ====================================================


  {
    id: "s36",
    slug: "room-painting",
    name: "Room Painting",
    category: "painting",
    icon: "PaintRoller",
    image: image(
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Professional room painting",
    description:
      "Complete painting service for bedrooms, living rooms, kitchens, and other individual rooms.",
    startingPrice: 699,
    rating: 4.8,
    reviewCount: 410,
    popular: false,
    bookedCount: 820,
    whatsIncluded: [
      "Surface preparation",
      "Primer",
      "Paint application",
      "Cleanup",
    ],
    whatsNotIncluded: [
      "Wallpaper",
      "Texture work",
    ],
    faqs: [],
  },

  {
    id: "s37",
    slug: "exterior-painting",
    name: "Exterior Painting",
    category: "painting",
    icon: "PaintRoller",
    image: image(
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
    ),
    shortDescription: "Exterior wall and building painting",
    description:
      "Professional exterior painting for residential properties and small buildings.",
    startingPrice: 999,
    rating: 4.7,
    reviewCount: 260,
    popular: false,
    bookedCount: 490,
    whatsIncluded: [
      "Surface preparation",
      "Primer",
      "Exterior paint",
      "Basic cleanup",
    ],
    whatsNotIncluded: [
      "Major wall repair",
      "Structural work",
    ],
    faqs: [],
  },
];

// ======================================================
// PROFESSIONALS
// ======================================================

const professionals = [
  [
    "p1",
    "Rahul Sharma",
    "Electrician",
    "rahul",
    4.9,
    8,
    "Pune",
  ],
  [
    "p2",
    "Priya Patel",
    "Salon Professional",
    "priya",
    4.9,
    6,
    "Mumbai",
  ],
  [
    "p3",
    "Amit Kumar",
    "AC Repair Technician",
    "amit",
    4.8,
    7,
    "Pune",
  ],
  [
    "p4",
    "Sneha Reddy",
    "Cleaning Professional",
    "sneha",
    4.8,
    5,
    "Pune",
  ],
  [
    "p5",
    "Anjali Gupta",
    "Tutor",
    "anjali",
    5,
    4,
    "Mumbai",
  ],
  [
    "p6",
    "Vikram Singh",
    "Plumber",
    "vikram",
    4.7,
    10,
    "Delhi",
  ],
  [
    "p7",
    "Neha Joshi",
    "Interior Painter",
    "neha",
    4.8,
    6,
    "Bangalore",
  ],
  [
    "p8",
    "Rakesh Verma",
    "Carpenter",
    "rakesh",
    4.7,
    9,
    "Pune",
  ],
  [
    "p9",
    "Meera Iyer",
    "Fitness Trainer",
    "meera",
    4.9,
    7,
    "Mumbai",
  ],
  [
    "p10",
    "Arjun Malhotra",
    "Photographer",
    "arjun",
    4.8,
    5,
    "Delhi",
  ],
].map(
  ([
    id,
    name,
    profession,
    seed,
    rating,
    experience,
    location,
  ]) => ({
    id,
    name,
    profession,
    avatar: `https://i.pravatar.cc/300?u=${seed}`,
    rating,
    experience,
    location,
    reviewCount: 100,
    completedJobs: 500,
    startingPrice: 299,
    verified: true,
    online: true,
    bio: `Experienced ${profession}.`,
    skills: [],
    services: [],
    availability: [],
    portfolio: [],
  })
);

// ======================================================
// REVIEWS
// ======================================================

const reviews = [
  {
    author: "Kavya Nair",
    rating: 5,
    text: "Absolutely amazing service!",
    serviceUsed: "Electrician",
    professionalName: "Rahul Sharma",
    avatar: "https://i.pravatar.cc/300?u=kavya",
  },

  {
    author: "Rohan Mehta",
    rating: 5,
    text: "Every corner was spotless. Will definitely use again!",
    serviceUsed: "Home Cleaning",
    professionalName: "Sneha Reddy",
    avatar: "https://i.pravatar.cc/300?u=rohan",
  },

  {
    author: "Divya Krishnan",
    rating: 4,
    text: "The salon at home service was so convenient.",
    serviceUsed: "Salon",
    professionalName: "Priya Patel",
    avatar: "https://i.pravatar.cc/300?u=divya",
  },

  {
    author: "Aditya Shah",
    rating: 5,
    text: "The AC technician arrived on time and fixed the cooling problem.",
    serviceUsed: "AC Repair",
    professionalName: "Amit Kumar",
    avatar: "https://i.pravatar.cc/300?u=aditya",
  },

  {
    author: "Pooja Joshi",
    rating: 5,
    text: "Very professional plumber and quick service.",
    serviceUsed: "Plumbing",
    professionalName: "Vikram Singh",
    avatar: "https://i.pravatar.cc/300?u=pooja",
  },
];

// ======================================================
// CATEGORY CHECK
// ======================================================

const expectedCategories = [
  "ac-repair",
  "plumbing",
  "electrician",
  "home-cleaning",
  "appliance-repair",
  "salon",
  "tutor",
  "fitness",
  "photography",
  "carpentry",
  "painting",
];

const actualCategories = [
  ...new Set(services.map((service) => service.category)),
];

const missingCategories = expectedCategories.filter(
  (category) => !actualCategories.includes(category)
);

const extraCategories = actualCategories.filter(
  (category) => !expectedCategories.includes(category)
);

if (missingCategories.length > 0) {
  throw new Error(
    `Missing categories: ${missingCategories.join(", ")}`
  );
}

if (extraCategories.length > 0) {
  throw new Error(
    `Unexpected categories: ${extraCategories.join(", ")}`
  );
}

// ======================================================
// IMAGE VALIDATION
// ======================================================

const invalidImages = services.filter(
  (service) =>
    !service.image ||
    typeof service.image !== "string" ||
    !service.image.startsWith("https://")
);

if (invalidImages.length > 0) {
  throw new Error(
    `Invalid image URLs found: ${invalidImages
      .map((service) => service.slug)
      .join(", ")}`
  );
}

console.log(
  `Image validation passed: ${services.length}/${services.length} services`
);

// ======================================================
// SEED DATABASE
// ======================================================

try {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is missing from your .env file."
    );
  }

  await mongoose.connect(process.env.MONGODB_URI);

  console.log("========================================");
  console.log("MongoDB connected.");
  console.log("========================================");

  // WARNING:
  // This deletes existing Service, Professional and Review data.
  // Use only for development/seed database.

  await Promise.all([
    Service.deleteMany({}),
    Professional.deleteMany({}),
    Review.deleteMany({}),
  ]);

  console.log(
    "Old service/professional/review data deleted."
  );

  // ====================================================
  // SERVICES
  // ====================================================

  await Service.insertMany(services);

  console.log(
    `Services inserted: ${services.length}`
  );

  // ====================================================
  // PROFESSIONALS
  // ====================================================

  await Professional.insertMany(professionals);

  console.log(
    `Professionals inserted: ${professionals.length}`
  );

  // ====================================================
  // REVIEWS
  // ====================================================

  await Review.insertMany(reviews);

  console.log(
    `Reviews inserted: ${reviews.length}`
  );

  // ====================================================
  // SUMMARY
  // ====================================================

  console.log("========================================");
  console.log("SEED COMPLETED SUCCESSFULLY");
  console.log("========================================");

  console.log(
    `Total services      : ${services.length}`
  );

  console.log(
    `Total categories    : ${actualCategories.length}`
  );

  console.log(
    `Total professionals : ${professionals.length}`
  );

  console.log(
    `Total reviews       : ${reviews.length}`
  );

  console.log("----------------------------------------");
  console.log("Categories:");

  expectedCategories.forEach((category) => {
    const count = services.filter(
      (service) => service.category === category
    ).length;

    console.log(
      `- ${category}: ${count} services`
    );
  });

  console.log("========================================");

  await mongoose.disconnect();

  console.log("MongoDB disconnected.");
} catch (error) {
  console.error("========================================");
  console.error("SEED FAILED");
  console.error("========================================");

  console.error(error);

  try {
    await mongoose.disconnect();
  } catch {}

  process.exitCode = 1;
}

