import React, { useState } from "react";
import Header from "@/components/dashboard/Header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, ChevronRight, Trophy, Wallet } from "lucide-react";
import NetworkTree from "./NetworkTree";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { useReferrals } from "@/hooks/useReferrals";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useNetworks } from "@/hooks/useNetworks";

interface NetworkMember {
  id: string;
  username: string;
  level: number;
  package: number;
  children?: NetworkMember[];
}

const NetworkPage = () => {
  const { t, language } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<NetworkMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [memberHistory, setMemberHistory] = useState<NetworkMember[]>([]);

  const { address } = useWallet();
  const [ wallet, setWallet ] = useState(address)

  const {referrals, networkEarnings, networkLevel, network} = useNetworks()

  const handleMemberClick = (member: NetworkMember) => {
    setSelectedMember(member);
    setMemberHistory((prev) => [...prev, member]);
    setIsDialogOpen(true);
  };

  const formatLevel = (level: number) => {
    return language === "es" ? `Nivel ${level}` : `Level ${level}`;
  };

  const networkData: NetworkMember = {
    id: "1",
    username: "You",
    level: 4,
    package: 500,
    children: [
      {
        id: "2",
        username: "CryptoKing",
        level: 3,
        package: 200,
        children: [
          {
            id: "5",
            username: "BitQueen",
            level: 2,
            package: 100,
            children: [
              {
                id: "8",
                username: "CryptoNewbie",
                level: 1,
                package: 50,
              },
              {
                id: "9",
                username: "BlockStarter",
                level: 1,
                package: 50,
              },
            ],
          },
          {
            id: "6",
            username: "ChainMaker",
            level: 2,
            package: 100,
            children: [
              {
                id: "10",
                username: "TronBeginner",
                level: 1,
                package: 50,
              },
            ],
          },
        ],
      },
      {
        id: "3",
        username: "BlockMaster",
        level: 3,
        package: 200,
        children: [
          {
            id: "7",
            username: "NodeRunner",
            level: 2,
            package: 100,
            children: [
              {
                id: "11",
                username: "CryptoLearner",
                level: 1,
                package: 50,
              },
              {
                id: "12",
                username: "ChainStudent",
                level: 1,
                package: 50,
              },
            ],
          },
        ],
      },
      {
        id: "4",
        username: "TronWarrior",
        level: 3,
        package: 200,
        children: [
          {
            id: "13",
            username: "BlockChampion",
            level: 2,
            package: 100,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search network members..."
              className="w-full p-3 pl-10 rounded-lg border border-[#FF0000]/20 focus:outline-none focus:ring-2 focus:ring-[#FF0000]/20"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {/* Network Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {/* <Card className="bg-white border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
              <CardContent className="p-3 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-full bg-[#FF0000]/10">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF0000]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {language === "es"
                        ? "Tamaño Total de Red"
                        : "Total Network Size"}
                    </p>
                    <p className="text-lg sm:text-2xl font-bold">
                      {language === "es" ? `12 Miembros` : "12 Members"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            <Card className="bg-white border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
              <CardContent className="p-3 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-full bg-[#FF0000]/10">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF0000]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {language === "es" ? "Nivel de Red" : "Network Level"}
                    </p>
                    <p className="text-lg sm:text-2xl font-bold">
                      {networkLevel}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
              <CardContent className="p-3 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-full bg-[#FF0000]/10">
                    <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF0000]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {language === "es"
                        ? "Ganancias de Red"
                        : "Network Earnings"}
                    </p>
                    <p className="text-lg sm:text-2xl font-bold">${networkEarnings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
              <CardContent className="p-3 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-full bg-[#FF0000]/10">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF0000]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {language === "es"
                        ? "Referidos Directos"
                        : "Direct Referrals"}
                    </p>
                    <p className="text-lg sm:text-2xl font-bold">
                      {language === "es" ? `${referrals} Miembros` : `${referrals} Members`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Network Tree */}
          <NetworkTree
            data={{
              ...networkData,
              level: networkData.level,
            }}
            onMemberClick={handleMemberClick}
          />

          {/* Member Details Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 h-8"
                    onClick={() => {
                      // Go back to previous member if there's a history
                      if (memberHistory.length > 1) {
                        const newHistory = [...memberHistory];
                        newHistory.pop(); // Remove current member
                        const previousMember =
                          newHistory[newHistory.length - 1];
                        setMemberHistory(newHistory);
                        setSelectedMember(previousMember);
                      } else {
                        setIsDialogOpen(false);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m12 19-7-7 7-7" />
                    </svg>
                    <span>{language === "es" ? "Atrás" : "Back"}</span>
                  </Button>
                  <DialogTitle>
                    {language === "es"
                      ? "Detalles del Miembro de Red"
                      : "Network Member Details"}
                  </DialogTitle>
                </div>
              </DialogHeader>
              {selectedMember && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-[#FF0000]/10">
                      <Users className="w-6 h-6 text-[#FF0000]" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">
                        {selectedMember.username}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatLevel(selectedMember.level)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-500">
                        {language === "es"
                          ? "Paquete Activo"
                          : "Active Package"}
                      </p>
                      <p className="text-lg font-semibold">
                        {selectedMember.package} USDT
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-500">
                        {language === "es" ? "Tamaño del Equipo" : "Team Size"}
                      </p>
                      <p className="text-lg font-semibold">
                        {selectedMember.children?.length || 0}{" "}
                        {language === "es" ? "Miembros" : "Members"}
                      </p>
                    </div>
                  </div>

                  {selectedMember.children &&
                    selectedMember.children.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold">
                          {language === "es"
                            ? "Referidos Directos"
                            : "Direct Referrals"}
                        </h4>
                        <div className="space-y-2">
                          {selectedMember.children.map((child) => (
                            <div
                              key={child.id}
                              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                              onClick={() => {
                                setSelectedMember(child);
                                setMemberHistory((prev) => [...prev, child]);
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="font-medium">
                                    {child.username}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {formatLevel(child.level)}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
