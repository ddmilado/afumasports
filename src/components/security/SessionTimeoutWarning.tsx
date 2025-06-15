
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SessionTimeoutWarningProps {
  isOpen: boolean;
  onExtendSession: () => void;
  onSignOut: () => void;
}

export const SessionTimeoutWarning = ({ 
  isOpen, 
  onExtendSession, 
  onSignOut 
}: SessionTimeoutWarningProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Session Expiring Soon</DialogTitle>
          <DialogDescription>
            Your session will expire in less than 5 minutes due to inactivity. 
            Would you like to extend your session or sign out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onSignOut}>
            Sign Out
          </Button>
          <Button onClick={onExtendSession}>
            Extend Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
