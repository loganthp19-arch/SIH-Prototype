import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MetricCard from '@/components/dashboard/metric-card';
import { mockEnvironmentalData } from '@/lib/mock-data';
import {
  Thermometer,
  Wind,
  Droplets,
  Cloud,
  Leaf,
  Atom,
} from 'lucide-react';
import {
  EnvironmentalChart,
  EnvironmentalChartData,
} from '@/components/dashboard/environmental-chart';

const chartConfigs = [
  {
    title: 'Temperature',
    description: 'Last 30 days',
    dataKey: 'temperature',
    data: mockEnvironmentalData.weather.temperature,
    color: 'var(--color-chart-1)',
    icon: Thermometer,
  },
  {
    title: 'Air Quality Index (AQI)',
    description: 'Last 30 days',
    dataKey: 'airQuality',
    data: mockEnvironmentalData.airQuality,
    color: 'var(--color-chart-2)',
    icon: Wind,
  },
  {
    title: 'CO₂ Levels',
    description: 'Last 30 days',
    dataKey: 'co2',
    data: mockEnvironmentalData.sensorReadings.co2,
    color: 'var(--color-chart-4)',
    icon: Atom,
  },
  {
    title: 'Particulate Matter (PM2.5)',
    description: 'Last 30 days',
    dataKey: 'particulateMatter',
    data: mockEnvironmentalData.sensorReadings.particulateMatter,
    color: 'var(--color-chart-5)',
    icon: Cloud,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Global Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time environmental overview of all mining sites.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Avg. Air Quality"
          value="42 AQI"
          icon={Wind}
          change="+2.1%"
          changeType="increase"
          note="vs. last week"
        />
        <MetricCard
          title="Avg. Temperature"
          value="24°C"
          icon={Thermometer}
          change="-0.5°C"
          changeType="decrease"
          note="vs. last week"
        />
        <MetricCard
          title="Avg. Water Usage"
          value="2,550 m³"
          icon={Droplets}
          change="+50 m³"
          changeType="increase"
          note="vs. last day"
        />
        <MetricCard
          title="Active Sites"
          value="2"
          icon={Leaf}
          change=""
          note="Total 3 sites"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {chartConfigs.map((config) => (
          <Card key={config.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl">
                <config.icon className="h-5 w-5 text-primary" />
                {config.title}
              </CardTitle>
              <CardDescription>{config.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <EnvironmentalChart
                data={config.data as EnvironmentalChartData}
                dataKey="value"
                color={config.color}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
