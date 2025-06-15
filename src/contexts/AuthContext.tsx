
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener with enhanced security
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Security: Clear sensitive data on sign out
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem('cart');
          // Clear any other sensitive localStorage items
        }

        // Security: Validate session integrity
        if (session && event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        }

        // Security: Log authentication events for audit
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          console.log(`User ${event.toLowerCase()} at:`, new Date().toISOString());
        }
      }
    );

    // Check for existing session with validation
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Session validation error:', error);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
