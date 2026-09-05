import {
  Wind, Wrench, Zap, Sparkles, Refrigerator, Hammer, PaintRoller,
  Scissors, GraduationCap, Dumbbell, Camera, type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Wind, Wrench, Zap, Sparkles, Refrigerator, Hammer, PaintRoller,
  Scissors, GraduationCap, Dumbbell, Camera,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={className} />;
}
