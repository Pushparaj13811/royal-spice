import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/lib/hooks/useCart';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, CreditCard, Check, MapPin, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentPage } from './PaymentPage';
import { CheckoutSuccessPage } from './CheckoutSuccessPage';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

interface ShippingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
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

const deliverySlots = [
  { id: '1', time: '10:00 AM - 12:00 PM', available: true },
  { id: '2', time: '12:00 PM - 2:00 PM', available: true },
  { id: '3', time: '2:00 PM - 4:00 PM', available: true },
  { id: '4', time: '4:00 PM - 6:00 PM', available: false },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, calculateTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { profile: userProfile } = useSelector((state: RootState) => state.user);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  if (!isAuthenticated) {
    navigate('/auth/login');
    return null;
  }

  const shippingDetails: ShippingDetails = {
    name: user?.fullName || '',
    email: user?.email || '',
    phone: userProfile?.phone || '',
    address: userProfile?.address?.street || '',
    city: userProfile?.address?.city || '',
    state: userProfile?.address?.state || '',
    pincode: userProfile?.address?.pincode || '',
  };

  const hasCompleteShippingDetails = 
    shippingDetails.name &&
    shippingDetails.email &&
    shippingDetails.phone &&
    shippingDetails.address &&
    shippingDetails.city &&
    shippingDetails.state &&
    shippingDetails.pincode;

  const steps = [
    { id: 1, name: 'Shipping', icon: Package, status: currentStep === 'shipping' ? 'current' : currentStep === 'payment' || currentStep === 'confirmation' ? 'complete' : 'upcoming' },
    { id: 2, name: 'Payment', icon: CreditCard, status: currentStep === 'payment' ? 'current' : currentStep === 'confirmation' ? 'complete' : 'upcoming' },
    { id: 3, name: 'Confirmation', icon: Check, status: currentStep === 'confirmation' ? 'current' : 'upcoming' },
  ];

  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground">
            Add some items to your cart to proceed with checkout
          </p>
          <Button onClick={() => navigate('/products')}>Browse Products</Button>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'shipping':
        if (!hasCompleteShippingDetails) {
          return (
            <div className="space-y-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Shipping Details</h2>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/user/edit-profile')}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Update Profile
                    </Button>
                  </div>
                  <div className="text-center py-8">
                    <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Incomplete Shipping Details</h3>
                    <p className="text-muted-foreground mb-4">
                      Please update your profile with complete shipping details before proceeding with checkout.
                    </p>
                    <Button onClick={() => navigate('/user/edit-profile')}>
                      Complete Profile
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Shipping Details</h2>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/user/edit-profile')}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Update Profile
                  </Button>
                </div>
                <div className="grid gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">{shippingDetails.name}</div>
                      <div className="text-muted-foreground">{shippingDetails.address}</div>
                      <div className="text-muted-foreground">
                        {shippingDetails.city}, {shippingDetails.state} {shippingDetails.pincode}
                      </div>
                      <div className="text-muted-foreground mt-1">{shippingDetails.phone}</div>
                      <div className="text-muted-foreground">{shippingDetails.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Select Delivery Slot</h3>
              <RadioGroup
                value={selectedDeliverySlot}
                onValueChange={setSelectedDeliverySlot}
                className="grid gap-4"
              >
                {deliverySlots.map((slot) => (
                  <div key={slot.id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={slot.id}
                      id={`slot-${slot.id}`}
                      disabled={!slot.available}
                    />
                    <Label
                      htmlFor={`slot-${slot.id}`}
                      className={slot.available ? '' : 'text-muted-foreground'}
                    >
                      {slot.time} {!slot.available && '(Unavailable)'}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </Card>

            <div className="flex justify-end">
              <Button
                disabled={!selectedDeliverySlot}
                onClick={() => setCurrentStep('payment')}
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <PaymentPage
            onBack={() => setCurrentStep('shipping')}
            onSuccess={(orderDetails) => {
              setCurrentStep('confirmation');
              setOrderDetails(orderDetails);
            }}
            shippingDetails={shippingDetails}
            deliverySlot={selectedDeliverySlot}
            promoCode={promoCode}
          />
        );

      case 'confirmation':
        if (!orderDetails) {
          return <div>Loading order details...</div>;
        }
        return (
          <CheckoutSuccessPage
            orderDetails={orderDetails}
            onContinueShopping={() => {
              clearCart();
              navigate('/products');
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Checkout Steps */}
      <div className="mb-12">
        <div className="flex justify-between">
          {steps.map((step, stepIdx) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center ${stepIdx !== 0 ? 'flex-1' : ''}`}>
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 ${step.status === 'current' ? 'border-primary bg-primary text-white' :
                    step.status === 'complete' ? 'border-green-500 bg-green-500 text-white' :
                      'border-gray-300'
                  }`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">{step.name}</p>
                </div>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div className="hidden h-0.5 w-20 bg-gray-200 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {currentStep === 'shipping' ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            {renderStepContent()}
          </div>
          <div className="space-y-6">
            <OrderSummary items={items} total={calculateTotal()} />

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Have a promo code?</h3>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button variant="outline">Apply</Button>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="w-full">
          {renderStepContent()}
        </div>
      )}
    </div>
  );
}
