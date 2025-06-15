
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSecureAuth = () => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [sessionTimeoutWarning, setSessionTimeoutWarning] = useState(false);

  // Session timeout monitoring
  useEffect(() => {
    if (!session) return;

    const checkSessionExpiry = () => {
      const expiresAt = session.expires_at ? session.expires_at * 1000 : 0;
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;
      
      // Show warning 5 minutes before expiry
      if (timeUntilExpiry > 0 && timeUntilExpiry <= 5 * 60 * 1000) {
        setSessionTimeoutWarning(true);
      }
      
      // Auto-refresh if within 10 minutes of expiry
      if (timeUntilExpiry > 0 && timeUntilExpiry <= 10 * 60 * 1000) {
        refreshSession();
      }
    };

    const interval = setInterval(checkSessionExpiry, 60 * 1000); // Check every minute
    return () => clearInterval(interval);
  }, [session]);

  const refreshSession = async () => {
    try {
      const { error } = await supabase.auth.refreshSession();
      if (error) {
        console.error('Session refresh failed:', error);
        toast({
          title: "Session Expired",
          description: "Please sign in again to continue.",
          variant: "destructive",
        });
      } else {
        setSessionTimeoutWarning(false);
      }
    } catch (error) {
      console.error('Session refresh error:', error);
    }
  };

  const secureSignOut = async () => {
    try {
      // Clear any sensitive data from localStorage
      localStorage.removeItem('cart');
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
      
      toast({
        title: "Signed Out",
        description: "You have been securely signed out.",
      });
    } catch (error) {
      console.error('Secure sign out error:', error);
    }
  };

  const extendSession = () => {
    refreshSession();
    setSessionTimeoutWarning(false);
  };

  return {
    user,
    session,
    sessionTimeoutWarning,
    refreshSession,
    secureSignOut,
    extendSession,
    isAuthenticated: !!user
  };
};
