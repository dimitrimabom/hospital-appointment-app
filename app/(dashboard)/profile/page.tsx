'use client';

import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <Button variant="outline">Change Avatar</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <Input
                      type="text"
                      defaultValue={user?.name || ''}
                      className="mt-1 bg-background border-input/50"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <Input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="mt-1 bg-background border-input/50"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <Input
                      type="tel"
                      defaultValue={user?.phone || ''}
                      className="mt-1 bg-background border-input/50"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Role</label>
                    <Input
                      type="text"
                      defaultValue={user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || ''}
                      className="mt-1 bg-background border-input/50"
                      disabled
                    />
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90" disabled>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Info */}
        <div>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Account Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Member Since</p>
                <p className="text-sm text-foreground mt-1">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Account Status</p>
                <p className="text-sm text-foreground mt-1 inline-block px-2 py-1 bg-green-100 text-green-800 rounded">
                  Active
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
