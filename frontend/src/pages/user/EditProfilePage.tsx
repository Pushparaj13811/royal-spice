import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { userServiceAxios } from '@/services/user.service';
import { useState, useEffect } from 'react';
import { Loader2, MapPin, User, Phone, Mail, Home } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getAvatarUrl, getInitials } from '@/lib/utils';
import { addressService } from '@/services/address.service';
import { Address } from '@/types/user.types';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  mobile: z
    .string()
    .regex(/^\+?[1-9]\d{9,11}$/, 'Invalid phone number')
    .transform((val) => val.replace(/\D/g, '')),
  email: z.string().email('Invalid email address'),
  avatar: z.any().optional(),
});

const addressSchema = z.object({
  selectedAddressId: z.string().optional(),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode'),
});

export function EditProfilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(user?.addresses?.[0]?._id || '');
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);

  useEffect(() => {
    const loadDefaultAddress = async () => {
      try {
        const response = await addressService.getPrimaryAddress();
        setDefaultAddress(response.data);
      } catch (error) {
        console.error('Failed to load default address:', error);
      }
    };
    loadDefaultAddress();
  }, []);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      mobile: user?.mobile || '',
      email: user?.email || '',
    },
  });

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      selectedAddressId: selectedAddressId,
      street: user?.addresses?.find(a => a._id === selectedAddressId)?.street || '',
      city: user?.addresses?.find(a => a._id === selectedAddressId)?.city || '',
      state: user?.addresses?.find(a => a._id === selectedAddressId)?.state || '',
      pincode: user?.addresses?.find(a => a._id === selectedAddressId)?.pincode || '',
    },
  });

  const onProfileSubmit = async (data: z.infer<typeof profileSchema>) => {
    setIsSubmittingProfile(true);
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('mobile', data.mobile);
      formData.append('email', data.email);
      if (data.avatar?.[0]) {
        formData.append('avatar', data.avatar[0]);
      }

      await userServiceAxios.updateProfile({
        fullName: data.fullName,
        mobile: data.mobile,
        email: data.email,
        avatar: data.avatar?.[0],
      });
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });

      // Refresh the page to get updated user data
      window.location.reload();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const onAddressSubmit = async (data: z.infer<typeof addressSchema>) => {
    setIsSubmittingAddress(true);
    try {
      if (selectedAddressId) {
        await userServiceAxios.updateAddress(selectedAddressId, {
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        });
      } else {
        await userServiceAxios.addAddress({
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          isDefault: user?.addresses?.length === 0, // Make it default if it's the first address
        });
      }
      
      toast({
        title: `Address ${selectedAddressId ? 'Updated' : 'Added'}`,
        description: `Your address has been ${selectedAddressId ? 'updated' : 'added'} successfully.`,
      });

      // Refresh the page to get updated user data
      window.location.reload();
    } catch {
      toast({
        title: 'Error',
        description: `Failed to ${selectedAddressId ? 'update' : 'add'} address. Please try again.`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingAddress(false);
    }
  };

  const handleAddressChange = (addressId: string) => {
    setSelectedAddressId(addressId);
    const selectedAddress = user?.addresses?.find(a => a._id === addressId);
    if (selectedAddress) {
      addressForm.reset({
        selectedAddressId: addressId,
        street: selectedAddress.street,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <p className="text-muted-foreground mt-1">Update your personal information and address</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/user')}>
            Cancel
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="address" className="space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Address</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={getAvatarUrl(user.email)} alt={user.fullName} />
                    <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.fullName}</h3>
                    <p className="text-sm text-muted-foreground truncate max-w-[300px]">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {defaultAddress ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <h3 className="text-lg font-medium">Default Address</h3>
                      </div>
                      <Card>
                        <CardContent className="pt-6">
                          <p className="font-medium">{defaultAddress.addressType}</p>
                          <p>{defaultAddress.addressLine1}</p>
                          {defaultAddress.addressLine2 && <p>{defaultAddress.addressLine2}</p>}
                          <p>{`${defaultAddress.city}, ${defaultAddress.state}`}</p>
                          <p>{`${defaultAddress.country} - ${defaultAddress.postalCode}`}</p>
                        </CardContent>
                      </Card>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/user/addresses')}
                        className="w-full"
                      >
                        Manage Addresses
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Alert>
                        <AlertDescription>
                          No default address set. Please add an address to your profile.
                        </AlertDescription>
                      </Alert>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/user/addresses')}
                        className="w-full"
                      >
                        Add Address
                      </Button>
                    </div>
                  )}
                </div>

                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" {...field} type="tel" placeholder="+91XXXXXXXXXX" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" {...field} type="email" disabled />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Contact support to change your email address
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmittingProfile}>
                        {isSubmittingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Profile
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address">
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>
                  Manage your delivery addresses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user.addresses && user.addresses.length > 0 ? (
                  <div className="mb-6">
                    <FormLabel>Select Address to Edit</FormLabel>
                    <Select value={selectedAddressId} onValueChange={handleAddressChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an address" />
                      </SelectTrigger>
                      <SelectContent>
                        <ScrollArea className="h-[200px]">
                          {user.addresses.map((address) => (
                            <SelectItem key={address._id} value={address._id || ''}>
                              {address.street}, {address.city}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <Alert className="mb-6">
                    <AlertDescription>
                      You don't have any saved addresses yet. Add your first address below.
                    </AlertDescription>
                  </Alert>
                )}

                <Form {...addressForm}>
                  <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-6">
                    <FormField
                      control={addressForm.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={addressForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={addressForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={addressForm.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button 
                        type="submit" 
                        disabled={isSubmittingAddress}
                      >
                        {isSubmittingAddress && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Address
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}