import SustainabilityReportGenerator from "@/components/analysis/sustainability-report-generator";
import SatelliteImageAnalyzer from "@/components/analysis/satellite-image-analyzer";

export default function AnalysisPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Analysis Tools</h1>
        <p className="text-muted-foreground">
          Leverage AI to generate insights and reports from your environmental data.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
        <SustainabilityReportGenerator />
        <SatelliteImageAnalyzer />
      </div>
    </div>
  );
}
