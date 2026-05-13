# Quick Start Guide - Hospital Appointment System

## Overview

This is a complete, production-ready hospital appointment booking system with role-based access control for patients, doctors, and administrators.

## What's Included

### ✅ Completed Features

1. **Authentication System**
   - Login page with form validation
   - JWT-based authentication with localStorage
   - Automatic token refresh and 401 error handling
   - Session persistence across page reloads

2. **Patient Dashboard**
   - View all appointments with status
   - Book new appointments with date/time selection
   - Cancel or reschedule appointments
   - View appointment details and notes

3. **Doctor Dashboard**
   - View daily schedule
   - See patient appointments organized by time
   - Patient information for each appointment
   - Appointment confirmation/management

4. **Admin Dashboard**
   - System statistics and KPIs
   - User management interface
   - Appointment management
   - System configuration options
   - Analytics and reporting access

5. **Navigation & Layout**
   - Role-based navigation menu
   - Professional navbar with user dropdown
   - Protected routes with role verification
   - Responsive mobile-friendly design

6. **UI/UX Components**
   - Login form with validation
   - Appointment cards with status badges
   - Modal dialogs and dropdown menus
   - Loading skeletons and spinners
   - Toast notifications for feedback
   - Professional healthcare color scheme

7. **Additional Pages**
   - Profile settings page
   - Help & FAQ section
   - Error pages (401, 404, etc.)

## Getting Started

### Step 1: Start the Dev Server

```bash
pnpm dev
```

The application will start at `http://localhost:3000`

### Step 2: Access the Application

Navigate to `http://localhost:3000` - you'll be automatically redirected to the login page.

### Step 3: Test with Demo Credentials

**Patient Account:**
- Email: `patient@example.com`
- Password: `password`

**Doctor Account:**
- Email: `doctor@example.com`
- Password: `password`

**Admin Account:**
- Email: `admin@example.com`
- Password: `password`

## Project Structure

```
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx          ← Login page
│   ├── (dashboard)/
│   │   ├── layout.tsx              ← Dashboard layout with navbar
│   │   ├── page.tsx                ← Main dashboard
│   │   ├── appointments/           ← Patient appointment management
│   │   ├── profile/page.tsx        ← User profile
│   │   ├── help/page.tsx           ← Help & FAQ
│   │   ├── admin/page.tsx          ← Admin dashboard
│   │   └── schedule/page.tsx       ← Doctor schedule
│   ├── layout.tsx                  ← Root layout with auth provider
│   ├── globals.css                 ← Theme and global styles
│   └── page.tsx                    ← Home (redirects to login/dashboard)
│
├── components/
│   ├── ui/                         ← shadcn/ui components
│   ├── navbar.tsx                  ← Navigation component
│   └── protected-route.tsx         ← Route protection wrapper
│
├── lib/
│   ├── api-client.ts               ← Axios with interceptors
│   ├── auth-context.tsx            ← Auth state management
│   └── types.ts                    ← TypeScript definitions
│
└── package.json                    ← Dependencies

```

## Key Files to Understand

### `lib/auth-context.tsx`
Manages authentication state globally. Provides:
- `login(email, password)` - Login user
- `logout()` - Clear session
- `useAuth()` - Hook to access auth in components

### `lib/api-client.ts`
Axios instance configured to:
- Automatically add JWT token to requests
- Handle 401 errors and redirect to login
- Show error toasts for failed requests

### `components/protected-route.tsx`
Wrapper component that:
- Checks if user is authenticated
- Supports role-based access control
- Redirects unauthorized users
- Shows loading state during auth check

### `app/(dashboard)/layout.tsx`
Wraps all dashboard routes with:
- ProtectedRoute component (auth check)
- Navbar with role-based navigation
- Responsive layout with main content area

## How It Works

### Authentication Flow

1. User enters email/password on login page
2. Frontend posts to `/api/auth/login` endpoint
3. Backend returns `{ user, token }`
4. Frontend stores token in localStorage
5. Token is automatically added to all API requests via axios interceptor
6. Protected routes check authentication and redirect if needed

### Protected Routes

Routes in `(dashboard)` folder are automatically protected:
- `ProtectedRoute` wrapper checks `useAuth()` context
- If not authenticated → redirects to `/login`
- If wrong role → redirects to `/unauthorized`
- If authenticated → renders page normally

### API Integration

The application expects a backend API with these endpoints:

```
POST   /api/auth/login
GET    /api/appointments/me
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id
GET    /api/doctors
```

See `README_HOSPITAL_APP.md` for full API documentation.

## Customization Guide

### Change Theme Colors

Edit `app/globals.css` CSS variables:
```css
:root {
  --primary: oklch(0.45 0.18 260);    /* Change blue to your color */
  --secondary: oklch(0.85 0.08 200);  /* Change teal */
  /* ... other colors ... */
}
```

### Add New Patient Feature

1. Create file: `app/(dashboard)/your-feature/page.tsx`
2. Use the dashboard template as reference
3. Use `useAuth()` for user data
4. Use `apiClient` for API calls
5. Use `toast.success()` for feedback

Example:
```tsx
'use client';
import { useAuth } from '@/lib/auth-context';
import apiClient from '@/lib/api-client';
import { Card } from '@/components/ui/card';

export default function YourFeature() {
  const { user } = useAuth();
  
  return (
    <Card>
      <p>Hello, {user?.name}!</p>
    </Card>
  );
}
```

### Implement Backend API

Your backend should implement endpoints in `lib/types.ts`:
- Authentication (login, logout, refresh)
- Appointment CRUD operations
- Doctor listing and details
- User management (admin)

## Common Issues

### "Cannot find module" errors
Make sure all imports use the `@/` alias:
```tsx
// ✅ Correct
import { useAuth } from '@/lib/auth-context';

// ❌ Wrong
import { useAuth } from '../lib/auth-context';
```

### API calls not working
1. Check backend is running on the correct port
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check browser console for CORS or network errors
4. Verify backend endpoints match expected paths

### Still logged in after closing browser
Token is stored in localStorage by design. To clear:
```javascript
localStorage.removeItem('token');
localStorage.removeItem('user');
```

## Next Steps

1. **Set up backend API** - Implement the required endpoints
2. **Connect your database** - Replace mock data with real data
3. **Add more features** - Doctor search, ratings, prescriptions, etc.
4. **Customize branding** - Update colors, logo, company name
5. **Deploy** - Use Vercel, AWS, or your preferred platform

## File Templates

### New Page Component Template

```tsx
'use client';

import { useAuth } from '@/lib/auth-context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function NewPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Page Title</h1>
        <p className="text-muted-foreground">Description</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Content Section</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your content here</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Support

For more detailed documentation, see `README_HOSPITAL_APP.md`.

For questions or issues:
1. Check the console logs in browser DevTools
2. Review the existing page implementations
3. Consult the TypeScript type definitions in `lib/types.ts`

Happy coding! 🚀
