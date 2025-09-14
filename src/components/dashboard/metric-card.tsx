import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight, LucideIcon } from 'lucide-react';

type MetricCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: 'increase' | 'decrease';
  note: string;
};

export default function MetricCard({
  title,
  value,
  icon: Icon,
  change,
  changeType,
  note,
}: MetricCardProps) {
  const isIncrease = changeType === 'increase';
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {change && changeType && (
            <div
              className={cn('flex items-center', {
                'text-destructive': isIncrease,
                'text-green-600': !isIncrease,
              })}
            >
              {isIncrease ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span className="mr-1">{change}</span>
            </div>
          )}
          <span>{note}</span>
        </div>
      </CardContent>
    </Card>
  );
}
