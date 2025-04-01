import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { addDays, isFriday, nextFriday } from "date-fns";

const PayoutCalendar = () => {
  const today = new Date();
  const nextPayoutDate = nextFriday(today);

  // Mark all Fridays as payout days
  const isDayPayout = (date: Date) => {
    return isFriday(date);
  };

  return (
    <Card className="w-full bg-white border-[#903d00]/20 shadow-lg hover:shadow-[#903d00]/10 transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">
          Payout Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-white/80">
            Next payout: {nextPayoutDate.toLocaleDateString()}
          </p>
          <Calendar
            mode="single"
            selected={nextPayoutDate}
            modifiers={{ payout: isDayPayout }}
            modifiersStyles={{
              payout: {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                color: "#903d00",
              },
            }}
            className="rounded-md border border-[#903d00]/20 bg-white text-gray-900"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PayoutCalendar;
