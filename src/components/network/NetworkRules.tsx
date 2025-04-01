import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Package, Trophy, Wallet, Users, Percent } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const NetworkRules = () => {
  const { language } = useLanguage();

  const packageLevels = [
    { amount: 50, levels: 4 },
    { amount: 100, levels: 5 },
    { amount: 200, levels: 6 },
    { amount: 500, levels: 8 },
    { amount: 1000, levels: 10 },
  ];

  const distributionLevels = [
    { level: 1, percent: 30 },
    { level: 2, percent: 10 },
    { level: 3, percent: 10 },
    { level: 4, percent: 5 },
    { level: 5, percent: 5 },
    { level: 6, percent: 3 },
    { level: 7, percent: 2 },
    { level: 8, percent: 2 },
    { level: 9, percent: 2 },
    { level: 10, percent: 1 },
  ];

  return (
    <Card className="bg-white border-[#903d00]/20 shadow-lg hover:shadow-[#903d00]/10 transition-shadow overflow-hidden">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-[#903d00]/5 to-transparent">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-[#903d00]" />
          {language === "es"
            ? "Sistema de Distribución de Red"
            : "Network Distribution System"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Distribution Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white rounded-lg border border-[#903d00]/20">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-[#903d00]" />
              <p className="font-medium">
                {language === "es"
                  ? "Distribución de Paquete"
                  : "Package Distribution"}
              </p>
            </div>
            <p className="text-3xl font-bold text-[#903d00]">10%</p>
            <p className="text-sm text-gray-500 mt-1">
              {language === "es" ? "Del costo del paquete" : "Of package cost"}
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-[#903d00]/20">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-[#903d00]" />
              <p className="font-medium">
                {language === "es" ? "Cuota Mensual" : "Monthly Fee"}
              </p>
            </div>
            <p className="text-3xl font-bold text-[#903d00]">70%</p>
            <p className="text-sm text-gray-500 mt-1">
              {language === "es" ? "De 50 USDT mensual" : "Of 50 USDT monthly"}
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-[#903d00]/20">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-[#903d00]" />
              <p className="font-medium">
                {language === "es" ? "Niveles Máximos" : "Maximum Levels"}
              </p>
            </div>
            <p className="text-3xl font-bold text-[#903d00]">10</p>
            <p className="text-sm text-gray-500 mt-1">
              {language === "es" ? "Niveles de profundidad" : "Depth levels"}
            </p>
          </div>
        </div>

        {/* Package Requirements and Distribution Levels */}
        <Tabs defaultValue="packages" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="packages">
              {language === "es"
                ? "Requisitos de Paquetes"
                : "Package Requirements"}
            </TabsTrigger>
            <TabsTrigger value="distribution">
              {language === "es"
                ? "Niveles de Distribución"
                : "Distribution Levels"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="packages" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {packageLevels.map((pkg) => (
                <div
                  key={pkg.amount}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#903d00]/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-[#903d00]/10">
                      <Package className="w-4 h-4 text-[#903d00]" />
                    </div>
                    <span className="font-medium">{pkg.amount} USDT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#903d00]" />
                    <span className="text-sm text-gray-600">
                      {pkg.levels} {language === "es" ? "Niveles" : "Levels"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-[#903d00]/5 border border-[#903d00]/20 rounded-lg text-sm">
              <p className="font-medium mb-2">
                {language === "es"
                  ? "Requisito de Paquete Activo"
                  : "Active Package Requirement"}
              </p>
              <p className="text-gray-600">
                {language === "es"
                  ? "Para recibir comisiones de un paquete específico en tu red, debes tener el mismo paquete activo. Por ejemplo, para recibir comisiones de usuarios con paquetes de 100 USDT, debes tener un paquete de 100 USDT activo."
                  : "To receive commissions from a specific package in your network, you must have the same package active. For example, to receive commissions from users with 100 USDT packages, you must have a 100 USDT package active."}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <div className="overflow-x-auto">
              <div className="inline-flex gap-2 pb-2">
                {distributionLevels.map((level) => (
                  <div
                    key={level.level}
                    className="w-[120px] p-3 bg-white rounded-lg border border-[#903d00]/20 flex-shrink-0"
                  >
                    <p className="text-sm font-medium text-gray-600">
                      Level {level.level}
                    </p>
                    <p className="text-2xl font-bold text-[#903d00]">
                      {level.percent}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 bg-[#903d00]/5 border border-[#903d00]/20 rounded-lg text-sm">
              <p className="font-medium mb-2">
                {language === "es"
                  ? "Distribución de Comisiones"
                  : "Commission Distribution"}
              </p>
              <p className="text-gray-600">
                {language === "es"
                  ? "Este mismo sistema de distribución se aplica a las comisiones de paquetes, cuotas mensuales y al 10% de comisión sobre los pagos semanales. Recuerda que solo recibirás comisiones de los paquetes que tengas activos."
                  : "This same distribution system applies to package commissions, monthly fees, and the 10% fee on weekly payouts. Remember that you will only receive commissions from packages that you have active."}
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Fee Information */}
        <div className="mt-8 p-4 bg-[#903d00]/5 border border-[#903d00]/20 rounded-lg space-y-3">
          <p className="font-medium">
            {language === "es" ? "Información de Cuota" : "Fee Information"}
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[#903d00] mt-1.5" />
              <p>
                {language === "es"
                  ? "Primer mes de cuota (50 USDT) incluido con la compra inicial del paquete"
                  : "First month fee (50 USDT) included with initial package purchase"}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[#903d00] mt-1.5" />
              <p>
                {language === "es"
                  ? "70% de la cuota se distribuye usando el mismo sistema de niveles"
                  : "70% of fee is distributed using the same level system"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkRules;
