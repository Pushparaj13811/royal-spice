import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { userServiceAxios } from '@/services/user.service';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AxiosError } from 'axios';

// Validation schema
const verifyMobileSchema = z.object({
  otp: z.string().min(4, 'OTP must be at least 4 digits').max(6, 'OTP cannot be more than 6 digits'),
});

type VerifyMobileFormValues = z.infer<typeof verifyMobileSchema>;

export function VerifyMobilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const form = useForm<VerifyMobileFormValues>({
    resolver: zodResolver(verifyMobileSchema),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    // Redirect if user is not logged in or mobile is already verified
    if (!user) {
      navigate('/auth/login');
    } else if (user.numberVerified) {
      navigate('/user');
    }
  }, [user, navigate]);

  const sendVerificationOTP = async () => {
    try {
      setIsSendingOTP(true);
      await userServiceAxios.sendVerificationSMS();
      toast({
        title: 'Success!',
        description: 'OTP has been sent to your mobile number.',
      });
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        title: 'Error!',
        description: axiosError.response?.data?.message || 'Failed to send OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingOTP(false);
    }
  };

  const onSubmit = async (data: VerifyMobileFormValues) => {
    try {
      setIsVerifying(true);
      await userServiceAxios.verifyMobile({ otp: data.otp });
      toast({
        title: 'Success!',
        description: 'Your mobile number has been verified successfully.',
      });
      setTimeout(() => navigate('/user'), 2000);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        title: 'Error!',
        description: axiosError.response?.data?.message || 'Failed to verify mobile number. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container max-w-lg mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Verify Your Mobile Number</CardTitle>
          <CardDescription>
            Please verify your mobile number {user.mobile} to continue using all features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={sendVerificationOTP}
              disabled={isSendingOTP}
              className="w-full"
            >
              {isSendingOTP ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </Button>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter OTP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the OTP sent to your mobile"
                          {...field}
                          type="number"
                          maxLength={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isVerifying}>
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Mobile Number'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default VerifyMobilePage;
