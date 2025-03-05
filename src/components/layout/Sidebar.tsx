import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserCircle,
  Monitor,
} from "lucide-react";
import SettingsDialog from "../settings/SettingsDialog";
import { useAuth } from "../auth/AuthContext";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { currentUser } = useAuth();

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Sales Funnel",
      path: "/sales-funnel",
      icon: <Monitor className="h-5 w-5" />,
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
        "flex flex-col h-full w-[200px] bg-white shadow-sm p-4 rounded-r-3xl",
        className,
      )}
    >
      {/* Logo and branding */}
      <div className="flex items-center mb-8 px-2">
        <div className="flex items-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#E6F2F2" />
            <path
              d="M16 8C11.58 8 8 11.58 8 16C8 20.42 11.58 24 16 24C20.42 24 24 20.42 24 16C24 11.58 20.42 8 16 8ZM12.8 20C11.92 20 11.2 19.28 11.2 18.4C11.2 17.52 11.92 16.8 12.8 16.8C13.68 16.8 14.4 17.52 14.4 18.4C14.4 19.28 13.68 20 12.8 20ZM12.8 15.2C11.92 15.2 11.2 14.48 11.2 13.6C11.2 12.72 11.92 12 12.8 12C13.68 12 14.4 12.72 14.4 13.6C14.4 14.48 13.68 15.2 12.8 15.2ZM16 21.6C15.12 21.6 14.4 20.88 14.4 20C14.4 19.12 15.12 18.4 16 18.4C16.88 18.4 17.6 19.12 17.6 20C17.6 20.88 16.88 21.6 16 21.6ZM19.2 15.2C18.32 15.2 17.6 14.48 17.6 13.6C17.6 12.72 18.32 12 19.2 12C20.08 12 20.8 12.72 20.8 13.6C20.8 14.48 20.08 15.2 19.2 15.2Z"
              fill="#4DB6AC"
            />
          </svg>
          <h1 className="ml-2 text-lg font-bold text-gray-800">Felicidad</h1>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <li key={item.name}>
                <Link to={item.path}>
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50",
                      isActive
                        ? "bg-teal-50 border border-[#4E8FA3] text-[#4E8FA3]"
                        : "ml-2",
                    )}
                  >
                    {item.icon}
                    <span className="ml-3 text-sm">{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings Dialog */}
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </aside>
  );
};

export default Sidebar;
