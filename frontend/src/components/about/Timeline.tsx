import { Milestone } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface TimelineProps {
  milestones: Milestone[];
}

export function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="space-y-8">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="relative">
          {index !== milestones.length - 1 && (
            <div className="absolute left-4 top-8 h-full w-0.5 bg-border" />
          )}
          <Card>
            <CardContent className="flex gap-4 p-6">
              <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <span className="text-sm font-medium text-primary-foreground">
                  {milestone.year}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{milestone.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{milestone.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}