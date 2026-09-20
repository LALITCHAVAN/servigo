import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import api from "../services/api";

import type {
  Service,
  Professional,
  Review,
  Booking,
  Notification,
} from "@/types";

// ======================================================
// CATEGORY NORMALIZER
// ======================================================

function normalizeCategory(category: any): string {
  if (!category) return "";

  const value = String(category)
    .trim()
    .toLowerCase();

  const categoryMap: Record<string, string> = {
    "ac repair": "ac-repair",
    "ac-repair": "ac-repair",

    plumbing: "plumbing",

    electrician: "electrician",

    "home cleaning": "home-cleaning",
    "home-cleaning": "home-cleaning",

    "appliance repair": "appliance-repair",
    "appliance-repair": "appliance-repair",

    carpentry: "carpentry",

    painting: "painting",

    salon: "salon",
    tutor: "tutor",
    fitness: "fitness",
    photography: "photography",
  };

  if (categoryMap[value]) {
    return categoryMap[value];
  }

  return value.replace(/\s+/g, "-");
}

// ======================================================
// SERVICE MAPPER
// ======================================================

function mapService(item: any): Service {
  return {
    id: item._id || item.id || "",

    slug:
      item.slug ||
      String(item.name || item.title || "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-"),

    name: item.name || item.title || "",

    category: normalizeCategory(
      item.category ||
        item.categoryName ||
        item.type
    ),

    icon: item.icon || "🔧",

    image: item.image || "",

    shortDescription:
      item.shortDescription ||
      item.short_description ||
      item.description ||
      "",

    description: item.description || "",

    startingPrice: Number(
      item.startingPrice ??
        item.starting_price ??
        item.price ??
        0
    ),

    rating: Number(item.rating || 0),

    reviewCount: Number(
      item.reviewCount ??
        item.review_count ??
        0
    ),

    popular: Boolean(item.popular),

    bookedCount: Number(
      item.bookedCount ??
        item.booked_count ??
        0
    ),

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
    id: item._id || item.id || "",

    name: item.name || "",

    profession: item.profession || "",

    avatar: item.avatar || "",

    rating: Number(item.rating || 0),

    reviewCount: Number(
      item.reviewCount ??
        item.review_count ??
        0
    ),

    experience: Number(
      item.experience || 0
    ),

    completedJobs: Number(
      item.completedJobs ??
        item.completed_jobs ??
        0
    ),

    location: item.location || "",

    startingPrice: Number(
      item.startingPrice ??
        item.starting_price ??
        0
    ),

    verified: Boolean(item.verified),

    online: Boolean(item.online),

    bio: item.bio || "",

    skills: item.skills || [],

    services:
      item.services ||
      item.services_list ||
      [],

    availability:
      item.availability || [],

    portfolio:
      item.portfolio || [],
  };
}

// ======================================================
// BOOKING MAPPER
// ======================================================

function mapBooking(item: any): Booking {
  return {
    id: item._id || item.id || "",

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
      item.service?.title ||
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
    id: item._id || item.id || "",

    author:
      item.author ||
      item.user?.name ||
      "Anonymous",

    avatar:
      item.avatar ||
      item.user?.avatar ||
      "",

    rating: Number(item.rating || 0),

    text:
      item.text ||
      item.comment ||
      "",

    serviceUsed:
      item.serviceUsed ||
      item.service_used ||
      item.service?.name ||
      item.service?.title ||
      "",

    date: new Date(
      createdDate
    ).toLocaleDateString("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),

    professional:
      item.professionalName ||
      (typeof item.professional === "object"
        ? item.professional?.name
        : item.professional) ||
      undefined,
  };
}

// ======================================================
// NOTIFICATION MAPPER
// ======================================================

function mapNotification(
  item: any
): Notification {
  const createdDate =
    item.createdAt ||
    item.created_at ||
    new Date().toISOString();

  return {
    id: item._id || item.id || "",

    type: item.type || "info",

    title: item.title || "",

    message: item.message || "",

    read: Boolean(item.read),

    createdAt: new Date(
      createdDate
    ).toLocaleDateString("en", {
      day: "numeric",
      month: "short",
    }),
  } as Notification;
}

// ======================================================
// SERVICES
// ======================================================

export function useServices(
  category?: string
) {
  return useQuery({
    queryKey: [
      "services",
      category,
    ],

    queryFn: async () => {
      console.log(
        "FETCHING SERVICES..."
      );

      console.log(
        "SELECTED CATEGORY:",
        category
      );

      const response = await api.get(
        "/services",
        {
          params: category
            ? {
                category,
              }
            : {},
        }
      );

      console.log(
        "SERVICES API RESPONSE:",
        response.data
      );

      const serviceData =
        response.data?.services ??
        response.data?.data ??
        response.data;

      if (!Array.isArray(serviceData)) {
        console.error(
          "INVALID SERVICES RESPONSE:",
          response.data
        );

        throw new Error(
          "Services API returned an invalid collection"
        );
      }

      const mappedServices =
        serviceData.map(mapService);

      console.log(
        "MAPPED SERVICES:",
        mappedServices
      );

      console.log(
        "SERVICES COUNT:",
        mappedServices.length
      );

      return mappedServices;
    },

    retry: 1,

    staleTime: 30 * 1000,
  });
}

// ======================================================
// SINGLE SERVICE
// ======================================================

export function useService(
  slug: string | undefined
) {
  return useQuery({
    queryKey: [
      "service",
      slug,
    ],

    queryFn: async () => {
      if (!slug) {
        return null;
      }

      const response = await api.get(
        `/services/${slug}`
      );

      console.log(
        "SINGLE SERVICE RESPONSE:",
        response.data
      );

      const service =
        response.data?.service ??
        response.data?.data ??
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
    queryKey: [
      "professionals",
    ],

    queryFn: async () => {
      const response = await api.get(
        "/professionals"
      );

      const professionalData =
        response.data?.professionals ??
        response.data?.data ??
        response.data;

      if (
        !Array.isArray(
          professionalData
        )
      ) {
        throw new Error(
          "Professionals API returned an invalid collection"
        );
      }

      return professionalData.map(
        mapProfessional
      );
    },
  });
}

// ======================================================
// SINGLE PROFESSIONAL
// ======================================================

export function useProfessional(
  id: string | undefined
) {
  return useQuery({
    queryKey: [
      "professional",
      id,
    ],

    queryFn: async () => {
      if (!id) {
        return null;
      }

      const response = await api.get(
        `/professionals/${id}`
      );

      const professional =
        response.data?.professional ??
        response.data?.data ??
        response.data;

      return mapProfessional(
        professional
      );
    },

    enabled: !!id,
  });
}

// ======================================================
// REVIEWS
// ======================================================

export function useReviews(
  serviceName?: string
) {
  return useQuery({
    queryKey: [
      "reviews",
      serviceName,
    ],

    queryFn: async () => {
      const response = await api.get(
        "/reviews",
        {
          params: serviceName
            ? { serviceName }
            : {},
        }
      );

      const reviews =
        response.data?.reviews ??
        response.data?.data ??
        response.data;

      if (!Array.isArray(reviews)) {
        return [];
      }

      return reviews.map(
        mapReview
      );
    },
  });
}

// ======================================================
// USER BOOKINGS
// ======================================================

export function useBookings(
  userId: string | undefined
) {
  return useQuery({
    queryKey: [
      "bookings",
      userId,
    ],

    queryFn: async () => {
      if (!userId) {
        return [];
      }

      const response = await api.get(
        "/bookings/my"
      );

      const bookings =
        response.data?.bookings ??
        response.data?.data ??
        response.data;

      if (!Array.isArray(bookings)) {
        return [];
      }

      return bookings.map(
        mapBooking
      );
    },

    enabled: !!userId,
  });
}

// ======================================================
// CREATE BOOKING
// ======================================================

export function useCreateBooking() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      booking: any
    ) => {
      const response =
        await api.post(
          "/bookings",
          booking
        );

      return (
        response.data?.booking ??
        response.data?.data ??
        response.data
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "bookings",
        ],
      });
    },
  });
}

// ======================================================
// UPDATE BOOKING STATUS
// ======================================================

export function useUpdateBookingStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }) => {
      const response =
        await api.put(
          `/bookings/${id}/status`,
          {
            status,
          }
        );

      return (
        response.data?.booking ??
        response.data?.data ??
        response.data
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "bookings",
        ],
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
    queryKey: [
      "notifications",
      userId,
    ],

    queryFn: async () => {
      if (!userId) {
        return [];
      }

      const response =
        await api.get(
          "/notifications"
        );

      const notifications =
        response.data?.notifications ??
        response.data?.data ??
        response.data;

      if (
        !Array.isArray(
          notifications
        )
      ) {
        return [];
      }

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
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      id: string
    ) => {
      const response =
        await api.put(
          `/notifications/${id}/read`
        );

      return (
        response.data?.notification ??
        response.data?.data ??
        response.data
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "notifications",
        ],
      });
    },
  });
}

// ======================================================
// CREATE REVIEW
// ======================================================

export function useCreateReview() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      review: any
    ) => {
      const response =
        await api.post(
          "/reviews",
          review
        );

      return (
        response.data?.review ??
        response.data?.data ??
        response.data
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "reviews",
        ],
      });
    },
  });
}