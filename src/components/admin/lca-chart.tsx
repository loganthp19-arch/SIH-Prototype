'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent
} from '@/components/ui/chart';
import type { LcaData } from '@/lib/types';

type LcaChartProps = {
  data: LcaData[];
};

const chartConfig = {
  carbonFootprint: {
    label: 'Carbon Footprint (tCO₂e)',
    color: 'hsl(var(--chart-1))',
  },
  waterFootprint: {
    label: 'Water Footprint (m³)',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function LcaChart({ data }: LcaChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis yAxisId="left" stroke="hsl(var(--chart-1))" />
          <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Bar dataKey="carbonFootprint" fill="var(--color-carbonFootprint)" radius={4} yAxisId="left" />
          <Bar dataKey="waterFootprint" fill="var(--color-waterFootprint)" radius={4} yAxisId="right" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
