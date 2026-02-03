# ClinikPe Medical - Product Requirements Document (PRD)

**Document Version:** 1.0  
**Last Updated:** January 31, 2026  
**Project:** ClinikPe Medical Store Management System  
**Target Audience:** Store Managers, Doctors/Providers, Healthcare Administrators

---

## 1. Executive Summary

ClinikPe Medical is a mobile-first web application designed for medical store management and healthcare provider coordination. The platform enables medical store administrators to manage appointments, handle provider/doctor information, and facilitate healthcare services delivery. The app provides an intuitive interface for scheduling, provider management, patient tracking, and QR code generation for store identification.

**Primary Users:**

- Medical Store Managers/Administrators
- Healthcare Providers (Doctors, Specialists)
- Patients (secondary users for appointments)

**Platform:** React-based SPA with TypeScript, Tailwind CSS, and Vite build system

---

## 2. Technical Stack Analysis

### 2.1 Core Technologies

```
Frontend Framework:     React 19.2.0
Language:             TypeScript 5.9.3
Build Tool:           Vite 7.2.4
Styling:              Tailwind CSS 3.4.19
Routing:              React Router DOM 7.13.0
UI Components:        Mantine 8.3.13
Form Management:      React Hook Form 7.71.1
State Management:     React Context (providers.tsx)
Validation:           Zod 4.3.6
Icons:                Lucide React 0.563.0
Notifications:        React Hot Toast 2.6.0
Date Handling:        Day.js 1.11.19
```

### 2.2 Architecture Pattern

- **Component-Based Architecture:** Modular React components
- **Route-Based Code Splitting:** Separate modules for different features
- **Type-Safe Development:** Full TypeScript implementation
- **Responsive Design:** Mobile-first approach with Tailwind CSS

---

## 3. Feature Analysis & Module Breakdown

### 3.1 Module Structure

```
src/
├── app/
│   ├── AppLayout.tsx           # Main layout with sidebar, header, bottom nav
│   ├── Header.tsx              # Dynamic header with route-based titles
│   ├── BottomNav.tsx           # Bottom navigation bar (Dashboard, Appointments, Providers, Settings)
│   ├── Sidebar.tsx             # Collapsible sidebar with navigation
│   ├── SidebarContent.tsx       # Sidebar menu items
│   ├── routeMeta.ts            # Route metadata configuration
│   └── providers.tsx           # Context providers setup
├── Modules/
│   ├── Dashboard/              # Dashboard overview
│   ├── Appointments/           # Appointment management
│   ├── Providers/              # Provider/Doctor management
│   ├── Profile/                # User profile management
│   ├── QrCode/                 # QR code generation for store
│   └── Registration/           # Authentication & onboarding
└── Constants/
    └── colors.ts               # Brand color definitions
```

---

## 4. Detailed Feature Specifications

### 4.1 AUTHENTICATION & REGISTRATION

#### 4.1.1 Login Page (`/login`)

**Route Config:** `header: 'none', showBottomNav: false`

**Functionality:**

- Phone number-based authentication
- Mobile number input with validation (Zod schema)
- OTP verification flow
- Brand logo display

**Components:**

- `Login.tsx` - Phone number input form
- Uses `phoneSchema` for validation
- Displays error messages for invalid inputs
- Branded login experience with ClinikPe logo

**User Flow:**

```
Login (Phone) → OTP Verification → Basic Details →
Location Confirmation → Store Details → Dashboard
```

#### 4.1.2 Registration Flow

**Routes:**

- `/verify-otp` - OTP verification after phone submission
- `/basic-details` - Personal information collection
- `/map-location` - Store location confirmation with map
- `/store-details` - Store information and setup

**Features:**

- Multi-step form wizard
- Data persistence during registration
- Location-based store setup
- Form validation using Zod + React Hook Form

---

### 4.2 DASHBOARD (`/dashboard`)

**Route Config:** `header: 'main', title: 'Dashboard', showBottomNav: true`

**Purpose:** Central hub for store operations overview

**Components:**

- `DashboardStats.tsx` - Key metrics display
- `ScrollableChips.tsx` - Provider filter chips
- `AppointmentCard.tsx` - Upcoming appointments cards

**Features:**

1. **Statistics Overview**
   - Total appointments
   - Total patients
   - Pending payments
   - Active providers

2. **Recent Appointments Section**
   - Shows latest upcoming appointments
   - Doctor/Provider filter by name
   - Quick action buttons (Cancel, Mark Complete)
   - Appointment details:
     - Patient name, age, gender
     - Appointment date & time
     - Appointment type (Follow-up, Consultation, Check-up)
     - Payment status
     - Contact number

3. **Doctor Filter**
   - All Doctors (default)
   - Individual doctor names
   - Real-time filtering

**Data Structure:**

```typescript
interface Appointment {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  date: string;
  time: string;
  type: "Follow-up" | "Consultation" | "Check-up";
  status: "Upcoming" | "Completed" | "Cancelled";
  paymentStatus: string;
  phoneNumber: string;
}
```

---

### 4.3 APPOINTMENTS (`/appointments`)

**Route Config:** `header: 'main', title: 'Appointments', showBottomNav: true`

**Purpose:** Comprehensive appointment management for the store

**Key Features:**

1. **Appointment Listing**
   - Search by patient name (real-time filtering)
   - Filter by doctor/provider
   - Card-based layout with full appointment details
   - Color-coded status indicators

2. **Appointment Actions**
   - View appointment details
   - Cancel appointment
   - Mark appointment as complete
   - Call patient (direct phone integration)

3. **Add New Appointment**
   - Route: `/add-appointment`
   - Header variant: 'back'
   - Button in appointments list to create new appointment

**UI Components:**

- Search bar with icon
- Filter chips for providers
- Appointment cards with action buttons
- FAB (Floating Action Button) for adding appointments

**Data Management:**

- Mock data for appointments
- Search query state management
- Active filter state (activeDoctor)
- Action handlers for cancel/complete

---

### 4.4 PROVIDERS/DOCTORS (`/providers`)

**Route Config:** `header: 'main', title: 'Providers', showBottomNav: true`

**Purpose:** Manage healthcare providers and doctors for the store

**Provider Information:**

```typescript
interface Provider {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  availableDays: string[];
  startTime: string;
  endTime: string;
  location: string;
  videoCallAvailable: boolean;
  isActive: boolean;
}
```

**Features:**

#### 4.4.1 Provider Listing

- Search providers by name
- Display provider cards with:
  - Profile image
  - Full name
  - Medical specialty
  - Years of experience
  - Available days/hours
  - Location
  - Video call capability
  - Active/Inactive status

#### 4.4.2 Provider Actions

- **View Profile** - See detailed provider information
- **Manage Availability** - Set working hours and days
- **Toggle Active Status** - Enable/disable provider

#### 4.4.3 Add Provider (`/add-provider`)

**Route Config:** `header: 'back', title: 'Add Provider', showBottomNav: true`

**Three-Step Setup:**

1. **Invite Card**
   - Send invitation via email
   - Email validation
   - Invite tracking

2. **Provider Form**
   - Name, specialty, experience
   - Location information
   - Contact details
   - Profile image upload
   - Video call availability toggle

3. **Set Availability**
   - Multiple time slots
   - Days selection (S, M, T, W, T, F, S)
   - Start time and end time
   - Slot duration (15, 30, 45, 60 minutes)
   - Add/remove multiple slots

---

### 4.5 PROFILE (`/profile`)

**Route Config:** `header: 'back', title: 'Profile', showBottomNav: true`

**Functionality:**

- View user/store manager profile
- Edit profile information
- Store details management

**Components:**

- `Profile.tsx` - Main profile view
- `ProfileMenu.tsx` - Menu options for profile actions

---

### 4.6 QR CODE (`/qr-code`)

**Route Config:** `header: 'back', title: 'QR Code', showBottomNav: true`

**Purpose:** Generate and share store identification QR codes

**Features:**

1. **QR Code Display**
   - Store name display
   - Store address display
   - QR code image (SVG format)
   - Centered responsive layout

2. **QR Code Actions**
   - **Download QR Code** - Save as image file
   - **Print QR Code** - Print directly or to PDF
   - Primary and secondary button styles

**Use Cases:**

- Embed in marketing materials
- Display at store entrance
- Share with patients
- Print for receipts/documents

**Implementation:**

- QR code generated from store metadata
- Uses Lucide React icons (Download, Printer)
- Styled with brand colors
- Mobile-responsive display

---

### 4.7 SETTINGS (`/settings`)

**Route Config:** `header: 'back', title: 'Settings', showBottomNav: true`

**Expected Features** (Component exists but needs implementation):

- Store settings and preferences
- Notification preferences
- Payment settings
- Business hours configuration
- User preferences

---

### 4.8 HELP / SUPPORT (`/help-support`)

**Route Config:** `header: 'back', title: 'Help / Support', showBottomNav: true`

**Expected Features** (Not yet implemented):

- FAQ section
- Support contact information
- Ticketing system
- Help documentation
- In-app help resources

---

## 5. Navigation Architecture

### 5.1 Route Configuration (routeMeta.ts)

**Route Metadata System:**

```typescript
interface RouteMeta {
  header: "main" | "back" | "none";
  title?: string;
  showBottomNav: boolean;
}
```

**Header Variants:**

- `'main'` - Shows hamburger menu + title + notifications
- `'back'` - Shows back navigation + title + notifications
- `'none'` - No header displayed

**Active Routes:**
| Route | Header | Title | BottomNav |
|-------|--------|-------|-----------|
| `/` | none | - | false |
| `/login` | none | - | false |
| `/dashboard` | main | Dashboard | true |
| `/appointments` | main | Appointments | true |
| `/add-appointment` | back | Add Appointment | true |
| `/providers` | main | Providers | true |
| `/add-provider` | back | Add Provider | true |
| `/profile` | back | Profile | true |
| `/settings` | back | Settings | true |
| `/qr-code` | back | QR Code | true |
| `/help-support` | back | Help / Support | true |

### 5.2 Navigation Components

#### Bottom Navigation (`BottomNav.tsx`)

**Icons & Routes:**

- 🏠 Dashboard → `/dashboard`
- 📅 Appointments → `/appointments`
- 👥 Providers → `/providers`
- ⚙️ Settings → `/settings`

**Styling:**

- Fixed bottom position
- Active state highlighting
- Icon + label display
- Responsive icon sizing

#### Sidebar Navigation (`Sidebar.tsx` + `SidebarContent.tsx`)

**Features:**

- Slide-in drawer from left
- Overlay backdrop (semi-transparent)
- Smooth animations
- Active route highlighting
- Logout functionality
- Support contact display

**Menu Items (in order):**

1. Dashboard
2. Appointments
3. Add Appointment
4. Providers
5. Add Provider
6. Profile
7. QR Code
8. Settings
9. Help / Support
10. Login

#### Header (`Header.tsx`)

**Dynamic Features:**

- Route-aware title display
- Conditional menu button (only on 'main' routes)
- Bell icon for notifications
- Red notification dot

---

## 6. State Management & Data Flow

### 6.1 Component State

- **Local Component State:** useState for UI state (search, filters, modals)
- **React Context:** Providers setup in `providers.tsx`
- **Form State:** React Hook Form for form management

### 6.2 Data Structures

```typescript
// Appointment
interface Appointment {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  date: string;
  time: string;
  type: "Follow-up" | "Consultation" | "Check-up";
  status: "Upcoming" | "Completed" | "Cancelled";
  paymentStatus: string;
  phoneNumber: string;
}

// Provider/Doctor
interface Provider {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  availableDays: string[];
  startTime: string;
  endTime: string;
  location: string;
  videoCallAvailable: boolean;
  isActive: boolean;
}

// Availability Slot
interface AvailabilitySlot {
  id: string;
  days: string[];
  startTime: string;
  endTime: string;
  duration: number;
}
```

### 6.3 Form Validation

- **Zod Schemas:** Define validation rules
- **phoneSchema** - Phone number validation for login
- **storeDetailsSchema** - Store information validation
- Real-time validation with React Hook Form

---

## 7. User Interface & UX Design

### 7.1 Design System

**Brand Colors:**

- Primary Color: `#0D52AF` (Blue)
- Secondary Color: TBD
- Background: `#F8FAFC` (Light Blue-Gray)
- Text: `#000000` (Black)

**Component Styling:**

- Tailwind CSS utility-first approach
- Border radius: rounded-lg, rounded-xl, rounded-2xl
- Spacing: Consistent padding (px-4, py-3, etc.)
- Shadows: border-based, minimal shadows

### 7.2 Layout Structure

**Full App Layout:**

```
┌─────────────────────────────┐
│        Header              │  ← Dynamic based on route
├─────────────────────────────┤
│                             │
│      Main Content           │  ← Outlet (Page-specific)
│                             │
├─────────────────────────────┤
│   Bottom Navigation         │  ← Conditional
└─────────────────────────────┘

Sidebar (Overlay)  ← Slide-in from left
```

### 7.3 Responsive Behavior

- Mobile-first design (max-width: mobile class)
- Flexible layouts using Flexbox/Grid
- Touch-friendly button sizing
- Readable font sizes for small screens
- Responsive image scaling

---

## 8. Key User Workflows

### 8.1 Store Manager Onboarding

```
1. Phone Login
2. OTP Verification
3. Personal Details Entry
4. Store Location Confirmation
5. Store Details Setup
6. Dashboard Access
```

### 8.2 Appointment Management

```
1. View Recent Appointments (Dashboard)
2. Filter by Doctor
3. Click "See All" → Full Appointments List
4. Search Patient or Filter
5. Click Appointment Card → Details View
6. Take Action: Cancel/Mark Complete/Call
```

### 8.3 Provider Management

```
1. Navigate to Providers
2. Search or View All Providers
3. View Provider Details:
   - Profile Info
   - Availability
   - Contact
4. Add New Provider:
   - Send Invite Email
   - Fill Provider Details
   - Set Availability (Multiple Slots)
5. Manage: Toggle Active/View/Edit Availability
```

### 8.4 Store QR Code Distribution

```
1. Navigate to QR Code section
2. View Store QR with Name & Address
3. Download QR Code Image
4. Print QR Code
5. Use in: Marketing, Store Entrance, Receipts
```

---

## 9. API Integration Points (To Be Implemented)

### 9.1 Authentication Endpoints

- `POST /auth/send-otp` - Send OTP to phone number
- `POST /auth/verify-otp` - Verify OTP and return session token
- `POST /auth/register` - Complete user registration

### 9.2 Appointment Endpoints

- `GET /appointments` - List appointments with filters
- `GET /appointments/:id` - Get appointment details
- `POST /appointments` - Create new appointment
- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Cancel appointment
- `PATCH /appointments/:id/status` - Mark complete/change status

### 9.3 Provider Endpoints

- `GET /providers` - List all providers
- `GET /providers/:id` - Get provider details
- `POST /providers` - Add new provider
- `PUT /providers/:id` - Update provider info
- `PATCH /providers/:id/availability` - Set availability slots
- `PATCH /providers/:id/toggle-active` - Enable/disable provider
- `POST /providers/:id/send-invite` - Send invite email

### 9.4 Dashboard Endpoints

- `GET /dashboard/stats` - Get dashboard statistics
- `GET /dashboard/recent-appointments` - Get recent appointments

### 9.5 Profile Endpoints

- `GET /profile` - Get user profile
- `PUT /profile` - Update profile
- `GET /profile/store` - Get store details
- `PUT /profile/store` - Update store details

### 9.6 QR Code Endpoints

- `GET /qr-code` - Generate QR code
- `POST /qr-code/download` - Download QR code

---

## 10. Current Implementation Status

### ✅ Completed

- Authentication UI (Login, OTP, Registration screens)
- App Layout Structure (Header, Sidebar, BottomNav)
- Route Configuration System
- Dashboard Component (UI only)
- Appointments Page (UI only)
- Providers Page (UI only)
- Provider Management UI
- QR Code Display Component
- Navigation System
- Component Structure

### ⚠️ In Progress / Partial

- Form Validations (Basic schemas defined)
- Appointment Management (UI exists, no backend)
- Provider Management (UI exists, no backend)

### 🔴 Not Implemented

- Backend API Integration
- Authentication Logic (Send OTP, Verify OTP, Session Management)
- Database Models
- Payment Integration
- Notification System
- Real-time Updates
- File Upload (Profile images, QR code download)
- Email Service (Provider invitations)
- Settings Page Implementation
- Help/Support System
- Error Handling & Validation Messages
- Loading States
- Offline Functionality

---

## 11. Performance Considerations

### 11.1 Optimization Strategies

- Route-based code splitting with React Router
- Lazy loading of module components
- Image optimization (avataaars API for provider images)
- Tailwind CSS purging for production
- Minification and bundling with Vite

### 11.2 Bundle Size

- React 19.2: ~42KB (gzipped)
- React Router: ~13KB (gzipped)
- Mantine UI: ~100KB (gzipped)
- Tailwind CSS: ~10KB (gzipped, with purging)
- Other dependencies: ~50KB (gzipped)
- **Estimated Total: ~200-250KB (gzipped)**

### 11.3 Load Time Targets

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s

---

## 12. Security Considerations

### 12.1 Authentication & Authorization

- OTP-based authentication (phone verification)
- Session token management
- Role-based access control (admin/provider/patient)
- Protected routes with auth guards

### 12.2 Data Protection

- HTTPS only
- Secure storage of auth tokens (httpOnly cookies)
- Input validation (Zod schemas)
- SQL injection prevention (if using SQL)
- XSS protection (React's built-in escaping)

### 12.3 API Security

- API rate limiting
- CORS configuration
- Request validation
- Sensitive data encryption

---

## 13. Testing Strategy

### 13.1 Unit Testing

- Component rendering tests
- Form validation tests
- Navigation tests
- Data filtering tests

### 13.2 Integration Testing

- Complete user workflows
- Navigation flows
- Form submission flows
- API integration tests

### 13.3 E2E Testing

- User journey from login to QR code display
- Appointment booking workflow
- Provider management workflow

---

## 14. Deployment & Release Plan

### 14.1 Development Environment

```
npm run dev      # Start dev server with hot reload
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### 14.2 Deployment Pipeline

- Push to version control
- Run tests and linting
- Build production bundle
- Deploy to CDN/server
- Database migrations
- Monitor performance

### 14.3 Version Strategy

- Semantic versioning: Major.Minor.Patch
- Current: 0.0.0 (Pre-release)
- Regular deployment cycle (bi-weekly or monthly)

---

## 15. Future Enhancements

### 15.1 Phase 2 Features

- Patient mobile app
- Real-time appointment notifications
- Video consultation integration
- Payment processing
- Analytics dashboard
- SMS/Email communications
- Appointment reminders
- Prescription management

### 15.2 Phase 3 Features

- Inventory management
- Billing and invoicing
- Patient medical history
- Telemedicine platform
- Multi-location support
- Advanced reporting
- AI-powered scheduling
- Integration with health records

---

## 16. Glossary

| Term             | Definition                                   |
| ---------------- | -------------------------------------------- |
| **OTP**          | One-Time Password for authentication         |
| **Provider**     | Doctor/Healthcare professional               |
| **Appointment**  | Scheduled consultation/service               |
| **Availability** | Doctor's working hours and days              |
| **QR Code**      | Quick Response Code for store identification |
| **FAB**          | Floating Action Button                       |
| **Route Meta**   | Configuration data for a route               |
| **Sidebar**      | Left navigation drawer                       |

---

## 17. Contact & Support

**Project Repository:** ClinikPe-Medical  
**Build Tool:** Vite  
**Package Manager:** npm  
**Node Version:** 18+  
**Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)

---

## Appendix A: Component Tree

```
App
├── AppContents (Routes)
│   ├── RegisterLayout
│   │   ├── Login
│   │   ├── OtpVerify
│   │   ├── BasicDetails
│   │   ├── MapLocation
│   │   └── StoreDetails
│   └── AppLayout
│       ├── Header
│       │   └── Dynamic Title (from routeMeta)
│       ├── Sidebar
│       │   └── SidebarContent
│       ├── Outlet (Current Page)
│       │   ├── Dashboard
│       │   │   ├── DashboardStats
│       │   │   ├── ScrollableChips
│       │   │   └── AppointmentCard
│       │   ├── Appointments
│       │   │   ├── SearchBar
│       │   │   ├── FilterChips
│       │   │   └── AppointmentCard
│       │   ├── Providers
│       │   │   ├── SearchBar
│       │   │   └── ProviderCard
│       │   ├── AddProvider
│       │   │   ├── InviteCard
│       │   │   ├── ProviderForm
│       │   │   └── SetAvailability
│       │   ├── Profile
│       │   │   └── ProfileMenu
│       │   ├── Settings
│       │   ├── HelpSupport
│       │   └── QRCodePage
│       └── BottomNav
└── Providers (Context)
    └── Toaster Config
```

---

**Document End**  
_This PRD serves as a comprehensive blueprint for the ClinikPe Medical application. Updates should be made as features are implemented and requirements evolve._
