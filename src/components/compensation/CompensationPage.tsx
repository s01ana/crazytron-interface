import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Header from "@/components/dashboard/Header";
import NetworkRules from "@/components/network/NetworkRules";
import PassiveEarnings from "./PassiveEarnings";

const CompensationPage = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {language === "es" ? "Plan de Compensación" : "Compensation Plan"}
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {language === "es"
                ? "Nuestro revolucionario plan de compensación ofrece múltiples fuentes de ingresos a través de una estructura de red de 10 niveles con pagos instantáneos."
                : "Our revolutionary compensation plan offers multiple income streams through a 10-level deep network structure with instant payouts."}
            </p>
          </div>

          <PassiveEarnings />
          <NetworkRules />
        </div>
      </div>
    </div>
  );
};

export default CompensationPage;
