import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Home,
  Package,
  Users,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: <Home className="w-5 h-5" />, label: "Dashboard", href: "/" },
  {
    icon: <Package className="w-5 h-5" />,
    label: "Packages",
    href: "/packages",
  },
  { icon: <Users className="w-5 h-5" />, label: "Network", href: "/network" },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    href: "/settings",
  },
  { icon: <HelpCircle className="w-5 h-5" />, label: "Help", href: "/help" },
];

const Sidebar = ({
  isCollapsed = false,
  onToggle = () => {},
}: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full bg-[#0f172a] text-gray-100">
      <div className="p-6 mb-2 border-b border-gray-800/50">
        <h2
          className={cn("font-bold", isCollapsed ? "text-center" : "text-xl")}
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-[#FF0000]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z"
                fill="currentColor"
              />
            </svg>
            {!isCollapsed && (
              <span className="font-bold text-white">CrazyTron</span>
            )}
          </div>
        </h2>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-3">
        {navItems.map((item, index) => (
          <Button
            key={index}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3.5 transition-all",
              isCollapsed ? "justify-center" : "justify-start",
              "bg-[#FF0000]/5 hover:bg-[#FF0000]/15 text-white/90 hover:text-white rounded-xl",
              "border border-[#FF0000]/10 hover:border-[#FF0000]/30",
              "group relative overflow-hidden shadow-sm hover:shadow-md",
            )}
          >
            <div className="relative z-10 flex items-center gap-3 w-full">
              <div className="text-[#FF0000]/80 group-hover:text-[#FF0000] min-w-[24px] transition-colors duration-200">
                {item.icon}
              </div>
              {!isCollapsed && (
                <span className="font-medium group-hover:text-white">
                  {item.label}
                </span>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
          </Button>
        ))}
      </nav>
    </div>
  );

  // Desktop sidebar
  const DesktopSidebar = (
    <div
      className={cn(
        "hidden md:flex h-screen transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <NavContent />
    </div>
  );

  // Mobile sidebar
  const MobileSidebar = (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden fixed top-3 left-3 z-50 p-2 bg-black/50 backdrop-blur-sm rounded-lg"
        >
          <Menu className="w-6 h-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-80 bg-[#0f172a] border-none">
        <NavContent />
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      {DesktopSidebar}
      {MobileSidebar}
    </>
  );
};

export default Sidebar;
