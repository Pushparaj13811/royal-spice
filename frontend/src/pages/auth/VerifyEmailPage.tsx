import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { userService } from '@/services/user.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

export function VerifyEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const email = user?.email;

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setIsVerifying(false);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      await userService.verifyEmail({ token: verificationToken });
      toast({
        title: 'Success!',
        description: 'Your email has been verified successfully.',
      });
      setTimeout(() => navigate('/auth/login'), 2000);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast({
        title: 'Error',
        description: axiosError.response?.data?.message || 'Failed to verify email',
        variant: 'destructive',
      });
      setIsVerifying(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setIsResending(true);
      if (!email) {
        throw new Error('No email found. Please try registering again.');
      }
      await userService.resendVerificationEmail(email);
      toast({
        title: 'Success!',
        description: 'Verification email has been resent. Please check your inbox.',
      });
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast({
        title: 'Error',
        description: axiosError.response?.data?.message || 'Failed to resend verification email',
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="container max-w-lg mx-auto px-4">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Email Verification</CardTitle>
            <CardDescription className="text-center">
              {isVerifying
                ? 'Verifying your email...'
                : token
                ? 'Verification failed. Please try again or request a new verification link.'
                : 'Please verify your email address to continue.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            {isVerifying ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <>
                <p className="text-sm text-muted-foreground text-center">
                  {token
                    ? "If you're still having trouble, you can request a new verification link."
                    : "Didn't receive the verification email? Click below to resend it."}
                </p>
                <Button
                  className="w-full"
                  onClick={handleResendVerification}
                  disabled={isResending}
                >
                  {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Resend Verification Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/auth/login')}
                >
                  Back to Login
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
