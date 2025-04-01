import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { MAIN_URL } from "@/config/constants";
import { useAccount } from "wagmi";

interface AffiliateLinkProps {
  affiliateId?: string;
}

const AffiliateLink = () => {
  const { t } = useLanguage();
  const { address } = useAccount()
  const affiliateLink = `${MAIN_URL}?ref=${address}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast('Copied to clipboard!')
  };

  return (
    <Card className="w-full bg-white border-[#EBBA07]/20 shadow-lg hover:shadow-[#EBBA07]/10 transition-shadow">
      <Toaster 
        position="top-right" 
        containerStyle={{ top: 80, right: 20, zIndex: 50 }}
      />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Link className="w-6 h-6 text-[#EBBA07]" />
          {t("dashboard.affiliateLink")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            value={affiliateLink}
            readOnly
            className="bg-black/50 border-[#EBBA07]/20 text-white"
          />
          <Button
            onClick={copyToClipboard}
            className="bg-black hover:bg-black/80 text-white"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateLink;
