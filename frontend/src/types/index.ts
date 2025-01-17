export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'dryfruits' | 'nuts' | 'spices';
  featured?: boolean;
  spiceLevel?: number;
  ingredients?: string[];
  nutritionInfo?: {
    servingSize: string;
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  // Inventory management fields - making some optional for data.ts compatibility
  stock?: number;
  minimumStock?: number;
  maximumStock?: number;
  reorderPoint?: number;
  unitCost?: number;
  lastRestocked?: string;
  sku?: string;
  weightPerUnit?: number;
  origin?: string;
  shelfLife?: number;
  storageConditions?: 'room-temperature' | 'refrigerated' | 'frozen';
  organicCertified?: boolean;
  qualityGrade?: 'premium' | 'standard' | 'economy';
  processingType?: 'raw' | 'processed' | 'roasted';
  packagingType?: 'retail' | 'bulk' | 'wholesale';
  supplier?: string;
  status?: 'active' | 'inactive' | 'discontinued';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface ChoosingUs {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface OrderDetails {
  id: string;
  orderId?: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'shipped';
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: string;
  phone: string;
  paymentMethod: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export type UserProfile = Omit<User, 'id'>;

export interface Milestone {
  id: string;
  year: number;
  title: string;
  description: string;
}

export interface InventoryTransaction {
  id: string;
  productId: string;
  date: string;
  type: 'purchase' | 'sale' | 'wastage' | 'restock';
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  notes?: string;
  batchNumber?: string;
  expiryDate?: string;
  performedBy?: string;
  qualityCheck?: {
    approved: boolean;
    appearance: string;
  };
}

export interface PaymentData {
  orderId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  total?: number;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface PaymentPageProps {
  shippingDetails: ShippingDetails;
}

export interface CheckoutSuccessPageProps {
  orderDetails: OrderDetails;
  onContinueShopping: () => void;
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}
