import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Wrench,
  AlertCircle,
  CheckCircle,
  Briefcase,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { fadeUp, staggerContainer } from "@/animations/variants";
import type { UserRole } from "@/types";

export function RegisterPage() {
  const navigate = useNavigate();

  const { register, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [role, setRole] =
    useState<UserRole>("customer");

  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters"
      );
      return;
    }

    try {
      await register(
        name,
        email,
        password,
        role
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-ink-50">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="flex items-center gap-2 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>

            <span className="font-sans font-extrabold text-xl text-ink-900">
              Servi
              <span className="text-primary-600">
                Go
              </span>
            </span>
          </Link>

          <motion.div variants={fadeUp}>
            <h1 className="font-sans font-extrabold text-3xl text-ink-900">
              Create account
            </h1>

            <p className="mt-2 text-ink-500">
              Join ServiGo and start booking trusted
              services.
            </p>
          </motion.div>

          {/* Role selector */}
          <motion.div
            variants={fadeUp}
            className="mt-6 grid grid-cols-2 gap-3"
          >
            {[
              {
                value: "customer" as UserRole,
                label: "Customer",
                icon: User,
                desc: "Book services",
              },
              {
                value: "professional" as UserRole,
                label: "Professional",
                icon: Briefcase,
                desc: "Offer services",
              },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setRole(opt.value)}
                className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                  role === opt.value
                    ? "border-primary-500 bg-primary-50"
                    : "border-ink-200 hover:border-ink-300"
                }`}
              >
                <opt.icon
                  className={`w-5 h-5 mb-2 ${
                    role === opt.value
                      ? "text-primary-600"
                      : "text-ink-400"
                  }`}
                />

                <p
                  className={`font-semibold text-sm ${
                    role === opt.value
                      ? "text-primary-700"
                      : "text-ink-700"
                  }`}
                >
                  {opt.label}
                </p>

                <p className="text-xs text-ink-500">
                  {opt.desc}
                </p>

                {role === opt.value && (
                  <motion.div
                    layoutId="role-check"
                    className="absolute top-3 right-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                  </motion.div>
                )}
              </button>
            ))}
          </motion.div>

          {/* Register Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-error-50 border border-error-200 text-error-700 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />

                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-semibold text-ink-700 mb-1.5">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="John Doe"
                  className="input-base pl-11"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-semibold text-ink-700 mb-1.5">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  className="input-base pl-11"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-semibold text-ink-700 mb-1.5">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Min 6 characters"
                  className="input-base pl-11 pr-11"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Button */}
            <motion.button
              variants={fadeUp}
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="btn-primary w-full disabled:opacity-60"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-ink-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-accent-600 via-accent-700 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary-400/20 blur-3xl" />

        <div className="relative flex flex-col justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
          >
            <h2 className="font-sans font-extrabold text-4xl leading-tight text-balance">
              Start your journey with ServiGo
            </h2>

            <p className="mt-4 text-lg text-accent-100 max-w-md">
              Whether you're looking for services or
              offering them, ServiGo is your trusted
              partner.
            </p>

            <div className="mt-8 space-y-3">
              {[
                role === "customer"
                  ? "Book trusted professionals in minutes"
                  : "Reach thousands of customers",

                role === "customer"
                  ? "Transparent pricing, no surprises"
                  : "Manage your schedule and earnings",

                "Secure payments and real-time updates",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.5 + i * 0.1,
                  }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle className="w-5 h-5 text-white/80" />

                  <span className="text-accent-100">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}