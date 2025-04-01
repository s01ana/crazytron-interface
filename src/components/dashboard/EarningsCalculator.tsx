import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface NetworkLevel {
  level: number;
  percentage: number;
  packages: {
    50: number;
    100: number;
    200: number;
    500: number;
    1000: number;
  };
  totalVolume: number;
  totalMembers: number;
}

const LEVEL_PERCENTAGES = [
  0.3, // Level 1: 30%
  0.1, // Level 2: 10%
  0.1, // Level 3: 10%
  0.05, // Level 4: 5%
  0.05, // Level 5: 5%
  0.03, // Level 6: 3%
  0.02, // Level 7: 2%
  0.02, // Level 8: 2%
  0.02, // Level 9: 2%
  0.01, // Level 10: 1%
];

const PACKAGE_LEVELS = {
  50: 4, // 50 USDT - 4 levels
  100: 5, // 100 USDT - 5 levels
  200: 6, // 200 USDT - 6 levels
  500: 8, // 500 USDT - 8 levels
  1000: 10, // 1000 USDT - 10 levels
};

const EarningsCalculator = () => {
  const [totalMembers, setTotalMembers] = useState<string>("");
  const [selectedPackages, setSelectedPackages] = useState<number[]>([]);
  const [networkLevels, setNetworkLevels] = useState<NetworkLevel[]>(
    LEVEL_PERCENTAGES.map((percentage, index) => ({
      level: index + 1,
      percentage,
      packages: { 50: 0, 100: 0, 200: 0, 500: 0, 1000: 0 },
      totalVolume: 0,
      totalMembers: 0,
    })),
  );
  const [error, setError] = useState<string>("");

  const togglePackage = (amount: number) => {
    setSelectedPackages((prev) =>
      prev.includes(amount)
        ? prev.filter((p) => p !== amount)
        : prev.length < 5
          ? [...prev, amount].sort((a, b) => a - b)
          : prev,
    );
  };

  const getMaxAccessibleLevels = () => {
    if (selectedPackages.length === 0) return 0;
    return Math.max(
      ...selectedPackages.map((amount) => PACKAGE_LEVELS[amount]),
    );
  };

  const validatePackageProgression = (level: NetworkLevel): boolean => {
    const members = Object.values(level.packages).reduce((a, b) => a + b, 0);
    const packages = level.packages;

    // For each member, validate they follow the package progression
    for (let i = 0; i < members; i++) {
      if (
        packages[100] > packages[50] ||
        packages[200] > packages[100] ||
        packages[500] > packages[200] ||
        packages[1000] > packages[500]
      ) {
        return false;
      }
    }
    return true;
  };

  const autoDistributeMembers = (mode: "random") => {
    const total = parseInt(totalMembers) || 0;
    if (total === 0) return;

    const maxLevels = getMaxAccessibleLevels();

    // Reset all levels first
    const resetLevels = networkLevels.map((level) => ({
      ...level,
      packages: { 50: 0, 100: 0, 200: 0, 500: 0, 1000: 0 },
      totalVolume: 0,
      totalMembers: 0,
    }));

    // Ensure we have at least one member in level 1 before distributing to other levels
    let remainingMembers = total;
    let updatedLevels = [...resetLevels];

    // Always put at least one member in level 1 if we have any members
    if (remainingMembers > 0 && maxLevels > 0) {
      const frontlineMembers = Math.max(1, Math.floor(total * 0.2)); // At least 1 member, up to 20% in frontline

      // Distribute across all package types based on selected packages
      const packageDistribution = { 50: 0, 100: 0, 200: 0, 500: 0, 1000: 0 };
      let totalVolume = 0;

      // Distribute members across selected package types
      if (selectedPackages.length > 0) {
        // Calculate distribution percentages based on selected packages
        const packageWeights = {
          50: selectedPackages.includes(50) ? 0.4 : 0,
          100: selectedPackages.includes(100) ? 0.3 : 0,
          200: selectedPackages.includes(200) ? 0.15 : 0,
          500: selectedPackages.includes(500) ? 0.1 : 0,
          1000: selectedPackages.includes(1000) ? 0.05 : 0,
        };

        // Normalize weights
        const weightSum = Object.values(packageWeights).reduce(
          (a, b) => a + b,
          0,
        );

        // If no packages are selected or weights don't sum up, default to all in the lowest selected package
        if (weightSum === 0) {
          const lowestPackage = Math.min(...selectedPackages);
          packageDistribution[lowestPackage] = frontlineMembers;
          totalVolume = lowestPackage * frontlineMembers;
        } else {
          // Distribute members according to normalized weights
          Object.entries(packageWeights).forEach(([pkg, weight]) => {
            const pkgAmount = Number(pkg);
            const memberCount = Math.floor(
              frontlineMembers * (weight / weightSum),
            );
            packageDistribution[pkgAmount] = memberCount;
            totalVolume += pkgAmount * memberCount;
          });

          // Ensure at least one member if we have any selected packages
          const totalDistributed = Object.values(packageDistribution).reduce(
            (a, b) => a + b,
            0,
          );
          if (totalDistributed === 0 && frontlineMembers > 0) {
            const lowestPackage = Math.min(...selectedPackages);
            packageDistribution[lowestPackage] = 1;
            totalVolume = lowestPackage;
          }
        }
      } else {
        // If no packages selected, put all in 50 USDT package
        packageDistribution[50] = frontlineMembers;
        totalVolume = 50 * frontlineMembers;
      }

      updatedLevels[0] = {
        ...updatedLevels[0],
        packages: packageDistribution,
        totalVolume: totalVolume,
        totalMembers: frontlineMembers,
      };

      remainingMembers -= frontlineMembers;
    }

    // Distribute remaining members to other levels if we have any
    if (remainingMembers > 0 && maxLevels > 1) {
      // Weights for levels 2 and beyond (skip level 1 as we've already handled it)
      let levelWeights = [
        0, 0.25, 0.25, 0.2, 0.15, 0.05, 0.05, 0.03, 0.01, 0.01,
      ];
      levelWeights = levelWeights.slice(0, maxLevels);

      // Normalize weights for the remaining levels (starting from level 2)
      const weightSum = levelWeights.slice(1).reduce((a, b) => a + b, 0);
      const normalizedWeights = levelWeights.map((w) =>
        weightSum > 0 ? w / weightSum : 0,
      );

      // Distribute remaining members to levels 2 and beyond
      for (let i = 1; i < maxLevels; i++) {
        const levelMembers = Math.floor(
          remainingMembers * normalizedWeights[i],
        );
        if (levelMembers > 0) {
          // Distribute across all package types based on selected packages
          const packageDistribution = {
            50: 0,
            100: 0,
            200: 0,
            500: 0,
            1000: 0,
          };
          let totalVolume = 0;

          // Distribute members across selected package types
          if (selectedPackages.length > 0) {
            // Calculate distribution percentages based on selected packages
            const packageWeights = {
              50: selectedPackages.includes(50) ? 0.4 : 0,
              100: selectedPackages.includes(100) ? 0.3 : 0,
              200: selectedPackages.includes(200) ? 0.15 : 0,
              500: selectedPackages.includes(500) ? 0.1 : 0,
              1000: selectedPackages.includes(1000) ? 0.05 : 0,
            };

            // Normalize weights
            const weightSum = Object.values(packageWeights).reduce(
              (a, b) => a + b,
              0,
            );

            // If no packages are selected or weights don't sum up, default to all in the lowest selected package
            if (weightSum === 0) {
              const lowestPackage = Math.min(...selectedPackages);
              packageDistribution[lowestPackage] = levelMembers;
              totalVolume = lowestPackage * levelMembers;
            } else {
              // Distribute members according to normalized weights
              Object.entries(packageWeights).forEach(([pkg, weight]) => {
                const pkgAmount = Number(pkg);
                const memberCount = Math.floor(
                  levelMembers * (weight / weightSum),
                );
                packageDistribution[pkgAmount] = memberCount;
                totalVolume += pkgAmount * memberCount;
              });

              // Ensure at least one member if we have any selected packages
              const totalDistributed = Object.values(
                packageDistribution,
              ).reduce((a, b) => a + b, 0);
              if (totalDistributed === 0 && levelMembers > 0) {
                const lowestPackage = Math.min(...selectedPackages);
                packageDistribution[lowestPackage] = 1;
                totalVolume = lowestPackage;
              }
            }
          } else {
            // If no packages selected, put all in 50 USDT package
            packageDistribution[50] = levelMembers;
            totalVolume = 50 * levelMembers;
          }

          updatedLevels[i] = {
            ...updatedLevels[i],
            packages: packageDistribution,
            totalVolume: totalVolume,
            totalMembers: levelMembers,
          };
        }
      }
    }

    setNetworkLevels(updatedLevels);
  };

  const calculateWeeklyPassiveEarnings = () => {
    // Calculate 5% weekly yield, then subtract 10% fee
    const weeklyYield = selectedPackages.reduce(
      (sum, amount) => sum + amount * 0.05,
      0,
    );
    const feeAmount = weeklyYield * 0; // 10% fee
    return weeklyYield - feeAmount; // Return amount after fee
  };

  const calculateMonthlyPassiveEarnings = () => {
    return calculateWeeklyPassiveEarnings() * 4;
  };

  const calculateMonthlyNetworkEarnings = () => {
    const maxLevels = getMaxAccessibleLevels();
    const monthlyFee = 50; // Fixed monthly fee per member

    // Check for invalid progression in any level
    const hasInvalidProgression = networkLevels.some((level, index) => {
      if (index < maxLevels) {
        return !validatePackageProgression(level);
      }
      return false;
    });

    if (hasInvalidProgression) {
      return 0;
    }

    return networkLevels.reduce((sum, level, index) => {
      if (index < maxLevels) {
        return sum + level.totalMembers * monthlyFee * level.percentage;
      }
      return sum;
    }, 0);
  };

  const calculateDistributionEarnings = () => {
    const maxLevels = getMaxAccessibleLevels();

    // Check for invalid progression in any level
    const hasInvalidProgression = networkLevels.some((level, index) => {
      if (index < maxLevels) {
        return !validatePackageProgression(level);
      }
      return false;
    });

    if (hasInvalidProgression) {
      return 0;
    }

    // Calculate 10% of total volume for distribution
    return networkLevels.reduce((sum, level, index) => {
      if (index < maxLevels) {
        // 10% of pack purchase is distributed
        const distributionAmount = level.totalVolume * 0.1;
        return sum + distributionAmount * level.percentage;
      }
      return sum;
    }, 0);
  };

  const calculateWeeklyNetworkPayouts = () => {
    // Calculate network earnings from the 10% fee on payouts
    // This calculates the earnings from all packages in your network based on their level
    let totalWeeklyNetworkPayouts = 0;

    // Loop through all levels
    networkLevels.forEach((level, levelIndex) => {
      // For each package type in this level
      Object.entries(level.packages).forEach(([packageAmount, count]) => {
        if (count > 0) {
          const amount = Number(packageAmount);
          // Weekly yield is 5% of package amount
          const weeklyYield = amount * 0.05;
          // Fee is 10% of weekly yield
          const feeAmount = weeklyYield * 0.1;
          // Apply the level percentage to the fee
          const levelEarning = feeAmount * level.percentage * count;
          totalWeeklyNetworkPayouts += levelEarning;
        }
      });
    });

    return totalWeeklyNetworkPayouts;
  };

  const updatePackageCount = (
    level: number,
    packageAmount: number,
    value: string,
  ) => {
    const count = parseInt(value) || 0;
    setNetworkLevels(
      networkLevels.map((lvl) => {
        if (lvl.level === level) {
          const newPackages = { ...lvl.packages, [packageAmount]: count };
          const newTotalVolume = Object.entries(newPackages).reduce(
            (sum, [amount, count]) => sum + Number(amount) * count,
            0,
          );
          const newTotalMembers = Object.values(newPackages).reduce(
            (sum, count) => sum + count,
            0,
          );

          const updatedLevel = {
            ...lvl,
            packages: newPackages,
            totalVolume: newTotalVolume,
            totalMembers: newTotalMembers,
          };

          if (!validatePackageProgression(updatedLevel)) {
            setError(
              "Invalid package progression. Users must start with 50 USDT and progress in order.",
            );
          } else {
            setError("");
          }

          return updatedLevel;
        }
        return lvl;
      }),
    );
  };

  return (
    <Card className="w-full bg-white border-[#EBBA07]/20 shadow-lg hover:shadow-[#EBBA07]/10 transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-[#EBBA07]" />
          Earnings Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {error && (
            <Alert
              variant="destructive"
              className="bg-red-50 text-red-600 border-red-200"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h3 className="font-semibold">Select Your Packages (Max 5)</h3>
              <div className="text-sm text-gray-500 bg-[#EBBA07]/5 px-3 py-1 rounded-md border border-[#EBBA07]/20">
                <span className="font-medium">Note:</span> 10% fee applied to
                all payouts
              </div>
            </div> */}
            <div className="flex flex-wrap gap-2">
              {[50, 100, 200, 500, 1000].map((amount) => (
                <Button
                  key={amount}
                  variant={
                    selectedPackages.includes(amount) ? "default" : "outline"
                  }
                  className={
                    selectedPackages.includes(amount)
                      ? "bg-[#EBBA07] text-white"
                      : "border-[#EBBA07]/20"
                  }
                  onClick={() => togglePackage(amount)}
                  disabled={
                    !selectedPackages.includes(amount) &&
                    selectedPackages.length >= 5
                  }
                >
                  {amount} USDT
                </Button>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Maximum network depth: {getMaxAccessibleLevels()} levels
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={totalMembers}
                  onChange={(e) => setTotalMembers(e.target.value)}
                  placeholder="Enter total members"
                  className="w-full p-2 text-sm border rounded-md border-[#EBBA07]/20 focus:outline-none focus:ring-2 focus:ring-[#EBBA07]/20"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => autoDistributeMembers("random")}
                  className="flex-1 sm:flex-none text-[#EBBA07] border-[#EBBA07]/20 hover:bg-[#EBBA07] hover:text-white"
                  disabled={selectedPackages.length === 0}
                >
                  Random
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setTotalMembers("");
                    setSelectedPackages([]);
                    setNetworkLevels(
                      LEVEL_PERCENTAGES.map((percentage, index) => ({
                        level: index + 1,
                        percentage,
                        packages: { 50: 0, 100: 0, 200: 0, 500: 0, 1000: 0 },
                        totalVolume: 0,
                        totalMembers: 0,
                      })),
                    );
                    setError("");
                  }}
                  className="flex-1 sm:flex-none bg-red-600 text-white hover:bg-red-700"
                >
                  Reset
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm min-w-[800px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Level</th>
                    <th className="text-left p-2">%</th>
                    <th className="text-center p-2">50 USDT</th>
                    <th className="text-center p-2">100 USDT</th>
                    <th className="text-center p-2">200 USDT</th>
                    <th className="text-center p-2">500 USDT</th>
                    <th className="text-center p-2">1000 USDT</th>
                    <th className="text-right p-2">Volume</th>
                    <th className="text-right p-2">Members</th>
                  </tr>
                </thead>
                <tbody>
                  {networkLevels.map((level) => (
                    <tr
                      key={level.level}
                      className={`border-b ${level.level > getMaxAccessibleLevels() ? "opacity-50" : ""}`}
                    >
                      <td className="p-2">Level {level.level}</td>
                      <td className="p-2">{level.percentage * 100}%</td>
                      {[50, 100, 200, 500, 1000].map((amount) => (
                        <td key={amount} className="p-2">
                          <input
                            type="number"
                            min="0"
                            value={level.packages[amount]}
                            onChange={(e) =>
                              updatePackageCount(
                                level.level,
                                amount,
                                e.target.value,
                              )
                            }
                            className="w-16 p-1 text-center border rounded"
                            disabled={level.level > getMaxAccessibleLevels()}
                          />
                        </td>
                      ))}
                      <td className="p-2 text-right font-medium">
                        {level.totalVolume} USDT
                      </td>
                      <td className="p-2 text-right font-medium">
                        {level.totalMembers}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Package Earnings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Daily Passive</span>
                  <span className="font-semibold text-green-600 text-lg mt-1">
                    {(calculateWeeklyPassiveEarnings() / 7).toFixed(2)} USDT
                  </span>
                  <span className="text-xs text-gray-500">From all packages</span>
                </div>
                <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Weekly Passive</span>
                  <span className="font-semibold text-green-600 text-lg mt-1">
                    {calculateWeeklyPassiveEarnings().toFixed(2)} USDT
                  </span>
                  <span className="text-xs text-gray-500">From all packages</span>
                </div>
                <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Monthly Passive</span>
                  <span className="font-semibold text-green-600 text-lg mt-1">
                    {calculateMonthlyPassiveEarnings().toFixed(2)} USDT
                  </span>
                  <span className="text-xs text-gray-500">From all packages</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Network Earnings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">
                    Weekly Network Payouts
                  </span>
                  <span className="font-semibold text-green-600 text-lg mt-1">
                    {calculateWeeklyNetworkPayouts().toFixed(3)} USDT
                  </span>
                  <span className="text-xs text-gray-500">
                    From all network fees
                  </span>
                </div>
                <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Monthly Network</span>
                  <span className="font-semibold text-green-600 text-lg mt-1">
                    {typeof calculateMonthlyNetworkEarnings() === "number"
                      ? calculateMonthlyNetworkEarnings().toFixed(2)
                      : "0.00"}{" "}
                    USDT
                  </span>
                  <span className="text-xs text-gray-500">
                    From monthly fees
                  </span>
                </div>
                <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">
                    Distribution Earnings
                  </span>
                  <span className="font-semibold text-orange-600 text-lg mt-1">
                    {typeof calculateDistributionEarnings() === "number"
                      ? calculateDistributionEarnings().toFixed(2)
                      : "0.00"}{" "}
                    USDT
                  </span>
                  <span className="text-xs text-gray-500">
                    Fast Bonus Payment
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 mt-2">
              <div className="flex justify-between items-center p-4 bg-[#EBBA07]/5 rounded-lg border border-[#EBBA07]/20">
                <span className="font-medium text-gray-900">
                  Total Monthly Earnings
                </span>
                <span className="font-bold text-green-600 text-xl">
                  {(
                    calculateMonthlyPassiveEarnings() +
                    (typeof calculateMonthlyNetworkEarnings() === "number"
                      ? calculateMonthlyNetworkEarnings()
                      : 0)
                  ).toFixed(2)}{" "}
                  USDT
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsCalculator;
