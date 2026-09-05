import { BadgeCheck, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Professional } from '@/types';
import { RatingStars } from '@/components/common/RatingStars';
import { hoverAnimations } from '@/animations/variants';

export function ProfessionalCard({ pro, index = 0 }: { pro: Professional; index?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] } },
      }}
      {...hoverAnimations.lift}
      className="group bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={pro.avatar}
              alt={pro.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-ink-100"
            />
            {pro.online && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-sans font-bold text-ink-900 truncate">{pro.name}</h3>
              {pro.verified && <BadgeCheck className="w-4 h-4 text-primary-500 shrink-0" />}
            </div>
            <p className="text-sm text-ink-500">{pro.profession}</p>
            <div className="flex items-center gap-2 mt-1">
              <RatingStars rating={pro.rating} size={14} />
              <span className="text-xs font-semibold text-ink-700">{pro.rating}</span>
              <span className="text-xs text-ink-400">({pro.reviewCount})</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          <div className="flex items-center gap-1.5 text-ink-600">
            <Clock className="w-4 h-4 text-ink-400" />
            <span>{pro.experience} yrs exp</span>
          </div>
          <div className="flex items-center gap-1.5 text-ink-600">
            <MapPin className="w-4 h-4 text-ink-400" />
            <span>{pro.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink-100">
          <div>
            <span className="text-xs text-ink-400">Starting at</span>
            <p className="font-bold text-ink-900">₹{pro.startingPrice}</p>
          </div>
          <span className="text-xs text-ink-500">{pro.completedJobs} jobs done</span>
        </div>

        <Link
          to={`/professionals/${pro.id}`}
          className="mt-4 w-full btn-primary text-sm"
        >
          View Profile
        </Link>
      </div>
    </motion.div>
  );
}
