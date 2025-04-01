import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Package, Check, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useManage } from "@/hooks/useContract";
import { MONTH, TRONSCAN_URL, WEEK } from "@/config/constants";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { usePackages } from "@/hooks/usePackages";
import { useAccount } from "wagmi";

interface PackageInfo {
  amount: number;
  levels: number;
  maxReturn: number;
  weeklyYield: number;
  features: string[];
  isLocked?: boolean;
  requiredAmount?: number;
}

const PackagesPage = () => {
  const { t, language } = useLanguage();

  const { onBuyPack, onResetPack, onPayFee, pending } = useManage();
  const { address } = useAccount();

  const [fast, setFast] = useState(false)
  const { data } = usePackages(address, fast);

  const activeLevel = data ? data.activeLevel : -1

  // const userLevels = data?.packs.map((p) => p.level);

  // let remainingDays = 30 - Math.floor((Date.now()/1000 - userLastPaymentTime) / (24 * 3600))
  let remainingDays = Math.floor(
    (MONTH - Date.now() / 1000 + data?.lastPaymentTime) / 60
  );

  remainingDays = remainingDays > 0 ? remainingDays : 0;

  const packages: PackageInfo[] = [
    {
      amount: 50,
      levels: 4,
      maxReturn: 150,
      weeklyYield: 5,
      features: [
        `4 ${t("dashboard.packageFeatures.networkLevels")}`,
        `5% ${t("dashboard.packageFeatures.weeklyROI")}`,
        `300% ${t("dashboard.packageFeatures.maxReturn")}`,
        t("dashboard.packageFeatures.basicSupport"),
      ],
    },
    {
      amount: 100,
      levels: 5,
      maxReturn: 300,
      weeklyYield: 5,
      features: [
        `5 ${t("dashboard.packageFeatures.networkLevels")}`,
        `5% ${t("dashboard.packageFeatures.weeklyROI")}`,
        `300% ${t("dashboard.packageFeatures.maxReturn")}`,
        t("dashboard.packageFeatures.prioritySupport"),
      ],
      isLocked: true,
      requiredAmount: 50,
    },
    {
      amount: 200,
      levels: 6,
      maxReturn: 600,
      weeklyYield: 5,
      features: [
        `6 ${t("dashboard.packageFeatures.networkLevels")}`,
        `5% ${t("dashboard.packageFeatures.weeklyROI")}`,
        `300% ${t("dashboard.packageFeatures.maxReturn")}`,
        t("dashboard.packageFeatures.vipSupport"),
      ],
      isLocked: true,
      requiredAmount: 100,
    },
    {
      amount: 500,
      levels: 8,
      maxReturn: 1500,
      weeklyYield: 5,
      features: [
        `8 ${t("dashboard.packageFeatures.networkLevels")}`,
        `5% ${t("dashboard.packageFeatures.weeklyROI")}`,
        `300% ${t("dashboard.packageFeatures.maxReturn")}`,
        t("dashboard.packageFeatures.eliteSupport"),
      ],
      isLocked: true,
      requiredAmount: 200,
    },
    {
      amount: 1000,
      levels: 10,
      maxReturn: 3000,
      weeklyYield: 5,
      features: [
        `10 ${t("dashboard.packageFeatures.networkLevels")}`,
        `5% ${t("dashboard.packageFeatures.weeklyROI")}`,
        `300% ${t("dashboard.packageFeatures.maxReturn")}`,
        t("dashboard.packageFeatures.exclusiveSupport"),
      ],
      isLocked: true,
      requiredAmount: 500,
    },
  ];

  const handleBuy = async (pkg: PackageInfo) => {
    const result = await onBuyPack(packages.indexOf(pkg), pkg.amount);
    if (result.result)
      toast.success(
        <div className="flex gap-1">
          <p>Successfully purchased.</p>
          <a href={`${TRONSCAN_URL}tx/${result.result}`} target="_blink">
            <p className="text-green-500">View transaction</p>
          </a>
        </div>,
        {
          duration: 4000
        }
      );
  };

  const handleReset = async (pkg: PackageInfo) => {
    const result = await onResetPack(packages.indexOf(pkg), pkg.amount);
    if (result.result)
      toast.success(
        <div className="flex gap-1">
          <p>Successfully re-purchased.</p>
          <a href={`${TRONSCAN_URL}tx/${result.result}`} target="_blink">
            <p className="text-green-500">View transaction</p>
          </a>
        </div>,
        {
          duration: 4000
        }
      );
  };

  const handlePayFee = async () => {
    const result = await onPayFee();
    if (result && result.result) {
      toast.success(
        <div className="flex gap-1">
          <p>Successfully paid.</p>
          <a href={`${TRONSCAN_URL}tx/${result.result}`} target="_blink">
            <p className="text-green-500">View transaction</p>
          </a>
        </div>,
        {
          duration: 4000
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Toaster position="top-right">
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button onClick={() => toast.dismiss(t.id)}>✕</button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {language === "es"
                ? "Paquetes de Inversión"
                : "Investment Packages"}
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {language === "es"
                ? "Comienza tu viaje de inversión con el paquete de 50 USDT. A medida que progreses, desbloquearás acceso a paquetes de nivel superior. Cada actualización aumenta tus niveles de red y potencial de ganancias."
                : "Start your investment journey with the 50 USDT package. As you progress, you'll unlock access to higher-tier packages. Each upgrade increases your network levels and earning potential."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {packages.map((pkg, i) => (
              <Card
                key={pkg.amount}
                className="relative overflow-hidden border-[#EBBA07]/20 hover:shadow-lg transition-shadow"
              >
                {pkg.amount >= 500 && (
                  <div className="absolute top-4 right-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="bg-[#EBBA07] text-white text-xs px-2 py-1 rounded-full">
                            {language === "es" ? "Popular" : "Popular"}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {language === "es"
                              ? "El más elegido por los inversores"
                              : "Most chosen by investors"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#EBBA07]" />
                    {pkg.amount} USDT
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        {language === "es"
                          ? "Rendimiento Semanal"
                          : "Weekly Yield"}
                      </span>
                      <span className="text-[#EBBA07] font-medium">
                        {pkg.weeklyYield}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        {language === "es" ? "Retorno Máximo" : "Max Return"}
                      </span>
                      <span className="text-[#EBBA07] font-medium">
                        {pkg.maxReturn} USDT
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        {language === "es"
                          ? "Niveles de Red"
                          : "Network Levels"}
                      </span>
                      <span className="text-[#EBBA07] font-medium">
                        {pkg.levels}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="w-4 h-4 text-[#EBBA07]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {activeLevel < i && (
                    <Button
                      className={`w-full bg-[#EBBA07] hover:bg-[#EBBA07]/90 text-white`}
                      onClick={async () =>
                        // console.log(`Selected ${pkg.amount} USDT package`)
                        await handleBuy(pkg)
                      }
                      disabled={activeLevel + 1 < i || pending}
                    >
                      {activeLevel + 1 < i
                        ? language === "es"
                          ? `Desbloquear en ${pkg.requiredAmount} USDT`
                          : `Unlock at ${pkg.requiredAmount} USDT`
                        : language === "es"
                        ? "Seleccionar Paquete"
                        : "Select Package"}
                    </Button>
                  )}



                  {activeLevel >= i && (
                    <Button
                      className={`w-full bg-[#EBBA07] hover:bg-[#EBBA07]/90 text-white`}
                      onClick={async () => {
                        await handleReset(pkg);
                      }}
                      disabled={
                        data?.packs[i].totalPaid < pkg.maxReturn * 1e18 ||
                        pending
                      }
                    >
                      {language === "es"
                        ? `Paquete de reinicio`
                        : `Reset Package`}
                    </Button>
                  )}

                  <div className="flex items-start gap-2 text-xs text-gray-500 mt-4">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>
                      {language === "es"
                        ? `Máximo un paquete de cada tipo. Los retornos se pagan semanalmente.${
                            pkg.amount >= 500
                              ? " Posicionamiento prioritario en la red."
                              : ""
                          }`
                        : `Maximum one package of each type. Returns are paid weekly.${
                            pkg.amount >= 500
                              ? " Priority network positioning."
                              : ""
                          }`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Monthly Fee Section */}
          <Card className="border-[#EBBA07]/20 shadow-lg hover:shadow-[#EBBA07]/10 transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#EBBA07]" />
                {language === "es" ? "Cuota Mensual" : "Monthly Fee"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {language === "es" ? "Tiempo Restante" : "Time Remaining"}
                  </span>
                  {/* <span className="text-sm font-medium">{remainingDays} days</span> */}
                  <span className="text-sm font-medium">
                    {remainingDays} minutes
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#EBBA07] transition-all duration-500"
                    style={{ width: `${((MONTH/60-remainingDays) / MONTH * 60) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-500">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  {language === "es"
                    ? "Se requiere una cuota mensual de 50 USDT para mantener las ganancias de red. El primer mes está incluido con la compra del paquete."
                    : "A monthly fee of 50 USDT is required to maintain network earnings. First month is included with package purchase."}
                </p>
              </div>

              <Button
                className="w-full bg-[#EBBA07] hover:bg-[#EBBA07]/90 text-white"
                onClick={handlePayFee}
                disabled={
                  remainingDays !== 0 || pending || data?.packs.length === 0
                }
              >
                {language === "es"
                  ? "Pagar Cuota (50 USDT)"
                  : "Pay Fee (50 USDT)"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
