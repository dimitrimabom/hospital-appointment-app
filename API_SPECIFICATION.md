# Backend API Configuration Guide

This document describes the API endpoints and data structures expected by the Hospital Appointment System frontend.

## API Base URL

The frontend expects API calls to be made to:
```
NEXT_PUBLIC_API_URL (default: http://localhost:3001/api)
```

All endpoints below should be prefixed with this URL.

## Authentication Endpoints

### POST /auth/login
Login user and return authentication token.

**Request:**
```json
{
  "email": "patient@example.com",
  "password": "password"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user-123",
    "email": "patient@example.com",
    "name": "John Doe",
    "role": "patient",
    "phone": "+1-555-0000",
    "avatar": "https://...",
    "createdAt": "2024-05-10T10:00:00Z"
  },
  "token": "eyJhbGc..."
}
```

**Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

**Notes:**
- Token should be a valid JWT that can be verified
- Frontend stores token in localStorage and adds it to all subsequent requests as `Authorization: Bearer <token>`
- Role must be one of: `patient`, `doctor`, `admin`

---

## Appointment Endpoints

### GET /appointments/me
Get all appointments for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "appointments": [
    {
      "id": "apt-1",
      "patientId": "user-123",
      "doctorId": "doc-456",
      "doctorName": "Dr. Sarah Smith",
      "specialization": "Cardiology",
      "dateTime": "2024-05-15T14:30:00Z",
      "duration": 30,
      "status": "scheduled",
      "notes": "Patient mentioned chest pain",
      "createdAt": "2024-05-10T10:00:00Z",
      "updatedAt": "2024-05-10T10:00:00Z"
    }
  ]
}
```

**Notes:**
- Return appointments sorted by dateTime (newest first)
- Status can be: `scheduled`, `completed`, `cancelled`

### POST /appointments
Create a new appointment.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "doctorId": "doc-456",
  "dateTime": "2024-05-15T14:30:00Z",
  "notes": "Optional notes about the visit"
}
```

**Response (201):**
```json
{
  "id": "apt-1",
  "patientId": "user-123",
  "doctorId": "doc-456",
  "doctorName": "Dr. Sarah Smith",
  "specialization": "Cardiology",
  "dateTime": "2024-05-15T14:30:00Z",
  "duration": 30,
  "status": "scheduled",
  "notes": "Optional notes about the visit",
  "createdAt": "2024-05-10T10:00:00Z",
  "updatedAt": "2024-05-10T10:00:00Z"
}
```

**Error (400):**
```json
{
  "message": "Doctor not available at this time"
}
```

### PUT /appointments/:id
Update an appointment.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "dateTime": "2024-05-16T15:00:00Z",
  "notes": "Updated notes",
  "status": "cancelled"
}
```

**Response (200):**
```json
{
  "id": "apt-1",
  "patientId": "user-123",
  "doctorId": "doc-456",
  "doctorName": "Dr. Sarah Smith",
  "specialization": "Cardiology",
  "dateTime": "2024-05-16T15:00:00Z",
  "duration": 30,
  "status": "cancelled",
  "notes": "Updated notes",
  "createdAt": "2024-05-10T10:00:00Z",
  "updatedAt": "2024-05-10T11:30:00Z"
}
```

### DELETE /appointments/:id
Cancel an appointment.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Appointment cancelled successfully"
}
```

**Error (404):**
```json
{
  "message": "Appointment not found"
}
```

---

## Doctor Endpoints

### GET /doctors
Get list of all available doctors.

**Response (200):**
```json
{
  "doctors": [
    {
      "id": "doc-456",
      "name": "Dr. Sarah Smith",
      "email": "sarah@hospital.com",
      "specialization": "Cardiology",
      "phone": "+1-555-0001",
      "avatar": "https://...",
      "bio": "Experienced cardiologist with 10 years of practice",
      "available": true
    }
  ]
}
```

### GET /doctors/:id
Get specific doctor details.

**Response (200):**
```json
{
  "id": "doc-456",
  "name": "Dr. Sarah Smith",
  "email": "sarah@hospital.com",
  "specialization": "Cardiology",
  "phone": "+1-555-0001",
  "avatar": "https://...",
  "bio": "Experienced cardiologist with 10 years of practice",
  "available": true
}
```

---

## User Endpoints (Admin Only)

### GET /users
Get list of all users (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "users": [
    {
      "id": "user-123",
      "email": "patient@example.com",
      "name": "John Doe",
      "role": "patient",
      "phone": "+1-555-0000",
      "createdAt": "2024-05-10T10:00:00Z"
    }
  ]
}
```

**Error (403):**
```json
{
  "message": "Unauthorized - Admin access required"
}
```

---

## Admin Analytics Endpoints

### GET /admin/stats
Get system statistics (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "totalUsers": 1234,
  "totalAppointments": 5678,
  "activeDoctors": 245,
  "uptime": 99.9,
  "appointmentsByStatus": {
    "scheduled": 234,
    "completed": 5200,
    "cancelled": 244
  }
}
```

---

## Error Handling

### Standard Error Response

All errors should return a JSON object with a message:

```json
{
  "message": "Error description here",
  "code": "ERROR_CODE"
}
```

### HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

### Frontend Error Handling

Frontend automatically handles:
- `401` → Logs user out and redirects to login
- `400` → Shows error toast
- `500` → Shows generic error toast
- Network errors → Shows error toast

---

## Data Types

### User Roles

```typescript
type UserRole = 'patient' | 'doctor' | 'admin';
```

### Appointment Status

```typescript
type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';
```

### User Object

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}
```

### Appointment Object

```typescript
interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  specialization?: string;
  dateTime: string;
  duration: number;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Doctor Object

```typescript
interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  available: boolean;
}
```

---

## Demo Credentials

These credentials should work in your development environment:

| Role | Email | Password |
|------|-------|----------|
| Patient | patient@example.com | password |
| Doctor | doctor@example.com | password |
| Admin | admin@example.com | password |

---

## CORS Configuration

Make sure your backend allows CORS requests from `http://localhost:3000` (and your production domain).

Example CORS header:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## JWT Token Format

Frontend expects tokens to be valid JWTs that decode to a payload containing at least:

```json
{
  "sub": "user-123",
  "email": "patient@example.com",
  "role": "patient",
  "iat": 1620000000,
  "exp": 1620003600
}
```

---

## Implementation Notes

1. **Timestamps** - Use ISO 8601 format (e.g., "2024-05-10T10:00:00Z")
2. **Duration** - Measured in minutes (e.g., 30 for 30-minute appointment)
3. **Availability** - Check doctor availability before creating appointments
4. **Conflicts** - Prevent double-booking of doctors
5. **Validation** - Validate all input data before processing
6. **Pagination** - Consider adding pagination for large result sets (optional)

---

## Testing the API

Use curl or Postman to test endpoints:

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient@example.com","password":"password"}'

# Get appointments (replace TOKEN with actual token)
curl -X GET http://localhost:3001/api/appointments/me \
  -H "Authorization: Bearer TOKEN"

# Book appointment
curl -X POST http://localhost:3001/api/appointments \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"doctorId":"doc-456","dateTime":"2024-05-15T14:30:00Z"}'
```

---

For questions about the frontend implementation, see `README_HOSPITAL_APP.md` or `QUICK_START.md`.
