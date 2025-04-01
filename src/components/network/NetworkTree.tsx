import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ChevronRight, ChevronDown } from "lucide-react";
import { addressElipse } from "@/utils/common";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAccount } from "wagmi";

interface NetworkMember {
  address: string;
  activeLevel: number;
  totalNetworkPaid: number;
  networkLevel: number;
  networkPackSize: number;
  children?: NetworkMember[];
}

interface NetworkTreeProps {
  data: NetworkMember;
  onMemberClick?: (member: any) => void;
}

const NetworkTree: React.FC<NetworkTreeProps> = ({ data, onMemberClick }) => {
  const { t, language } = useLanguage();
  const { address } = useAccount();
  const [expandedNodes, setExpandedNodes] = React.useState<Set<string>>(
    new Set([data?.address]),
  );

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderMember = (member: NetworkMember, depth: number = 0) => {
    // Skip rendering the "You" node at the top level
    if (depth === 0 && member?.address === address && member?.children) {
      return (
        <div key={member?.address}>
          {member?.children.map((child) => renderMember(child, 0))}
        </div>
      );
    }

    const hasChildren = member?.children && member?.children.length > 0;
    const isExpanded = expandedNodes.has(member?.address);

    return (
      <div
        key={member?.address}
        style={{
          marginLeft: `${depth * (window.innerWidth < 640 ? 12 : 24)}px`,
        }}
      >
        <div
          className={`flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border transition-all cursor-pointer
            ${member?.address === address ? "bg-[#903d00]/5 border-[#903d00]" : "border-[#903d00]/20 hover:bg-[#903d00]/5"}
            ${depth === 0 ? "mb-2" : "my-2"}`}
        >
          <div
            className="p-1.5 hover:bg-[#903d00]/10 rounded-full transition-colors"
            onClick={() => hasChildren && toggleNode(member?.address)}
          >
            {hasChildren &&
              (isExpanded ? (
                <ChevronDown className="w-4 h-4 text-[#903d00]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#903d00]" />
              ))}
          </div>
          <div
            className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 flex-1"
            onClick={() => onMemberClick?.(member)}
          >
            <div className="p-2 rounded-full bg-[#903d00]/10 shrink-0">
              <Users className="w-4 h-4 text-[#903d00]" />
            </div>
            <div className="min-w-[100px]">
              <p className="font-medium truncate">{addressElipse(member?.address)}</p>
              <p className="text-sm text-gray-500">{language === "es" ? "Nivel" : "Level"} {member?.networkLevel}</p>
            </div>
            <div className="ml-auto text-sm text-gray-500 shrink-0">
              {member?.networkPackSize} USDT
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="border-l-2 border-[#903d00]/10 ml-3 sm:ml-6 pl-3 sm:pl-6">
            {member?.children.map((child) => renderMember(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full bg-white border-[#903d00]/20 shadow-lg hover:shadow-[#903d00]/10 transition-shadow">
      <CardContent className="p-6">{renderMember(data)}</CardContent>
    </Card>
  );
};

export default NetworkTree;
