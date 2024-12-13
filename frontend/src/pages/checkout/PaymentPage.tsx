import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCart } from '@/lib/hooks/useCart';
import { processPayment } from '@/lib/api/payment';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const paymentSchema = z
  .object({
    paymentMethod: z.enum(['card', 'upi', 'cod']),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvv: z.string().optional(),
    upiId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === 'card') {
        return data.cardNumber && data.cardExpiry && data.cardCvv;
      }
      if (data.paymentMethod === 'upi') {
        return data.upiId;
      }
      return true;
    },
    {
      message:
        'Please fill in all required fields for the selected payment method',
    }
  );

export function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, calculateTotal } = useCart();
  const total = calculateTotal();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const shippingDetails = location.state?.shippingDetails;

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'card',
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  const onSubmit = async (data: z.infer<typeof paymentSchema>) => {
    setIsProcessing(true);
    try {
      await processPayment(data);

      // Create order details for success page
      const orderDetails = {
        id: Math.random().toString(36).substr(2, 9),
        name: shippingDetails.name,
        email: shippingDetails.email,
        phone: shippingDetails.phone,
        address: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}`,
        total: total,
        paymentMethod: data.paymentMethod,
        items: items,
        date: new Date().toISOString(),
      };

      navigate('/checkout/success', {
        state: { orderDetails },
        replace: true,
      });
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description:
          'There was an error processing your payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!shippingDetails) {
    navigate('/checkout');
    return null;
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">Payment</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="card"
                          id="card"
                          className="peer sr-only"
                        />
                        <label
                          htmlFor="card"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-3 h-6 w-6"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                          Card
                        </label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="upi"
                          id="upi"
                          className="peer sr-only"
                        />
                        <label
                          htmlFor="upi"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-3 h-6 w-6"
                          >
                            <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
                          </svg>
                          UPI
                        </label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="cod"
                          id="cod"
                          className="peer sr-only"
                        />
                        <label
                          htmlFor="cod"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-3 h-6 w-6"
                          >
                            <rect width="16" height="12" x="4" y="6" rx="2" />
                            <circle cx="12" cy="12" r="3" />
                            <path d="M2 12h2" />
                            <path d="M20 12h2" />
                          </svg>
                          Cash on Delivery
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234 5678 9012 3456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cardExpiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardCvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <FormField
                control={form.control}
                name="upiId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UPI ID</FormLabel>
                    <FormControl>
                      <Input placeholder="username@upi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : `Pay ₹${total}`}
            </Button>
          </form>
        </Form>

        <div className="space-y-6">
          <OrderSummary items={items} total={total} />

          {/* Shipping Details Summary */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span>{' '}
                {shippingDetails.name}
              </p>
              <p>
                <span className="font-medium">Email:</span>{' '}
                {shippingDetails.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{' '}
                {shippingDetails.phone}
              </p>
              <p>
                <span className="font-medium">Address:</span>{' '}
                {shippingDetails.address}, {shippingDetails.city},{' '}
                {shippingDetails.state} - {shippingDetails.pincode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
