import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";
// import { useContractEvents } from "@/hooks/useContractEvents";

interface Transaction {
  hash: string;
  block: string;
  age: string;
  type: "payout";
  from: string;
  to: string;
  amount: number;
  status: "confirmed" | "pending";
}

const mockTransactions: Transaction[] = [
  {
    hash: "TRXa7c8...3f9d",
    block: "69772868",
    age: "5 mins ago",
    type: "payout",
    from: "TQooBX9o8iSSpr...",
    to: "Uwisuim",
    amount: 25.5,
    status: "confirmed",
  },
  {
    hash: "TRX4d5c...7b9a",
    block: "69772868",
    age: "30 mins ago",
    type: "payout",
    from: "TQooBX9o8iSSpr...",
    to: "Uwisuim",
    amount: 75.25,
    status: "confirmed",
  },
  {
    hash: "TRX2e3d...5c8b",
    block: "69772868",
    age: "60 mins ago",
    type: "payout",
    from: "TQooBX9o8iSSpr...",
    to: "Uwisuim",
    amount: 50.75,
    status: "confirmed",
  },
  {
    hash: "TRX9f8e...1a2b",
    block: "69772868",
    age: "120 mins ago",
    type: "payout",
    from: "TQooBX9o8iSSpr...",
    to: "Uwisuim",
    amount: 100,
    status: "confirmed",
  },
];

const SmartContractActivity = () => {
  const { t } = useLanguage();

  // const {} = useContractEvents()

  return (
    <Card className="w-full bg-white border-[#903d00]/20 shadow-lg hover:shadow-[#903d00]/10 transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <History className="w-6 h-6 text-[#903d00]" />
          Smart Contract Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            Total transactions: 29,857
          </div>

          <div className="overflow-x-auto">
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
              <tbody>
                {mockTransactions.map((tx) => (
                  <tr key={tx.hash} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <a
                        href={`https://tronscan.org/#/transaction/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#903d00] hover:underline"
                      >
                        {tx.hash}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{tx.block}</td>
                    <td className="px-4 py-3 text-gray-500">{tx.age}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{tx.from}</td>
                    <td className="px-4 py-3 text-gray-500">{tx.to}</td>
                    <td className="px-4 py-3 text-right text-green-600">
                      +{tx.amount} TRX
                    </td>
                    <td className="px-4 py-3 text-center">
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

export default SmartContractActivity;
