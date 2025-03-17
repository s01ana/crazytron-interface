import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";

interface Payout {
  hash: string;
  amount: number;
  timestamp: Date;
  status: "confirmed" | "pending";
  type: "package" | "referral" | "distribution" | "renewal";
  description: string;
}

const mockPayouts: Payout[] = [
  {
    hash: "TRXa7c8...3f9d",
    amount: 25.5,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: "confirmed",
    type: "package",
    description: "Weekly Package Earnings",
  },
  {
    hash: "TRX4d5c...7b9a",
    amount: 75.25,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: "confirmed",
    type: "referral",
    description: "Network Referral Fee",
  },
  {
    hash: "TRX2e3d...5c8b",
    amount: 50.75,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: "confirmed",
    type: "distribution",
    description: "Network Distribution Bonus",
  },
  {
    hash: "TRX9f8e...1a2b",
    amount: 100,
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    status: "confirmed",
    type: "renewal",
    description: "Network Renewal Bonus",
  },
];

const getTypeColor = (type: Payout["type"]) => {
  switch (type) {
    case "package":
      return "bg-green-100 text-green-700";
    case "referral":
      return "bg-blue-100 text-blue-700";
    case "distribution":
      return "bg-purple-100 text-purple-700";
    case "renewal":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const PayoutHistory = () => {
  const { t } = useLanguage();
  return (
    <Card className="w-full bg-white border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <History className="w-6 h-6 text-[#FF0000]" />
          Payout History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Payment Types Legend */}
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg mb-4">
            <div className="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs text-green-700">Weekly Package</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-xs text-blue-700">Network Referral</span>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 px-2 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span className="text-xs text-purple-700">Distribution</span>
            </div>
            <div className="flex items-center gap-1.5 bg-orange-50 px-2 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span className="text-xs text-orange-700">Renewal</span>
            </div>
          </div>
          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {mockPayouts.map((payout) => (
              <div
                key={payout.hash}
                className="bg-gray-50 p-4 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-start">
                  <a
                    href={`https://tronscan.org/#/transaction/${payout.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF0000] hover:underline text-sm"
                  >
                    {payout.hash}
                  </a>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getTypeColor(payout.type)}`}
                  >
                    {payout.type}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {Math.floor(
                      (Date.now() - payout.timestamp.getTime()) / 60000,
                    )}{" "}
                    mins ago
                  </span>
                  <span className="text-green-600">+{payout.amount} USDT</span>
                </div>
                <div className="text-sm text-gray-600">
                  {payout.description}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Txn Hash
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Age
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockPayouts.map((payout) => (
                  <tr key={payout.hash} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <a
                        href={`https://tronscan.org/#/transaction/${payout.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF0000] hover:underline"
                      >
                        {payout.hash}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {Math.floor(
                        (Date.now() - payout.timestamp.getTime()) / 60000,
                      )}{" "}
                      mins ago
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getTypeColor(payout.type)}`}
                      >
                        {payout.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {payout.description}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-green-600">
                        +{payout.amount} USDT
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {payout.status === "confirmed" ? (
                        <svg
                          className="w-5 h-5 text-green-500 mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayoutHistory;
