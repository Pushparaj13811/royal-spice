import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { userServiceAxios } from '@/services/user.service';
import { useToast } from '@/hooks/use-toast';

export function EmailVerificationBanner() {
  const { toast } = useToast();
  const { user, needsEmailVerification } = useSelector((state: RootState) => state.auth);

  if (!needsEmailVerification || !user) {
    return null;
  }

  const handleResendVerification = async () => {
    try {
      await userServiceAxios.resendVerificationEmail();
      toast({
        title: "Success",
        description: "Verification email has been sent. Please check your inbox.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to resend verification email. Please try again.",
      });
    }
  };

  return (
    <Alert className="mb-4">
      <AlertTitle>Email Verification Required</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>Please verify your email address to access all features.</span>
        <Button variant="outline" onClick={handleResendVerification}>
          Resend Verification Email
        </Button>
      </AlertDescription>
    </Alert>
  );
}
