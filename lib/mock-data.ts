'use client'

import { User, Appointment, Doctor, Schedule } from './types'

// Mock Users
export const mockUsers: Record<string, User> = {
  patient1: {
    id: 'p1',
    email: 'patient@example.com',
    name: 'Jean Dupont',
    role: 'patient',
    phone: '06 12 34 56 78',
    dateOfBirth: '1990-05-15',
    address: '123 Rue de la Paix, Paris',
    token: 'mock-patient-token-123'
  },
  doctor1: {
    id: 'd1',
    email: 'doctor@example.com',
    name: 'Dr. Marie Laurent',
    role: 'doctor',
    phone: '06 98 76 54 32',
    specialization: 'Cardiologue',
    licenseNumber: 'FR-2023-001',
    token: 'mock-doctor-token-456'
  },
  admin1: {
    id: 'a1',
    email: 'admin@example.com',
    name: 'Admin System',
    role: 'admin',
    phone: '06 11 22 33 44',
    token: 'mock-admin-token-789'
  }
}

// Mock Doctors
export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Marie Laurent',
    specialization: 'Cardiologue',
    phone: '06 98 76 54 32',
    email: 'doctor@example.com',
    licenseNumber: 'FR-2023-001',
    rating: 4.8,
    bio: 'Spécialiste en cardiologie avec 15 ans d\'expérience',
    officeLocation: 'Clinique Saint-Louis, Paris',
    availableDays: ['Lundi', 'Mardi', 'Mercredi', 'Vendredi']
  },
  {
    id: 'd2',
    name: 'Dr. Pierre Moreau',
    specialization: 'Dermatologue',
    phone: '06 55 44 33 22',
    email: 'pierre.moreau@example.com',
    licenseNumber: 'FR-2023-002',
    rating: 4.6,
    bio: 'Expert en dermatologie et traitement des allergies cutanées',
    officeLocation: 'Cabinet Médical Centre, Paris',
    availableDays: ['Lundi', 'Mercredi', 'Jeudi', 'Samedi']
  },
  {
    id: 'd3',
    name: 'Dr. Sophie Richard',
    specialization: 'Médecin Généraliste',
    phone: '06 77 88 99 00',
    email: 'sophie.richard@example.com',
    licenseNumber: 'FR-2023-003',
    rating: 4.9,
    bio: 'Généraliste bienveillante avec focus sur la prévention',
    officeLocation: 'Cabinet Médical Montmartre, Paris',
    availableDays: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
  }
]

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'apt1',
    patientId: 'p1',
    doctorId: 'd1',
    doctorName: 'Dr. Marie Laurent',
    appointmentDate: '2026-05-15',
    appointmentTime: '10:30',
    reason: 'Consultation cardiaque',
    status: 'confirmed',
    notes: 'Apporter les derniers résultats d\'ECG',
    location: 'Clinique Saint-Louis, Paris'
  },
  {
    id: 'apt2',
    patientId: 'p1',
    doctorId: 'd2',
    doctorName: 'Dr. Pierre Moreau',
    appointmentDate: '2026-05-20',
    appointmentTime: '14:00',
    reason: 'Consultation dermatologique',
    status: 'pending',
    notes: 'Problème de peau depuis 2 semaines',
    location: 'Cabinet Médical Centre, Paris'
  },
  {
    id: 'apt3',
    patientId: 'p1',
    doctorId: 'd3',
    doctorName: 'Dr. Sophie Richard',
    appointmentDate: '2026-05-10',
    appointmentTime: '09:00',
    reason: 'Bilan de santé annuel',
    status: 'completed',
    notes: 'Tous les examens effectués',
    location: 'Cabinet Médical Montmartre, Paris'
  }
]

// Mock Schedules
export const mockSchedules: Schedule[] = [
  {
    id: 'sch1',
    doctorId: 'd1',
    dayOfWeek: 'Lundi',
    startTime: '08:00',
    endTime: '18:00',
    slotDuration: 30,
    maxPatientsPerDay: 12,
    breakStartTime: '12:00',
    breakEndTime: '13:00'
  },
  {
    id: 'sch2',
    doctorId: 'd1',
    dayOfWeek: 'Mardi',
    startTime: '08:00',
    endTime: '18:00',
    slotDuration: 30,
    maxPatientsPerDay: 12,
    breakStartTime: '12:00',
    breakEndTime: '13:00'
  },
  {
    id: 'sch3',
    doctorId: 'd2',
    dayOfWeek: 'Lundi',
    startTime: '10:00',
    endTime: '17:00',
    slotDuration: 45,
    maxPatientsPerDay: 8,
    breakStartTime: '12:30',
    breakEndTime: '13:30'
  },
  {
    id: 'sch4',
    doctorId: 'd3',
    dayOfWeek: 'Mercredi',
    startTime: '08:00',
    endTime: '19:00',
    slotDuration: 20,
    maxPatientsPerDay: 20,
    breakStartTime: '12:00',
    breakEndTime: '13:00'
  }
]

// Mock Admin Statistics
export const mockAdminStats = {
  totalPatients: 342,
  totalDoctors: 18,
  totalAppointments: 1205,
  completedAppointments: 1087,
  pendingAppointments: 89,
  cancelledAppointments: 29,
  totalRevenue: 125400,
  monthlyGrowth: 12.5,
  appointmentsByStatus: {
    completed: 1087,
    pending: 89,
    cancelled: 29
  },
  appointmentsByDoctorSpecialty: {
    'Cardiologue': 250,
    'Dermatologue': 180,
    'Médecin Généraliste': 320,
    'Orthopédiste': 200,
    'Pédiatre': 255
  },
  topDoctors: [
    { name: 'Dr. Sophie Richard', appointments: 142, rating: 4.9 },
    { name: 'Dr. Marie Laurent', appointments: 138, rating: 4.8 },
    { name: 'Dr. Pierre Moreau', appointments: 125, rating: 4.6 }
  ]
}

// Fonction pour simuler une latence réseau
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock login
export const mockLogin = async (email: string, password: string) => {
  await delay(500) // Simule la latence réseau
  
  const user = Object.values(mockUsers).find(u => u.email === email)
  
  if (!user) {
    throw new Error('Email ou mot de passe incorrect')
  }
  
  if (password !== 'password') {
    throw new Error('Email ou mot de passe incorrect')
  }
  
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    token: user.token
  }
}

// Mock get current user
export const mockGetCurrentUser = async (token: string) => {
  await delay(300)
  
  const user = Object.values(mockUsers).find(u => u.token === token)
  
  if (!user) {
    throw new Error('Invalid token')
  }
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone
  }
}

// Mock get appointments
export const mockGetAppointments = async (userId: string) => {
  await delay(600)
  return mockAppointments.filter(apt => apt.patientId === userId)
}

// Mock get all doctors
export const mockGetDoctors = async () => {
  await delay(400)
  return mockDoctors
}

// Mock get doctor by ID
export const mockGetDoctor = async (doctorId: string) => {
  await delay(300)
  const doctor = mockDoctors.find(d => d.id === doctorId)
  if (!doctor) {
    throw new Error('Doctor not found')
  }
  return doctor
}

// Mock get schedules
export const mockGetSchedules = async (doctorId?: string) => {
  await delay(400)
  if (doctorId) {
    return mockSchedules.filter(s => s.doctorId === doctorId)
  }
  return mockSchedules
}

// Mock create appointment
export const mockCreateAppointment = async (data: any) => {
  await delay(700)
  
  const newAppointment: Appointment = {
    id: `apt-${Date.now()}`,
    patientId: data.patientId,
    doctorId: data.doctorId,
    doctorName: mockDoctors.find(d => d.id === data.doctorId)?.name || 'Unknown Doctor',
    appointmentDate: data.appointmentDate,
    appointmentTime: data.appointmentTime,
    reason: data.reason,
    status: 'pending',
    notes: data.notes || '',
    location: mockDoctors.find(d => d.id === data.doctorId)?.officeLocation || ''
  }
  
  mockAppointments.push(newAppointment)
  return newAppointment
}

// Mock update appointment
export const mockUpdateAppointment = async (id: string, data: any) => {
  await delay(500)
  
  const appointment = mockAppointments.find(apt => apt.id === id)
  if (!appointment) {
    throw new Error('Appointment not found')
  }
  
  Object.assign(appointment, data)
  return appointment
}

// Mock cancel appointment
export const mockCancelAppointment = async (id: string) => {
  await delay(500)
  
  const appointment = mockAppointments.find(apt => apt.id === id)
  if (!appointment) {
    throw new Error('Appointment not found')
  }
  
  appointment.status = 'cancelled'
  return appointment
}

// Mock get admin stats
export const mockGetAdminStats = async () => {
  await delay(800)
  return mockAdminStats
}
