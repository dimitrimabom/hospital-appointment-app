# Hospital Appointment System

A professional, multi-role hospital appointment booking application built with Next.js, React, and TypeScript.

## Features

### For Patients
- **Book Appointments**: Search for doctors by specialization and book appointments
- **Manage Appointments**: View, reschedule, or cancel appointments
- **Profile Management**: Update personal information and preferences
- **Appointment History**: Track past and upcoming appointments

### For Doctors
- **View Schedule**: See all appointments organized by date
- **Manage Appointments**: Confirm or reschedule patient appointments
- **Patient Details**: Access patient information for appointments
- **Availability**: Manage working hours and availability

### For Administrators
- **User Management**: Manage all system users (patients, doctors, admins)
- **Doctor Management**: Add and manage doctor profiles and specializations
- **Appointment Management**: Monitor and manage system appointments
- **System Analytics**: View system statistics and performance metrics
- **System Configuration**: Configure settings and system parameters

## Technology Stack

- **Frontend Framework**: Next.js 16 with App Router
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios with JWT interceptors
- **Authentication**: JWT-based authentication
- **Notifications**: Sonner toast notifications
- **Type Safety**: TypeScript

## Project Structure

```
app/
├── (auth)/                 # Authentication pages
│   └── login/
├── (dashboard)/            # Protected dashboard routes
│   ├── layout.tsx
│   ├── page.tsx           # Main dashboard
│   ├── appointments/      # Appointment management
│   ├── profile/           # User profile
│   ├── help/              # Help & FAQ
│   ├── admin/             # Admin dashboard
│   └── schedule/          # Doctor schedule
├── layout.tsx             # Root layout
├── page.tsx               # Home page (redirects to login/dashboard)
└── globals.css

components/
├── ui/                     # shadcn/ui components
├── navbar.tsx             # Navigation bar
└── protected-route.tsx    # Protected route wrapper

lib/
├── api-client.ts          # Axios client with interceptors
├── auth-context.tsx       # Auth context provider
└── types.ts               # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js 18+ (with pnpm, npm, or yarn)
- A running backend API server

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hospital-appointment-system
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Running the Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication

### Login Credentials (Demo)

**Patient:**
- Email: `patient@example.com`
- Password: `password`

**Doctor:**
- Email: `doctor@example.com`
- Password: `password`

**Administrator:**
- Email: `admin@example.com`
- Password: `password`

### How Authentication Works

1. User enters credentials on the login page
2. Frontend sends a POST request to `/api/auth/login`
3. Backend returns a JWT token and user data
4. Token is stored in localStorage
5. Axios interceptor automatically adds token to all subsequent requests
6. On 401 response, token is cleared and user is redirected to login

## API Integration

### Expected Backend Endpoints

**Authentication:**
- `POST /api/auth/login` - User login

**Appointments:**
- `GET /api/appointments/me` - Get user's appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

**Doctors:**
- `GET /api/doctors` - Get list of doctors
- `GET /api/doctors/:id` - Get doctor details
- `PUT /api/doctors/:id` - Update doctor info

**Admin:**
- `GET /api/users` - Get all users
- `GET /api/admin/stats` - Get system statistics

## Component Architecture

### AuthProvider
Manages global authentication state using React Context. Handles login, logout, and token persistence.

### ProtectedRoute
Wrapper component that ensures only authenticated users can access protected routes. Supports role-based access control.

### Navbar
Navigation component that displays different menu items based on user role (patient, doctor, admin).

### API Client
Axios instance with request/response interceptors:
- Automatically adds JWT token to requests
- Handles 401 errors by clearing session and redirecting to login
- Shows error toasts for failed requests

## Styling & Theming

The application uses a professional healthcare color scheme:
- **Primary Color**: Professional blue (#6366f1)
- **Secondary Color**: Light teal (#06b6d4)
- **Backgrounds**: Clean white and light grays
- **Text**: Dark foreground colors for accessibility

CSS variables are defined in `globals.css` and can be customized through Tailwind config.

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTP-only Considerations**: Tokens stored in localStorage (can be improved with HTTP-only cookies)
- **Automatic Logout**: Session expires on 401 response
- **Role-Based Access**: Protected routes enforce user roles
- **XSS Protection**: React's built-in XSS protection
- **CSRF Token**: Should be implemented in backend

## Error Handling

- **API Errors**: Caught by axios interceptors and shown as toasts
- **Auth Errors**: 401 responses trigger automatic logout
- **Loading States**: Components show loading skeletons during data fetches
- **Form Validation**: Basic client-side validation with user feedback

## Performance Optimizations

- **Code Splitting**: Routes are automatically code-split by Next.js
- **Image Optimization**: Next.js Image component (when used)
- **Lazy Loading**: Components load on demand
- **Caching**: API responses can be cached (implement in backend)
- **Static Generation**: Home page redirects are optimized

## Development Tips

### Adding New Pages
1. Create a new folder in `app/(dashboard)/your-feature/`
2. Add a `page.tsx` file
3. Import `ProtectedRoute` if needed and wrap your component
4. Use the same styling patterns as existing pages

### Adding New API Calls
1. Import `apiClient` from `@/lib/api-client`
2. Use `apiClient.get()`, `apiClient.post()`, etc.
3. Handle errors with try-catch
4. Show success/error toasts using `toast.success()` or `toast.error()`

### Updating Theme
Edit the CSS variables in `app/globals.css` `:root` and `.dark` sections.

## Troubleshooting

### "API call failed" errors
- Check that your backend is running
- Verify `NEXT_PUBLIC_API_URL` is correctly set
- Check browser console for specific error messages

### Token not persisting
- Clear localStorage and try logging in again
- Check browser's localStorage settings

### Page redirects to login
- Verify your token is valid
- Check that the protected route has the correct role

## Production Deployment

1. Set environment variables on your hosting platform
2. Build the application: `pnpm build`
3. Start production server: `pnpm start`
4. Configure your backend API URL for production

## License

This project is part of the v0 application templates.
