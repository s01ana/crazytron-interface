import React from "react";
import { Button } from "../ui/button";
import { Home, Package, Users, Settings, HelpCircle, Menu } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const getNavItems = (t: (key: string) => string): NavItem[] => [
  {
    icon: <Home className="w-5 h-5" />,
    label: t("common.dashboard"),
    href: "/",
  },
  {
    icon: <Package className="w-5 h-5" />,
    label: t("common.packages"),
    href: "/packages",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: t("common.network"),
    href: "/network",
  },
  // {
  //   icon: <Settings className="w-5 h-5" />,
  //   label: t("common.settings"),
  //   href: "/settings",
  // },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    label: t("common.compensation"),
    href: "/compensation",
  },
];

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = React.useState(
    window.location.pathname,
  );
  const navItems = React.useMemo(() => getNavItems(t), [t]);

  React.useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Set initial path
    handleLocationChange();

    // Listen for location changes
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setCurrentPath(path);
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a] border-b border-gray-800/50 px-2 sm:px-4">
      <div className="max-w-[1312px] mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-4">
            <svg
              className="w-6 h-6 text-[#903d00]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z"
                fill="currentColor"
              />
            </svg>
            <span className="font-bold text-white">CrazyBSC</span>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "flex items-center gap-2 px-4 py-2",
                  "text-white/80 hover:text-white hover:bg-[#c05100]",
                  currentPath === item.href
                    ? "bg-[#903d00]"
                    : "hover:bg-[#903d00]",
                  "transition-colors duration-200",
                )}
                onClick={() => handleNavigation(item.href)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="hidden lg:flex items-center gap-2 mr-4">
            <Select
              value={language}
              onValueChange={(value: "en" | "es") => setLanguage(value)}
            >
              <SelectTrigger className="w-[130px] bg-transparent border-none text-white hover:bg-white/10 transition-colors">
                <SelectValue placeholder="Language">
                  {language === "en" ? "English" : "Español"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="min-w-[130px] bg-black/90 border-gray-800">
                <SelectItem value="en" className="text-white hover:bg-white/10">
                  English
                </SelectItem>
                <SelectItem value="es" className="text-white hover:bg-white/10">
                  Español
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Wallet Connect */}
          {/* <WalletConnect className="hidden md:flex min-w-[48px] justify-center" /> */}
          {/* <div className="hidden md:flex min-w-[48px] justify-center"> */}
            {/* <WalletActionButton className="hidden md:flex min-w-[48px] justify-center" /> */}
          <div className="hidden lg:flex">
            <appkit-button balance='hide' />
          </div>
          {/* </div> */}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="lg:hidden text-white/80 hover:text-white hover:bg-[#903d00]"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] bg-[#0f172a] border-r border-gray-800/50 p-0"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-800/50">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-[#903d00]"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="font-bold text-white">CrazyBSC</span>
                  </div>
                </div>
                <nav className="flex-1 p-4">
                  <div className="flex flex-col gap-2">
                    {navItems.map((item, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-2 px-4 py-6",
                          "text-white/80 hover:text-white",
                          currentPath === item.href
                            ? "bg-[#903d00]"
                            : "hover:bg-[#903d00]",
                          "transition-colors duration-200",
                        )}
                        onClick={() => handleNavigation(item.href)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Button>
                    ))}
                    {/* Language Selector Mobile */}
                    <div className="px-4 py-6">
                      <Select
                        value={language}
                        onValueChange={(value: "en" | "es") =>
                          setLanguage(value)
                        }
                      >
                        <SelectTrigger className="w-full bg-transparent border-none text-white hover:bg-white/10 transition-colors">
                          <SelectValue placeholder="Language">
                            {language === "en" ? "English" : "Español"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="min-w-[130px] bg-black/90 border-gray-800">
                          <SelectItem
                            value="en"
                            className="text-white hover:bg-white/10"
                          >
                            English
                          </SelectItem>
                          <SelectItem
                            value="es"
                            className="text-white hover:bg-white/10"
                          >
                            Español
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* <WalletActionButton className="w-full justify-start px-4 py-6"/> */}
                    <appkit-button balance='hide' />
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
