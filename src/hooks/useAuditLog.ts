
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useAuditLog = () => {
  const { user } = useAuth();

  const logAction = async (
    action: string,
    tableName?: string,
    recordId?: string,
    oldValues?: any,
    newValues?: any
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action,
          table_name: tableName,
          record_id: recordId,
          old_values: oldValues,
          new_values: newValues,
          ip_address: null, // Client-side can't get real IP
          user_agent: navigator.userAgent
        });

      if (error) {
        console.error('Audit log error:', error);
      }
    } catch (error) {
      console.error('Failed to log action:', error);
    }
  };

  const logCartAction = (action: 'add' | 'remove' | 'update', productId: string, quantity?: number) => {
    logAction(`cart_${action}`, 'cart_items', productId, null, { quantity });
  };

  const logOrderAction = (action: 'create' | 'update', orderId: string, orderData?: any) => {
    logAction(`order_${action}`, 'orders', orderId, null, orderData);
  };

  const logAuthAction = (action: 'login' | 'logout' | 'signup') => {
    logAction(`auth_${action}`, 'profiles', user?.id);
  };

  return {
    logAction,
    logCartAction,
    logOrderAction,
    logAuthAction
  };
};
