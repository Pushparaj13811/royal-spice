import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, Package, Truck, Clock, MapPin, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderDetails {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  total: number;
  items?: Array<{ name: string; quantity: number; price: number }>;
}

interface CheckoutSuccessPageProps {
  orderDetails: OrderDetails | null;
  onContinueShopping: () => void;
}

function OrderDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Skeleton className="h-16 w-16 rounded-full" />
      </div>
      <Skeleton className="h-8 w-64 mx-auto" />
      <Skeleton className="h-4 w-96 mx-auto" />
      <Card className="p-6">
        <div className="space-y-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function CheckoutSuccessPage({ orderDetails, onContinueShopping }: CheckoutSuccessPageProps) {
  if (!orderDetails) return <OrderDetailsSkeleton />;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-12 max-w-4xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="text-center mb-12">
        <div className="relative inline-block">
          <CheckCircle className="h-20 w-20 text-primary animate-bounce" />
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, times: [0, 0.5, 1] }}
          >
            <div className="h-20 w-20 rounded-full border-4 border-primary opacity-20" />
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold mt-6 mb-3">Order Confirmed!</h1>
        <p className="text-muted-foreground text-lg">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5" /> Order Summary
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-medium">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium">{orderDetails.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="font-medium text-lg">₹{orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5" /> Delivery Information
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">{orderDetails.name}</div>
                <div className="text-muted-foreground">{orderDetails.address}</div>
                <div className="text-muted-foreground">{orderDetails.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground">Estimated Delivery: </span>
                <span className="font-medium">
                  {estimatedDelivery.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
        <Button onClick={onContinueShopping} size="lg" className="min-w-[200px]">
          Continue Shopping
        </Button>
        <Button variant="outline" size="lg" className="min-w-[200px]" onClick={() => window.print()}>
          Print Receipt
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="min-w-[200px]"
          onClick={() => {
            const url = window.location.href;
            navigator.clipboard.writeText(url);
            // You might want to add a toast notification here
          }}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Order
        </Button>
      </motion.div>
    </motion.div>
  );
}