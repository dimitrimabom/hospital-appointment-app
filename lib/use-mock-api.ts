'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './auth-context'
import {
  mockGetAppointments,
  mockGetDoctors,
  mockGetDoctor,
  mockGetSchedules,
  mockGetAdminStats,
  mockCreateAppointment,
  mockUpdateAppointment,
  mockCancelAppointment
} from './mock-data'

// Hook pour les rendez-vous
export const useAppointments = (userId?: string) => {
  const { token } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token || !userId) {
      setIsLoading(false)
      return
    }

    const fetchAppointments = async () => {
      try {
        setIsLoading(true)
        const data = await mockGetAppointments(userId)
        setAppointments(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [token, userId])

  const mutate = async () => {
    if (userId) {
      const data = await mockGetAppointments(userId)
      setAppointments(data)
    }
  }

  return {
    appointments,
    isLoading,
    error,
    mutate
  }
}

// Hook pour tous les médecins
export const useDoctors = () => {
  const { token } = useAuth()
  const [doctors, setDoctors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }

    const fetchDoctors = async () => {
      try {
        setIsLoading(true)
        const data = await mockGetDoctors()
        setDoctors(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDoctors()
  }, [token])

  const mutate = async () => {
    const data = await mockGetDoctors()
    setDoctors(data)
  }

  return {
    doctors,
    isLoading,
    error,
    mutate
  }
}

// Hook pour un médecin spécifique
export const useDoctor = (doctorId: string | null) => {
  const { token } = useAuth()
  const [doctor, setDoctor] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token || !doctorId) {
      setIsLoading(false)
      return
    }

    const fetchDoctor = async () => {
      try {
        setIsLoading(true)
        const data = await mockGetDoctor(doctorId)
        setDoctor(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDoctor()
  }, [token, doctorId])

  const mutate = async () => {
    if (doctorId) {
      const data = await mockGetDoctor(doctorId)
      setDoctor(data)
    }
  }

  return {
    doctor,
    isLoading,
    error,
    mutate
  }
}

// Hook pour les horaires
export const useSchedules = (doctorId?: string) => {
  const { token } = useAuth()
  const [schedules, setSchedules] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }

    const fetchSchedules = async () => {
      try {
        setIsLoading(true)
        const data = await mockGetSchedules(doctorId)
        setSchedules(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSchedules()
  }, [token, doctorId])

  const mutate = async () => {
    const data = await mockGetSchedules(doctorId)
    setSchedules(data)
  }

  return {
    schedules,
    isLoading,
    error,
    mutate
  }
}

// Hook pour les statistiques admin
export const useAdminStats = () => {
  const { token, user } = useAuth()
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      setIsLoading(false)
      return
    }

    const fetchStats = async () => {
      try {
        setIsLoading(true)
        const data = await mockGetAdminStats()
        setStats(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [token, user?.role])

  const mutate = async () => {
    const data = await mockGetAdminStats()
    setStats(data)
  }

  return {
    stats,
    isLoading,
    error,
    mutate
  }
}

// Fonctions pour les mutations
export const appointmentMutations = {
  create: mockCreateAppointment,
  update: mockUpdateAppointment,
  cancel: mockCancelAppointment
}
