import { AppProvider } from '@/core/components/app-provider';
import { AppRouter } from '@/core/components/app-router';

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export { App };
