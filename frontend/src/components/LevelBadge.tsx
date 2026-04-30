import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getLevelColor } from '@/data/mockData';
import { Award } from 'lucide-react';

interface LevelBadgeProps {
  level: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LevelBadge({ level, size = 'sm' }: LevelBadgeProps) {
  if (level === 'none') return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <Badge className={cn(
      "bg-gradient-to-r border-0 font-semibold capitalize gap-1",
      getLevelColor(level),
      sizeClasses[size]
    )}>
      <Award className={cn(size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5')} />
      {level}
    </Badge>
  );
}
