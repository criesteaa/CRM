import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Megaphone,
  UserCircle,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Campaign",
      path: "/campaign",
      icon: <Megaphone className="h-5 w-5" />,
    },
    {
      name: "Lead",
      path: "/lead",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Schedule",
      path: "/schedule",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Staff",
      path: "/staff",
      icon: <UserCircle className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-full w-[250px] bg-white border-r border-gray-200 p-4",
        className,
      )}
    >
      {/* Logo and branding */}
      <div className="flex items-center mb-8 px-2">
        <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold">BC</span>
        </div>
        <h1 className="ml-2 text-xl font-bold">ConsultCRM</h1>
      </div>

      {/* Navigation links */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <li key={item.name}>
                <Link to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                      isActive &&
                        "bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600",
                    )}
                  >
                    <span className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </span>
                    {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center px-3 py-2">
          <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-medium">JD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Business Consultant</p>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-gray-600"
          >
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-gray-600"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
