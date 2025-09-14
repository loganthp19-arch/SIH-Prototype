import type { EnvironmentalData, LcaData } from './types';

// Mock data for charts will remain for now, will be replaced in a future step.

const generateTimeSeriesData = (days: number, min: number, max: number) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.floor(Math.random() * (max - min + 1)) + min,
    };
  });
};

export const mockEnvironmentalData: EnvironmentalData = {
  airQuality: generateTimeSeriesData(30, 20, 80),
  weather: {
    temperature: generateTimeSeriesData(30, 15, 35),
    humidity: generateTimeSeriesData(30, 40, 90),
    windSpeed: generateTimeSeriesData(30, 5, 25),
  },
  sensorReadings: {
    co2: generateTimeSeriesData(30, 400, 450),
    particulateMatter: generateTimeSeriesData(30, 10, 50),
  },
};

export const mockLcaData: LcaData[] = [
  { month: 'Jan', carbonFootprint: 4500, waterFootprint: 90000, landUse: 1.2 },
  { month: 'Feb', carbonFootprint: 4300, waterFootprint: 85000, landUse: 1.2 },
  { month: 'Mar', carbonFootprint: 4600, waterFootprint: 92000, landUse: 1.3 },
  { month: 'Apr', carbonFootprint: 4450, waterFootprint: 89000, landUse: 1.3 },
  { month: 'May', carbonFootprint: 4700, waterFootprint: 95000, landUse: 1.4 },
  { month: 'Jun', carbonFootprint: 4800, waterFootprint: 98000, landUse: 1.4 },
];
