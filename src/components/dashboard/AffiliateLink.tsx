import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import toast, { Toaster } from "react-hot-toast";

interface AffiliateLinkProps {
  affiliateId?: string;
}

const AffiliateLink = () => {
  const { t } = useLanguage();
  const { address } = useWallet()
  const affiliateLink = `https://crazytron.com/?ref=${address}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast('Copied to clipboard!')
  };

  return (
    <Card className="w-full bg-white border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
      <Toaster 
        position="top-right" 
        containerStyle={{ top: 80, right: 20, zIndex: 50 }}
      />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Link className="w-6 h-6 text-[#FF0000]" />
          {t("dashboard.affiliateLink")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            value={affiliateLink}
            readOnly
            className="bg-black/50 border-[#FF0000]/20 text-white"
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
