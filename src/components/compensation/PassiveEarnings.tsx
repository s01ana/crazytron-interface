import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank, Timer, ArrowUpRight, AlertCircle } from "lucide-react";

const PassiveEarnings = () => {
  const { language } = useLanguage();

  return (
    <Card className="bg-white border-[#903d00]/20 shadow-lg hover:shadow-[#903d00]/10 transition-shadow overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#903d00]/10">
              <PiggyBank className="w-5 h-5 text-[#903d00]" />
            </div>
            <h3 className="text-lg font-semibold">
              {language === "es"
                ? "Sistema de Ganancias Pasivas"
                : "Passive Earnings System"}
            </h3>
          </div>

          {/* Weekly ROI Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#903d00]/5 border border-[#903d00]/10">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="w-4 h-4 text-[#903d00]" />
                <p className="font-semibold">
                  {language === "es" ? "ROI Semanal" : "Weekly ROI"}
                </p>
              </div>
              <p className="text-3xl font-bold mb-2">5%</p>
              <p className="text-sm text-gray-500">
                {language === "es"
                  ? "Retorno semanal fijo en todos los paquetes activos, pagado automáticamente cada 7 días"
                  : "Fixed weekly return on all active packages, paid automatically every 7 days"}
              </p>
              <div className="mt-2 p-2 bg-[#903d00]/10 rounded-lg text-xs text-gray-600">
                <p className="font-medium">
                  {language === "es"
                    ? "Nota sobre el 0,5% adicional"
                    : "Note on additional 0.5%"}
                </p>
                <p>
                  {language === "es"
                    ? "El 0,5% adicional se distribuye a través de la red siguiendo el mismo sistema de niveles que las comisiones regulares."
                    : "The additional 0.5% is distributed through the network following the same level system as regular commissions."}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#903d00]/5 border border-[#903d00]/10">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpRight className="w-4 h-4 text-[#903d00]" />
                <p className="font-semibold">
                  {language === "es" ? "Retorno Máximo" : "Maximum Return"}
                </p>
              </div>
              <p className="text-3xl font-bold mb-2">300%</p>
              <p className="text-sm text-gray-500">
                {language === "es"
                  ? "Potencial de retorno total en cada paquete"
                  : "Total return potential on each package"}
              </p>
            </div>
          </div>

          {/* Package Progression */}
          <div className="space-y-3">
            <h4 className="font-semibold">
              {language === "es"
                ? "Sistema de Progresión de Paquetes"
                : "Package Progression System"}
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-[#903d00]"></div>
                <p>
                  {language === "es"
                    ? "Comienza con el paquete de entrada de 50 USDT"
                    : "Start with the 50 USDT entry package"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-[#903d00]"></div>
                <p>
                  {language === "es"
                    ? "Actualiza a 100 USDT después de activar el paquete de 50 USDT"
                    : "Upgrade to 100 USDT after 50 USDT package activation"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-[#903d00]"></div>
                <p>
                  {language === "es"
                    ? "Progresa a 200 USDT después del paquete de 100 USDT"
                    : "Progress to 200 USDT after 100 USDT package"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-[#903d00]"></div>
                <p>
                  {language === "es"
                    ? "Desbloquea 500 USDT después del paquete de 200 USDT"
                    : "Unlock 500 USDT after 200 USDT package"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-[#903d00]"></div>
                <p>
                  {language === "es"
                    ? "Accede a 1000 USDT después del paquete de 500 USDT"
                    : "Access 1000 USDT after 500 USDT package"}
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Fee Info */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-[#903d00] shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-medium">
                  {language === "es"
                    ? "Cuota Mensual de Posición en Red"
                    : "Monthly Network Position Fee"}
                </p>
                <ul className="text-sm text-gray-500 space-y-1 list-disc pl-4">
                  <li>
                    {language === "es"
                      ? "Cuota del primer mes (50 USDT) incluida con la compra inicial del paquete"
                      : "First month fee (50 USDT) included with initial package purchase"}
                  </li>
                  <li>
                    {language === "es"
                      ? "Después de 30 días, se requiere una cuota mensual de 50 USDT para mantener las ganancias de red"
                      : "After 30 days, a monthly fee of 50 USDT is required to maintain network earnings"}
                  </li>
                  <li>
                    {language === "es"
                      ? "Las comisiones de red se pausan automáticamente si no se paga la cuota"
                      : "Network commissions are automatically paused if fee is not paid"}
                  </li>
                  <li>
                    {language === "es"
                      ? "Todas las ganancias (red y pasivas) se pagan automática e instantáneamente"
                      : "All earnings (network & passive) are paid automatically and instantly"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PassiveEarnings;
