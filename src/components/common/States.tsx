import { motion } from 'framer-motion';
import { AlertCircle, RotateCw } from 'lucide-react';

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 border-3 border-primary-200 border-t-primary-600 rounded-full"
      />
      <p className="mt-4 text-sm text-ink-500">{message}</p>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 rounded-2xl bg-error-50 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-error-500" />
      </div>
      <p className="text-lg font-semibold text-ink-900 mb-1">Something went wrong</p>
      <p className="text-sm text-ink-500 mb-4">We couldn't load the data. Please try again.</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          <RotateCw className="w-4 h-4" /> Try Again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title, message, actionLabel, onAction }: {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="text-lg font-semibold text-ink-700 mb-1">{title}</p>
      <p className="text-sm text-ink-500 mb-4">{message}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-primary">{actionLabel}</button>
      )}
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-ink-100 overflow-hidden">
      <div className="skeleton h-44 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-1/2" />
        <div className="flex justify-between items-center pt-3 border-t border-ink-100">
          <div className="skeleton h-6 w-16" />
          <div className="skeleton h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProfessionalCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-ink-100 p-5">
      <div className="flex items-start gap-4">
        <div className="skeleton w-16 h-16 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-5 w-2/3" />
          <div className="skeleton h-3 w-1/2" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
      </div>
      <div className="skeleton h-10 w-full mt-4 rounded-xl" />
    </div>
  );
}
