import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";

interface Transaction {
  hash: string;
  type: "payout";
  amount: number;
  timestamp: Date;
  status: "confirmed" | "pending";
}

const mockTransactions: Transaction[] = [
  {
    hash: "TRXa7c8...3f9d",
    type: "payout",
    amount: 25.5,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: "confirmed",
  },
  {
    hash: "TRX4d5c...7b9a",
    type: "payout",
    amount: 75.25,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: "confirmed",
  },
  {
    hash: "TRX2e3d...5c8b",
    type: "payout",
    amount: 50.75,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: "confirmed",
  },
  {
    hash: "TRX9f8e...1a2b",
    type: "payout",
    amount: 100.0,
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    status: "confirmed",
  },
];

const TransactionHistory = () => {
  const { t } = useLanguage();
  return (
    <Card className="w-full bg-white border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <History className="w-6 h-6 text-[#FF0000]" />
          {t("dashboard.smartContractActivity")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              {t("dashboard.totalTransactions")}: 29,857
            </div>
          </div>

          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {mockTransactions.map((tx) => (
              <div
                key={tx.hash}
                className="bg-gray-50 p-4 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-start">
                  <a
                    href={`https://tronscan.org/#/transaction/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF0000] hover:underline text-sm"
                  >
                    {tx.hash}
                  </a>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${tx.type === "payout" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                  >
                    {tx.type}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {Math.floor((Date.now() - tx.timestamp.getTime()) / 60000)}{" "}
                    mins ago
                  </span>
                  <span
                    className={
                      tx.type === "payout" ? "text-green-600" : "text-gray-900"
                    }
                  >
                    {tx.type === "payout" ? "+" : ""}
                    {tx.amount} TRX
                  </span>
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
                    Block
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Age
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    From
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    To
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
                {mockTransactions.map((tx) => (
                  <tr key={tx.hash} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <a
                        href={`https://tronscan.org/#/transaction/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF0000] hover:underline"
                      >
                        {tx.hash}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-500">69772868</td>
                    <td className="px-4 py-3 text-gray-500">
                      {Math.floor(
                        (Date.now() - tx.timestamp.getTime()) / 60000,
                      )}{" "}
                      mins ago
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${tx.type === "payout" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-500 truncate">
                        TQooBX9o8iSSprl...
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-500 truncate">Uwisuim</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={
                          tx.type === "payout"
                            ? "text-green-600"
                            : "text-gray-900"
                        }
                      >
                        {tx.type === "payout" ? "+" : ""}
                        {tx.amount} TRX
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {tx.status === "confirmed" ? (
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

export default TransactionHistory;
