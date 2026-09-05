import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Wrench,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { fadeUp, staggerContainer } from "@/animations/variants";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const from =
    (location.state as { from?: string })?.from || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);

      navigate(from);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-ink-50">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>

            <span className="font-sans font-extrabold text-xl text-ink-900">
              Servi<span className="text-primary-600">Go</span>
            </span>
          </Link>

          <motion.div variants={fadeUp}>
            <h1 className="font-sans font-extrabold text-3xl text-ink-900">
              Welcome back
            </h1>

            <p className="mt-2 text-ink-500">
              Sign in to manage your bookings and services.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-error-50 border border-error-200 text-error-700 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />

                  {error}
                </motion.div>
              )}
            </AnimatePresence>

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
                  onChange={(e) => setEmail(e.target.value)}
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base pl-11 pr-11"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
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

            {/* Remember */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                  className="w-4 h-4 rounded accent-primary-600"
                />

                <span className="text-sm text-ink-600">
                  Remember me
                </span>
              </label>

              <Link
                to="/login"
                className="text-sm text-primary-600 font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </motion.div>

            {/* Login Button */}
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
                  Login
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-ink-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>

          <div className="mt-6 p-4 rounded-xl bg-primary-50 border border-primary-100 text-sm text-ink-600">
            <p className="font-semibold text-ink-900 mb-1">
              Demo Account
            </p>

            <p>
              Please create an account first using the Register
              page.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right side */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent-400/20 blur-3xl" />

        <div className="relative flex flex-col justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="font-sans font-extrabold text-4xl leading-tight text-balance">
              Trusted Services, Right at Your Doorstep
            </h2>

            <p className="mt-4 text-lg text-primary-100 max-w-md">
              Join thousands of customers who trust ServiGo for
              their home and personal service needs.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "10,000+ bookings completed",
                "500+ verified professionals",
                "4.8 average rating",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.1,
                  }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle className="w-5 h-5 text-accent-300" />

                  <span className="text-primary-100">
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