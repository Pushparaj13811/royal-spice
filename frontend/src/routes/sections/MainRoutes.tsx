import { RouteObject } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { lazyLoad } from '@/lib/utils/lazy';

// Lazy load components
const HomePage = lazyLoad(() => import('@/pages/HomePage'));
const AboutPage = lazyLoad(() => import('@/pages/AboutPage'));
const ContactPage = lazyLoad(() => import('@/pages/ContactPage'));
const ProductsPage = lazyLoad(() => import('@/pages/ProductsPage'));
const ProductPage = lazyLoad(() => import('@/pages/ProductPage'));
const CartPage = lazyLoad(() => import('@/pages/cart/CartPage').then(module => ({ default: module.CartPage })));
const NotFoundPage = lazyLoad(() => import('@/pages/NotFoundPage'));

const mainRoutes: RouteObject[] = [
  {
    path: PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: PATHS.ABOUT,
    element: <AboutPage />,
  },
  {
    path: PATHS.CONTACT,
    element: <ContactPage />,
  },
  {
    path: PATHS.PRODUCTS,
    element: <ProductsPage />,
  },
  {
    path: PATHS.PRODUCT_DETAILS,
    element: <ProductPage />,
  },
  {
    path: PATHS.CART,
    element: <CartPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default mainRoutes;