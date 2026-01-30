import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { mantineTheme } from './provider/mantineTheme';
import { toasterConfig } from './provider/toaster.config';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={mantineTheme}>
        {children}
        <Toaster {...toasterConfig} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
