import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut, auth } from "@/lib/firebase";
import { useAuth } from "../auth/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings, Bell, Shield } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Remove local storage user for demo purposes
      localStorage.removeItem("user");

      // Also try Firebase signout if configured
      try {
        await signOut(auth);
      } catch (e) {
        // Ignore Firebase errors in demo mode
      }

      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Settings</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* User Profile Section */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg">
                {currentUser?.displayName || "John Doe"}
              </h3>
              <p className="text-sm text-gray-500">
                {currentUser?.email || "john.doe@example.com"}
              </p>
              <p className="text-xs text-gray-400 mt-1">Business Consultant</p>
            </div>
          </div>

          {/* Settings Options */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <User className="mr-2 h-4 w-4" />
              Account Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <Shield className="mr-2 h-4 w-4" />
              Privacy & Security
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <Settings className="mr-2 h-4 w-4" />
              Preferences
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
