import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface SponsorCardProps {
  sponsorUsername?: string;
}

const SponsorCard = ({ sponsorUsername = "CryptoWhale" }: SponsorCardProps) => {
  const { t } = useLanguage();
  return (
    <Card className="w-full bg-white border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-[#FF0000]/10">
            <User className="w-5 h-5 text-[#FF0000]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              {t("dashboard.yourSponsor")}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {sponsorUsername}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SponsorCard;
