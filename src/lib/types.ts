export type MiningSite = {
  id?: string;
  name: string;
  location: string;
  operator: string;
  status: 'Active' | 'Inactive' | 'Decommissioned';
  operationalData: {
    extractionRate: number; // tons/day
    energyConsumption: number; // MWh/day
    waterUsage: number; // m³/day
  };
};

export type EnvironmentalDataPoint = {
  date: string;
  value: number;
};

export type EnvironmentalData = {
  airQuality: EnvironmentalDataPoint[]; // AQI
  weather: {
    temperature: EnvironmentalDataPoint[]; // Celsius
    humidity: EnvironmentalDataPoint[]; // %
    windSpeed: EnvironmentalDataPoint[]; // km/h
  };
  sensorReadings: {
    co2: EnvironmentalDataPoint[]; // ppm
    particulateMatter: EnvironmentalDataPoint[]; // µg/m³
  };
};

export type LcaData = {
  month: string;
  carbonFootprint: number; // tCO2e
  waterFootprint: number; // m³
  landUse: number; // km²
};
