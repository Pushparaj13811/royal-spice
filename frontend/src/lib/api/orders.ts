import { OrderDetails } from '@/types';
import { products } from '@/lib/data';

// Mock data - replace with actual API calls
export const mockOrders: OrderDetails[] = [
  {
    id: '1',
    orderDate: '2024-03-15',
    status: 'completed',
    items: [
      {
        id: '1',
        name: products[0].name,
        price: products[0].price,
        quantity: 2,
        image: products[0].images[0],
      },
      {
        id: '2',
        name: products[1].name,
        price: products[1].price,
        quantity: 1,
        image: products[1].images[0],
      },
      {
        id: '3',
        name: products[2].name,
        price: products[2].price,
        quantity: 1,
        image: products[2].images[0],
      },
    ],
    subtotal: products[0].price * 2 + products[1].price + products[2].price,
    shippingCost: 50,
    total: products[0].price * 2 + products[1].price + products[2].price + 50,
    shippingAddress: '123 Main St, Mumbai, Maharashtra, 400001',
    phone: '+91 1234567890',
    paymentMethod: 'card',
  },
  {
    id: '2',
    orderDate: '2024-03-17',
    status: 'pending',
    items: [
      {
        id: '4',
        name: products[3].name,
        price: products[3].price,
        quantity: 1,
        image: products[3].images[0],
      },
      {
        id: '5',
        name: products[4].name,
        price: products[4].price,
        quantity: 2,
        image: products[4].images[0],
      },
      {
        id: '6',
        name: products[5].name,
        price: products[5].price,
        quantity: 1,
        image: products[5].images[0],
      },
    ],
    subtotal: products[3].price + products[4].price * 2 + products[5].price,
    shippingCost: 100,
    total: products[3].price + products[4].price * 2 + products[5].price + 100,
    shippingAddress: '45 Hill Rd, Pune, Maharashtra, 411001',
    phone: '+91 9876543210',
    paymentMethod: 'cash',
  },
  {
    id: '3',
    orderDate: '2024-03-18',
    status: 'shipped',
    items: [
      {
        id: '7',
        name: products[6].name,
        price: products[6].price,
        quantity: 1,
        image: products[6].images[0],
      },
      {
        id: '8',
        name: products[7].name,
        price: products[7].price,
        quantity: 1,
        image: products[7].images[0],
      },
      {
        id: '9',
        name: products[8].name,
        price: products[8].price,
        quantity: 3,
        image: products[8].images[0],
      },
    ],
    subtotal: products[6].price + products[7].price + products[8].price * 3,
    shippingCost: 75,
    total: products[6].price + products[7].price + products[8].price * 3 + 75,
    shippingAddress: '78 Park Lane, Delhi, Delhi, 110001',
    phone: '+91 9988776655',
    paymentMethod: 'upi',
  },
  {
    id: '4',
    orderDate: '2024-03-19',
    status: 'completed',
    items: [
      {
        id: '10',
        name: products[9].name,
        price: products[9].price,
        quantity: 1,
        image: products[9].images[0],
      },
      {
        id: '11',
        name: products[10].name,
        price: products[10].price,
        quantity: 2,
        image: products[10].images[0],
      },
      {
        id: '12',
        name: products[11].name,
        price: products[11].price,
        quantity: 1,
        image: products[11].images[0],
      },
    ],
    subtotal: products[9].price + products[10].price * 2 + products[11].price,
    shippingCost: 25,
    total: products[9].price + products[10].price * 2 + products[11].price + 25,
    shippingAddress: '23 Green Ave, Bangalore, Karnataka, 560001',
    phone: '+91 7766554433',
    paymentMethod: 'paypal',
  },
  {
    id: '5',
    orderDate: '2024-03-20',
    status: 'pending',
    items: [
      {
        id: '13',
        name: products[12].name,
        price: products[12].price,
        quantity: 1,
        image: products[12].images[0],
      },
      {
        id: '14',
        name: products[13].name,
        price: products[13].price,
        quantity: 1,
        image: products[13].images[0],
      },
      {
        id: '15',
        name: products[14].name,
        price: products[14].price,
        quantity: 2,
        image: products[14].images[0],
      },
    ],
    subtotal: products[12].price + products[13].price + products[14].price * 2,
    shippingCost: 60,
    total:
      products[12].price + products[13].price + products[14].price * 2 + 60,
    shippingAddress: '19 Sunrise St, Kolkata, West Bengal, 700001',
    phone: '+91 1122334455',
    paymentMethod: 'netbanking',
  },
];

export async function getOrderById(id: string): Promise<OrderDetails> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const order = mockOrders.find((o) => o.id === id);
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
}
