'use server';

/**
 * @fileOverview An AI agent that retrieves and analyzes satellite imagery to detect anomalies at mining sites.
 *
 * - analyzeSatelliteImage - A function that handles the retrieval and analysis of satellite imagery.
 * - AnalyzeSatelliteImageInput - The input type for the analyzeSatelliteImage function.
 * - AnalyzeSatelliteImageOutput - The return type for the analyzeSatelliteImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSatelliteImageInputSchema = z.object({
  imageUrl: z
    .string()
    .describe("The URL of the satellite image to analyze.  It must be a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  siteDescription: z.string().describe('A description of the mining site.'),
});
export type AnalyzeSatelliteImageInput = z.infer<
  typeof AnalyzeSatelliteImageInputSchema
>;

const AnalyzeSatelliteImageOutputSchema = z.object({
  anomalyDetected: z
    .boolean()
    .describe('Whether or not anomalies were detected in the image.'),
  anomalyDescription: z
    .string()
    .describe('A description of the anomalies detected in the image.'),
});
export type AnalyzeSatelliteImageOutput = z.infer<
  typeof AnalyzeSatelliteImageOutputSchema
>;

export async function analyzeSatelliteImage(
  input: AnalyzeSatelliteImageInput
): Promise<AnalyzeSatelliteImageOutput> {
  return analyzeSatelliteImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSatelliteImagePrompt',
  input: {schema: AnalyzeSatelliteImageInputSchema},
  output: {schema: AnalyzeSatelliteImageOutputSchema},
  prompt: `You are an expert in analyzing satellite images for environmental anomalies at mining sites.

You will analyze the provided satellite image of the mining site and determine if there are any anomalies present.
Anomalies can include unusual changes in vegetation, water bodies, or land use patterns.

Respond whether an anomaly was detected, and if so, provide a detailed description of the anomaly including specific coordinates if possible.

Site Description: {{{siteDescription}}}
Satellite Image: {{media url=imageUrl}}

Consider these points when assessing for anomalies:
1.  **Vegetation Health**: Look for signs of vegetation stress or deforestation.
2.  **Water Body Changes**: Check for alterations in water bodies, such as pollution or depletion.
3.  **Land Use Changes**: Monitor for any unauthorized land use or expansion of mining activities.
4. **Erosion**: Note areas where erosion may be occuring, such as via deforestation.
`,
});

const analyzeSatelliteImageFlow = ai.defineFlow(
  {
    name: 'analyzeSatelliteImageFlow',
    inputSchema: AnalyzeSatelliteImageInputSchema,
    outputSchema: AnalyzeSatelliteImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
