import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  title?: string;
  userName?: string;
  userRole?: string;
}

const TopBar = ({
  title = "Dashboard",
  userName = "Jing Surname",
  userRole = "Admin",
}: TopBarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    navigate("/login");
  };

  return (
    <div className="w-full h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-medium">{title}</h1>
      </div>

      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-2 outline-none">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=jing"
                  alt="User"
                  className="h-8 w-8"
                />
              </div>
              <div className="ml-2 text-sm">
                <p className="font-medium">{userName}</p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
              <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
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
