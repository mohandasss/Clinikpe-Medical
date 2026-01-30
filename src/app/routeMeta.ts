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
  '/dashboard': {
    header: 'main',
    title: 'Dashboard',
    showBottomNav: true,
  },
  '/assignments': {
    header: 'main',
    title: 'Assignments',
    showBottomNav: true,
  },
  '/assignments/:id': {
    header: 'back',
    title: 'Assignment Details',
    showBottomNav: true,
  },
  '/assignments/:id/add-test': {
    header: 'back',
    title: 'Add Test',
    showBottomNav: true,
  },
  '/profile': {
    header: 'back',
    title: 'Profile',
    showBottomNav: true,
  },
  '/settings': {
    header: 'back',
    title: 'Settings',
    showBottomNav: true,
  },
  '/help-support': {
    header: 'back',
    title: 'Help / Support',
    showBottomNav: true,
  },
  '/payments': {
    header: 'back',
    title: 'Payments',
    showBottomNav: true,
  },
  '/history': {
    header: 'back',
    title: 'History',
    showBottomNav: true,
  },
  '/map-view': {
    header: 'back',
    title: 'Map View',
    showBottomNav: false,
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
