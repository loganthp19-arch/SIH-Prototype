// src/ai/flows/automated-sustainability-reports.ts
'use server';

/**
 * @fileOverview Flow for generating automated sustainability reports based on environmental data and site metrics.
 *
 * - generateSustainabilityReport - A function that triggers the report generation process.
 * - GenerateSustainabilityReportInput - The input type for the generateSustainabilityReport function.
 * - GenerateSustainabilityReportOutput - The return type for the generateSustainabilityReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSustainabilityReportInputSchema = z.object({
  miningSiteId: z.string().describe('The ID of the mining site to generate the report for.'),
  reportFormat: z.enum(['PDF', 'CSV']).describe('The desired format of the sustainability report.'),
  environmentalData: z.string().optional().describe('Environmental data for the mining site.'),
  siteMetrics: z.string().optional().describe('Site metrics for the mining site.'),
});
export type GenerateSustainabilityReportInput = z.infer<typeof GenerateSustainabilityReportInputSchema>;

const GenerateSustainabilityReportOutputSchema = z.object({
  reportContent: z.string().describe('The content of the generated sustainability report.'),
  reportFormat: z.enum(['PDF', 'CSV']).describe('The format of the generated sustainability report.'),
});
export type GenerateSustainabilityReportOutput = z.infer<typeof GenerateSustainabilityReportOutputSchema>;


export async function generateSustainabilityReport(input: GenerateSustainabilityReportInput): Promise<GenerateSustainabilityReportOutput> {
  return generateSustainabilityReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSustainabilityReportPrompt',
  input: {schema: GenerateSustainabilityReportInputSchema},
  output: {schema: GenerateSustainabilityReportOutputSchema},
  prompt: `You are an AI assistant specialized in generating sustainability reports for mining sites.

  You will receive environmental data and site metrics for a specific mining site.
  Your task is to generate a comprehensive sustainability report in the requested format ({{reportFormat}}).

  Mining Site ID: {{miningSiteId}}
  Report Format: {{reportFormat}}

  Environmental Data: {{{environmentalData}}}
  Site Metrics: {{{siteMetrics}}}

  Please ensure the report includes a summary of the environmental impact, key sustainability metrics,
  and actionable recommendations for improvement.

  If data is missing, make reasonable assumptions and clearly state them in the report. If the report format is CSV, include a header row.
`,
});

const generateSustainabilityReportFlow = ai.defineFlow(
  {
    name: 'generateSustainabilityReportFlow',
    inputSchema: GenerateSustainabilityReportInputSchema,
    outputSchema: GenerateSustainabilityReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
