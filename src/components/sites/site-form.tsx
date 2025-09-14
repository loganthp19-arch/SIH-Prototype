'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { addSite, updateSite } from '@/lib/firebase/sites';
import type { MiningSite } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Site name is required.'),
  location: z.string().min(1, 'Location is required.'),
  operator: z.string().min(1, 'Operator is required.'),
  status: z.enum(['Active', 'Inactive', 'Decommissioned']),
  extractionRate: z.coerce.number().min(0, 'Must be a positive number.'),
  energyConsumption: z.coerce.number().min(0, 'Must be a positive number.'),
  waterUsage: z.coerce.number().min(0, 'Must be a positive number.'),
});

type SiteFormValues = z.infer<typeof formSchema>;

interface SiteFormProps {
  site?: MiningSite | null;
  onSuccess?: () => void;
}

export default function SiteForm({ site, onSuccess }: SiteFormProps) {
  const { toast } = useToast();
  const form = useForm<SiteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: site?.name ?? '',
      location: site?.location ?? '',
      operator: site?.operator ?? '',
      status: site?.status ?? 'Active',
      extractionRate: site?.operationalData.extractionRate ?? 0,
      energyConsumption: site?.operationalData.energyConsumption ?? 0,
      waterUsage: site?.operationalData.waterUsage ?? 0,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: SiteFormValues) {
    try {
      const siteData: Partial<MiningSite> = {
        name: values.name,
        location: values.location,
        operator: values.operator,
        status: values.status,
        operationalData: {
          extractionRate: values.extractionRate,
          energyConsumption: values.energyConsumption,
          waterUsage: values.waterUsage,
        },
      };

      if (site) {
        await updateSite({ ...siteData, id: site.id } as MiningSite);
        toast({ title: 'Success', description: 'Site updated successfully.' });
      } else {
        await addSite(siteData as Omit<MiningSite, 'id'>);
        toast({ title: 'Success', description: 'Site added successfully.' });
        form.reset();
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving site:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save site.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Azure Quarry" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Nevada, USA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="operator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operator</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., GeoCore Mining Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Decommissioned">Decommissioned</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Operational Data
          </h3>
          <div className="grid grid-cols-1 gap-6 rounded-lg border p-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="extractionRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extraction (tons/day)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="energyConsumption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Energy (MWh/day)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waterUsage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Water (m³/day)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
            {site ? 'Update Site' : 'Add Site'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
