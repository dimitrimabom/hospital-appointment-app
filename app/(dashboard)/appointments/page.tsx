'use client';

import { useAuth } from '@/lib/auth-context';
import { useAppointments, useDoctors, appointmentMutations } from '@/lib/use-mock-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Link from 'next/link';
import { useState } from 'react';

export default function AppointmentsPage() {
  const { user } = useAuth();
  const { appointments, isLoading, mutate } = useAppointments(user?.id);
  const { doctors, isLoading: doctorsLoading } = useDoctors();
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDoctor || !appointmentDate || !appointmentTime || !reason) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsBooking(true);
      await appointmentMutations.create({
        patientId: user?.id,
        doctorId: selectedDoctor,
        appointmentDate,
        appointmentTime,
        reason,
        notes
      });

      toast.success('Appointment booked successfully!');
      setSelectedDoctor('');
      setAppointmentDate('');
      setAppointmentTime('');
      setReason('');
      setNotes('');

      // Refresh appointments
      await mutate();
    } catch (error: any) {
      console.error('[v0] Failed to book appointment:', error);
      toast.error(error.message || 'Failed to book appointment');
    } finally {
      setIsBooking(false);
    }
  };


  const formatDate = (dateString: string, timeString: string) => {
    return `${new Date(dateString).toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })} à ${timeString}`;
  };

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
        <p className="text-muted-foreground">Manage your medical appointments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm sticky top-20">
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
              <CardDescription>Schedule a new visit</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Doctor</label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    disabled={isBooking}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm"
                  >
                    <option value="">Choose a doctor...</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    disabled={isBooking}
                    className="bg-background border-input/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    disabled={isBooking}
                    className="bg-background border-input/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Reason for Visit *</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    disabled={isBooking}
                    placeholder="Describe your reason for visit..."
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-none h-16"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={isBooking}
                    placeholder="Additional information..."
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-none h-16"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isBooking}
                >
                  {isBooking ? 'Booking...' : 'Book Appointment'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Your Appointments</CardTitle>
              <CardDescription>All your scheduled visits</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{appointment.doctorName}</p>
                          <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                        </div>
                        <Badge className={`${getStatusColor(appointment.status)} border-0`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        📅 {formatDate(appointment.appointmentDate, appointment.appointmentTime)}
                      </div>
                      {appointment.location && (
                        <div className="text-sm text-muted-foreground">
                          📍 {appointment.location}
                        </div>
                      )}
                      {appointment.notes && (
                        <div className="text-sm text-muted-foreground bg-secondary/20 p-2 rounded">
                          {appointment.notes}
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        {appointment.status === 'confirmed' && (
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No appointments booked yet</p>
                  <p className="text-sm text-muted-foreground mt-2">Use the form to book your first appointment</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
