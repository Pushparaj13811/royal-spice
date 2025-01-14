export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'dryfruits' | 'nuts';
  featured?: boolean;
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
