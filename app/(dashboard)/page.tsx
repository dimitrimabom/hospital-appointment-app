'use client';

import { useAuth } from '@/lib/auth-context';
import { useAppointments } from '@/lib/use-mock-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const { appointments, isLoading } = useAppointments(user?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string, timeString: string) => {
    return `${new Date(dateString).toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })} à ${timeString}`;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">
          {user?.role === 'patient' && 'Manage your medical appointments and health records'}
          {user?.role === 'doctor' && 'View your schedule and patient appointments'}
          {user?.role === 'admin' && 'Monitor the hospital appointment system'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{appointments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {appointments.filter((a) => a.status === 'confirmed').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Scheduled appointments</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {appointments.filter((a) => a.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Finished visits</p>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Your recent medical appointments</CardDescription>
            </div>
            {user?.role === 'patient' && (
              <Link href="/appointments/book">
                <Button className="bg-primary hover:bg-primary/90">Book Appointment</Button>
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : appointments.length > 0 ? (
            <div className="space-y-3">
              {appointments.slice(0, 5).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-start justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{appointment.doctorName}</p>
                    <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(appointment.appointmentDate, appointment.appointmentTime)}</p>
                  </div>
                  <Badge className={`${getStatusColor(appointment.status)} border-0`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No appointments yet</p>
              {user?.role === 'patient' && (
                <Link href="/appointments/book">
                  <Button variant="outline" className="mt-4">
                    Book your first appointment
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
