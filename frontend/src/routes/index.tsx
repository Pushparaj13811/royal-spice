import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { mainRoutes } from '@/routes/sections/MainRoutes';
import { authRoutes } from '@/routes/sections/AuthRoutes';
import { userRoutes } from '@/routes/sections/UserRoutes';
import { adminRoutes } from '@/routes/sections/AdminRoutes';
import { checkoutRoutes } from '@/routes/sections/CheckoutRoutes';
import LoadingScreen from '@/components/LoadingScreen';

export default function Router() {
  const routes = [...mainRoutes, ...authRoutes, ...userRoutes, ...adminRoutes, ...checkoutRoutes];
  
  const element = useRoutes(routes);

  return (
    <Suspense fallback={<LoadingScreen />}>
      {element}
    </Suspense>
  );
}