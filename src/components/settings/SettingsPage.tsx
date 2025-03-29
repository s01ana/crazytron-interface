import React, { useEffect, useState } from "react";
import Header from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Users, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBalances, useManage } from "@/hooks/useContract";
import { tronWeb } from "@/tronweb";
import crazyAbi from '../../abi/crazytron.json'
import { CRAZYTRON_ADDRESS, ZERO_ADDRESS } from "@/config/constants";

const SettingsPage = () => {
  const { t, language } = useLanguage()
  const [username, setUsername] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [isActivated, setIsActivated] = useState(false);

  const userReferrer=""

  // const { userLastPaymentTime } = useUserInfo()
  const userLastPaymentTime = 0
  const { pending } = useManage()

  // const { userAddress: userAddress } = useUserName(username)
  // const { userAddress: sponserAddress } = useUserName(sponsor)

  const [pendingUsername, setPendingUsername] = useState(false)
  const [pendingSponser, setPendingSponser] = useState(false)

  const [sponsorError, setSponsorError] = useState("")
  const [nameError, setNameError] = useState("")

  useEffect(() => {
    setUsername("userName")
  }, [username])

  useEffect(() => {
    setSponsor(userReferrer)
  }, [userReferrer])

  const checkUserName = async (a) => {      
    setPendingUsername(true)
    const crazyContract = await tronWeb.contract(crazyAbi, CRAZYTRON_ADDRESS);
		const _userAddress = await crazyContract.userAddress(a).call({ from: ZERO_ADDRESS })
    if (tronWeb.address.fromHex(_userAddress) !== ZERO_ADDRESS)
      setNameError(t("settings.usernameError"))
    else
      setNameError("")
    if (a === "") {
      setNameError("")
    }
    setPendingUsername(false)
  }

  const checkSponser = async (a) => {      
    setPendingSponser(true)
    const crazyContract = await tronWeb.contract(crazyAbi, CRAZYTRON_ADDRESS);
		const _userAddress = await crazyContract.userAddress(a).call({ from: ZERO_ADDRESS })
    if (tronWeb.address.fromHex(_userAddress) === ZERO_ADDRESS)
      setSponsorError(t("settings.sponsorError"))
    else
      setSponsorError("")
    if (a === "") {
      setSponsorError("")
    }
    setPendingSponser(false)
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    checkUserName(e.target.value)
  };

  const handleSponsorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSponsor(e.target.value)
    checkSponser(e.target.value)
  };

  const handleSaveUserName = async () => {
    // console.log("Saving settings...", { username, sponsor });
    // await onSetUserName(username)
  };

  const handleSaveSponser = async () => {
    // console.log("Saving settings...", { username, sponsor });
    // await onSetSponser(username)
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {t("settings.title")}
            </h1>
            <p className="text-gray-500">{t("settings.subtitle")}</p>
          </div>

          <Card className="border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#FF0000]" />
                {t("settings.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">{t("settings.username")}</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder={
                    language === "es"
                      ? "Ingresa tu nombre de usuario"
                      : "Enter your username"
                  }
                  className="border-[#FF0000]/20"
                />
                {nameError !== "" && <p className="text-sm text-red-500">
                  {t("settings.usernameError")}
                </p>}
                <p className="text-sm text-gray-500">
                  {t("settings.usernameDescription")}
                </p>
                <div className="pt-4">
                <Button
                  onClick={handleSaveUserName}
                  className="w-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white"
                  // disabled={pending || userName === username}
                  disabled={pending}
                >
                  {t("settings.saveChanges")}
                </Button>
              </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sponsor">{t("settings.sponsor")}</Label>
                <Input
                  id="sponsor"
                  value={sponsor}
                  onChange={handleSponsorChange}
                  placeholder={
                    language === "es"
                      ? "Ingresa el nombre de usuario del patrocinador"
                      : "Enter sponsor username"
                  }
                  className="border-[#FF0000]/20"
                  disabled={isActivated}
                />
                {sponsorError !== "" && <p className="text-sm text-red-500">
                  {t("settings.sponsorError")}
                </p>}
                {!isActivated && (
                  <Alert className="flex items-center bg-[#FF0000]/5 border-[#FF0000]/20">
                    <AlertCircle className="h-4 w-4 text-[#FF0000]" />
                    <AlertDescription>
                      {t("settings.sponsorDescription")}
                    </AlertDescription>
                  </Alert>
                )}
                {isActivated && (
                  <p className="text-sm text-gray-500">
                    {t("settings.sponsorLocked")}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleSaveSponser}
                  className="w-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white"
                  disabled={pending || userLastPaymentTime !== 0 || pendingSponser}
                >
                  {t("settings.saveChanges")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FF0000]" />
                {t("settings.referralLink")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={`https://crazytron.com/ref/${username}`}
                readOnly
                className="bg-black/50 border-[#FF0000]/20 text-white"
              />
              <p className="text-sm text-gray-500 mt-2">
                {t("settings.referralLinkDescription")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
