import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { OrderDetails } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Truck, Check, Clock,} from 'lucide-react';

const mockOrder: OrderDetails = {
  id: "ORD123456",
  orderDate: "2025-01-14",
  status: "processing",
  items: [
    {
      id: "1",
      name: "Premium Cashews",
      price: 599,
      quantity: 2,
      image: "/images/products/cashews.jpg"
    }
  ],
  subtotal: 1198,
  shippingCost: 50,
  total: 1248,
  shippingAddress: "123 Main St, Mumbai, India",
  phone: "+91 9876543210",
  paymentMethod: "Card"
};

const steps = [
  { 
    id: 'ordered', 
    title: 'Order Placed', 
    description: 'Your order has been confirmed',
    icon: Package,
    color: 'text-blue-500'
  },
  { 
    id: 'processing', 
    title: 'Processing', 
    description: 'Your order is being prepared',
    icon: Clock,
    color: 'text-yellow-500'
  },
  { 
    id: 'shipped', 
    title: 'Shipped', 
    description: 'Your order is on its way',
    icon: Truck,
    color: 'text-purple-500'
  },
  { 
    id: 'delivered', 
    title: 'Delivered', 
    description: 'Order has been delivered',
    icon: Check,
    color: 'text-green-500'
  }
];

export function OrderTrackingPage() {
  const [order] = useState<OrderDetails>(mockOrder);

  const currentStepIndex = steps.findIndex(step => step.id === order.status);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Track Order #{order.id}</h1>
      
      {/* Order Progress */}
      <Card className="p-6 mb-8">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" />
          <motion.div 
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Steps */}
          <div className="relative z-10 flex justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    "transition-colors duration-200",
                    isCompleted ? "bg-primary text-white" : "bg-gray-200",
                    isCurrent && "ring-4 ring-primary/30"
                  )}>
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Order Details */}
      <Card className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Address:</span> {order.shippingAddress}</p>
              <p><span className="font-medium">Phone:</span> {order.phone}</p>
              <p><span className="font-medium">Order Date:</span> {new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </motion.div>
              ))}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>₹{order.shippingCost}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline">
            Need Help?
          </Button>
          <Button>
            Download Invoice
          </Button>
        </div>
      </Card>
    </div>
  );
}
