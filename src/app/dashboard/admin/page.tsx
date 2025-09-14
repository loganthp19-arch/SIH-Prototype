import LcaChart from "@/components/admin/lca-chart";
import UserManagement from "@/components/admin/user-management";
import SystemSettingsForm from "@/components/admin/system-settings-form";
import { mockLcaData } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage system settings, users, and view high-level analytics.
        </p>
      </div>

      <Tabs defaultValue="settings">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-3">
          <TabsTrigger value="lca">LCA Data</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="lca">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Life Cycle Assessment (LCA) Overview</CardTitle>
              <CardDescription>
                Historical sustainability data across all active sites.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LcaChart data={mockLcaData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
            <UserManagement />
        </TabsContent>
        <TabsContent value="settings">
          <Card>
             <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <Settings className="h-5 w-5"/> System Settings
                </CardTitle>
              <CardDescription>
                Configure global application settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <SystemSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
