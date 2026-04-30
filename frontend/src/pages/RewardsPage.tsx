import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';
import LevelBadge from '@/components/LevelBadge';

const levels = [
  { name: 'Bronze', min: 5, color: 'from-orange-400 to-orange-600' },
  { name: 'Silver', min: 10, color: 'from-gray-300 to-gray-400' },
  { name: 'Gold', min: 15, color: 'from-yellow-400 to-amber-500' },
  { name: 'Diamond', min: 25, color: 'from-blue-400 to-purple-500' },
];

export default function RewardsPage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Rewards & Levels</h1>
        <p className="text-sm text-muted-foreground">Track your progress and earn badges</p>
      </div>

      <Card className="border-primary/30 bg-card glow-primary">
        <CardContent className="p-6 flex items-center gap-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${levels.find(l => l.name.toLowerCase() === user.level)?.color || 'from-muted to-muted'} flex items-center justify-center`}>
            <Award className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold">{user.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <LevelBadge level={user.level} size="md" />
              <span className="text-sm text-muted-foreground">• {user.totalContributions} contributions</span>
            </div>
            <div className="mt-2">
              <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                  style={{ width: `${Math.min((user.totalContributions / 25) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {user.totalContributions >= 25 ? 'Max level reached!' : `${25 - user.totalContributions} more to Diamond`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {levels.map(level => {
          const achieved = user.totalContributions >= level.min;
          return (
            <Card key={level.name} className={`border-border/50 bg-card transition-all ${achieved ? 'border-primary/40 glow-primary' : 'opacity-60'}`}>
              <CardContent className="p-6 text-center space-y-3">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${level.color} flex items-center justify-center mx-auto ${achieved ? '' : 'grayscale'}`}>
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold">{level.name}</h3>
                <p className="text-sm text-muted-foreground">{level.min}+ contributions</p>
                {achieved && <span className="text-xs text-success font-medium">✓ Achieved</span>}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
