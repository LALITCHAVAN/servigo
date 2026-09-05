export type UserRole = 'customer' | 'professional' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  location?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  group: 'home' | 'personal';
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: string;
  icon: string;
  image: string;
  shortDescription: string;
  description: string;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  popular: boolean;
  bookedCount: number;
  whatsIncluded: string[];
  whatsNotIncluded: string[];
  faqs: { question: string; answer: string }[];
}

export interface Professional {
  id: string;
  name: string;
  profession: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experience: number;
  completedJobs: number;
  location: string;
  startingPrice: number;
  verified: boolean;
  online: boolean;
  bio: string;
  skills: string[];
  services: { name: string; price: number; duration: string }[];
  availability: { day: string; hours: string; off: boolean }[];
  portfolio: { image: string; title: string }[];
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'on_the_way'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceIcon: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar: string;
  customerId: string;
  customerName: string;
  date: string;
  time: string;
  address: string;
  price: number;
  status: BookingStatus;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  serviceUsed: string;
  date: string;
  professional?: string;
}

export interface Notification {
  id: string;
  type: 'booking' | 'review' | 'payment' | 'system' | 'message';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
