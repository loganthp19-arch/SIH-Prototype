'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  generateSustainabilityReport,
  GenerateSustainabilityReportOutput,
} from '@/ai/flows/automated-sustainability-reports';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '../ui/scroll-area';

const formSchema = z.object({
  miningSiteId: z.string().min(1, 'Mining Site ID is required.'),
  reportFormat: z.enum(['PDF', 'CSV']),
  environmentalData: z.string().optional(),
  siteMetrics: z.string().optional(),
});

export default function SustainabilityReportGenerator() {
  const [report, setReport] = useState<GenerateSustainabilityReportOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      miningSiteId: 'MS-001',
      reportFormat: 'PDF',
      environmentalData: 'Air Quality: 45 AQI, Water pH: 7.2',
      siteMetrics: 'Extraction Rate: 1200 tons/day, Energy Use: 150 MWh/day',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setReport(null);
    try {
      const result = await generateSustainabilityReport(values);
      setReport(result);
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate sustainability report.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Sustainability Report Generator</CardTitle>
        <CardDescription>Automatically generate reports based on site data.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex-grow space-y-4">
            <FormField
              control={form.control}
              name="miningSiteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mining Site ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., MS-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reportFormat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Format</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="environmentalData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Environmental Data (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter environmental data..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="siteMetrics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Metrics (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter site metrics..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Report'
              )}
            </Button>
            {report && (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-4 w-4" />
                    Generated Report ({report.reportFormat})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48 w-full rounded-md border p-4 font-mono text-xs">
                    <pre className="whitespace-pre-wrap">{report.reportContent}</pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
