import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function RatingStars({ rating, size = 16, animate = false }: { rating: number; size?: number; animate?: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.floor(rating);
        const half = !filled && i - 0.5 <= rating;
        return (
          <motion.span
            key={i}
            initial={animate ? { opacity: 0, scale: 0 } : false}
            animate={animate ? { opacity: 1, scale: 1 } : {}}
            transition={animate ? { delay: i * 0.08, duration: 0.3 } : {}}
          >
            <Star
              style={{ width: size, height: size }}
              className={filled || half ? 'fill-amber-400 text-amber-400' : 'fill-ink-200 text-ink-200'}
            />
          </motion.span>
        );
      })}
    </div>
  );
}
