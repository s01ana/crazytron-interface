import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface BuyPackageSectionProps {
  onPackageSelect?: (amount: number) => void;
  isLoading?: boolean;
}

const packageOptions = [
  { value: 50, label: "50 USDT - 4 Niveles" },
  { value: 100, label: "100 USDT - 5 Niveles" },
  { value: 200, label: "200 USDT - 6 Niveles" },
  { value: 500, label: "500 USDT - 8 Niveles" },
  { value: 1000, label: "1000 USDT - 10 Niveles" },
];

const BuyPackageSection = ({
  onPackageSelect = () => {},
  isLoading = false,
}: BuyPackageSectionProps) => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg border border-[#903d00]/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">
            Buy Investment Package
          </h3>
          <p className="text-sm text-gray-400">Select your investment amount</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[200px] bg-black text-white hover:bg-black/80"
              disabled={isLoading}
            >
              <span>Select Package</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[200px] bg-black border-gray-700"
            align="end"
          >
            {packageOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                className="text-white hover:bg-gray-700 cursor-pointer"
                onClick={() => onPackageSelect(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BuyPackageSection;
