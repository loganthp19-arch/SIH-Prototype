import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

const users = [
    { name: 'Admin User', email: 'admin@terralens.com', role: 'Admin', status: 'Active' },
    { name: 'Site Manager', email: 'manager@terralens.com', role: 'Manager', status: 'Active' },
    { name: 'Data Analyst', email: 'analyst@terralens.com', role: 'Analyst', status: 'Inactive' },
]

export default function UserManagement() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="font-headline text-xl">User Management</CardTitle>
            <CardDescription>
                Manage user accounts and permissions.
            </CardDescription>
        </div>
        <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4"/>
            Add User
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.email}>
                            <TableCell>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                            </TableCell>
                            <TableCell>
                                {user.role}
                            </TableCell>
                            <TableCell>
                                <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>{user.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
