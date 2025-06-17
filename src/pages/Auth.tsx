import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
// import HCaptcha from '@hcaptcha/react-hcaptcha';
import { emailSchema, passwordSchema, sanitizeInput, createRateLimiter } from "@/utils/validation";
import { useAuditLog } from "@/hooks/useAuditLog";


// Create rate limiter for auth attempts (5 attempts per 15 minutes)
const authRateLimiter = createRateLimiter(5, 15 * 60 * 1000);

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { logAuthAction } = useAuditLog();
  // const captcha = useRef<HCaptcha>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = sanitizeInput(formData.get('email') as string);
    const password = formData.get('password') as string;

    const confirmPassword = formData.get('confirmPassword') as string;

    try {
      // Rate limiting check
      if (!authRateLimiter(email)) {
        toast({
          title: "Rate Limit Exceeded",
          description: "Too many login attempts. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      // Input validation
      const emailValidation = emailSchema.safeParse(email);
      if (!emailValidation.success) {
        toast({
          title: "Invalid Email",
          description: emailValidation.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }

      const passwordValidation = passwordSchema.safeParse(password);
      if (!passwordValidation.success) {
        toast({
          title: "Invalid Password",
          description: passwordValidation.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }

      if (isSignUp) {
        // Validate password confirmation
        if (password !== confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            variant: "destructive",
          });
          return;
        }

        // Check if captcha token is present for sign up
        // if (!captchaToken) {
        //   toast({
        //     title: "Error", 
        //     description: "Please complete the CAPTCHA verification",
        //     variant: "destructive",
        //   });
        //   return;
        // }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { 
            // captchaToken,

            emailRedirectTo: `${window.location.origin}/`
          },
        });

        if (error) {
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success!",
            description: "Please check your email to confirm your account.",
          });
          logAuthAction('signup');
        }

        // Reset captcha after sign up attempt
        // if (captcha.current) {
        //   captcha.current.resetCaptcha();
        //   setCaptchaToken(null);
        // }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been signed in successfully.",
          });
          logAuthAction('login');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast({
          title: "Google sign in failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Google auth error:', error);
      toast({
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl border border-gray-300">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <img src="/icon.svg" alt="Auron Auto Logo" className="w-16 h-16" />
            <div>
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Auron Auto</h1>
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-blue-800">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-800">
            {isSignUp ? 'Join us to start shopping' : 'Welcome back! Please sign in to continue'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="email-address">Email address</Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </span>
              </div>
            </div>
            {isSignUp && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </span>
                </div>
              </div>
            )}
          </div>



          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleGoogleAuth}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google logo" className="w-5 h-5 mr-2" />
              Google
            </Button>
          </div>
        </div>

        <div className="text-center text-sm mt-6">
          {isSignUp ? (
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="#" onClick={() => setIsSignUp(false)} className="font-medium text-orange-600 hover:text-orange-500">
                Sign in
              </Link>
            </p>
          ) : (
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="#" onClick={() => setIsSignUp(true)} className="font-medium text-orange-600 hover:text-orange-500">
                Sign up
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
