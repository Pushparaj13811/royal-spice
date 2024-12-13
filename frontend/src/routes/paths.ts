// Define all route paths as constants for better maintainability
export const PATHS = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/product/:id',
  CART: '/cart',
  
  // Auth routes
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  
  // Protected user routes
  USER: {
    DASHBOARD: '/user',
    PROFILE: '/user/edit-profile',
    ORDERS: '/user/orders',
    ORDER_DETAILS: '/user/orders/:id',
  },
  
  // Protected admin routes
  ADMIN: {
    DASHBOARD: '/admin',
    PRODUCTS: {
      NEW: '/admin/products/new',
      EDIT: '/admin/products/:id/edit',
    },
  },
  
  // Checkout routes
  CHECKOUT: {
    BASE: '/checkout',
    PAYMENT: '/checkout/payment',
    SUCCESS: '/checkout/success',
  },
} as const;