import { useDispatch } from 'react-redux';
// import { setCredentials } from '@/features/auth/authSlice';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (response: any) => {
    try {
      // Here you would typically send the token to your backend
      // and get user data in response
      const userData = {
        user: {
          id: '1',
          email: 'user@example.com',
          name: 'Google User',
        },
        token: response.credential,
      };

      // dispatch(setCredentials(userData));
      toast({
        title: 'Success',
        description: 'Signed in with Google successfully',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in with Google',
        variant: 'destructive',
      });
    }
  };

  return { handleGoogleSuccess };
};