import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { mainRoutes } from 'src/routes/sections/MainRoutes';
import { authRoutes } from 'src/routes/sections/AuthRoutes';
import { userRoutes } from 'src/routes/sections/UserRoutes';
import { adminRoutes } from 'src/routes/sections/AdminRoutes';
import { checkoutRoutes } from 'src/routes/sections/CheckoutRoutes';
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