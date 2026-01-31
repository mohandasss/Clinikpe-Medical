export type HeaderVariant = 'main' | 'back' | 'none';

export interface RouteMeta {
  header: HeaderVariant;
  title?: string;
  showBottomNav: boolean;
}

export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    header: 'none',
    showBottomNav: false,
  },
  '/login': {
    header: 'none',
    showBottomNav: false,
  },
  '/splash': {
    header: 'none',
    showBottomNav: false,
  },
  '/dashboard': {
    header: 'main',
    title: 'Dashboard',
    showBottomNav: true,
  },
  '/appointments': {
    header: 'main',
    title: 'Appointments',
    showBottomNav: true,
  },
  '/add-appointment': {
    header: 'back',
    title: 'Add Appointment',
    showBottomNav: true,
  },
  '/appointments/:id': {
    header: 'back',
    title: 'Appointment Details',
    showBottomNav: true,
  },
  '/providers': {
    header: 'main',
    title: 'Providers',
    showBottomNav: true,
  },
  '/add-provider': {
    header: 'back',
    title: 'Add Provider',
    showBottomNav: true,
  },
  '/providers/add': {
    header: 'back',
    title: 'Add Provider',
    showBottomNav: true,
  },
  '/providers/:id': {
    header: 'back',
    title: 'Provider Details',
    showBottomNav: true,
  },
  '/settings': {
    header: 'back',
    title: 'Settings',
    showBottomNav: true,
  },
  '/profile': {
    header: 'back',
    title: 'Profile',
    showBottomNav: true,
  },
  '/help-support': {
    header: 'back',
    title: 'Help / Support',
    showBottomNav: true,
  },
  '/qr-code': {
    header: 'back',
    title: 'QR Code',
    showBottomNav: true,
  },
};

// Helper function to get route meta with pattern matching
export const getRouteMeta = (pathname: string): RouteMeta => {
  // Exact match first
  if (routeMeta[pathname]) {
    return routeMeta[pathname];
  }

  // Pattern matching for dynamic routes
  const metaKeys = Object.keys(routeMeta);
  for (const pattern of metaKeys) {
    if (pattern.includes(':')) {
      const regexPattern = pattern.replace(/:\w+/g, '[^/]+');
      const regex = new RegExp(`^${regexPattern}$`);
      if (regex.test(pathname)) {
        return routeMeta[pattern];
      }
    }
  }

  // Default fallback
  return {
    header: 'back',
    title: 'Page',
    showBottomNav: true,
  };
};
