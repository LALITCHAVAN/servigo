import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import api from "../services/api";

import type {
  Service,
  Professional,
  Review,
  Booking,
  Notification,
} from "@/types";
import {
  services as fallbackServices,
  professionals as fallbackProfessionals,
} from "@/data/mockData";

function shouldUseSeededFallback(error: unknown) {
  if (axios.isAxiosError(error)) {
    return !error.response || [404, 502, 503].includes(error.response.status);
  }

  return error instanceof Error && error.message.includes("API returned an invalid collection");
}

// ======================================================
// SERVICE MAPPER
// ======================================================

function mapService(item: any): Service {
  return {
    id: item._id || item.id,
    slug: item.slug,
    name: item.name,
    category: item.category || item.slug,
    icon: item.icon || "🔧",
    image: item.image || "",
    shortDescription:
      item.shortDescription ||
      item.short_description ||
      "",
    description: item.description || "",
    startingPrice:
      item.startingPrice ||
      item.starting_price ||
      0,
    rating: Number(item.rating || 0),
    reviewCount:
      item.reviewCount ||
      item.review_count ||
      0,
    popular: item.popular || false,
    bookedCount:
      item.bookedCount ||
      item.booked_count ||
      0,
    whatsIncluded:
      item.whatsIncluded ||
      item.whats_included ||
      [],
    whatsNotIncluded:
      item.whatsNotIncluded ||
      item.whats_not_included ||
      [],
    faqs: item.faqs || [],
  };
}

// ======================================================
// PROFESSIONAL MAPPER
// ======================================================

function mapProfessional(item: any): Professional {
  return {
    id: item._id || item.id,
    name: item.name,
    profession: item.profession || "",
    avatar: item.avatar || "",
    rating: Number(item.rating || 0),
    reviewCount:
      item.reviewCount ||
      item.review_count ||
      0,
    experience: item.experience || 0,
    completedJobs:
      item.completedJobs ||
      item.completed_jobs ||
      0,
    location: item.location || "",
    startingPrice:
      item.startingPrice ||
      item.starting_price ||
      0,
    verified: item.verified || false,
    online: item.online || false,
    bio: item.bio || "",
    skills: item.skills || [],
    services:
      item.services ||
      item.services_list ||
      [],
    availability: item.availability || [],
    portfolio: item.portfolio || [],
  };
}

// ======================================================
// BOOKING MAPPER
// ======================================================

function mapBooking(item: any): Booking {
  return {
    id: item._id || item.id,

    serviceId:
      item.serviceId ||
      item.service_id ||
      item.service?._id ||
      item.service ||
      "",

    serviceName:
      item.serviceName ||
      item.service_name ||
      item.service?.name ||
      "",

    serviceIcon:
      item.serviceIcon ||
      item.service_icon ||
      item.service?.icon ||
      "🔧",

    professionalId:
      item.professionalId ||
      item.professional_id ||
      item.professional?._id ||
      item.professional ||
      "",

    professionalName:
      item.professionalName ||
      item.professional_name ||
      item.professional?.name ||
      "",

    professionalAvatar:
      item.professionalAvatar ||
      item.professional_avatar ||
      item.professional?.avatar ||
      "",

    customerId:
      item.customerId ||
      item.userId ||
      item.user_id ||
      item.customer?._id ||
      item.user?._id ||
      "",

    customerName:
      item.customerName ||
      item.customer?.name ||
      item.user?.name ||
      "",

    date: item.date || "",
    time: item.time || "",
    address: item.address || "",
    price: Number(item.price || 0),

    status: item.status || "pending",

    paymentStatus:
      item.paymentStatus ||
      item.payment_status ||
      "pending",

    createdAt:
      item.createdAt ||
      item.created_at ||
      new Date().toISOString(),
  } as Booking;
}

// ======================================================
// REVIEW MAPPER
// ======================================================

function mapReview(item: any): Review {
  const createdDate =
    item.createdAt ||
    item.created_at ||
    new Date().toISOString();

  return {
    id: item._id || item.id,

    author:
      item.author ||
      item.user?.name ||
      "Anonymous",

    avatar:
      item.avatar ||
      item.user?.avatar ||
      "",

    rating: Number(item.rating || 0),

    text: item.text || "",

    serviceUsed:
      item.serviceUsed ||
      item.service_used ||
      item.service?.name ||
      "",

    date: new Date(createdDate).toLocaleDateString("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),

    professional:
      item.professionalName ||
      item.professional ||
      item.professional?.name ||
      undefined,
  };
}

// ======================================================
// NOTIFICATION MAPPER
// ======================================================

function mapNotification(item: any): Notification {
  const createdDate =
    item.createdAt ||
    item.created_at ||
    new Date().toISOString();

  return {
    id: item._id || item.id,

    type: item.type || "info",

    title: item.title || "",

    message: item.message || "",

    read: item.read || false,

    createdAt: new Date(createdDate).toLocaleDateString(
      "en",
      {
        day: "numeric",
        month: "short",
      }
    ),
  } as Notification;
}

// ======================================================
// SERVICES
// ======================================================

export function useServices() {
  return useQuery({
    queryKey: ["services"],

    queryFn: async () => {
      try {
        const response = await api.get("/services");
        const services =
          response.data.services ||
          response.data.data ||
          response.data;

        if (!Array.isArray(services)) {
          throw new Error("Services API returned an invalid collection");
        }

        return services.map(mapService);
      } catch (error) {
        if (!shouldUseSeededFallback(error)) throw error;
        console.warn("Services API unavailable; showing seeded services.", error);
        return fallbackServices;
      }
    },
  });
}

// ======================================================
// SINGLE SERVICE
// ======================================================

export function useService(slug: string | undefined) {
  return useQuery({
    queryKey: ["service", slug],

    queryFn: async () => {
      if (!slug) return null;

      const response = await api.get(`/services/${slug}`);

      const service =
        response.data.service ||
        response.data.data ||
        response.data;

      return mapService(service);
    },

    enabled: !!slug,
  });
}

// ======================================================
// PROFESSIONALS
// ======================================================

export function useProfessionals() {
  return useQuery({
    queryKey: ["professionals"],

    queryFn: async () => {
      try {
        const response = await api.get("/professionals");
        const professionals =
          response.data.professionals ||
          response.data.data ||
          response.data;

        if (!Array.isArray(professionals)) {
          throw new Error("Professionals API returned an invalid collection");
        }

        return professionals.map(mapProfessional);
      } catch (error) {
        if (!shouldUseSeededFallback(error)) throw error;
        console.warn("Professionals API unavailable; showing seeded professionals.", error);
        return fallbackProfessionals;
      }
    },
  });
}

// ======================================================
// SINGLE PROFESSIONAL
// ======================================================

export function useProfessional(id: string | undefined) {
  return useQuery({
    queryKey: ["professional", id],

    queryFn: async () => {
      if (!id) return null;

      const response = await api.get(`/professionals/${id}`);

      const professional =
        response.data.professional ||
        response.data.data ||
        response.data;

      return mapProfessional(professional);
    },

    enabled: !!id,
  });
}

// ======================================================
// REVIEWS
// ======================================================

export function useReviews(serviceName?: string) {
  return useQuery({
    queryKey: ["reviews", serviceName],

    queryFn: async () => {
      const response = await api.get("/reviews", {
        params: serviceName
          ? { serviceName }
          : {},
      });

      const reviews =
        response.data.reviews ||
        response.data.data ||
        response.data;

      return reviews.map(mapReview);
    },
  });
}

// ======================================================
// USER BOOKINGS
// ======================================================

export function useBookings(userId: string | undefined) {
  return useQuery({
    queryKey: ["bookings", userId],

    queryFn: async () => {
      if (!userId) return [];

      const response = await api.get("/bookings/my");

      const bookings =
        response.data.bookings ||
        response.data.data ||
        response.data;

      return bookings.map(mapBooking);
    },

    enabled: !!userId,
  });
}

// ======================================================
// CREATE BOOKING
// ======================================================

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking: any) => {
      const response = await api.post(
        "/bookings",
        booking
      );

      return (
        response.data.booking ||
        response.data.data ||
        response.data
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}

// ======================================================
// UPDATE BOOKING STATUS
// ======================================================

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }) => {
      const response = await api.put(
        `/bookings/${id}/status`,
        { status }
      );

      return (
        response.data.booking ||
        response.data.data ||
        response.data
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}

// ======================================================
// NOTIFICATIONS
// ======================================================

export function useNotifications(
  userId: string | undefined
) {
  return useQuery({
    queryKey: ["notifications", userId],

    queryFn: async () => {
      if (!userId) return [];

      const response = await api.get(
        "/notifications"
      );

      const notifications =
        response.data.notifications ||
        response.data.data ||
        response.data;

      return notifications.map(
        mapNotification
      );
    },

    enabled: !!userId,
  });
}

// ======================================================
// MARK NOTIFICATION AS READ
// ======================================================

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.put(
        `/notifications/${id}/read`
      );

      return (
        response.data.notification ||
        response.data.data ||
        response.data
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
}

// ======================================================
// CREATE REVIEW
// ======================================================

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: any) => {
      const response = await api.post(
        "/reviews",
        review
      );

      return (
        response.data.review ||
        response.data.data ||
        response.data
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });
}