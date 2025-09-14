'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

export type EnvironmentalChartData = {
  date: string;
  value: number;
}[];

type EnvironmentalChartProps = {
  data: EnvironmentalChartData;
  dataKey: string;
  color: string;
};

export function EnvironmentalChart({
  data,
  dataKey,
  color,
}: EnvironmentalChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: 'Value',
      color,
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`fill-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={30}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="value"
            type="natural"
            fill={`url(#fill-${dataKey})`}
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
