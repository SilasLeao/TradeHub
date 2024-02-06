"use client";
import "./investmentPageStyles.css";
import Navbar from "../components/Navbar";
import InvestmentMain from "../components/InvestmentMain";
import InvestmentSideBar from "../components/investmentSideBar";
import NoLogin from "../components/NoLogin";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { InfoContainerContext } from "../mainPage/page";

export default function InvestmentPage() {
  const infoContainerContext = useContext(InfoContainerContext);
  let [infoContainerStatus, setInfoContainerStatus] = useState(false);
  const toggleInfoContainerStatus = (statusValue) => {
    setInfoContainerStatus(statusValue);
  };
  const { data: session } = useSession();
  return (
    <>
      {sessionStorage.length >= 1 || session ? (
        <div className="investmentPageComponents">
          <InfoContainerContext.Provider
            value={{ infoContainerStatus, toggleInfoContainerStatus }}
          >
            <Navbar />
            <InvestmentMain />
            <InvestmentSideBar />
          </InfoContainerContext.Provider>
        </div>
      ) : (
        <NoLogin />
      )}
    </>
  );
}
