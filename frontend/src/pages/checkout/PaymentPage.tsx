import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/lib/hooks/useCart';
import { processPayment } from '@/lib/api/payment';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
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
import { Checkbox } from '@/components/ui/checkbox';

interface PaymentPageProps {
  onBack?: () => void;
  onSuccess?: (orderDetails: OrderDetails) => void;
  shippingDetails: ShippingDetails;
  deliverySlot?: string;
  promoCode?: string;
}

interface OrderDetails {
  orderId: string;
  total: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
}

interface ShippingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const paymentSchema = z
  .object({
    paymentMethod: z.enum(['card', 'upi', 'cod']),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvv: z.string().optional(),
    upiId: z.string().optional(),
    savePaymentMethod: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === 'card') {
        return !!data.cardNumber && !!data.cardExpiry && !!data.cardCvv;
      }
      if (data.paymentMethod === 'upi') {
        return !!data.upiId;
      }
      return true;
    },
    {
      message: 'Please fill in all required payment details',
    }
  );

export function PaymentPage({
  onBack,
  onSuccess,
  shippingDetails,
  deliverySlot,
  promoCode,
}: PaymentPageProps) {
  const navigate = useNavigate();
  const { items, calculateTotal,} = useCart();
  const total = calculateTotal();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'card',
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  const onSubmit = async (data: z.infer<typeof paymentSchema>) => {
    try {
      setIsProcessing(true);
      const response = await processPayment({
        ...data,
        amount: total,
        shippingDetails: shippingDetails,
        deliverySlot,
        promoCode,
      });

      if (onSuccess) {
        const orderDetails = {
          orderId: response.orderId,
          total,
          name: shippingDetails.name,
          email: shippingDetails.email,
          phone: shippingDetails.phone,
          address: shippingDetails.address,
          paymentMethod: data.paymentMethod,
        };
        
        onSuccess(orderDetails);
      }
    } catch {
      toast({
        title: 'Payment Failed',
        description: 'There was an error processing your payment. Please try again.',
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
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Card className="p-8">
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold">Payment Details</h1>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel className="text-lg">Choose Payment Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                              <div className="relative">
                                <RadioGroupItem
                                  value="card"
                                  id="card"
                                  className="peer sr-only"
                                />
                                <label
                                  htmlFor="card"
                                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-card p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all duration-200"
                                >
                                  <Icons.creditCard className="mb-3 h-8 w-8" />
                                  <span className="font-medium">Credit/Debit Card</span>
                                </label>
                              </div>
                              <div className="relative">
                                <RadioGroupItem
                                  value="upi"
                                  id="upi"
                                  className="peer sr-only"
                                />
                                <label
                                  htmlFor="upi"
                                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-card p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all duration-200"
                                >
                                  <Icons.smartphone className="mb-3 h-8 w-8" />
                                  <span className="font-medium">UPI Payment</span>
                                </label>
                              </div>
                              <div className="relative">
                                <RadioGroupItem
                                  value="cod"
                                  id="cod"
                                  className="peer sr-only"
                                />
                                <label
                                  htmlFor="cod"
                                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-card p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all duration-200"
                                >
                                  <Icons.banknote className="mb-3 h-8 w-8" />
                                  <span className="font-medium">Cash on Delivery</span>
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {paymentMethod === 'card' && (
                      <div className="space-y-6 bg-accent/20 p-6 rounded-lg">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    placeholder="4242 4242 4242 4242"
                                    {...field}
                                    className="font-mono pl-10"
                                  />
                                  <Icons.creditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="cardExpiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input placeholder="MM/YY" {...field} className="pl-10" />
                                    <Icons.calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                  </div>
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
                                  <div className="relative">
                                    <Input placeholder="123" {...field} type="password" className="pl-10" />
                                    <Icons.lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'upi' && (
                      <div className="space-y-4 bg-accent/20 p-6 rounded-lg">
                        <FormField
                          control={form.control}
                          name="upiId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>UPI ID</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input placeholder="username@upi" {...field} className="pl-10" />
                                  <Icons.smartphone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {paymentMethod !== 'cod' && (
                      <FormField
                        control={form.control}
                        name="savePaymentMethod"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Save payment method for future use</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        disabled={isProcessing}
                        className="w-[140px]"
                      >
                        <Icons.arrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isProcessing}
                        className="w-[140px]"
                      >
                        {isProcessing ? (
                          <>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Pay ₹{total.toFixed(2)}
                            <Icons.arrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.name}</span>
                        <Badge variant="secondary" className="text-xs">×{item.quantity}</Badge>
                      </div>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                {promoCode && (
                  <>
                    <div className="flex justify-between items-center text-green-600">
                      <span className="font-medium">Promo Code Applied</span>
                      <Badge variant="secondary" className="bg-green-100">{promoCode}</Badge>
                    </div>
                    <Separator />
                  </>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-lg font-bold text-primary">₹{total.toFixed(2)}</span>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Delivery Details</h3>
                    {deliverySlot && (
                      <Badge variant="outline" className="ml-2">
                        <Icons.clock className="mr-1 h-3 w-3" />
                        {deliverySlot}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm space-y-2 text-muted-foreground bg-accent/20 p-4 rounded-lg">
                    <p className="font-medium text-foreground">{shippingDetails.name}</p>
                    <p>{shippingDetails.address}</p>
                    <p>{shippingDetails.city}, {shippingDetails.state} - {shippingDetails.pincode}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
