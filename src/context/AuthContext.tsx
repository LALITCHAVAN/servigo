import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api from "../services/api";

import type { User, UserRole } from "@/types";

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

function normalizeUser(
  user: Partial<User> & { _id?: string }
): User {
  const name = user.name?.trim() || "ServiGo User";

  return {
    id: user.id || user._id || "",
    name,
    email: user.email || "",
    role: user.role || "customer",
    avatar:
      user.avatar ||
      `https://i.pravatar.cc/300?u=${encodeURIComponent(
        user.email || name
      )}`,
    phone: user.phone || "",
    location: user.location || "",
  };
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  // Only true while checking saved login on startup
  const [loading, setLoading] = useState(true);

  // ==========================================
  // CHECK EXISTING LOGIN
  // ==========================================

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("servigo_token");
      const savedUser = localStorage.getItem("servigo_user");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Restore saved user immediately
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);

          setUser(normalizeUser(parsedUser));
        } catch {
          localStorage.removeItem("servigo_user");
        }
      }

      try {
        const response = await api.get("/auth/me");

        const apiUser =
          response.data.user || response.data;

        const normalizedUser = normalizeUser(apiUser);

        setUser(normalizedUser);

        localStorage.setItem(
          "servigo_user",
          JSON.stringify(normalizedUser)
        );
      } catch (error) {
        console.error("Authentication failed:", error);

        localStorage.removeItem("servigo_token");
        localStorage.removeItem("servigo_user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (
    email: string,
    password: string
  ) => {
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      const loggedInUser = response.data.user;

      if (!token || !loggedInUser) {
        throw new Error("Invalid login response from server");
      }

      const normalizedUser =
        normalizeUser(loggedInUser);

      localStorage.setItem(
        "servigo_token",
        token
      );

      localStorage.setItem(
        "servigo_user",
        JSON.stringify(normalizedUser)
      );

      setUser(normalizedUser);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed";

      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // REGISTER
  // ==========================================

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

      const token = response.data.token;
      const newUser = response.data.user;

      if (!token || !newUser) {
        throw new Error(
          "Invalid registration response from server"
        );
      }

      const normalizedUser =
        normalizeUser(newUser);

      localStorage.setItem(
        "servigo_token",
        token
      );

      localStorage.setItem(
        "servigo_user",
        JSON.stringify(normalizedUser)
      );

      setUser(normalizedUser);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed";

      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    localStorage.removeItem("servigo_token");
    localStorage.removeItem("servigo_user");

    setUser(null);
  };

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

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}