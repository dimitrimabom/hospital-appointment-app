'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BookAppointmentPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Book an Appointment</h1>
        <p className="text-muted-foreground">Schedule a new visit with our healthcare professionals</p>
      </div>

      <div className="max-w-2xl">
        <p className="text-muted-foreground mb-4">
          To book an appointment, please visit the{' '}
          <Link href="/appointments" className="text-primary hover:underline font-medium">
            Appointments page
          </Link>{' '}
          where you can select a doctor and available time slot.
        </p>
        
        <Link href="/appointments">
          <Button className="bg-primary hover:bg-primary/90">Go to Appointments</Button>
        </Link>
      </div>
    </div>
  );
}
