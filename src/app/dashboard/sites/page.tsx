import { PlusCircle } from 'lucide-react';
import SitesTable from '@/components/sites/sites-table';
import SiteForm from '@/components/sites/site-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function SitesPage() {

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Mining Site Management
          </h1>
          <p className="text-muted-foreground">
            View, add, and manage your mining locations.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Site
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-xl">
                Add New Mining Site
              </DialogTitle>
              <DialogDescription>
                Fill in the details below to register a new site.
              </DialogDescription>
            </DialogHeader>
            <SiteForm />
          </DialogContent>
        </Dialog>
      </div>
      <SitesTable />
    </div>
  );
}
