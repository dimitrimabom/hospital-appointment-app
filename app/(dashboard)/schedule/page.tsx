'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProtectedRoute } from '@/components/protected-route';

export default function DoctorSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const appointments = [
    {
      id: 1,
      time: '09:00 AM',
      patient: 'John Smith',
      type: 'General Checkup',
      status: 'confirmed',
    },
    {
      id: 2,
      time: '09:30 AM',
      patient: 'Sarah Johnson',
      type: 'Follow-up',
      status: 'confirmed',
    },
    {
      id: 3,
      time: '10:00 AM',
      patient: 'Michael Brown',
      type: 'Consultation',
      status: 'pending',
    },
    {
      id: 4,
      time: '11:00 AM',
      patient: 'Emily Davis',
      type: 'General Checkup',
      status: 'confirmed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute requiredRoles={['doctor']}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Schedule</h1>
          <p className="text-muted-foreground">View and manage your appointments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Schedule Info */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm sticky top-20">
              <CardHeader>
                <CardTitle className="text-base">Schedule Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Today&apos;s Stats</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Appointments</span>
                      <span className="font-semibold text-foreground">{appointments.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confirmed</span>
                      <span className="font-semibold text-green-600">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-semibold text-yellow-600">1</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments Timeline */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>Your appointments for {selectedDate}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-foreground">{appointment.time}</p>
                          <p className="text-sm text-muted-foreground">{appointment.patient}</p>
                        </div>
                        <Badge className={`${getStatusColor(appointment.status)} border-0`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{appointment.type}</p>
                      <div className="flex gap-2">
                        <button className="text-xs px-3 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                          View Patient
                        </button>
                        <button className="text-xs px-3 py-1 rounded bg-secondary/50 text-foreground hover:bg-secondary transition-colors">
                          Notes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {appointments.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No appointments scheduled for this date</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
