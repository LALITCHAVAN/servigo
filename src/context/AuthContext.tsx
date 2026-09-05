import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api from "../services/api";

import type {
  User,
  UserRole,
} from "@/types";

// ==========================================
// CONTEXT TYPE
// ==========================================

interface AuthContextType {
  user: User | null;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>;

  logout: () => void;

  loading: boolean;
}

function normalizeUser(user: Partial<User> & { _id?: string }): User {
  const name = user.name?.trim() || "ServiGo User";
  return {
    id: user.id || user._id || "",
    name,
    email: user.email || "",
    role: user.role || "customer",
    avatar: user.avatar || `https://i.pravatar.cc/300?u=${encodeURIComponent(user.email || name)}`,
    phone: user.phone || "",
    location: user.location || "",
  };
}

// ==========================================
// CREATE CONTEXT
// ==========================================

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

// ==========================================
// AUTH PROVIDER
// ==========================================

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  // ========================================
  // LOAD USER WHEN APP STARTS
  // ========================================

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem(
        "servigo_token"
      );

      // No token means no login
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(
          "/auth/me"
        );

        setUser(normalizeUser(response.data.user));
      } catch (error) {
        console.error(
          "Authentication failed:",
          error
        );

        // Invalid token
        localStorage.removeItem(
          "servigo_token"
        );

        localStorage.removeItem(
          "servigo_user"
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ========================================
  // LOGIN
  // ========================================

  const login = async (
    email: string,
    password: string
  ) => {
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      const {
        token,
        user: loggedInUser,
      } = response.data;
      const normalizedUser = normalizeUser(loggedInUser);

      // Save token
      localStorage.setItem(
        "servigo_token",
        token
      );

      // Save user
      localStorage.setItem(
        "servigo_user",
        JSON.stringify(normalizedUser)
      );

      // Update state
      setUser(normalizedUser);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Login failed";

      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // REGISTER
  // ========================================

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      const {
        token,
        user: newUser,
      } = response.data;
      const normalizedUser = normalizeUser(newUser);

      // Save token
      localStorage.setItem(
        "servigo_token",
        token
      );

      // Save user
      localStorage.setItem(
        "servigo_user",
        JSON.stringify(normalizedUser)
      );

      // Update state
      setUser(normalizedUser);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Registration failed";

      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOGOUT
  // ========================================

  const logout = () => {
    localStorage.removeItem(
      "servigo_token"
    );

    localStorage.removeItem(
      "servigo_user"
    );

    setUser(null);
  };

  // ========================================
  // PROVIDER
  // ========================================

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// CUSTOM HOOK
// ==========================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}