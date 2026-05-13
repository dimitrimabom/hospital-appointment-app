'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/10 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-6xl font-bold text-primary/50">403</div>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this resource. Contact your administrator if you believe this is an error.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90">Back to Dashboard</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline">Sign In Again</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
