import toast from 'react-hot-toast';

export const toasterConfig = {
  position: 'top-center' as const,
  toastOptions: {
    duration: 2500,
    style: {
      background: 'rgba(15, 23, 42, 0.92)',
      color: '#fff',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
      maxWidth: '70vw',
      padding: '12px 16px',
      fontSize: '14px',
      borderRadius: '12px',
    },
    success: {
      iconTheme: {
        primary: '#16A34A',
        secondary: '#fff',
      },
      style: {
        border: '1px solid rgba(22, 163, 74, 0.3)',
      },
    },
    error: {
      iconTheme: {
        primary: '#DC2626',
        secondary: '#fff',
      },
      style: {
        border: '1px solid rgba(220, 38, 38, 0.3)',
      },
    },
  },
  gutter: 8,
};

// Helper functions for consistent toast usage
export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  loading: (message: string) => toast.loading(message),
  custom: (message: string) => toast(message),
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => toast.promise(promise, messages),
};
