import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ChevronRight, ChevronDown } from "lucide-react";

interface NetworkMember {
  id: string;
  username: string;
  level: number;
  package: number;
  children?: NetworkMember[];
}

interface NetworkTreeProps {
  data: NetworkMember;
  onMemberClick?: (member: NetworkMember) => void;
}

const NetworkTree: React.FC<NetworkTreeProps> = ({ data, onMemberClick }) => {
  const [expandedNodes, setExpandedNodes] = React.useState<Set<string>>(
    new Set([data.id]),
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
    if (depth === 0 && member.username === "You" && member.children) {
      return (
        <div key={member.id}>
          {member.children.map((child) => renderMember(child, 0))}
        </div>
      );
    }

    const hasChildren = member.children && member.children.length > 0;
    const isExpanded = expandedNodes.has(member.id);

    return (
      <div
        key={member.id}
        style={{
          marginLeft: `${depth * (window.innerWidth < 640 ? 12 : 24)}px`,
        }}
      >
        <div
          className={`flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border transition-all cursor-pointer
            ${member.username === "You" ? "bg-[#FF0000]/5 border-[#FF0000]" : "border-[#FF0000]/20 hover:bg-[#FF0000]/5"}
            ${depth === 0 ? "mb-2" : "my-2"}`}
        >
          <div
            className="p-1.5 hover:bg-[#FF0000]/10 rounded-full transition-colors"
            onClick={() => hasChildren && toggleNode(member.id)}
          >
            {hasChildren &&
              (isExpanded ? (
                <ChevronDown className="w-4 h-4 text-[#FF0000]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#FF0000]" />
              ))}
          </div>
          <div
            className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 flex-1"
            onClick={() => onMemberClick?.(member)}
          >
            <div className="p-2 rounded-full bg-[#FF0000]/10 shrink-0">
              <Users className="w-4 h-4 text-[#FF0000]" />
            </div>
            <div className="min-w-[100px]">
              <p className="font-medium truncate">{member.username}</p>
              <p className="text-sm text-gray-500">{member.level}</p>
            </div>
            <div className="ml-auto text-sm text-gray-500 shrink-0">
              {member.package} USDT
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="border-l-2 border-[#FF0000]/10 ml-3 sm:ml-6 pl-3 sm:pl-6">
            {member.children.map((child) => renderMember(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full bg-white border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
      <CardContent className="p-6">{renderMember(data)}</CardContent>
    </Card>
  );
};

export default NetworkTree;
