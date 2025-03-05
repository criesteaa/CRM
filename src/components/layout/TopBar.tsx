import React, { useState } from "react";
import { Search, Bell, Settings, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { signOut, auth } from "@/lib/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  className?: string;
}

const TopBar = ({ className = "" }: TopBarProps) => {
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
    <div
      className={`w-full bg-white px-6 py-3 flex items-center justify-between border-b ${className}`}
    >
      {/* Search bar */}
      <div className="relative w-1/3">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for file, folder, etc..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border-none text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* User profile */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rehan" />
                <AvatarFallback>RR</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Jing Jing Surname</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
