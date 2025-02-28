import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LineChart,
  Users,
  Calendar,
  UserCircle,
  Settings,
  LogOut,
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
      name: "Sales Funnel",
      path: "/sales-funnel",
      icon: <LineChart className="h-5 w-5" />,
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
        "flex flex-col h-full w-[250px] bg-white rounded-lg shadow-sm p-4",
        className,
      )}
    >
      {/* Navigation links */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <li key={item.name}>
                <Link to={item.path}>
                  <div
                    className={cn(
                      "flex items-center px-4 py-3 rounded-md text-gray-600",
                      isActive
                        ? "text-teal-600 border border-teal-200 bg-white"
                        : "hover:bg-gray-50",
                    )}
                  >
                    <span
                      className={cn(
                        "text-gray-400",
                        isActive && "text-teal-500",
                      )}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={cn(
                        "ml-3 font-medium",
                        isActive && "text-teal-600",
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section - removed for cleaner sidebar */}
    </aside>
  );
};

export default Sidebar;
